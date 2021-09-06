import userConstants from '../_constants/user.constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {registered:true,user} : {};

export default function editedReducer (state = initialState,action){
    switch(action.type){        
       case userConstants.EDIT_REQUEST:
           return {
               edited:true,
               user:action.user
           };
       case userConstants.EDIT_SUCCESS:
           return {
               edited:true,
               user:action.user
           };
       case userConstants.EDIT_FAILURE:
           return {
               edited:false,
               user:action.user
           };
       default:
           return state
    }
}