import React, { useContext }from "react";
import { useNavigate } from "react-router-dom";
import {Avatar, Button, Layout} from 'antd';
import { UserOutlined } from '@ant-design/icons';

//import { UserContext } from "../auth/UserContext";
import { AuthContext } from "../auth/authContext";
import { types } from "../types/types";

export const Encabezado = ( ) => {
  const { user, dispatch } = useContext( AuthContext );
  
  //const { setUser }= useContext( UserContext );
  const navigate=useNavigate();

  const handleLogOut = () => {
    const action={ type: types.logout };    
    dispatch(action);
    
    navigate('/login', {
      replace: true
   });
  }
  return (
    <Layout.Header> 
        <div style={{float:'left',color:'white'}}>
          <p>{ user.nombreComunidad } </p>
        </div>
          <div style={{float:'right',color:'white'}}>
            <p> 
            <Avatar style={{ backgroundColor: '#87d068', }} icon={<UserOutlined />} />              
            <span> {user.name }  </span>        
            <span style={{paddingLeft :'10px'}}>
              <Button type="primary" size="small"  style={{color:'white'}} 
                            ghost onClick ={ handleLogOut } //ghost onClick ={ () => setUser({}) }
              >            
                  <i className="fas fa-sign-out-alt" />
                      Salir
              </Button>             
            </span>          
          </p>
          
        </div>
        <div style={{float:'right',color:'white', paddingRight: '15px'}}>
          <span> Sistema de gestión de Gastos Comunes </span>
        </div>
      </Layout.Header>
  )
}
