import { Divider, Form, Input, Modal,message, DatePicker } from "antd"
import { MAIN_API } from "../../Config/env";
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

function ModalNuevo({open,closeModal,update}){
    const [form] = Form.useForm();
    
    const handleSubmit = (values) => {

        fetch(MAIN_API + '/autores', {  
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
            body: JSON.stringify({
                ...values,
                fechaDeNacimiento:values.fechaDeNacimiento?.utc()?.format() || null,
                fechaDeDefuncion:values.fechaDeDefuncion?.utc()?.format() || null,
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.status === "success"){
                form.resetFields()
                closeModal()
                update()
            } else {
                message.error(res.message);
            }
        })  
        .catch(error => message.error(error))
    };

    return <>
    <Modal title="Nuevo Autor" open={open} onOk={()=>form.submit()} onCancel={closeModal}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Nombre" name="nombre" rules={[{required:true}]}>
                <Input placeholder="Nombre..." />
            </Form.Item>
            <Form.Item label="Apellido" name="apellido" rules={[{required:true}]}>
                <Input placeholder="Apellido..." />
            </Form.Item>
            <Form.Item label="Fecha De Nacimiento" name="fechaDeNacimiento">
                <DatePicker/>
            </Form.Item>
            <Form.Item label="Fecha De Defuncion" name="fechaDeDefuncion">
                <DatePicker/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalNuevo