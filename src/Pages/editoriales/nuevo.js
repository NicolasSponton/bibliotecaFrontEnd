import { Divider, Form, Input, Modal,message } from "antd"
import { MAIN_API } from "../../Config/env";
import { useState } from "react";
import useApiFetch from "../../Hooks/useApiFetch";

function ModalNuevo({open,closeModal,update}){
    const [form] = Form.useForm();
    const [loading,setLoading] = useState()
    const fetchData = useApiFetch();

    const handleSubmit = (values) => {
        setLoading(true)
        fetchData(MAIN_API + '/editoriales', {  
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
    <Modal title="Nueva Editorial" open={open} onOk={()=>form.submit()} onCancel={closeModal} confirmLoading={loading}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item label="Editorial" name="editorial" rules={[{required:true}]}>
                <Input  placeholder="Editorial..." />
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalNuevo