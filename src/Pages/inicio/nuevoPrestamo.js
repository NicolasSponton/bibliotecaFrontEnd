import { Divider, Form, Modal, message, DatePicker } from "antd"
import { MAIN_API } from "../../Config/env";
import SelectAlumno from "../../Components/fetchSelects/alumnos";
import SelectLibro from "../../Components/fetchSelects/libros";
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

function ModalNuevoPrestamo({open,closeModal,update}){
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
                fechaPrestamo:dayjs(),
                fechaLimite:values?.fechaLimite?.utc()?.format(),
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
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
            <Form.Item label="Alumno" name="idalumno" rules={[{required:true}]}>
                <SelectAlumno/>
            </Form.Item>
            <Form.Item label="Libro" name="idlibro" rules={[{required:true}]}>
                <SelectLibro/>
            </Form.Item>
            <Form.Item label="Fecha Limite" name="fechaLimite" rules={[{required:true}]} initialValue={dayjs().add(14,'day')}>
                <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
        </Form>
    </Modal>
    </>
}

export default ModalNuevoPrestamo