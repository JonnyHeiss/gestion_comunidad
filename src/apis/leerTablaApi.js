import axios  from 'axios';

const  tablasDB =  axios.create({
        baseURL: 'http://localhost:4001/api/movimiento',
});

export default tablasDB;