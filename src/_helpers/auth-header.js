import {connect} from 'react-redux';
function authHeader(props) {
    // return authorization header with jwt token
    let token = props.token;
    // console.log("USER",user.token);
    if (token ) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {
            "message":"User not Found"
        };
    }
}
function mapStateToProps(state) {
    const  {token}  = state.authentication;
    console.log("Hello hiiii",state.authentication.token)
    return {
        token
    };
}

const connectedLoginPage = connect(mapStateToProps)(authHeader);
export default connectedLoginPage;