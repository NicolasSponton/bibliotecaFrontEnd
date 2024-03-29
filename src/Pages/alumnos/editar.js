import { Divider, Form, Input, Modal, message, InputNumber } from "antd"
import { MAIN_API } from "../../Config/env";
import SelectCarrera from "../../Components/fetchSelects/carreras";
import useApiFetch from "../../Hooks/useApiFetch";
import { useState } from "react";

function ModalEditar({open,closeModal,update,record}){
    const [form] = Form.useForm();
    const [loading,setLoading] = useState()
    const fetchData = useApiFetch();

    const handleSubmit = (values) => {

        setLoading(true)
        fetchData(MAIN_API + '/alumnos', {  
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
    <Modal title="Editar Alumno" open={open} onOk={()=>form.submit()} onCancel={closeModal} destroyOnClose confirmLoading={loading}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} preserve={false}
            initialValues={{
                ...record,
                idcarrera:record?.idcarrera || null,
                dni:record?.dni || null,
            }}
        >
            <Form.Item label="Carrera" name="idcarrera">
                <SelectCarrera/>
            </Form.Item>
            <Form.Item label="Nombre" name="nombre" rules={[{required:true}]}>
                <Input placeholder="Nombre..."/>
            </Form.Item>
            <Form.Item label="Apellido" name="apellido" rules={[{required:true}]}>
                <Input placeholder="Apellido..."/>
            </Form.Item>
            <Form.Item label="DNI" name="dni" rules={[{required:true}]}>
                <InputNumber placeholder="45450450" min={1000000} max={99999999} type="number" controls={false} style={{width:"100%"}} />
            </Form.Item>
            <Form.Item label="Celular" name="celular">
                <Input placeholder="3482-444555..."/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input placeholder="Email..."/>
            </Form.Item>
            <Form.Item label="IdAlumno" name="id" style={{ display: 'none' }}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalEditar