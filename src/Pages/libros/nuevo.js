import { Divider, Form, Input, Modal, message, InputNumber, DatePicker } from "antd"
import { MAIN_API } from "../../Config/env";
import SelectEditorial from "../../Components/fetchSelects/editoriales";
import SelectCategoria from "../../Components/fetchSelects/categorias";
import SelectAutor from "../../Components/fetchSelects/autores";
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

function ModalNuevo({open,closeModal,update}){
    const [form] = Form.useForm();
    
    const handleSubmit = (values) => {

        fetch(MAIN_API + '/libros', {  
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
            body: JSON.stringify({
                ...values,
                fechaDePublicacion:values?.fechaDePublicacion?.utc()?.format(),
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
    <Modal title="Nuevo Libro" open={open} onOk={()=>form.submit()} onCancel={closeModal}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Titulo" name="titulo" rules={[{required:true}]}>
                <Input placeholder="Titulo..."/>
            </Form.Item>
            <Form.Item label="Copias" name="copias" rules={[{required:true}]}>
                <InputNumber placeholder="1" min={0} type="number"/>
            </Form.Item>
            <Form.Item label="Autor" name="idautor" >
                <SelectAutor/>
            </Form.Item>
            <Form.Item label="Editorial" name="ideditorial" >
                <SelectEditorial/>
            </Form.Item>
            <Form.Item label="Categoría" name="idcategoria" >
                <SelectCategoria placeholder="Categoría..."/>
            </Form.Item>
            <Form.Item label="Edicion" name="edicion" >
                <Input placeholder="Edicion..."/>
            </Form.Item>
            <Form.Item label="Fecha De Publicacion" name="fechaDePublicacion" >
                <DatePicker/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalNuevo