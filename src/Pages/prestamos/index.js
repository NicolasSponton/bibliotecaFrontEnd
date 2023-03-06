import { Button, Card, Divider, Table, Input, message, Dropdown, Modal } from "antd"
import { MAIN_API } from "../../Config/env";
import { PageHeader } from '@ant-design/pro-layout';
import { PlusOutlined, MenuOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import moment from 'moment';
import ModalNuevo from "./nuevo";
import ModalEditar from "./editar";
import { sortAntd } from "../../utils/sortAntd";
const { Search } = Input;

function Prestamos(){

    const isAdmin = JSON.parse( localStorage.getItem('user') ).usuario === "admin"

    const [data,setData] = useState([])
    const [update,setUpdate] = useState(false)
    const [openNuevo, setOpenNuevo] = useState({open:false})
    const [openEditar, setOpenEditar] = useState({open:false})
    const [pagination,setPagination] = useState({})
    const [params,setParams] = useState({limit:10,page:1})

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
        },
        {
            title:"Nombre",
            dataIndex:["alumno","nombre"],
            key:"nombre",
        },
        {
            title:"Libro",
            dataIndex:["libro","titulo"],
            key:"titulo",
        },
        {
            title:"Fecha Prestamo",
            dataIndex:"fechaPrestamo",
            key:"fechaPrestamo",
            render:val=>moment(val).format("DD/MM/YYYY"),
        },
        {
            title:"Fecha Limite",
            dataIndex:"fechaLimite",
            key:"fechaLimite",
            render:val=>moment(val).format("DD/MM/YYYY"),
        },
        {
            title:"Fecha Devolucion",
            dataIndex:"fechaDevolucion",
            key:"fechaDevolucion",
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
        const query = '?' + new URLSearchParams(params).toString();
        fetch(MAIN_API + '/prestamos' + query, {  
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
        })
        .then(res => res.json())
        .then(res => {
            if(res.status === "success"){
                setData(res.data.prestamos)
                setPagination(p=>({...p,total:res.data.totalDataSize}))
            } else {
                message.error(res.message);
            }
        })  
        .catch(error => message.error(error))
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
            style={{ width: 304, float:"right", marginBottom:"10px" }} 
            onSearch={(val)=>setParams(p=>({...p,q:val}))} 
            placeholder="Apellido..." 
            enterButton
        />
        <Table
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