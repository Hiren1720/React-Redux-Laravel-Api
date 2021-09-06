import  userConstants  from '../_constants/user.constants';

export default function users(state = {}, action) {
    switch (action.type) {
    case userConstants.GETALL_REQUEST:
        return {
        
        token:action.token
        };
    case userConstants.GETALL_SUCCESS:
        console.log("USER REDUCER",action.user)
        return {        
        user: action.user
        };
    case userConstants.GETALL_FAILURE:
        return { 
        error: action.error
        };
    default:
        return state
    }
}