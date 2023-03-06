import { Divider, Form, Input, Modal, message, InputNumber } from "antd"
import { MAIN_API } from "../../Config/env";
import SelectCarrera from "../../Components/fetchSelects/carreras";

function ModalNuevo({open,closeModal,update}){
    const [form] = Form.useForm();
    
    const handleSubmit = (values) => {

        fetch(MAIN_API + '/alumnos', {  
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
    <Modal title="Nuevo Alumno" open={open} onOk={()=>form.submit()} onCancel={closeModal}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item label="Carrera" name="idcarrera">
                <SelectCarrera/>
            </Form.Item>
            <Form.Item label="Nombre" name="nombre" rules={[{required:true}]}>
                <Input placeholder="Nombre..."/>
            </Form.Item>
            <Form.Item label="Apellido" name="apellido" rules={[{required:true}]}>
                <Input placeholder="Apellido..."/>
            </Form.Item>
            <Form.Item label="DNI" name="dni">
                <InputNumber placeholder="45450450" min={1000000} max={99999999} type="number" controls={false} style={{width:"100%"}} />
            </Form.Item>
            <Form.Item label="Celular" name="celular">
                <Input placeholder="3482-444555..."/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input placeholder="Email..."/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalNuevo