import {BrowserRouter, Switch, Route} from 'react-router-dom'
import React, {Component} from "react";
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

class RouterConfiguration extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path={"/signin"} exact component={SignIn} />
                    <Route path={"/signup"} exact component={SignUp} />
                    <Route path={"/forgotpassword"} exact component={ForgotPassword}/>
                    <Route path={"/resetpassword/:token"} excat component={ResetPassword} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default RouterConfiguration;