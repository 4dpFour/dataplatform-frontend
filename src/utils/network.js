import axios from 'axios';

// 从模拟服务器获取假数据
export const fetchData = (url) => {
    return dispatch => {
        return axios.get(url);
    }
}

// 用户注册
export const registerRequest = (url, userdata) => {
    return dipatch => {
        return axios.post(url, userdata);
    }
}

// 用户登录
export const loginRequest = (url, userdata) => {
    return dispatch => {
        return axios.post(url, userdata);
    }
}

// 用户退出
export const logoutRequest = (url) => {
    return dispatch => {
        return axios.get(url);
    }
}

// 当前用户
export const getCurrentUser = (url) => {
    return dispatch => {
        return axios.get(url);
    }
}