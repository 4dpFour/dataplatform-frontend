import axios from 'axios';

// 从模拟服务器获取假数据
export const fetchData = (url) => {
    return dispatch => {
        return axios.get(url);
    }
}