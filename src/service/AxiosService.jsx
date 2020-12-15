import Axios from "axios";

const Url = 'http://fundoonotes.incubation.bridgelabz.com/api/'

function post(url, data) {
    return Axios({
        method: 'post',
        url: `${Url}${url}`,
        data: data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export {post}