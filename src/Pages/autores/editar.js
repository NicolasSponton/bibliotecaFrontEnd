import { Divider, Form, Input, Modal, message, DatePicker } from "antd"
import { MAIN_API } from "../../Config/env";
import dayjs from 'dayjs';
import useApiFetch from "../../Hooks/useApiFetch";
import { useState } from "react";
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

function ModalEditar({open,closeModal,update,record}){
    const [form] = Form.useForm();
    const [loading,setLoading] = useState()
    const fetchData = useApiFetch();

    const handleSubmit = (values) => {
        setLoading(true)
        fetchData(MAIN_API + '/autores', {  
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
            body: JSON.stringify({
                ...values,
                fechaDeNacimiento:values.fechaDeNacimiento.utc().format(),
                fechaDeDefuncion:values.fechaDeDefuncion.utc().format(),
            })
        })
        .then(() => {
            closeModal()
            update()
        })  
        .catch(error => message.error(error))
        .finally(()=>setLoading(false))
    };

    const initialValues = {
        ...record,
        fechaDeNacimiento: record?.fechaDeNacimiento ? dayjs(record?.fechaDeNacimiento) : undefined,
        fechaDeDefuncion: record?.fechaDeDefuncion ? dayjs(record?.fechaDeDefuncion) : undefined,
    }

    return <>
    <Modal title="Editar Autor" open={open} onOk={()=>form.submit()} onCancel={closeModal} destroyOnClose confirmLoading={loading}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={initialValues} preserve={false}>
            <Form.Item label="Nombre" name="nombre" rules={[{required:true}]}>
                <Input placeholder="Nombre..." />
            </Form.Item>
            <Form.Item label="Apellido" name="apellido" rules={[{required:true}]}>
                <Input placeholder="Apellido..." />
            </Form.Item>
            <Form.Item label="Fecha De Nacimiento" name="fechaDeNacimiento" rules={[{required:true}]}>
                <DatePicker/>
            </Form.Item>
            <Form.Item label="Fecha De Defuncion" name="fechaDeDefuncion" rules={[{required:true}]}>
                <DatePicker/>
            </Form.Item>
            <Form.Item label="id" name="id" rules={[{required:true}]} style={{ display: 'none' }}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalEditar