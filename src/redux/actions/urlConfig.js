import ActionType from '../../constants/actionType';

const UrlConfigAction = ActionType.urlConfig;

// Action: 保存URL
export const saveUrls = (urls) => {
    return {
        type: UrlConfigAction.SAVE_URLS,
        urls
    }
}

// Action: 保存选中的URL
export const saveSelectedUrls = (urls) => {
    return {
        type: UrlConfigAction.SAVE_SELECTED_URLS,
        urls
    }
}

// Action: 清除数据
export const clear = () => {
    return {
        type: UrlConfigAction.CLEAR
    }
}