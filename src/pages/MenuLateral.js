import React from 'react';
import {  Layout } from 'antd';

import { Encabezado } from '../components/Encabezado';
import { Pie } from '../components/Pie';

import { SiderMenu } from '../components/SiderMenu';


export const MenuLateral = () => {
  return (    
    <>
     <Layout>
       <Encabezado  />  
       <Layout style={{minHeight:'100vh',padding:'5px 5px 10px 10px'}} key={ '00' }>
          <SiderMenu />
          <Pie />
       </Layout>    
     </Layout>                 
  </>
  );
};