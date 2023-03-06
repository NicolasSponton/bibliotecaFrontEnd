import { Divider, Form, Input, Modal,message } from "antd"
import { MAIN_API } from "../../Config/env";
import SelectCarrera from "../../Components/fetchSelects/carreras";

function ModalEditar({open,closeModal,update,record}){
    const [form] = Form.useForm();

    const handleSubmit = (values) => {

        fetch(MAIN_API + '/usuarios', {  
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
    <Modal title="Editar Usuario" open={open} onOk={()=>form.submit()} onCancel={closeModal} destroyOnClose>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={record} preserve={false}>
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
            <Form.Item label="Email" name="email" rules={[{required:true}]}>
                <Input placeholder="email@gmail.com" />
            </Form.Item>
            <Form.Item label="IdUsuario" name="id" style={{ display: 'none' }}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalEditar