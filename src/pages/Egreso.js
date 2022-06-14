// este es el porgrama de egresos
import React ,{ useContext } from "react";
import { Button, Col, DatePicker, InputNumber, Layout, Row, Select, Input, Form, Spin } from "antd";
import * as moment from "moment";
import "moment/locale/es";
import Swal from "sweetalert2";
import es_ES from "antd/lib/date-picker/locale/es_ES";

import  {registrarMovApi} from '../apis/registrarMovApi';
import { useTablas } from "../hooks/useTablas";
import { AuthContext } from "../auth/authContext";

const backgroundColor='#FAEBD7';

export const Egreso = () => {
  const { user } = useContext( AuthContext );

  const idUsuario=user.idUsuario;
  const [form] = Form.useForm()
  const { tablas , isLoading } = useTablas(1);
  const onSelect=(value) =>{
    form.setFieldsValue({ idGasto: value,});  
  };
  const onChangeMontoEgreso=(value) =>{
    form.setFieldsValue({ monto: value, });
  };
  const onChangeFecha=(date, dateString) =>{    
    moment.locale('es_ES') ;
    form.setFieldsValue({ fecha: date,});
  };  
  const onChangeComentario=(e) =>{
  const value=e.target.value;
    form.setFieldsValue({ comentario: value,});
  };
  const OnClickCancelar=() =>{
    console.log('Cancelar');
  };
  const onFinish = async (values) => {
    const tipoDocumento = 'GASTO';
    const fechaDocumento = moment(form.getFieldsValue().fecha).format('YYYY-MM-DD');
    const tipoGasto = parseInt( form.getFieldsValue().idGasto);
    if ( tipoGasto === undefined || tipoGasto === null ){
      Swal.fire(
        'Error',
        'Faltó el item de gasto',
        'error'
      );
      return;
    };
    const comentario = ( form.getFieldsValue().comentario === undefined ) ? '' : form.getFieldsValue().comentario;
    if (( tipoGasto === 98 || tipoGasto === 99) && comentario.length < 10 ){
      Swal.fire(
        'Error',
        'El comentario es obligatorio para este gasto y debe tener al menos 10 caracteres.',
        'error'
      );
      return;
    };
    const monto=form.getFieldsValue().monto;
    
    const idClaseMovimiento = 0;
    const newPost= {     
       tipoDocumento,     
       fechaDocumento,
       idCasa: tipoGasto,
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
  };
  return (
    <Layout.Content style={  { background:`${backgroundColor}`}}>
      <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          span={11} offset={1}
          form={form}
      >
          <h4>Registrar un gasto</h4>
        <Row >
          <Form.Item 
              name='idGasto'  
              rules={[
                {
                  required: true,
                  message: '¡Debe seleccionar un gasto!',
                },
              ]}            
            >
            <Select placeholder='Selecciona item de gasto' align={'left'} onSelect={onSelect}
            style={{ marginBottom: '0%', marginTop: '3%',marginLeft: '3%', width: '300px'}}
            >
                {
                  tablas.claseMovimientos.map(gasto =>{
                    return (
                      <Select.Option key={gasto.idClaseMovimiento}>
                        {gasto.Descripcion}
                      </Select.Option>
                    )
                  } )
                }
             </Select>
          </Form.Item> 
        </Row> 
        <Row>
          <Form.Item 
              name='fecha'  
              rules={[
                {
                  required: true,
                  message: '¡Debe seleccionar una fecha!',
                },
              ]}            
            >
            <DatePicker placeholder='Fecha de pago' locale={es_ES}  
                  style={{ marginBottom: '0%', marginTop: '0%',marginLeft: '3%',flexDirection:'column',width: '200px'}} //value={fecha}
                  format={'DD/MM/YYYY'}
                  onChange= { onChangeFecha }
                >
                </DatePicker>             
          </Form.Item>
        </Row>
        <Row   style={{paddingTop:'5px'}}>
          <Form.Item 
              name='monto'  
              rules={[
                {
                  required: true,
                  message: '¡Debe seleccionar un monto!',
                },
              ]}            
          >
            <InputNumber placeholder={'Ingrese monto pagado'}  
             style={{ marginBottom: '0%', marginTop: '3%',marginLeft: '3%',flexDirection:'column',width: '200px'}}
              onChange={ onChangeMontoEgreso}
              min={0} max={10000000}
              step={1000}
              precision={0} 
              parser={value => value.replace(/\$\s?|(,*)/g, '') }
              formatter={value => `$ ${value}`}
          >    
            </InputNumber> 
        </Form.Item>
       </Row> 
       <Row  style={{paddingTop:'5px'}}>
          <Form.Item 
              name='comentario'  
              >
            <Input.TextArea placeholder="Comentario (mínimo 10 caracteres)" 
              style={{ marginBottom: '0%', marginTop: '3%',marginLeft: '2%',flexDirection:'column',width: '400px'}}

              rows={2} maxLength={200}
              onChange={ onChangeComentario}
              //autoSize={true}   
              cols="80"        
            >
            </Input.TextArea>
         </Form.Item>
      </Row>
      <Row  style={{paddingTop:'5px'}}>
           <Col offset={12} style={{padding:'5px 5px 5px 5px'}}>
             <Button type='primary' onClick={OnClickCancelar} >
              Cancelar
              </Button>      
            </Col>
            <Col style={{padding:'5px 5px 5px 5px'}}
            >
             <Button type='primary' htmlType="submit" //onClick={onClickGrabar}
            >
              Grabar
              </Button>      
            </Col>
      </Row>
   </Form>
 </Layout.Content>
    )
}