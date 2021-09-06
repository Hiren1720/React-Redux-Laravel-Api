import React from 'react';
import {Link, Redirect, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import userActions from '../_actions/user.action';
import LoginService from '../_services/LoginService';

class FirstPage extends React.Component{
    // constructor(props){
    //     super(props)
    //     console.log("USER REGISTER",props)
    //     this.logout = this.logout.bind(this);
    //     // this.edit = this.edit.bind(this);
    // }
    
    // logout(){
    //     localStorage.removeItem('token');
    //     // this.props.dispatch(userService.logout());
    // }
    // componentDidMount(){
    //    this.props.dispatch(userActions.getAll());        
    // }

    render(){
        // console.log("PROPSPROPSPROPS",this.props)
        // const {loggingin} = this.props;
        // if(loggingin == true){
        //     return <div><Redirect to="/register"/></div>;
        // }
        // const {user} = this.props;
        // console.log("HELLO FROM  HOME PAGE",user)
        return(
            <div className="col-md-6 col-md-offset-3">
                <h1>Your Info</h1>
                <p>You Are logged In With React & Redux Api Authentication</p>
                <h3>Name:</h3>
                <h3>Email:</h3>
                <h4><Link to={`/edit/`}>Update Your details</Link></h4>              
                    <p>
                        <Link to="/login" onClick={this.logout}>Logout</Link>
                    </p>
            </div>
        );
    }
}

// function mapStateToProps(state){
//     const {user} = state.authentication;
//     // const {loggingin} = state.authentication;
//     console.log("AUTHENTICATE USER", state.authentication);
//     return{ 
//         // loggingin,               
//         user
//     };
// }

// const connectedHomePage = connect(mapStateToProps)(FirstPage);
export default FirstPage;