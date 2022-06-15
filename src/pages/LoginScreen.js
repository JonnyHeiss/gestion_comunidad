import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input ,  Form } from 'antd';
import Swal from "sweetalert2";
import { EyeTwoTone , EyeInvisibleOutlined   } from '@ant-design/icons';

import './login.css';
import { types } from "../types/types";
import { AuthContext } from '../auth/authContext';
import { useForm } from '../hooks/useForm';
import { useConsultaMensual } from '../hooks/useConsultaMensual';
import jwt_decode from 'jwt-decode';

export const LoginScreen = () => {
  
  const navigate=useNavigate();
  const { user, dispatch } = useContext( AuthContext );
  const [ userGoogle , setUserGoogle ]= useState();
  const { email, password, onChange , setFormValue, formulario } = useForm ( { email:'', password:'' } );//email:'jonny.heiss@gmail.com', password:'1234'  
  const [ loading, setLoading ] = useState( true ); //leyendo al usuario
  const [form] = Form.useForm();
  // const [ formValues, handleInputChange] = useForm({
    //   email: 'eramosarellano@gmail.com',//valores por defecto  
    //   password: '123456'
    // })
    //console.log(loading , userGoogle)
    const [{ data: dataUsuario } , setParamUsuario ]= useConsultaMensual ( {
      method: 'POST', endpoint: '', params: {}, }, [] );
  
    useEffect(() => {//https://www.youtube.com/watch?v=roxC8SMs7HU
      /* global google */
      google.accounts.id.initialize({
        client_id :"1050378264191-m37dnpmkqfa31dg4ef50b9pmvqpde5kg.apps.googleusercontent.com",
        callback: handleCallbackResponse
      })  
      google.accounts.id.renderButton(
        document.getElementById("sigInDiv"),
        { theme: 'outline', size: 'large' }
      )  

    }, [])  
    const handleCallbackResponse= ( response ) => {
      const userObject = jwt_decode( response.credential );
      //console.log('Encode Jwt id token:'+ response.credential, userObject );
      setUserGoogle(userObject);

  };    
  const leeDatos = async ( email, password ) =>{
     
   await setParamUsuario( { param: { email, password },
        method: 'POST', endpoint: '/movimiento/leeusuariobyemail'
    });
  }
  useEffect(() => {
    if ( userGoogle ){
      //leer el usuario vía email y clave 
       leeDatos( userGoogle.email, 'googleencode' );
       //console.log('useEffect lee datos userGoogle', userGoogle);
       setLoading( false );
    }
  }, [userGoogle])
  useEffect(() => {
      if ( dataUsuario && !loading ){
        if ( dataUsuario.length === 0  ){
          Swal.fire(
            'Error',
            'Email-Clave no corresponden a información registrada',
            'error'
          );
        }else{
            const datosUser=dataUsuario[0];
            const action={ type: types.login, 
                         payload: { email: datosUser.Email, 
                                    name: datosUser.Nombre, 
                                    idUsuario: datosUser.idUsuario,
                                    idOrganizacion: datosUser.IdOrganizacion,
                                    debeCambiarClave: datosUser.DebeCambiarClave,
                                    celular: datosUser.Celular,
                                    perfil: datosUser.IdPerfil,
                                    nombreComunidad: datosUser.nombreComunidad,
                                    isUserRedes: ( userGoogle )? true: false
                                  }
                        };
            dispatch( action );
            const lastPath = localStorage.getItem('lastPath') || '/menulateral';
            navigate( lastPath, {//198, se envía a la última página visitada
            replace: true
            } );
        }
      }
     }, [ dataUsuario ] );
    const handleLogin = ( values) => {
        //leer el usuario vía email y clave 
         leeDatos( values.email, values.password );
         //console.log('lee datos handleLogin')
         setLoading( false );

     };
     const handleInputChange=( value ) =>{
         console.log('handleInputChange',value);
         onChange( value );
     };
    const onFinishFailed = () =>{ };
    return (
        <div className="container login-container">
           <div className="row">
             <div className="col-md-6 login-form-1">
               <h3>Ingreso a gestión de Gastos Comunes</h3> 
               <Form form={form} onFinish = { handleLogin }    //pra que opere el submit y arme el form con los datos
                    onFinishFailed={onFinishFailed}  autoComplete="off"                    
               >          
                 <div className="form-group">
                 <Form.Item  name='email' rules={[{ required: true, message: '¡debe ingresar el correo!', }, ]}  >
                   <Input 
                         type ="text"
                         placeholder="Correo electrónico"
                         name="email"
                         //className="auth__input"

                         autoComplete="off"
                         value= { user.email}
                         
                         //onChange={ handleInputChange }
                         onChange={( value ) => handleInputChange('email') }
                   />
                 </Form.Item>
                 <Form.Item  name='password' rules={[{ required: true, message: '¡debe ingresar su clave!', }, ]} >
                   <Input.Password  
                         type ="password"
                         placeholder="Clave"
                         name="password"
                         //className="auth__input"
                         iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                         value= { user.password }
                         onChange={( value ) => handleInputChange('password', value) }

                   />
                 </Form.Item>
                   <button
                     type="submit"
                     className="btn btn-primary btn-block"
                     //type="primary"
                     style={{ width: '100%', marginTop: '1px', height: '42px', fontSize: '16px' , borderRadius: '4px'}}
                     //onClick={ handleLogin }
                    // onClick={ handleOnClick }
                     //disabled= { loading }
                   >
                     Ingresar
                   </button>

                   <div className="auth__social-networks">
                      <p>Ingresar con clave de red social </p>
                      <div id='sigInDiv'>

                      </div>
                       {/* 
                       <div 
                          className="google-btn" */}
                          {/* onClick = { handleGoogleLogin } */}
                        {/* > */}
                         {/* <div className="google-icon-wrapper" >
                             <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                             alt="google button" 
                             />
                         </div> */}
                         {/* <p className="btn-text">
                             <b>con clave Google</b>
                         </p> */}
                     {/* </div> */}
                   </div>
                 </div>
             </Form>
             </div>
           </div>
        </div>
   )
}
