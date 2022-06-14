import { useState, useEffect } from 'react';
import * as moment from "moment";
import "moment/locale/es";
moment.locale('es') ;
const dateFormat = 'YYYY-MM-DD';
export const useForm = ( formulario ) => {// de lección 27 de RN
  const [state, setState ] =useState( formulario);
  useEffect(() => {
     //console.log("🚀 ~ file: useForm.js ~ line 9 ~ useForm ~ state", state)
  }, [state])  
  const setFormValue = ( formulario ) => {//para poblar el form x ejemplo al hacer un load al BE
    setState( formulario );
  };
  const onChange =( value, campo ) =>{
    let valor;
    if ( !value ){// si viene undefined
        valor='';
    }else {
        if ( value._isAMomentObject ) {//si es fecha el es un object moment
            valor = moment( value).format( dateFormat  );// se formatea string según dateFormat
        }else{
            valor=value;
        }
    }
    setState ({
         ...state,
         [campo]: valor
     }) 
  };
  return {
      ...state,//para exponer los fields
      formulario: state,
      onChange, 
      setFormValue,
  }
}
