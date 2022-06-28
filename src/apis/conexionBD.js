import axios  from 'axios';
export const  conexionBD =  axios.create({
        //baseURL: 'http://localhost:5001/api/consulta',
        baseURL: 'http://localhost:5001/api',
        //baseURL :'http://200.73.59.58:5001/api'
        
        //baseUrl: REACT_APP_API_URL + '/movimiento',
});