import ActionType from '../../constants/actionType';

const DashboardAction = ActionType.dashboard;

// Action: 设置平均金额
export const setAvgValue = (avgValue) => {
    return {
        type: DashboardAction.SET_AVG_VALUE,
        avgValue
    }
}

// Action: 清除数据
export const clear = () => {
    return {
        type: DashboardAction.CLEAR
    }
}