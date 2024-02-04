import { Button, Card, Divider, Table, Input, message, Dropdown, Modal } from "antd"
import { MAIN_API } from "../../Config/env";
import { PageHeader } from '@ant-design/pro-layout';
import { PlusOutlined, MenuOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import moment from 'moment';
import ModalNuevo from "./nuevo";
import ModalEditar from "./editar";
import { sortAntd } from "../../utils/sortAntd";
import useApiFetch from "../../Hooks/useApiFetch";
const { Search } = Input;

function Prestamos(){

    const isAdmin = JSON.parse( localStorage.getItem('user') ).usuario === "admin"

    const [data,setData] = useState([])
    const [update,setUpdate] = useState(false)
    const [openNuevo, setOpenNuevo] = useState({open:false})
    const [openEditar, setOpenEditar] = useState({open:false})
    const [pagination,setPagination] = useState({})
    const [params,setParams] = useState({limit:10,page:1})
    const [loading,setLoading] = useState()
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
            title:"Apellido",
            dataIndex:["alumno","apellido"],
            key:"apellido",
            sorter:true,
			sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title:"Nombre",
            dataIndex:["alumno","nombre"],
            key:"nombre",
            sorter:true,
			sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title:"Libro",
            dataIndex:["libro","titulo"],
            key:"titulo",
            sorter:true,
			sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title:"Fecha Prestamo",
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
            title:"Fecha Devolucion",
            dataIndex:"fechaDevolucion",
            key:"fecha_devolucion",
            sorter:true,
			sortDirections: ['ascend', 'descend', 'ascend'],
            render:val=> val ? moment(val).format("DD/MM/YYYY") : '',
        },
        ... isAdmin ? [{
			title: "Acción",
			key: 'action',
			width: 50,
			align: 'center',
            render: (text, record) => (
                <Dropdown menu={{
                    items:[
                        { key: '1', label: "Editar", onClick:() => setOpenEditar({ open: true, record: record })},
                        { key: '2', label: "Borrar", onClick:() => showDeleteConfirm( record )},
                    ]
                }}>
                    <Button size="small"> <MenuOutlined /> </Button>
                </Dropdown>
            )
		}] : []
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
            setData(res?.data?.prestamos || [])
            setPagination(p=>({...p,total:res?.data?.totalDataSize}))
        })  
        .catch(error => message.error(error))
        .finally(()=>setLoading(false))
    },[update,params])

    const showDeleteConfirm = (record) => {
        Modal.confirm({
            title: '¿Seguro desea borrar el prestamo?',
            icon: <ExclamationCircleFilled />,
            maskClosable:true,
            okType: 'danger',
            onOk() {
                fetch(MAIN_API + '/prestamos/' + record.id, {    
                    method: 'DELETE',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token"), 
                    },
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
    <Card style={{minHeight:"100%"}}>
        <PageHeader
            onBack={() => window.history.back()}
            title="Prestamos"
            extra={
                isAdmin && <Button type="primary" onClick={()=>setOpenNuevo({open:true})}>
                    <PlusOutlined /> Nuevo
                </Button>
            }
        />
        <Divider/>
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
    <ModalNuevo
        open={openNuevo.open}
        closeModal={()=>setOpenNuevo({open:false})}
        update={()=>setUpdate(p=>!p)}
    />
    <ModalEditar
        open={openEditar.open}
        closeModal={()=>setOpenEditar({open:false})}
        update={()=>setUpdate(p=>!p)}
        record={openEditar.record}
    />
    </>
}

export default Prestamos