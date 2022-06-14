import React ,{ useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Button, Table } from "antd";

import { useConsultaMensual } from "../hooks/useConsultaMensual";
import { columnDetIngreso } from '../components/TituloColumnas';
import { AuthContext } from '../auth/authContext';

const backgroundColor='#FAEBD7';
export const IngresosxCasa = (  ) => {
    const location= useLocation();
    const params=location.state;

    const navigate = useNavigate();
    const { user  }= useContext( AuthContext );
    const [ isLoading, setIsLoading]= useState( true);
    //const [didMount, setDidMount] = useState(false); 
    const idUsuario=user.idUsuario;

    const [{ data: dataDocumento } , setParamDocumento ]= useConsultaMensual ( {
        method: 'POST', endpoint: '', params: {}, }, [] );
    const [{ data: dataCartera } , setParamCartera ]= useConsultaMensual ( {
          method: 'POST', endpoint: '', params: {}, }, [] );  
    // useEffect(() => { //https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
    //         setDidMount(true);// para error:Can't perform a React state update on an unmounted component
    //         return () => setDidMount(false);//didMount will be true in the unmounted state (ver if al final)
    // }, []);          
    useEffect(() => {//lee el documento
        if ( idUsuario && params   ) {
            const leeDatos = async ( tipoDocumento, nroDocumento , idUsuario  ) =>{
                await setParamDocumento( { param: { tipoDocumento, nroDocumento , idUsuario },
                     method: 'POST', endpoint: '/movimiento/leedocumento'
                 });
            }
            leeDatos( params.tipoDocumento, params.nroDocumento , idUsuario );
           };
     }, [ ]);
     useEffect(() => {
      if ( dataDocumento.length > 0 ){
        const leeDatos = async ( idCasa , idUsuario, fechaInicio, fechaFin   ) =>{
        await setParamCartera( { param: { idCasa , idUsuario, fechaInicio, fechaFin },
              method: 'POST', endpoint: '/movimiento/leeingresoscasaentrefechas'
          });
        }
        leeDatos( dataDocumento[0].idCasa,  idUsuario, params.fechaInicio, params.fechaFin );
        setIsLoading( false );
       }
     }, [ dataDocumento ] );
    
    const OnClickReturn=() => {
       console.log('OnClickReturn')
       navigate(-1 );//, {replace: true}
    }
  return (
    <>     
       {
         ( !isLoading ) && (
          <Layout.Content style={  { background:`${backgroundColor}`, 
          }}>
              <Row>
                  <Col style={{ 
                  marginTop: '3%',
                  marginLeft: '20%',              
                  flexDirection:'row',
                  }}
                  >
                      <p  style={{  fontSize: 16, fontWeight: 'bold' }}> 
                      Casa: {dataDocumento[0].CodigoCasa }, { dataDocumento[0].Familia } , Entre días: {params.fechaInicio } al {params.fechaFin } 
                      {/* Monto: { dataDocumento[0].Monto.toLocaleString("es-CL")}  */}
                      </p>
                  </Col>
              </Row>
              <Button style={{marginLeft: '1%'}} type='primary' onClick={OnClickReturn} >
                Volver
              </Button>                 
                {
                  ( dataCartera.length > 0) &&(
                    <>
                    <Col style={{ 
                      marginTop: '3%',
                      marginLeft: '5%',              
                      marginRight: '3%',
                      flexDirection:'row',
                    }}
                  >
                    <p><b>Detalle de ingresos y su distribución:</b></p>
                    </Col>
                    <Table style={{display:"flex",flex: 1, justifyContent: 'center'  }} dataSource={ dataCartera }  columns={  columnDetIngreso }  />
                    </>
                  )
                }
           </Layout.Content>
         )
       }
      </>
  )
}
