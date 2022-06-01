import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
//import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';
import { MenuLateral } from './pages/MenuLateral';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
      <BrowserRouter>
            <MenuLateral />
      </BrowserRouter> 
);