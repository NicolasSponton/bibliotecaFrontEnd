import { Divider, Form, Input, Modal,message } from "antd"
import { MAIN_API } from "../../Config/env";
import useApiFetch from "../../Hooks/useApiFetch";
import { useState } from "react";

function ModalEditar({open,closeModal,update,record}){
    const [form] = Form.useForm();
    const [loading,setLoading] = useState()
    const fetchData = useApiFetch();

    const handleSubmit = (values) => {
        setLoading(true)
        fetchData(MAIN_API + '/categorias', {  
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
    <Modal title="Editar Categoria" open={open} onOk={()=>form.submit()} onCancel={closeModal} destroyOnClose loading={loading}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={record} preserve={false}>
            <Form.Item label="Categoria" name="categoria" rules={[{required:true}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="IdCategoria" name="id" style={{ display: 'none' }}>
                <Input placeholder="Categoria..." />
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalEditar