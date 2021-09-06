import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({ component: Component,loggingin, ...rest }) => {
    // console.log("logg",loggingin)
    return(    
    <Route {...rest} render={(props) => { 
        // console.log("loggingin",loggingin)
        // console.log('props', props);
        return ( 
            (loggingin)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} } />
)}
function mapStateToProps(state) {
    const  {loggingin}  = state.authentication;   
    // console.log("COMPONENT",loggingin)     
    return {
        loggingin
    };
}
// const connectedHomePage = connect(mapStateToProps)(PrivateRoute);
export default connect(mapStateToProps)(PrivateRoute);