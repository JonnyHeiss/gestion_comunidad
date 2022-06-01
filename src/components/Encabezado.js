import React from "react";
import {Avatar, Button, Layout} from 'antd';
import { UserOutlined } from '@ant-design/icons';
export const Encabezado = ( {handleLogout}) => {
 
  return (
    <Layout.Header> 
        <div style={{float:'right',color:'white'}}>
          <p>Comunidad Vicente Pérez Rosales 1871......................   
            <Avatar style={{ backgroundColor: '#87d068', }} icon={<UserOutlined />} />              
            <span> Sistema de gestión de Gastos Comunes   </span>        
            <span style={{paddingLeft :'10px'}}>
              <Button type="primary" size="small"  style={{color:'white'}} 
                            ghost onClick ={ handleLogout }
              >            
                  <i className="fas fa-sign-out-alt" />
                      Salir
              </Button>
            </span>          
          </p>
        </div>
      </Layout.Header>
  )

}
