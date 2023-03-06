import { Divider, Form, Modal, message, DatePicker } from "antd"
import { MAIN_API } from "../../Config/env";
import SelectAlumno from "../../Components/fetchSelects/alumnos";
import SelectLibro from "../../Components/fetchSelects/libros";
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

function ModalNuevo({open,closeModal,update}){
    const [form] = Form.useForm();
    
    const handleSubmit = (values) => {
        
        fetch(MAIN_API + '/prestamos', {  
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
            body: JSON.stringify({
                ...values,
                fechaPrestamo:values?.fechaPrestamo?.utc()?.format(),
                fechaLimite:values?.fechaLimite?.utc()?.format(),
                fechaDevolucion:values?.fechaDevolucion?.utc()?.format(),
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
    <Modal title="Nuevo Prestamo" open={open} onOk={()=>form.submit()} onCancel={closeModal}>
        <Divider/>
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item label="Alumno" name="idalumno" rules={[{required:true}]}>
                <SelectAlumno/>
            </Form.Item>
            <Form.Item label="Libro" name="idlibro" rules={[{required:true}]}>
                <SelectLibro/>
            </Form.Item>
            <Form.Item label="Fecha Prestamo" name="fechaPrestamo" rules={[{required:true}]} initialValue={dayjs()}>
                <DatePicker/>
            </Form.Item>
            <Form.Item label="Fecha Limite" name="fechaLimite" rules={[{required:true}]} initialValue={dayjs().add(14,'day')}>
                <DatePicker/>
            </Form.Item>
            <Form.Item label="Fecha Devolucion" name="fechaDevolucion" >
                <DatePicker/>
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalNuevo