import axios from 'axios';

// 从服务器获取数据
export const fetchData = (url) => {
    return dispatch => {
        return axios.get(url);
    }
}

// 查询数据
export const queryData = (url, query) => {
    return dispatch => {
        return axios.get(url + `?query=${query}`);
    }
}

// 保存Url
export const saveUrls = (url, data) => {
    return dispatch => {
        return axios.post(url, data);
    }
}

// 爬数据
export const crawlData = (url) => {
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