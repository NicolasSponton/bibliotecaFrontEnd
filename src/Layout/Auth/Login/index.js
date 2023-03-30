import { Card, Col, Row, Form, Input, Checkbox, message, Button } from "antd"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_API } from "../../../Config/env";

const backgroundStyle = {
	backgroundImage: 'url(/img/background/auth.jpg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
    height:"100vh",
}

function Login (props){
    let navigate = useNavigate();

    const [Loading,setLoading] = useState()

    const onCreate = (values) => {

        let formData = new FormData();
        formData.append('username', values.username);
        formData.append('password', values.password);        

        setLoading(true)
        fetch(AUTH_API + '/login', {  
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            if(res.status === "success"){
                localStorage.setItem('token', res?.data?.token || "");
                localStorage.setItem('user', JSON.stringify(res?.data?.user) || "");
                message.success("Inicio de Sesión Exitoso")
                props.setIsAllowed(true)
                navigate('/app/inicio')
            } else {
                (res.message = "record not found")
                    ?   message.error("Usuario Incorrecto")
                    :   message.error(res.message)
            }
        })  
        .catch(error => message.error(error))
        .finally(()=>setLoading(false))
    }

    return <div style={backgroundStyle}>
    <Row justify="center" style={{paddingTop:"100px"}} >
        <Col lg={6} sm={12}>
            <Card>
                <Form
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onCreate}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Usuario"
                        name="username"
                        rules={[ { required: true, message: 'Por favor ingrese su nombre de usuario!' } ]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[ { required: true, message: 'Por favor ingrese su contraseña!' } ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Recordarme</Checkbox>
                    </Form.Item> */}

                    <Form.Item>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Button loading={Loading} style={{width:"80%"}} type="primary" htmlType="submit"> Iniciar Sesion </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    </Row>
    </div>
}

export default Login