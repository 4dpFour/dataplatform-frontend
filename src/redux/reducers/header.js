import ActionType from "../../constants/actionType";

const HeaderAction = ActionType.header

const initialState = {
    title: '数据看板'
}

// reducer
const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case HeaderAction.CHANGE_HEADER_TITLE:
            return {
                title: action.title
            }

        default:
            return state
    }
}

export default headerReducer;