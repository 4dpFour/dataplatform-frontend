import ActionType from "../../constants/actionType";

const AuthAction = ActionType.auth;

// 获取用户初始状态
const initialState = () => {
    const cookie = localStorage.getItem('loginTicket');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    return {
        loggedIn: cookie == null ? false : true,
        username, password, cookie
    }
}

// reducer
const authReducer = (state = initialState(), action) => {
    switch (action.type) {
        // 1. 用户登录
        case AuthAction.LOG_IN:
            return {
                loggedIn: true,
                username: action.userdata.username,
                password: action.userdata.password,
                cookie: action.userdata.cookie
            }

        // 2. 用户退出
        case AuthAction.LOG_OUT:
            return {
                loggedIn: false,
                username: null,
                password: null,
                cookie: null
            }

        // 3. 用户注册
        case AuthAction.REGISTER:
            return state

        default:
            return state
    }
}

export default authReducer;