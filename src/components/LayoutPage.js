import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Encabezado } from './Encabezado'
import { Pie } from './Pie'
import { SiderMenu } from './SiderMenu'

export const LayoutPage = () => {
  return (
    <Layout >
        <Encabezado  /> 
        <Layout style={{minHeight:'100vh',padding:'5px 5px 10px 10px'}} key={'00'}>
            <SiderMenu />
            <Layout.Content style={{margin:'0 5px', background:'#fff'}}>
            <Outlet />
            </Layout.Content>                            
            <Pie />
        </Layout>   
    </Layout>  
  )
}
