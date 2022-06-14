import { types } from "../types/types";

/*
const state = {
    name: 'Jonny',
    logged: true
}
la acción podría lucir como
const loginAction={
    type: type.login,
    payload: {
        name: 'Jonny',
        email: 'afasfds@dsf.com'
    }
}
*/
export const authReducer = ( state = {} , action ) => {//192
    //console.log('authReducer', action.payload )
    switch ( action.type ) {
        case types.login:
            return {
              ...action.payload, 
              logged: true        
            }
        case types.logout:
                return {                  
                  logged: false
                }            
        default:
            return state;
    }
}