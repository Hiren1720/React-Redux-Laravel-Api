import userConstants from '../_constants/user.constants';


const initialState = {loggingin:false} ;

export default function registerReducer (state = initialState,action){
    switch(action.type){        
       case userConstants.REGISTER_REQUEST:
           return {
               loggingin:true,
               user:action.user
           };
       case userConstants.REGISTER_SUCCESS:
           return {
               loggingin:true,
               user:action.user,
               token:action.token
           };
       case userConstants.REGISTER_FAILURE:
           return {
               loggingin:false,
               user:action.user
           };
       default:
           return state
    }
}