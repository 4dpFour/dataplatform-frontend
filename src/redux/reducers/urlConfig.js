import ActionType from '../../constants/actionType';

const UrlConfigAction = ActionType.urlConfig;

// 初始状态
const initialState = {
    urls: [],
    selectedUrls: []
}

const urlConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        // 1. 保存Url
        case UrlConfigAction.SAVE_URLS:
            return {
                ...state,
                urls: action.urls
            }

        // 2. 清除数据
        case UrlConfigAction.CLEAR:
            return initialState

        // 3. 保存选中的Url
        case UrlConfigAction.SAVE_SELECTED_URLS:
            return {
                ...state,
                selectedUrls: action.urls
            }
            
        default:
            return state
    }
}

export default urlConfigReducer;