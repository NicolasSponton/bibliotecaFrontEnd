import { Divider, Form, Input, Modal,message } from "antd"
import { MAIN_API } from "../../Config/env";

function ModalEditar({open,closeModal,update,record}){
    const [form] = Form.useForm();

    const handleSubmit = (values) => {

        fetch(MAIN_API + '/editoriales', {  
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
            body: JSON.stringify({ ...values })
        })
        .then(res => res.json())
        .then(res => {
            if(res.status === "success"){
                closeModal()
                update()
            } else {
                message.error(res.message);
            }
        })  
        .catch(error => message.error(error))
    };

    return <>
    <Modal title="Editar Editorial" open={open} onOk={()=>form.submit()} onCancel={closeModal} destroyOnClose>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={record} preserve={false}>
            <Form.Item label="Editorial" name="editorial" rules={[{required:true}]}>
                <Input  placeholder="Editorial..." />
            </Form.Item>
            <Form.Item label="IdEditorial" name="id" style={{ display: 'none' }}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalEditar