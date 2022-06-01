import React from "react";
import {Layout} from 'antd';
export const Pie=()=>{
    return(
        <Layout.Footer style={{
            borderTop: '1px solid #e8e8e8', 
            position: 'fixed',
            left:0,
            bottom:0,
            height:20,
            width:'100%',
            textAlign:'center',
            backgroundColor:'lightblue',
        }}> 
            Version 1.0 Jonny Heiss ©2022
            {/* <span>Desarrollado por Jonny Heiss con la ayuda de Erich Ramos - Version 1.1 del 28-4-2022</span> */}
        </Layout.Footer>
    )
}