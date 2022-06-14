import  { createContext} from "react";
//import { useConsultaMensual } from "../hooks/useConsultaMensual";
export const UserContext = createContext(null);


// export const UserContext = createContext({
//     idUsuario: Number,
//     idorganizacion: Number,
    
// });
// const idUsuario=1;
// export const UserProvider = ( { children }) => {
//     const [{ data: dataUsuario, isLoading: isLoad } , setParamDataUsuario ]= useConsultaMensual( {
//         method: 'POST', endpoint: '', params: {}, }, [] );  
//     useEffect(() => {
//         console.log('leeusuario',idUsuario)
//         if ( idUsuario  ) {
//             const leeDatos = async (  ) =>{
//                 await setParamDataUsuario( { param: {idUsuario },
//                      method: 'POST', endpoint: '/movimiento/leeusuario'
//                  });
//             }
//             leeDatos();               
//            };        

//     }, [])
  
// return (
//     <UserContext.Provider value={{
//         user: dataUsuario[0],        
//       }}
//     >
//     </UserContext.Provider>
// )

//}