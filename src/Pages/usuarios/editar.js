import { Divider, Form, Input, Modal,message } from "antd"
import { MAIN_API } from "../../Config/env";
import SelectCarrera from "../../Components/fetchSelects/carreras";
import { useState } from "react";
import useApiFetch from "../../Hooks/useApiFetch";

function ModalEditar({open,closeModal,update,record}){
    const [form] = Form.useForm();
    const [loading,setLoading] = useState()
    const fetchData = useApiFetch();

    const handleSubmit = (values) => {
        setLoading(true)
        fetchData(MAIN_API + '/usuarios', {  
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
            body: JSON.stringify({ ...values })
        })
        .then(() => {
            closeModal()
            update()
        })  
        .catch(error => message.error(error))
        .finally(()=>setLoading(false))
    };

    return <>
    <Modal title="Editar Usuario" open={open} onOk={()=>form.submit()} onCancel={closeModal} destroyOnClose confirmLoading={loading}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={record} preserve={false}>
            <Form.Item label="Apellido" name="apellido" rules={[{required:true}]}>
                <Input placeholder="Apellido..."/>
            </Form.Item>
            <Form.Item label="Nombre" name="nombre" rules={[{required:true}]}>
                <Input placeholder="Nombre..."/>
            </Form.Item>
            <Form.Item label="Usuario" name="usuario" rules={[{required:true}]}>
                <Input placeholder="Usuario..." />
            </Form.Item>
            <Form.Item label="Clave" name="clave" rules={[{required:true}]}>
                <Input placeholder="Clave..." />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input placeholder="email@gmail.com" />
            </Form.Item>
            <Form.Item label="IdUsuario" name="id" style={{ display: 'none' }}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalEditar