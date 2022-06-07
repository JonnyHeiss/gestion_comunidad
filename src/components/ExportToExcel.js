import React from "react";
import {   FileExcelOutlined    } from '@ant-design/icons';
import ReactExport from "react-export-excel";
import {  Button } from "antd";

const ExcelFile = ReactExport.ExcelFile;//es el archivo a crear
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;//esta es la hoja

export const ExportExcel= ({ columnsExcel, dataExcel, toExcel, label } ) =>{//componente que exporta a excel vía botón
    const hoy= new Date();
    const local = hoy.toLocaleDateString("es-CL");
    //const offset = hoy.getTimezoneOffset() ; 
    //const today=new Date().toISOString().slice(0, 19);
    const today= local;// + '-'+ offset;
    const multiData= [{  columns: columnsExcel, data: dataExcel  }];//los títulos de la columnas y la data en array
    return(
      <div>
        <ExcelFile 
            element={<Button icon={ <FileExcelOutlined />} type="secondary"  > 
             {
             (label.length > 0 ) 
             ? ( `${label}` )
             : 'Bajar a Excel'
             }
            </Button> } 
            filename={toExcel.fileNameExcel +` ${today}`} 
            >
            <ExcelSheet dataSet={ multiData } name={toExcel.sheetNameExcel} />
        </ExcelFile>    
    
      </div>
    )
  };