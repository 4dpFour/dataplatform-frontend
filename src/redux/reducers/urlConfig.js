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

        default:
            return state
    }
}

export default urlConfigReducer;