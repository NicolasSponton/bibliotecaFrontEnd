import { Divider, Form, Input, Modal, message, InputNumber, DatePicker  } from "antd"
import { MAIN_API } from "../../Config/env";
import SelectEditorial from "../../Components/fetchSelects/editoriales";
import SelectCategoria from "../../Components/fetchSelects/categorias";
import SelectAutor from "../../Components/fetchSelects/autores";
import dayjs from 'dayjs';
import useApiFetch from "../../Hooks/useApiFetch";
import { useState } from "react";
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

function ModalEditar({open,closeModal,update,record}){
    const [form] = Form.useForm();
    const [loading,setLoading] = useState()
    const fetchData = useApiFetch();

    const handleSubmit = (values) => {
        setLoading(true)
        fetchData(MAIN_API + '/libros', {  
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
            body: JSON.stringify({
                ...values,
                fechaDePublicacion:values.fechaDePublicacion.utc().format(),
            })
        })
        .then(() => {
            closeModal()
            update()
        })  
        .catch(error => message.error(error))
        .finally(()=>setLoading(false))
    };

    const initialValues = {
        ...record,
        fechaDePublicacion: record?.fechaDePublicacion ? dayjs(record?.fechaDePublicacion) : null,
        idautor: record?.idautor || null,
        ideditorial: record?.ideditorial || null,
        idcategoria: record?.idcategoria || null,
    }

    return <>
    <Modal title="Editar Libro" open={open} onOk={()=>form.submit()} onCancel={closeModal} destroyOnClose confirmLoading={loading}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={initialValues} preserve={false}>
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
            <Form.Item label="Id" name="id" rules={[{required:true}]} style={{ display: 'none' }}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalEditar