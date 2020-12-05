import ActionType from '../../constants/actionType';

const UrlConfigAction = ActionType.urlConfig;

// 初始状态
const initialState = {
    urls: []
}

const urlConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        // 1. 保存Url
        case UrlConfigAction.SAVE_URLS:
            return {
                urls: action.urls
            }

        // 2. 清除数据
        case UrlConfigAction.CLEAR:
            return initialState

        default:
            return state
    }
}

export default urlConfigReducer;