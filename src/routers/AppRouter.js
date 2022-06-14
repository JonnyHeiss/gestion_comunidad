
import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LoginScreen } from "../pages/LoginScreen";
import { DashboardRoutes } from './DashboardRoutes';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute'; //196
//import { MenuLateral } from '../pages/MenuLateral';
export const AppRouter = () => {//...173-175
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path = '/login' element= { <LoginScreen />} /> */}
         {/* 197, esto hará que el usuario no autenticado siempre se redireccione al logín */}
        <Route path= '/login'  element = { 
          <PublicRoute >
                <LoginScreen />
          </PublicRoute>
          }
        />       
        <Route path= '/*'  element = { 
          <PrivateRoute >                
                <DashboardRoutes />
          </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
