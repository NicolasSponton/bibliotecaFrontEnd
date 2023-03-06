import { Divider, Form, Input, Modal,message } from "antd"
import { MAIN_API } from "../../Config/env";

function ModalNuevo({open,closeModal,update}){
    const [form] = Form.useForm();
    
    const handleSubmit = (values) => {

        fetch(MAIN_API + '/editoriales', {  
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
    <Modal title="Nueva Editorial" open={open} onOk={()=>form.submit()} onCancel={closeModal}>
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