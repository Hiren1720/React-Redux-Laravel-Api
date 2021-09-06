import alertConstants from '../_constants/alert.constants';

export default function alert(state = {},action){
    switch(action.type){
        case alertConstants.SUCCESS:
            return{
                type: 'alert-success',
                message: action.message
            }
        case alertConstants.ERROR:
            return{
                type: 'alert-danger',
                message: action.message
            }
        case alertConstants.CLEAR:
            return{
                user:action.message
            }
        default:
            return state
    }
}