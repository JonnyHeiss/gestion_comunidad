import React  from "react";
import  { createRoot }  from 'react-dom/client';
//import 'antd/dist/antd.min.css';
import { GCApp } from "./GCApp";


createRoot(
    document.getElementById('root')
).render (<GCApp/>)

//  root.render(  
//        <GCApp />
//  );
//  ReactDOM.render(
//     <GCApp />,
//     document.getElementById('root')
// );