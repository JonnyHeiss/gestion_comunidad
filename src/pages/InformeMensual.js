import React, { useEffect , useState , useRef } from "react";
import { Layout , Form, Row, Col, Select, Spin, Button, Table, Empty } from "antd";
import renderHTML from 'react-render-html';
import { useTablas } from "../hooks/useTablas";
import { useConsultaMensual } from "../hooks/useConsultaMensual";

import "antd/dist/antd.css";
import "./grilla.css";
import { columnGasto, columnIngreso , optionInforme} from '../components/TituloColumnas';
import { ExportExcel } from "../components/ExportToExcel";

const idUsuario =1;
const backgroundColor='#FAEBD7';

export const InformeMensual = () => {
  const [form] = Form.useForm( );
  const { tablas , isLoading } = useTablas(idUsuario); //las tablas de los select
  const [paramsForm , setParamsForm] = useState({});//la data del form y sus campos
  const ingGastoRef=useRef('GASTO');
  const [ nombreInforme, setNombreInforme ] = useState('');
  const [columnsExcel, setColumnsExcel]=useState([]);//nombre de las columnas del excel
  const [dataIndex, setDataIndex]=useState([]);//para armar arreglo filas del excel
  const [exportToExcel, setExportToExcel] =useState( false);//para indicar cuando mandar a excel
  const [dataExcel,setDataExcel]=useState();//la grilla del excel
  const [toExcel,setToExcel]=useState( {fileNameExcel: '', sheetNameExcel: ''} );  //nombre del excel y de la hoja
  const [{ data: dataConsulta, isLoading: isLoad } , setParamConsulta ]= useConsultaMensual( {
      method: 'POST', endpoint: '', params: {}, }, [] );
  const onFinish=() =>{
      const año=parseInt( form.getFieldsValue().año);
      const tipoFondo= form.getFieldsValue().tipoFondo;
      setParamsForm( { idUsuario, año, tipoFondo })
  };
  useEffect(() => {
    if ( paramsForm.idUsuario && paramsForm.año && paramsForm.tipoFondo ) {
      const leeDatos = async ( idUsuario, año, tipoFondo ) =>{
          const  ingresoGasto= tipoFondo.split('_')[0]; 
          ingGastoRef.current = ingresoGasto;
          await setParamConsulta( {param: { idUsuario, ingresoGasto, claseMovimientos: tipoFondo , año },
               method: 'POST', endpoint: '/consulta/ingygastosxanno'
           });
      }      
      leeDatos(paramsForm.idUsuario, paramsForm.año, paramsForm.tipoFondo);   
      setExportToExcel( false );
     };
  }, [paramsForm]);
   useEffect(() => {
     if ( dataConsulta.length >0 ) {
       if (ingGastoRef.current === 'GASTO' ){
        const col= columnGasto.map( ( c ) => c.title);
        setColumnsExcel( col );
        const ind= columnGasto.map( ( c ) => c.dataIndex );
         setDataIndex(ind);
      }else {
        const col= columnIngreso.map( ( c ) => c.title );
         setColumnsExcel( col );
         setColumnsExcel( col );
         const ind= columnGasto.map( ( c ) => c.dataIndex );
          setDataIndex(ind);
      }
      setToExcel({ fileNameExcel: paramsForm.tipoFondo, sheetNameExcel: 'Hoja 1'} );
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
        //  console.log('dataExcel',dataExcel);
        //  console.log('columnsExcel',columnsExcel);
         setDataExcel( dataExcel );//carga datos grilla Excel
     }
  }, [ exportToExcel ]);
  const onFinishFailed = () =>{ };
  const onSelect=( value ) =>{  };
  const onSelectTipoFondo= ( value ) =>{
      const sel=optionInforme.filter( data => data.atributo === value );
      if ( sel )   setNombreInforme( sel[0].valor );
      setExportToExcel( false );
  };
  if ( isLoading || isLoad  ){
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
               form={form}
        >
        <div style={{textAlign:'left'}}>{renderHTML('<h4>Informe mensual</h4>') }  </div>
        <Row >
              <Col span={4} offset={1} >   
                <Form.Item  name='año'  
                  rules={[ { required: true,  message: '¡Debe seleccionar el año!', },]}            
                >
                    <Select placeholder='Seleccione año' align={'left'} onSelect={onSelect}
                        style={{ marginBottom: '0%', marginTop: '0%',marginLeft: '0%', width: '180px'}}
                    >
                        {
                          tablas.años.map(year =>{
                            return <Select.Option key={year.atributo}>
                              {year.valor}
                            </Select.Option>
                          } )
                        }
                    </Select>
                </Form.Item>     
              </Col>    
              <Col span={6} offset={1} >   
                  <Form.Item  name='tipoFondo'  
                    rules={[{ required: true, message: '¡Debe seleccionar el tipo de Fondo!', }, ]}            
                  >
                      <Select placeholder='Seleccione tipo Fondo' align={'left'} onChange={onSelectTipoFondo}
                      // onSelect={ (value, index) => onSelectTipoFondo( value, index)}
                          style={{ marginBottom: '0%', marginTop: '0%',marginLeft: '0%', width: '220px'}}
                      >
                        { optionInforme.map( ( opc ) => <Select.Option key = { opc.atributo }> { opc.valor}</Select.Option> ) }
                      </Select>
                  </Form.Item>         
                </Col> 
                <Col span={4} > <Button type='primary' htmlType="submit"> Consultar  </Button>  </Col>  
                  {( exportToExcel ) && 
                     <Col span={5} > 
                        <ExportExcel columnsExcel={ columnsExcel } dataExcel={ dataExcel } toExcel= { toExcel } label={`Bajar a Excel: ${nombreInforme}`} />  
                     </Col> 
                  }
              </Row>
        </Form>
        { (!isLoad) ? <Table style={{display:"flex",flex: 1 , justifyContent: 'center' }} dataSource={ dataConsulta } 
                pagination={{ pageSizeOptions: ['10', '20', '50', '100'] }} columns={ (ingGastoRef.current ==='GASTO')? columnGasto: columnIngreso } />
            : <Empty  />
        }
      </Layout.Content>
    </>
    )
}