import React, { useEffect , useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Layout , Form, Row, Col, Select, Button, Table, Empty, DatePicker, Tooltip } from "antd";
import renderHTML from 'react-render-html';
import * as moment from "moment";
import Swal from "sweetalert2";
import "moment/locale/es";
import es_ES from "antd/lib/date-picker/locale/es_ES";
import { SearchOutlined  } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./grilla.css";

import { columnMov,  optionInformeMov } from '../components/TituloColumnas';
import { ExportExcel } from "../components/ExportToExcel";
import { useForm } from "../hooks/useForm";
import { useConsultaMensual } from "../hooks/useConsultaMensual";
import { AuthContext } from "../auth/authContext";

const backgroundColor='#FAEBD7';

export const MovimientosEntreFechas = () => {
  const { user } = useContext( AuthContext );
  const navigate = useNavigate();
  const idUsuario=user.idUsuario;
  const dateFormat = 'YYYY-MM-DD';
  moment.locale('es') ;
  const [ columnsExcel, setColumnsExcel]=useState([]);
  const [ dataIndex, setDataIndex]=useState([]);//para armar arreglo filas del excel
  const [ exportToExcel, setExportToExcel] =useState( false);
  const [ dataExcel,setDataExcel]=useState();
  const [ toExcel,setToExcel]=useState( {fileNameExcel: '', sheetNameExcel: ''} );
  const [ nombreInforme, setNombreInforme ] = useState('');
  const [ btnConsulta, setBtnConsulta]=useState (false); //si presionó boton de consulta
  const { fechafin, fechaini, fondo, onChange , setFormValue , formulario } =useForm ({
              fechaini: moment(moment().format('YYYY')+'0101').format(dateFormat),
              fechafin: moment().format(dateFormat),
              fondo: '' } );
  const [{ data: dataConsulta, isLoading: isLoad } , setParamConsulta ]= useConsultaMensual( {
      method: 'POST', endpoint: '', params: {}, }, [] );
  useEffect(() => {//agrega la columna de la subconsulta y los parametrso van en el registro (visibles o no)
        const fila=columnMov.find( qy => qy.key === 'SubQuery' );
        if ( !fila ){
           columnMov.push( {title: 'Detalle',  key: 'SubQuery', align: 'right', width: '30px', visible: true,
            render: ( reg ) => {
                return ( <> <Tooltip title='Ingresos x casa' > <ViewRow  registro={ reg } /> </Tooltip> </> ) } });
      }
    }, [ ])
  useEffect(() => {
    if ( idUsuario && formulario.fechaini &&  formulario.fechafin  && formulario.fondo ) {
          const leeDatos = async ( idUsuario, fechaInicio, fechaFin, tipoFondo ) =>{
            moment.locale('es') ;
            await setParamConsulta( {param: { idUsuario, fechaInicio:moment(fechaInicio).format('YYYYMMDD') ,
            fechaFin:moment(fechaFin).format('YYYYMMDD')  , tipoFondo },
            method: 'POST', endpoint: '/consulta/transentrefechas'
          });
        }
        leeDatos(idUsuario,formulario.fechaini, formulario.fechafin, formulario.fondo);
    };
  }, [ formulario ]);
  useEffect(() => {
    if ( dataConsulta.length >0 ) {
      const col= columnMov.map( ( c ) => c.title);
      setColumnsExcel( col );
      const ind= columnMov.map( ( c ) => c.dataIndex );
      setDataIndex(ind);
      setToExcel({ fileNameExcel: formulario.fondo, sheetNameExcel: 'Hoja 1'} );
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
  const onFinish=() =>{
      if ( !fechaini ){
        Swal.fire( 'Error','Debe definir la fecha de inicio', 'error' );
        return;
      };
      if ( !fechafin ){
        Swal.fire( 'Error', 'Debe definir la fecha de término', 'error' );
         return;
      }
      setBtnConsulta( true );
  };
  const onFinishFailed = () =>{ setBtnConsulta( false ); };
  const onSelectFondo= ( value ) =>{
    setBtnConsulta( false );
    const sel = optionInformeMov.filter( data => data.atributo === value );
    if ( sel )   setNombreInforme( sel[0].valor );
    setExportToExcel( false );
  };
  const ViewRow =( registro, fechaInicial, fechaFinal ) =>{   //aquí recibe los datos del formulario (rango de fechas)
    if ( registro.registro.Gasto === 0 && registro.registro.key >1){
        return (<SearchOutlined  style={{color: "blue", marginLeft: 2}} onClick={()=>{onViewRow( registro, fechaInicial, fechaFinal ) ; }}  />);
    }else {
        return '';
    }
  };
  const onViewRow=( registro )=>{
    const tipoDocumento = registro.registro.tipoDocumento;
    const nroDocumento = registro.registro.nroDocumento;
     const fechaInicio =registro.registro.fechaInicial;//formato 23 yyyy-mm-dd
     const fechaFin =registro.registro.fechaFinal;
     navigate('/casa', { state:{ tipoDocumento, nroDocumento,  fechaInicio, fechaFin }  })
  };
  return (
    <>
      <Layout.Content style={  { background:`${backgroundColor}`, }}>
        <Form  onFinish={ onFinish }  onFinishFailed={onFinishFailed}  autoComplete="off"
          initialValues={ {  fechaini: moment(formulario.fechaini), fechafin: moment(formulario.fechafin),  fondo: '' }}>
        <div style={{textAlign:'left'}}>{renderHTML('<h4>Informe de movimientos entre fechas</h4>') }  </div>
        <Row >
              <Col span={4}  >
                <Form.Item  name='fechaini' >
                  <DatePicker
                     locale = { es_ES }
                     style = {{ marginBottom: '0%', marginTop: '0%',marginLeft: '3%',flexDirection:'column' }}
                     placeholder = 'Fecha inicio'
                     picker= 'date'
                     onChange={  (  value ) => onChange( value, 'fechaini' )}
                     value= {  moment( fechaini , dateFormat  ) }
                  />
                </Form.Item>
              </Col>
              <Col span={4}  >
                <Form.Item  name='fechafin' >
                  <DatePicker
                     locale = { es_ES }
                     style = {{ marginBottom: '0%', marginTop: '0%',marginLeft: '3%',flexDirection:'column' }}
                     placeholder = 'Fecha término'
                     picker= 'date'
                     onChange={  ( value ) => onChange( value, 'fechafin' )}
                     value= {  moment( fechafin , dateFormat  ) }
                  />
                </Form.Item>
              </Col>
              <Col span={6} >
                  <Form.Item  name='fondo'  rules={[{ required: true, message: '¡Debe seleccionar el Fondo!', }, ]} >
                      <Select placeholder='Seleccione Fondo' align={'left'}
                          style={{ marginBottom: '0%', marginTop: '0%',marginLeft: '0%', width: '220px'}}
                          onSelect={ ( value ) => onChange( value , 'fondo' )}
                          onChange = { onSelectFondo }//para que lo agregue al formulario
                      >
                        { optionInformeMov.map( ( opc ) => <Select.Option key = { opc.atributo }> { opc.valor}</Select.Option> ) }
                      </Select>
                  </Form.Item>
                </Col>
                <Col span={ 4 }  >
                  <Button type='primary' htmlType="submit" disabled={ isLoad} > Consultar  </Button>
                  </Col>
                  {( exportToExcel ) &&
                     <Col span={ 4 } >
                        <ExportExcel columnsExcel={ columnsExcel } dataExcel={ dataExcel } toExcel= { toExcel } label={`Bajar a Excel: ${nombreInforme}`} />
                     </Col>
                  }
              </Row>
        </Form>
        { (!isLoad && btnConsulta ) ?
          <Table style={{ display: "flex", flex: 1, justifyContent: 'center'  }} dataSource={ dataConsulta }
             columns={  columnMov.filter( item => item.visible ) }
          />
          : <Empty />
        }
      </Layout.Content>
    </>
  )
}