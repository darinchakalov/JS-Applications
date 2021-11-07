import authentication from "../handlers/authentication.js";
import request from "./requester.js";

async function get(url) {
    return request(url, createOptions())
}

async function post(url, data) {
    return request(url, createOptions('post', data))
}

function createOptions(method = 'GET', data){
    let result = {
        method,
        headers: {}
    }

    if (data) {
       result.headers['Content-Type'] = 'application/json' 
       result.body = JSON.stringify(data)
    }

    const token = authentication.getToken()
    if (token) {
        result.headers['X-Authorization'] = token
    }

    return result;
}

export default {
    post,
    get
}