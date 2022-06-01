import axios  from 'axios';

const api =axios.create({
   baseURL: 'http://localhost:4001/api'
});
export const  registrarMovApi= async (newPost) =>{
    const {tipoDocumento, fechaDocumento, idCasa, monto, idUsuario, idClaseMovimiento, comentario}= newPost;
    console.log("🚀 ~ file: regitrarMov.js ~ line 8 ~ registrarMovApi ~ tipoDocumento, fechaDocumento, idCasa, monto, idUsuario, idClaseMovimiento, comentario", tipoDocumento, fechaDocumento, idCasa, monto, idUsuario, idClaseMovimiento, comentario)
     try {
        const response = await api.post('/movimiento/registrarmovimiento',newPost) 
        console.log("🚀 ~ file: regitrarMov.js ~ line 11 ~ registrarMovApi ~ response", response)      
     }catch (err){
        console.log(`Error: ${ err.message }`);
     }
};
