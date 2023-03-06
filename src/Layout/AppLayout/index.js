import React, { useRef, useState } from 'react';
import {MenuFoldOutlined,MenuUnfoldOutlined,UserOutlined,BulbOutlined,TagOutlined,TeamOutlined,LogoutOutlined,BookOutlined,FileSearchOutlined,HomeOutlined,SolutionOutlined,AuditOutlined} from '@ant-design/icons';
import { Layout, Menu, Space, theme } from 'antd';
import './styles.css'
import ViewRouter from '../../Pages';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content, Footer } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer }, } = theme.useToken();
    const navigate = useNavigate();

    const user = useRef(JSON.parse(localStorage.getItem("user"))) 

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h1 className='logoFont' style={{ margin:0,fontSize:"2rem",color:"white" }} >{collapsed ? "MB" : "MiBiblioteca"}</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: 'Inicio',
                            onClick:()=>navigate('/app/inicio'),
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: 'Usuarios',
                            onClick:()=>navigate('/app/usuarios'),
                        },
                        {
                            key: '3',
                            icon: <AuditOutlined />,
                            label: 'Prestamos',
                            onClick:()=>navigate('/app/prestamos'),
                        },
                        {
                            key: '4',
                            icon: <TeamOutlined />,
                            label: 'Alumnos',
                            onClick:()=>navigate('/app/alumnos'),
                        },
                        {
                            key: '5',
                            icon: <BookOutlined />,
                            label: 'Libros',
                            onClick:()=>navigate('/app/libros'),
                        },
                        {
                            key: '6',
                            icon: <BulbOutlined />,
                            label: 'Carreras',
                            onClick:()=>navigate('/app/carreras'),
                        },
                        {
                            key: '7',
                            icon: <SolutionOutlined />,
                            label: 'Autores',
                            onClick:()=>navigate('/app/autores'),
                        },
                        {
                            key: '8',
                            icon: <FileSearchOutlined />,
                            label: 'Editoriales',
                            onClick:()=>navigate('/app/editoriales'),
                        },
                        {
                            key: '9',
                            icon: <TagOutlined />,
                            label: 'Categorias',
                            onClick:()=>navigate('/app/categorias'),
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout" style={{minHeight:"100vh"}}>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <Space style={{ float:"right"}}>
                        <UserOutlined /><strong>{user?.current?.nombre} {user?.current?.apellido}</strong>
                        <LogoutOutlined 
                            className={'logout-icon'} 
                            onClick={()=>{
                                localStorage.removeItem('token')
                                navigate('/auth')
                            }} 
                        />
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: '9px 9px',
                    }}
                >
                    <ViewRouter/>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    MiBiblioteca ©2023 Creado Por Nicolas Sponton
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AppLayout;