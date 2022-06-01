// este es el programa de ingresos
import React from "react";
import { Button, Col, DatePicker, InputNumber, Layout, Row, Select ,Form, Spin } from "antd";
import renderHTML from 'react-render-html';
import * as moment from "moment";
import "moment/locale/es";
import es_ES from "antd/lib/date-picker/locale/es_ES";
import  {registrarMovApi} from '../apis/registrarMovApi';

import { useTablas } from "../hooks/useTablas";
const backgroundColor='#FAEBD7';
export const Ingreso = () => {
  const [form] = Form.useForm( );
  const { tablas , isLoading } = useTablas(1); 
  const onSelect=(value) =>{
    form.setFieldsValue({ idCasa: value,});
  }
  const onChangeMonto=(value) =>{
    form.setFieldsValue({ monto: value, });
  };
  const onChangeFecha=(date, dateString) =>{    
    moment.locale('es_ES') ;//let valor = dateString;
    form.setFieldsValue({ fecha: date,});
  };  
  const OnClickCancelar=() =>{
    console.log('Cancelar');
  };
  const onFinish = async (values) => {
     const tipoDocumento = 'INGRESO';
     const fechaDocumento = moment(form.getFieldsValue().fecha).format('YYYY-MM-DD');
     const idUsuario = 1;
     const idClaseMovimiento = 0;
     const comentario = '';
     const monto=form.getFieldsValue().monto;
     const idCasa=parseInt( form.getFieldsValue().idCasa);
     const newPost= { 
       tipoDocumento,     
       fechaDocumento,
       idCasa,
       monto,
       idUsuario,
       idClaseMovimiento,
       comentario
     };
     await registrarMovApi(newPost);
     form.resetFields();
  };
     
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  if ( isLoading ){
    return (<Layout style={{ minHeight: "100vh",padding: '5px 10px 10px' }}  >
              <div  style={{ position: "absolute",left: "55%", top: "50%", }}  >
                <Spin size="large"   tip ='Cargando....' >  </Spin>
              </div>
            </Layout>
          )
  }
  return (
    <Layout.Content style={  { background:`${backgroundColor}`}}>
      <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
      >
          <div style={{textAlign:'left'}}>{renderHTML('<h4>Registrar un Ingreso</h4>') }  </div>
          <Row >
            <Col span={11} offset={1}
            >   
            <Form.Item 
              name='idCasa'  
              rules={[
                {
                  required: true,
                  message: '¡Debe seleccionar la casa!',
                },
              ]}            
            >
                <Select placeholder='Seleccione la casa' align={'left'} onSelect={onSelect}
                style={{ marginBottom: '0%', marginTop: '0%',marginLeft: '0%', width: '300px'}}
                >
                    {
                      tablas.familias.map(casa =>{
                        return <Select.Option key={casa.atributo}>
                          {casa.valor}
                        </Select.Option>
                      } )
                    }
                </Select>
            </Form.Item>         
            </Col> 
            </Row>
            <Row>
            <Col  span={11} offset={1}>
            <Form.Item 
              name='fecha'  
              rules={[
                {
                  required: true,
                  message: '¡Debe definir la fecha!',
                },
              ]}            
            >
                <DatePicker placeholder='Fecha de pago' locale={es_ES}  
                  style={{ marginBottom: '0%', marginTop: '0%',marginLeft: '0%',flexDirection:'column',width: '200px'}}
                  format={'DD/MM/YYYY'}
                  onChange= { onChangeFecha }
                >
                </DatePicker>            
            </Form.Item>
            </Col>    
         </Row>
         <Row  style={{paddingTop:'5px'}}>
          <Col  span={11} offset={1}
          >
            <Form.Item 
              name='monto'  
              rules={[
                {
                  required: true,
                  message: '¡Debe ingresar el monto del ingreso!',
                },
              ]}            
            >
              <InputNumber placeholder={'Ingrese monto pagado'}  
                style={{ marginBottom: '0%', marginTop: '0%',marginLeft: '0%',flexDirection:'column',width: '200px'}}
                onChange={ onChangeMonto}
                min={0} max={10000000}
                step={1000}
                precision={0} 
                parser={value => value.replace(/\$\s?|(,*)/g, '') }
                formatter={value => `$ ${value}`}
              >
              </InputNumber> 
            </Form.Item>
          </Col>
         </Row>         
         <Row  style={{paddingTop:'5px'}}>
           <Col offset={11} 
            style={{padding:'5px 5px 5px 5px'}}
           >
            <Button type='primary' onClick={OnClickCancelar} >
              Cancelar
            </Button>      
            </Col>
            <Col style={{padding:'5px 15px 5px 5px'}}
            >
            <Button type='primary' htmlType="submit"  //onClick={onClickGrabar}  
            >
              Grabar
            </Button>      
           </Col>
         </Row>
      </Form>
    </Layout.Content>
    )
}