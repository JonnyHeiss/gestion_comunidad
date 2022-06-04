import axios  from 'axios';
export const  conexionBD =  axios.create({
        //baseURL: 'http://localhost:4001/api/consulta',
        baseURL: 'http://localhost:4001/api',
        //baseUrl: REACT_APP_API_URL + '/movimiento',
});