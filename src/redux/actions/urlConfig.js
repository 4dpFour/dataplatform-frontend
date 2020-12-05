import ActionType from '../../constants/actionType';

const UrlConfigAction = ActionType.urlConfig;

// Action: 保存URL
export const saveUrls = (urls) => {
    return {
        type: UrlConfigAction.SAVE_URLS,
        urls
    }
}