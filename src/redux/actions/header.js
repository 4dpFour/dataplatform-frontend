import ActionType from "../../constants/actionType";

// Action: 更改Header Title
export const changeHeaderTitle = (title) => {
    return {
        type: ActionType.header.CHANGE_HEADER_TITLE,
        title
    }
}

