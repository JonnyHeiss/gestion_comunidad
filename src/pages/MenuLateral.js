import React, {  useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { LoginOutlined, LogoutOutlined, AuditOutlined, ExceptionOutlined ,HomeOutlined  } from '@ant-design/icons';
import { Encabezado } from '../components/Encabezado';
import { Pie } from '../components/Pie';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Ingreso } from './Ingreso';
import { Egreso } from './Egreso';
import { InformeMensual } from './InformeMensual';
import { MovimientosEntreFechas } from './MovimientosEntreFechas';
import { Home } from './Home';
import { useConsultaMensual } from '../hooks/useConsultaMensual';

const getItem=(label, key, icon, ruta) => {
  return {label, key, icon, ruta};
}
let menuItems = [
  getItem('Inicio', 'inicio', <HomeOutlined/>,'/'),
  getItem('Registrar ingreso', 'menu1', <LoginOutlined/>,'/ingreso'),
  getItem('Registrar gasto', 'menu2', <LogoutOutlined/>,'/egreso'),
  getItem('Informe mensual', 'menu3', <AuditOutlined />, '/informemes'),
  getItem('Informe de Movimientos', 'menu4', <ExceptionOutlined />, '/informeentrefechas'),
];
const idUsuario=1;
export const MenuLateral = () => {
  const [current, setCurrent] = useState ();
  const [collapsed, setCollapsed] = useState (false);
  const [isLoggedin, setIsLoggedin] = useState(true); 
  const  [ nombreComunidad, setNombreComunidad ] =useState('');
  const handleLogout = () =>{
    setIsLoggedin(false);
  };
  const onCollapse = () => {setCollapsed(!collapsed) };
  const onClick=(e) =>{
    setCurrent(e.key);
  };
  
  const [{ data: dataOrganizacion, isLoading: isLoad } , setParamOrganizacion ]= useConsultaMensual( {
    method: 'POST', endpoint: '', params: {}, }, [] );
  useEffect(() => {
      if ( idUsuario  ) {
        const leeDatos = async (  ) =>{
            await setParamOrganizacion( { param: {idUsuario },
                 method: 'POST', endpoint: '/movimiento/leeorganizacion'
             });
        }
        leeDatos();     
       };
   }, [  ]);
  useEffect(() => {
    if ( dataOrganizacion.length >0 ){
      const { nombreOrganizacion }= dataOrganizacion[0];      
      setNombreComunidad( nombreOrganizacion ) ;
    };    
  }, [dataOrganizacion])
  
  return (    
    <>
     {!isLoggedin ?
     <>
      <h1>Chao.....Logout</h1>
     </>
     :<Layout>
       <Encabezado handleLogout={handleLogout} nombreComunidad={ nombreComunidad } />
        {
        (menuItems.length > 0) ?(
        <Layout style={{minHeight:'100vh',padding:'5px 5px 10px 10px'}} key={'00'}>
            <Layout.Sider collapsible collapsed ={collapsed} onCollapse = {onCollapse}
            theme={'light'} style={{width: '240px', }} key={'sider'}
            >
            <Menu  theme={'light'} style={{ fontSize: '12px', }} mode="inline"  key='xmenu'
                defaultOpenKeys={['inicio']} selectedKeys={[current]} onClick={onClick}
            >
                 {
                    menuItems.map(it=>(
                      <>
                      <Menu.Item key={it.key} icon={ it.icon } >                      
                        <span>{it.label}  </span> 
                        <NavLink  to={`${it.ruta}`}  />       
                      </Menu.Item>
                      </>
                      )
                    )
                  }
            </Menu> 
            </Layout.Sider>
            <Layout.Content style={{margin:'0 5px', background:'#fff'}} key={'0'}>
              <Routes key={'rutas'}>
                <Route path="/ingreso" element={<Ingreso/>} key={'1'}></Route>
                <Route path="/egreso" element={<Egreso/>} key={'2'}></Route>
                <Route path="/informemes" element={<InformeMensual/>} key={'3'}></Route>
                <Route path="/informeentrefechas" element={<MovimientosEntreFechas/>} key={'4'}></Route>
                <Route path="/" element={<Home />} key={'0'}></Route> 
              </Routes>
              </Layout.Content>
              <Pie />
        
          </Layout>
        ):
          <></>
        }
       </Layout>                 
      }      
  </>
  );
};