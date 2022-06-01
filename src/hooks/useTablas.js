import { useEffect , useState } from 'react';
import tablasDB from '../apis/leerTablaApi';

export const useTablas = (idUsuario) => {
    const [isLoading, setIsLoading]= useState( true );
    const [tablasState, setTablasState]=useState({});
    const getTablas = async () =>{
        const familiasPromise = tablasDB.post('/familias', {idUsuario} );//la promesa
        const añosPromise= tablasDB.post('/annos', {idUsuario});
        const claseMovimientosPromise= tablasDB.post('/clasemovimientos', {idUsuario});
        const resps= await Promise.all ( [familiasPromise, añosPromise, claseMovimientosPromise]);//pueden ir varias promesas en paralelo
        const familias =resps[0].data.data.recordset;
        const casitas=familias.map( item =>  {
             if (item.idFamilia > 0){
                   return ({atributo:item.idFamilia, valor: item.CodigoCasa+' '+ item.Familia})
               }else {
                   return null;
               }
             }
            );
        const casas = casitas.filter(ca => ca !== null );
        setTablasState({
            familias: casas, //resps[0].data.data.recordset,
            años : resps[1].data.data.recordset,
            claseMovimientos:resps[2].data.data.recordset,
        })        
        setIsLoading( false );
    }
    useEffect(() => {
        getTablas();
      }, [])
  return {
      tablas:{...tablasState},
      isLoading,
  }
}