import ActionType from '../../constants/actionType';
import { findIndex } from 'lodash';

const DataTableAction = ActionType.dataTable;

// 初始状态
const initialState = {
    dataSource: [],
    queriedDataSource: [],
    backupDataSource: [],
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
                ],
                queriedDataSource: [
                    ...state.queriedDataSource,
                    action.data
                ]
            }

        // 3. 更新行
        case DataTableAction.UPDATE_ROW:
            let selectedRowKey = action.selectedRowKey;
            const dataSourceTargetIndex = findIndex(state.dataSource, { id: selectedRowKey });
            const queriedDataSourceTargetIndex = findIndex(state.queriedDataSource, { id: selectedRowKey });

            if (dataSourceTargetIndex >= 0 && queriedDataSourceTargetIndex >= 0) {
                const newDataSource = [
                    ...state.dataSource.slice(0, dataSourceTargetIndex),
                    action.data,
                    ...state.dataSource.slice(dataSourceTargetIndex + 1)
                ]
                const newQueriedDataSource = [
                    ...state.queriedDataSource.slice(0, queriedDataSourceTargetIndex),
                    action.data,
                    ...state.queriedDataSource.slice(queriedDataSourceTargetIndex + 1)
                ]

                return {
                    ...state,
                    dataSource: newDataSource,
                    queriedDataSource: newQueriedDataSource
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

            let newQueriedDataSource = state.queriedDataSource.filter(item => {
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
                dataSource: newDataSource,
                queriedDataSource: newQueriedDataSource
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

        // 7. 查询数据
        case DataTableAction.QUERY_DATA:
            return {
                ...state,
                queriedDataSource: action.data
            }

        // 8. 清空
        case DataTableAction.CLEAR:
            return initialState

        default:
            return state
    }
}

export default dataTableReducer;