import { Card, Col, Row, Space, Table, Input, message, Button, Modal, Tooltip, InputNumber, Spin } from "antd"
import { PlusOutlined, ExclamationCircleFilled, FileDoneOutlined } from '@ant-design/icons';
import moment from "moment"
import dayjs from 'dayjs';
import { useEffect, useState } from "react"
import Donut from "../../Components/ApexCharts/Donut"
import LineChart from "../../Components/ApexCharts/Line"
import { MAIN_API } from "../../Config/env"
import ModalNuevoPrestamo from "./nuevoPrestamo";
import { sortAntd } from "../../utils/sortAntd";
import ModalNuevoAlumno from "../alumnos/nuevo";
import ModalNuevoLibro from "../libros/nuevo";
import useApiFetch from "../../Hooks/useApiFetch";
const { Search } = Input;

function Inicio(){

    const [data,setData] = useState([])
    const [estadisticaPrestamos,setEstadisticaPrestamos] = useState([])
    const [update,setUpdate] = useState(false)
    const [pagination,setPagination] = useState({})
    const [openNuevoPrestamo, setOpenNuevoPrestamo] = useState({open:false})
    const [openNuevoAlumno, setOpenNuevoAlumno] = useState({open:false})
    const [openNuevoLibro, setOpenNuevoLibro] = useState({open:false})
    const [params,setParams] = useState({limit:10,page:1,pendientes:true})
    const [loading,setLoading] = useState()
    const [loadingEstadisticas,setLoadingEstadisticas] = useState()
    const fetchData = useApiFetch();

    const columns = [
        {
            title:"Id",
            dataIndex:"id",
            key:"id",
            sorter:true,
			sortDirections: ['ascend', 'descend', 'ascend'],
            width:1,
        },
        {
            title:"Alumno",
            dataIndex:["alumno","apellido"],
            key:"apellido",
            sorter:true,
			sortDirections: ['ascend', 'descend', 'ascend'],
            render:(text,record)=> record.alumno.apellido + " " + record.alumno.nombre
        },
        {
            title:"Titulo",
            dataIndex:["libro","titulo"],
            key:"titulo",
            sorter:true,
			sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title:"Fecha Préstamo",
            dataIndex:"fechaPrestamo",
            key:"fecha_prestamo",
            sorter:true,
			sortDirections: ['ascend', 'descend', 'ascend'],
            render:val=>moment(val).format("DD/MM/YYYY"),
        },
        {
            title:"Fecha Limite",
            dataIndex:"fechaLimite",
            key:"fecha_limite",
            sorter:true,
			sortDirections: ['ascend', 'descend', 'ascend'],
            render:val=>moment(val).format("DD/MM/YYYY"),
        },
        {
			title: "Acción",
			key: 'action',
			width: 1,
			align: 'center',
            render: (text, record) => (
                <Tooltip mouseEnterDelay={0.5} title="Devolución">
                    <Button size="small" type="primary" onClick={() => showDevolucionConfirm( record )} ><FileDoneOutlined /></Button>
                </Tooltip>
            )
		}
    ]
    
    useEffect(()=>{
        setLoading(true)
        const query = '?' + new URLSearchParams(params).toString();
        fetchData(MAIN_API + '/prestamos' + query, {  
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
        })
        .then(res => {
            setData(res.data.prestamos)
            setPagination(p=>({...p,total:res.data.totalDataSize}))
        })  
        .finally(()=>setLoading(false))
    },[update,params])

    useEffect(()=>{
        setLoadingEstadisticas(true)
        fetchData(MAIN_API + '/prestamos/getAllByMonth', {  
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
        })
        .then(res => {
            let stats = []
            for (let i = 1; i < 13; i++) {
                let monthValue = res?.data?.estadisticas?.find(elm => elm.Mes === i)?.Cantidad || 0
                stats.push(monthValue)
            }
            setEstadisticaPrestamos(stats)
        })  
        .finally(()=>setLoadingEstadisticas(false))
    },[])

    const showDevolucionConfirm = (record) => {
        console.log(record);
        Modal.confirm({
            title: '¿Cargar Devolucion?',
            content:<>
                <p style={{margin:5}}><strong>Alumno:</strong> {record.alumno.apellido + " " + record.alumno.nombre}</p>
                <p style={{margin:5}}><strong>Libro:</strong> {record.libro.titulo}</p>
            </>,
            icon: <ExclamationCircleFilled />,
            maskClosable:true,
            okType: 'primary',
            async onOk() {
                return fetch(MAIN_API + '/prestamos', {  
                    method: 'PUT',
                    headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
                    body: JSON.stringify({
                        ...record,
                        fechaDevolucion:dayjs(),
                    })
                })
                .then(res => res.json())
                .then(res => {
                    (res.status === "success")
                        ? setUpdate(p=>!p)
                        : message.error(res.message)
                }) 
            },
        })
    }

    return <>
    <Row gutter={[9, 9]}>
        <Col xs={24} xl={16}>
            <Card style={{minHeight:"100%"}}>
                <Button style={{marginBottom:"10px" }} type="primary" onClick={()=>setOpenNuevoPrestamo({open:true})}><PlusOutlined/>Préstamo</Button>
                <Search  
                    style={{ maxWidth: 300, float:"right", marginBottom:"10px" }} 
                    onSearch={(val)=>setParams(p=>({...p,q:val}))} 
                    placeholder="Apellido..." 
                    enterButton
                />
                <Table
                    scroll={{x:true}}
                    loading={loading}
                    size="small"
                    dataSource={data} 
                    rowKey={record=>record.id}
                    onChange={(pag,_,sorter)=>{
                        setPagination(pag)
                        setParams(p=>({...p,limit:pag.pageSize,page:pag.current,sort:sortAntd(sorter)}))
                    }}
                    columns={columns}
                    bordered
                    pagination={{...pagination, size:"default"}}    
                />
            </Card>
        </Col>
        <Col xs={24} xl={8}>
            <Row gutter={[9, 9]}>
                <Col xs={24} lg={12} xl={24}>
                    <Card>
                        <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>
                            <Button type="primary" onClick={()=>setOpenNuevoAlumno({open:true})} >Nuevo Alumno</Button>
                            <Button type="primary" onClick={()=>setOpenNuevoLibro({open:true})} >Nuevo Libro</Button>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={12} xl={24}>
                    <Spin spinning={loadingEstadisticas}>
                        <Card>  
                            {(estadisticaPrestamos.length > 0) && <LineChart seriesData = {estadisticaPrestamos} />}
                        </Card>
                    </Spin>
                </Col>
            </Row>
        </Col>
    </Row>
    <ModalNuevoPrestamo
        open={openNuevoPrestamo.open}
        closeModal={()=>setOpenNuevoPrestamo({open:false})}
        update={()=>setUpdate(p=>!p)}
    />
    <ModalNuevoAlumno
        open={openNuevoAlumno.open}
        closeModal={()=>setOpenNuevoAlumno({open:false})}
        update={()=>{}}
    />
    <ModalNuevoLibro
        open={openNuevoLibro.open}
        closeModal={()=>setOpenNuevoLibro({open:false})}
        update={()=>{}}
    />
    </>
}

export default Inicio