import { Divider, Form, Input, Modal,message } from "antd"
import { MAIN_API } from "../../Config/env";

function ModalNuevo({open,closeModal,update}){
    const [form] = Form.useForm();
    
    const handleSubmit = (values) => {

        fetch(MAIN_API + '/categorias', {  
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
            body: JSON.stringify({ ...values })
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
    <Modal title="Nueva Categoria" open={open} onOk={()=>form.submit()} onCancel={closeModal}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item label="Categoria" name="categoria" rules={[{required:true}]}>
                <Input placeholder="Categoria..." />
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalNuevo