import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import  history  from '../_helpers/history';
import  alertActions  from '../_actions/alert.action';
import  PrivateRoute  from '../Routes/PrivateRoute';
import HomePage  from '../HomePage/HomePage';
import RegisterPage from '../RegisterPage/RegisterPage';
import  LoginPage from '../LoginPage/LoginPage';
import EditProfile from '../HomePage/EditProfile';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
     
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const  alert  = this.props;

        return (
            <div className="jumbotron">
                
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>

                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/register" component={RegisterPage}/>
                                <Route path="/edit/:id" component={EditProfile}/>
                                <Route path="/login" component={LoginPage} />
                            
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state.alert;
    
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp;