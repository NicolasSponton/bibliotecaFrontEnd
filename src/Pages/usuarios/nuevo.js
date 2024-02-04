import { Divider, Form, Input, Modal, message, InputNumber } from "antd"
import { MAIN_API } from "../../Config/env";
import SelectCarrera from "../../Components/fetchSelects/carreras";
import useApiFetch from "../../Hooks/useApiFetch";
import { useState } from "react";

function ModalNuevo({open,closeModal,update}){
    const [form] = Form.useForm();
    const [loading,setLoading] = useState()
    const fetchData = useApiFetch();

    const handleSubmit = (values) => {
        setLoading(true)
        fetchData(MAIN_API + '/usuarios', {  
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
            body: JSON.stringify({ ...values })
        })
        .then(() => {
            form.resetFields()
            closeModal()
            update()
        })  
        .catch(error => message.error(error))
        .finally(()=>setLoading(false))
    };

    return <>
    <Modal title="Nuevo Usuario" open={open} onOk={()=>form.submit()} onCancel={closeModal} confirmLoading={loading}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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
        </Form>
    </Modal>
    </>
}

export default ModalNuevo