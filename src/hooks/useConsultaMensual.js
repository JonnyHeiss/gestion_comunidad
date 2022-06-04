import { useEffect , useState } from 'react';
import  { conexionBD } from '../apis/conexionBD';

export const useConsultaMensual = (initialParam, initialData) => {
    const [data, setData] =useState(initialData);
    const [param, setParam] = useState( initialParam );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false); 
    
    
    useEffect(() => {
        const leeData = async () =>{
            setIsError( false );
            setIsLoading( true );
            if ( param.method === 'POST' ){
                const resp= await conexionBD.post(param.endpoint, param.param);
                const {recordset}=resp.data.data;
                //console.log("🚀 ~ file: useConsultaMensual.js ~ line 19 ~ leeData ~ recordsets", recordset)
                setData( recordset );
                setIsLoading( false );
            }         
        };
        if ( param.endpoint !== '' ) leeData ();
      }, [param])
  return [{ data, isLoading, isError }, 
      setParam,
      param,
      data 
   ]
}