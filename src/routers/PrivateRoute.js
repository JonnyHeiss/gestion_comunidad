import React , { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/authContext'

export const PrivateRoute = ( { children }) => {//196
  const { user } = useContext( AuthContext);
  const location= useLocation(); //entrega a url que viene
  localStorage.setItem('lastPath', location.pathname ); //para alamacenar la ultima página visitada
  return  user.logged 
  ? children
  : <Navigate to= '/login'  />
//   <p> NO auntenticado</p>
}
