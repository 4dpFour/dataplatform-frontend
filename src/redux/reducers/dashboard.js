import ActionType from '../../constants/actionType';

const DashboardAction = ActionType.dashboard;

// 初始状态
const initialState = {
    avgValue: 0,
    increment: 0
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        // 1. 设置平均金额
        case DashboardAction.SET_AVG_VALUE:
            return {
                ...state,
                avgValue: action.avgValue
            }

        // 2. 设置今日新增
        case DashboardAction.SET_INCREMENT:
            return {
                ...state,
                increment: action.increment
            }

        // 3. 清空数据
        case DashboardAction.CLEAR:
            return initialState

        default:
            return state
    }
}

export default dashboardReducer;