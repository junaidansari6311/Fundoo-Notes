import React, {Component} from 'react';
import '../scss/resetPassword.scss'
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import UserAxiosService from '../service/UserAxiosService';
import CustomSnackBar from '../component/CustomSnackBar'
import FundooLogo from "../component/FundooLogo";

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            password: '',
            passwordStatus: false,
            passwordError: ' ',
            confirmPassword: '',
            confirmPasswordStatus: false,
            confirmPasswordError: ' ',
            alertShow: false,
            alertResponse: "",
        }
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    handleChange = ({ target }, pattern, message) => {
        this.setState({ [target.name]: target.value }, () => {
            this.validation(target, pattern, message)
        })
    }

    closeAlertBox = () => {
        this.setState({ alertShow: false });
    };

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

    confirmPasswordValidation(event) {
        this.setState({
            [event.target.name + "Status"]: true,
            [event.target.name + "Error"]: "Required *"
        })
        if (event.target.value.trim() !== '') {
            this.setState({ [event.target.name]: event.target.value })
            if (event.target.value !== this.state.password) {
                this.setState({
                    [event.target.name + "Status"]: true,
                    [event.target.name + "Error"]: "Password Does Not Match",
                });
            } else {
                this.setState({
                    [event.target.name + "Status"]: false,
                    [event.target.name + "Error"]: " ",
                });
            }
        }
    }

    handleClick = () => {
        if (this.state.password.trim() === "") {
            this.setState({
                passwordStatus: true,
                passwordError: 'Required *'
            })
        }
        if (this.state.confirmPassword.trim() === "") {
            this.setState({
                confirmPasswordStatus: true,
                confirmPasswordError: 'Required *'
            })
        }
        if (this.state.password.trim() !== "" && this.state.confirmPassword.trim() !== "") {
            if (this.state.passwordStatus === false && this.state.confirmPasswordStatus === false) {
                const data = {
                    newPassword: this.state.password
                }
                new UserAxiosService().resetPassword(data, this.props.match.params.token).then((response) => {
                    this.setState({
                        severity: "success",
                        alertShow: true,
                        alertResponse: "Password has been reset Successfully"
                    })
                }).catch((response) => {
                    this.setState({
                        severity: "error",
                        alertShow: true,
                        alertResponse: "Invalid Access Token"
                    })
                })
            }
        }
    }

    render() {
        return (
            <div className="reset-wrapper">
                <CustomSnackBar alertShow={this.state.alertShow}
                                severity={this.state.severity}
                                alertResponse={this.state.alertResponse}
                                closeAlertBox={this.closeAlertBox} />
                <div className="reset-container">
                    <div className="reset-password-container">
                        <FundooLogo/>
                        <div className="page-title-container">
                            <div className="header">Change password</div>
                        </div>
                        <div className="reset-password-header">Create a strong password</div>
                        <div className="reset-password-line">Create a new, strong password that you don't use for other websites</div>
                        <div className="field-container">
                            <div className="password-textfied-container">
                                <div className="password-field-container">
                                    <TextField id="outlined-basic" error={this.state.passwordStatus} onChange={textEvent => this.handleChange(textEvent, "^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$", "At least 8 character")} helperText={this.state.passwordError} name="password" value={this.state.password} autoComplete="off" type={this.state.showPassword ? 'text' : 'password'} fullWidth label="Password" variant="outlined" />
                                </div>
                                <div className="password-field-container">
                                    <TextField id="outlined-basic" onChange={textEvent => this.confirmPasswordValidation(textEvent)} error={this.state.confirmPasswordStatus} helperText={this.state.confirmPasswordError} value={this.state.confirmPassword} name="confirmPassword" type={this.state.showPassword ? 'text' : 'password'} autoComplete="off" fullWidth label="Confirm Password" variant="outlined" />
                                </div>
                            </div>
                            <div className="eye-visibility">
                                {this.state.showPassword ? <Visibility onClick={this.handleClickShowPassword} /> : <VisibilityOff onClick={this.handleClickShowPassword} />}
                            </div>
                        </div>
                        <div className="save-password">
                            <div class="save-button">
                                <button className="next-button" onClick={this.handleClick}>Save Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword;