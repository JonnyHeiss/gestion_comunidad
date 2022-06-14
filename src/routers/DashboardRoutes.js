
import React from 'react';
import {  Route, Routes } from "react-router-dom"


import { Egreso } from '../pages/Egreso';
import { Home } from '../pages/Home';
import { InformeMensual } from '../pages/InformeMensual';
import { Ingreso } from '../pages/Ingreso';
import { MenuLateral } from "../pages/MenuLateral"
import { MovimientosEntreFechas } from '../pages/MovimientosEntreFechas';
import { LayoutPage } from '../components/LayoutPage';
import { IngresosxCasa } from '../pages/IngresosxCasa';



export const DashboardRoutes = () => {//rutas a la que el usuario logeado tiene acceso..175, con params: 195
  return (
    
      <Routes> 
          <Route path= 'MenuLateral'  element={<MenuLateral />}  />       
          <Route path="/ingreso" element={<LayoutPage /> //LayoutPage le da el formateo a la página
            }>
              <Route path="/ingreso" element={<Ingreso />} />
            </Route>
          <Route path="/egreso" element={<LayoutPage /> 
            }>
              <Route path="/egreso" element={<Egreso />} />
            </Route>
          <Route path="/informemes" element={<LayoutPage /> 
            }>
              <Route path="/informemes" element={<InformeMensual />} />
            </Route>          
          <Route path="/informeentrefechas" element={<LayoutPage /> 
             }>
              <Route path="/informeentrefechas" element={<MovimientosEntreFechas />} />
            </Route>
          <Route path="/casa" element={<LayoutPage /> 
             }>
              {/* <Route path="/casa/:id" element={<IngresosxCasa />} /> */}
              <Route path="/casa" element={<IngresosxCasa />} /> 
          </Route>
          <Route path="/" element={<LayoutPage /> 
            }>
              <Route path="/" element={<Home />} /> 
            </Route>
      </Routes>
    
  )
}
