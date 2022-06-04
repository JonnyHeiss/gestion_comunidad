import { useState } from 'react';
import * as moment from "moment";
import "moment/locale/es";

export const useForm = ( formulario ) => {// de lección 27 de RN
  const [state, setState ] =useState( formulario);
  const onChange =( value, campo ) =>{
    let valor;
    if (value._isAMomentObject ) {//si es fecha el es un object moment
         valor =moment( value ).format('L');// se formatea stris DD/MM/YYYY
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
