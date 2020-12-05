import ActionType from "../../constants/actionType";

const HeaderAction = ActionType.header;

// Action: 更改Header Title
export const changeHeaderTitle = (title) => {
    return {
        type: HeaderAction.CHANGE_HEADER_TITLE,
        title
    }
}

// Action: 清除数据
export const clear = () => {
    return {
        type: HeaderAction.CLEAR
    }
}

