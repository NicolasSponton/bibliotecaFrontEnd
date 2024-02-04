import { Divider, Form, Input, Modal,message } from "antd"
import { MAIN_API } from "../../Config/env";
import { useState } from "react";
import useApiFetch from "../../Hooks/useApiFetch";

function ModalEditar({open,closeModal,update,record}){
    const [form] = Form.useForm();
    const [loading,setLoading] = useState()
    const fetchData = useApiFetch();

    const handleSubmit = (values) => {

        setLoading(true)
        fetchData(MAIN_API + '/carreras', {  
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
    <Modal title="Editar Carrera" open={open} onOk={()=>form.submit()} onCancel={closeModal} destroyOnClose confirmLoading={loading}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={record} preserve={false}>
            <Form.Item label="Carrera" name="carrera" rules={[{required:true}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="IdCarrera" name="id" style={{ display: 'none' }}>
                <Input placeholder="Carrera..." />
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalEditar