import { post } from './AxiosService';

class UserAxiosService {

    register(data) {
        return (post("user/userSignUp", data))
    }

    login(data) {
        return (post("user/login", data))
    }

    forgotPassword(data) {
        return (post("user/reset", data))
    }

    resetPassword(data, token) {
        return (post(`user/reset-password?access_token=${token}`, data))
    }
}

export default UserAxiosService