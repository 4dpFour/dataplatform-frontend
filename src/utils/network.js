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

// 获取Url列表
export const getUrls = (url) => {
    return dispatch => {
        return axios.get(url);
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

// 添加一条数据
export const addRow = (url, data) => {
    return dispatch => {
        return axios.post(url, data);
    }
}

// 更新一条数据
export const updateRow = (url, data) => {
    return dispatch => {
        return axios.put(url, data);
    }
}

// 删除多行数据
export const deleteRows = (url, data) => {
    return dispatch => {
        return axios.delete(url, data);
    }
}