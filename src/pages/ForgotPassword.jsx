import React, {Component} from 'react';
import '../scss/forgotPassword.scss';
import CustomSnackBar from '../component/CustomSnackBar'
import UserAxiosService from '../service/UserAxiosService';
import FundooLogo from "../component/FundooLogo";
import TextField from "@material-ui/core/TextField";

class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailStatus: false,
            emailError: ' ',
            alertShow: false,
            alertResponse: "",
        }
    }

    handleChange = ({ target }, pattern, message) => {
        this.setState({ [target.name]: target.value }, () => {
            this.validation(target, pattern, message)
        })
    }

    validation = (target, pattern, message) => {
        this.setState({
            [target.name + "Status"]: true,
            [target.name + "Error"]: "Required *"
        })
        if (target.value.trim() !== '') {
            if (target.value.match(pattern)) {
                this.setState({
                    [target.name + "Status"]: false,
                    [target.name + "Error"]: " "
                })
            } else {
                this.setState({
                    [target.name + "Status"]: true,
                    [target.name + "Error"]: message
                })
            }
        }
    };

    handleClick = () => {
        const data = {
            "email": this.state.email
        }
        new UserAxiosService().forgotPassword(data).then((response) => {
            this.setState({
                severity: "success",
                alertShow: true,
                alertResponse: response.data.message
            })
        })
    }

    closeAlertBox = () => {
        this.setState({alertShow: false});
    };

    render() {
        return (
            <div className="wrapper">
                <CustomSnackBar alertShow={this.state.alertShow}
                                severity={this.state.severity}
                                alertResponse={this.state.alertResponse}
                                closeAlertBox={this.closeAlertBox}/>
                <div className="forgot-main-container">
                    <div className="text-container">
                        <FundooLogo/>
                        <div className="page-title-container">
                            <div className="header">Account Recovery</div>
                            <div className="forgot-header">
                                <div className="forgot-line">This helps to show that this account really belongs to you</div>
                            </div>
                            <div className="email-textfield">
                                <div className="email-text">
                                    <TextField id="outlined-basic" size="small" error={this.state.emailStatus} helperText={this.state.emailError} onChange={textEvent => this.handleChange(textEvent, "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", "Please enter valid email address")} autoComplete="off" required fullWidth label="Email" variant="outlined" name="email" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <div className="notification-line">Fundoo will sent a notification to your email. Tap <b>Yes</b> to continue</div>
                        <div className="yes-container">
                            <button className="yes-button" onClick={this.handleClick}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;