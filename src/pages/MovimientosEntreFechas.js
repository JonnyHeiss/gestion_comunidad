import React, { useEffect , useState  } from "react";
import { Layout , Form, Row, Col, Select, Spin, Button, Table, Empty, DatePicker } from "antd";
import renderHTML from 'react-render-html';
import * as moment from "moment";
import "moment/locale/es";
import es_ES from "antd/lib/date-picker/locale/es_ES";

import { useConsultaMensual } from "../hooks/useConsultaMensual";

import "antd/dist/antd.css";
import "./grilla.css";
import { columnMov,  optionInformeMov} from '../components/TituloColumnas';
import { ExportExcel } from "../components/ExportToExcel";
import { useForm } from "../hooks/useForm";

const idUsuario =1;
const backgroundColor='#FAEBD7';

export const MovimientosEntreFechas = () => {
  const [paramsForm , setParamsForm] = useState({});
  const [columnsExcel, setColumnsExcel]=useState([]);
  const [dataIndex, setDataIndex]=useState([]);//para armar arreglo filas del excel
  const [exportToExcel, setExportToExcel] =useState( false);
  const [dataExcel,setDataExcel]=useState();
  const [toExcel,setToExcel]=useState( {fileNameExcel: '', sheetNameExcel: ''} ); 
  const { fechafin, fechaini, fondo, onChange } =useForm ({ 
     fechaini:moment(moment().format('YYYY')+'0101').format('L'), 
     fechafin:moment().format('L'), 
     fondo: 'NORMAL'  });
  const [{ data: dataConsulta, isLoading: isLoad } , setParamConsulta ]= useConsultaMensual( {
      method: 'POST', endpoint: '', params: {}, }, [] );
  const onFinish=() =>{
    //falta validar las fechas
      setParamsForm( { idUsuario, fechaini, fechafin , fondo })
  };
  useEffect(() => {
    if ( paramsForm.idUsuario && paramsForm.fechaini &&  paramsForm.fechafin  && paramsForm.fondo ) {
      const leeDatos = async ( idUsuario, fechaInicio, fechaFin, tipoFondo ) =>{
          await setParamConsulta( {param: { idUsuario, fechaInicio, fechaFin, tipoFondo },
               method: 'POST', endpoint: '/consulta/transentrefechas'
           });
      }
      leeDatos(paramsForm.idUsuario, paramsForm.fechaini, paramsForm.fechafin, paramsForm.fondo);   
     };
  }, [paramsForm]);
   useEffect(() => {
     if ( dataConsulta.length >0 ) {
       
        const col= columnMov.map( ( c ) => c.title);
        setColumnsExcel( col );
        const ind= columnMov.map( ( c ) => c.dataIndex );
         setDataIndex(ind);
      
      setToExcel({ fileNameExcel: paramsForm.fondo, sheetNameExcel: 'Hoja 1'} );
      setExportToExcel( true );
     }
    }, [ dataConsulta ])
  useEffect(() => {//arma el dataExcel    
     if (exportToExcel && dataConsulta ){
          let dataExcel=[];//datos de la grilla para hacer el setDataExcel()
          let datoSol=[];//datos de cada fila
          const dataCol = dataIndex; //tiene los nombres de los field de la BD
            dataConsulta.map((x,j) => {//convierte dataLoad en dataSet
             datoSol=[];
             dataCol.map((col) =>{ 
                 const result=Object.entries(x);//convierte Objeto en array con 2 elementos: atributo y el valor
                 const linea = result.find( itm => itm[0] === col );
                 if (linea !== undefined)  {
                   datoSol=[...datoSol, linea[1]];
                 }
                 return 0;
             });
             if (datoSol.length>0) {              
               dataExcel=[ ...dataExcel, datoSol];              
             }
             return 0;
         });
        setDataExcel( dataExcel );
     }
  }, [exportToExcel]);
  const onFinishFailed = () =>{ };

  if ( isLoad  ){
    return (<Layout style={{ minHeight: "100vh",padding: '5px 10px 10px' }}  >
              <div  style={{ position: "absolute",left: "55%", top: "50%", }}  >
                <Spin size="large"   tip ='Cargando....' >  </Spin>
              </div>
            </Layout>
          )
  };
  return (
    <>
      <Layout.Content style={  { background:`${backgroundColor}`, 
          }}>
        <Form  onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               autoComplete="off"
        >
        <div style={{textAlign:'left'}}>{renderHTML('<h4>Informe de movimientos entre fechas</h4>') }  </div>
        <Row >
              <Col span={4}  >   
                <Form.Item  name='fechaini'  
                 // rules={[ { required: true,  message: '¡Debe seleccionar el Fecha de inicio', },]}            
                >
                  <DatePicker 
                     locale = { es_ES }
                     style = {{ marginBottom: '0%', marginTop: '0%',marginLeft: '3%',flexDirection:'column' }}
                     placeholder = 'Fecha inicio'
                     format= 'DD/MM/YYYY'
                     picker= 'date'
                     onChange={  (  value ) => onChange( value, 'fechaini' )}
                     defaultValue={ moment(fechaini , 'DD/MM/YYYY' ) } 
                  />
                </Form.Item>     
              </Col>    
              <Col span={4}  >   
                <Form.Item  name='fechafin'  
                  //rules={[ { required: true,  message: '¡Debe seleccionar el Fecha de término', },]}            
                >
                  <DatePicker 
                     locale = { es_ES }
                     style = {{ marginBottom: '0%', marginTop: '0%',marginLeft: '3%',flexDirection:'column' }}
                     placeholder = 'Fecha término'
                     format= 'DD/MM/YYYY'
                     picker= 'date'
                     onChange={  (  value ) => onChange( value, 'fechafin' )}
                     defaultValue= { moment(fechafin , 'DD/MM/YYYY' ) }
                  />
                </Form.Item>     
              </Col>    
              <Col span={4}  >   
                  <Form.Item  name='fondo'  
                    rules={[{ required: true, message: '¡Debe seleccionar el Fondo!', }, ]}            
                  >
                      <Select placeholder='Seleccione Fondo' align={'left'} 
                          style={{ marginBottom: '0%', marginTop: '0%',marginLeft: '0%', width: '220px'}}
                          onSelect={ ( value ) => onChange( value , 'fondo' )}
                      >
                        { optionInformeMov.map( ( opc ) => <Select.Option key = { opc.atributo }> { opc.valor}</Select.Option> ) }
                      </Select>
                  </Form.Item>         
                </Col> 
                <Col span={ 4 } > <Button type='primary' htmlType="submit"> Consultar  </Button>  </Col>  
                  {( exportToExcel ) && 
                     <Col span={ 4 } > 
                        <ExportExcel columnsExcel={ columnsExcel } dataExcel={ dataExcel } toExcel= { toExcel } />  
                     </Col> 
                  }
              </Row>
        </Form>
        { (!isLoad) ? <Table style={{display:"flex",flex: 1, justifyContent: 'center'  }} dataSource={ dataConsulta }  columns={  columnMov }  />
            : <Empty />
        }
      </Layout.Content>
    </>
    )
}