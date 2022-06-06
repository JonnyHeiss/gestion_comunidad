import { useState, useEffect } from 'react';
import * as moment from "moment";
import "moment/locale/es";
moment.locale('es') ;
const dateFormat = 'DD/MM/YYYY';
export const useForm = ( formulario ) => {// de lección 27 de RN
  const [state, setState ] =useState( formulario);
//   useEffect(() => {
//      console.log("🚀 ~ file: useForm.js ~ line 8 ~ useForm ~ state", state, moment(state.fechafin, dateFormat ))
//   }, [state])
  
  
  const onChange =( value, campo ) =>{
    let valor;
    if (value._isAMomentObject ) {//si es fecha el es un object moment
         valor = moment( value, dateFormat  );// se formatea stris DD/MM/YYYY
    }else{
         valor=value;
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
  }
}
