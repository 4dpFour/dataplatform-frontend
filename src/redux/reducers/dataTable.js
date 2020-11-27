import ActionType from '../../constants/actionType';
import * as MockData from "../../constants/MockData";
import { findIndex } from 'lodash';

const DataTableAction = ActionType.dataTable;

// 初始状态
const initialState = {
    // TODO: 暂时使用假数据
    dataSource: [],
    bordered: false,
    layout: 'fixed'
}

const dataTableReducer = (state = initialState, action) => {
    switch (action.type) {
        // 1. 获取数据
        case DataTableAction.FETCH_DATA:
            return {
                ...state,
                dataSource: action.data
            }

        // 2. 添加行
        case DataTableAction.ADD_ROW:
            return {
                ...state,
                dataSource: [
                    ...state.dataSource,
                    action.data
                ]
            }

        // 3. 更新行
        case DataTableAction.UPDATE_ROW:
            let selectedRowKey = action.selectedRowKey;
            const targetIndex = findIndex(state.dataSource, { id: selectedRowKey });
            if (targetIndex >= 0) {
                const newDataSource = [
                    ...state.dataSource.slice(0, targetIndex),
                    action.data,
                    ...state.dataSource.slice(targetIndex + 1)
                ]

                return {
                    ...state,
                    dataSource: newDataSource
                }
            }
            return state

        // 4. 删除行
        case DataTableAction.DELETE_ROWS:
            // 需要删除的行的keys
            let selectedRowKeys = action.selectedRowKeys;

            let newDataSource = state.dataSource.filter(item => {
                // 判断item的id是否在keys中
                let targetIndex = findIndex(selectedRowKeys, (val) => {
                    return val == item.id;
                });

                if (targetIndex == -1) {
                    return true;
                } else {
                    return false;
                }
            });

            return {
                ...state,
                dataSource: newDataSource
            }

        // 5. 切换表格边框状态
        case DataTableAction.TOGGLE_BORDER:
            return {
                ...state,
                bordered: action.bordered
            }

        // 6. 切换表格布局
        case DataTableAction.TOGGLE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            }

        default:
            return state
    }
}

export default dataTableReducer;