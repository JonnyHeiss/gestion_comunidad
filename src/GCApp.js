import React, { useEffect } from 'react';
import { useReducer } from 'react';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';
import { AppRouter } from "./routers/AppRouter"

const init= () => {//valor inicial que debería ver el localStorage 193
  // return { logged: true , name: 'Jonny' }
  return JSON.parse(localStorage.getItem('user') ) || { logged: false};//localStorage sólo almacena string
};
export const GCApp = () => {
  const [ user , dispatch ] = useReducer( authReducer, {} , init ); //193
  useEffect(() => {//194
     if ( !user ) return;//sino existe no se hace nada         
     localStorage.setItem('user', JSON.stringify( user ) );
  }, [ user ])
  
  return (
    <AuthContext.Provider value={{
       user,
       dispatch
    }} >
      <AppRouter />
    </AuthContext.Provider>  


  )
}
