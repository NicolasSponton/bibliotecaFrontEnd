import { Divider, Form, Input, Modal, message, DatePicker } from "antd"
import { MAIN_API } from "../../Config/env";
import SelectAlumno from "../../Components/fetchSelects/alumnos";
import SelectLibro from "../../Components/fetchSelects/libros";
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

function ModalEditar({open,closeModal,update,record}){
    const [form] = Form.useForm();
console.log(record);
    const handleSubmit = (values) => {
        fetch(MAIN_API + '/prestamos', {  
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
            body: JSON.stringify({
                ...values,
                fechaPrestamo:values?.fecha?.utc()?.format(),
                fechaLimite:values?.fechaLimite?.utc()?.format(),
                fechaDevolucion:values?.fechaDevolucion?.utc()?.format(),
            })
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

    const initialValues = {
        ...record,
        fechaPrestamo:dayjs(record?.fechaPrestamo),
        fechaLimite:dayjs(record?.fechaLimite),
        fechaDevolucion: record?.fechaDevolucion ? dayjs(record?.fechaDevolucion) : null,
    }

    return <>
    <Modal title="Editar Prestamo" open={open} onOk={()=>form.submit()} onCancel={closeModal} destroyOnClose>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} initialValues={initialValues} preserve={false}>
            <Form.Item label="Alumno" name="idalumno" rules={[{required:true}]}>
                <SelectAlumno/>
            </Form.Item>
            <Form.Item label="Libro" name="idlibro" rules={[{required:true}]}>
                <SelectLibro/>
            </Form.Item>
            <Form.Item label="Fecha Prestamo" name="fechaPrestamo" rules={[{required:true}]}>
                <DatePicker/>
            </Form.Item>
            <Form.Item label="Fecha Limite" name="fechaLimite" rules={[{required:true}]}>
                <DatePicker/>
            </Form.Item>
            <Form.Item label="Fecha Devolucion" name="fechaDevolucion">
                <DatePicker/>
            </Form.Item>
            <Form.Item label="id" name="id" rules={[{required:true}]} style={{ display: 'none' }}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalEditar