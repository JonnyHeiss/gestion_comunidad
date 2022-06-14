import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Layout , Menu } from 'antd';
import { LoginOutlined, LogoutOutlined, AuditOutlined, ExceptionOutlined ,HomeOutlined  } from '@ant-design/icons';

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

export const SiderMenu = () => {
    const navigate = useNavigate();
    const [ current, setCurrent ] = useState ();
    const [ collapsed, setCollapsed ] = useState (false);
    const onCollapse = () => {setCollapsed(!collapsed) };
    const onClick = ( e ) =>{
        
        const mnu = menuItems.find (r => r.key === e.key)
        // console.log( mnu);
        // console.log(navigate)
        setCurrent(e.key);
        navigate(`${ mnu.ruta }`)
      };
      
  return (    
        <Layout.Sider collapsible collapsed ={collapsed} onCollapse = {onCollapse}
           theme={'light'} style={{width: '240px', }} key={'sider'} 
        >
        <Menu  theme={'light'} style={{ fontSize: '12px', float:'left' }} mode="inline"  key='xmenu'
            defaultOpenKeys={['inicio']} selectedKeys={[current]} onClick={ onClick }
            items={ menuItems }
        >
            {/* {
                menuItems.map( it => (
                <>
                <Menu.Item key={ it.key } icon={ it.icon } 
                //onClick = {() => onClickMenu(it)} 
                >                      
                    <span key = { it.key +'lbl' } >{ it.label }  </span> 
                    <NavLink to = { `${it.ruta}` } key = { it.key +'nav' } />       
                    
                </Menu.Item>
                </>
                )
                )
            } */}
        </Menu> 
        </Layout.Sider>


  )
}
