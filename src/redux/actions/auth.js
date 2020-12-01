import ActionType from '../../constants/actionType';

const AuthAction = ActionType.auth;

// Action: 用户登录
export const login = (userdata) => {
    return {
        type: AuthAction.LOG_IN,
        userdata
    }
}

// Action: 用户退出
export const logout = () => {
    return {
        type: AuthAction.LOG_OUT
    }
}
