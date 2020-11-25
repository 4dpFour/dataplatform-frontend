import ActionType from '../../constants/actionType';
import * as MockData from "../../constants/MockData";

const DataTableAction = ActionType.dataTable;

// 初始状态
const initialState = {
    // 假数据
    dataSource: MockData.contracts
}

const dataTableReducer = (state = initialState, action) => {
    switch (action.type) {
        // 获取假数据
        case DataTableAction.FETCH_MOCK_DATA:
            return {
                dataSource: action.data
            }

        // 获取数据
        case DataTableAction.FETCH_DATA:
            return state

        // 添加行
        case DataTableAction.ADD_ROW:
            return {
                dataSource: [
                    ...state.dataSource,
                    action.data
                ]
            }

        // 删除行
        case DataTableAction.DELETE_ROWS:
            // 需要删除的行的keys
            let selectedRowKeys = action.selectedRowKeys;

            let newDataSource = state.dataSource.filter(item => {
                // 判断item的id是否在keys中
                let targetIndex = selectedRowKeys.findIndex((value, index, arr) => {
                    return value == item.id;
                })
                if (targetIndex == -1) {
                    return true;
                } else {
                    return false;
                }
            });

            return {
                dataSource: newDataSource
            }

        default:
            return state
    }
}

export default dataTableReducer;