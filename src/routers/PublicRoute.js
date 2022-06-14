import React , { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext'

export const PublicRoute = ( { children }) => {//196
  const { user } = useContext( AuthContext);

  return  user.logged 
  // 197, esto es para evitar el loop infinito que sería mandarlo al login, mejor que vaya a la última página visitada
  ? <Navigate to= '/menulateral'  />
  : children
}