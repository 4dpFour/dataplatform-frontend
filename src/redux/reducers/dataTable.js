import ActionType from '../../constants/actionType';
import { updateRow, deleteRows } from '../../utils/dataTable';

const DataTableAction = ActionType.dataTable;

const initialIncrement = () => {
    const key = `${localStorage.getItem('username')}-increment`;
    const value = localStorage.getItem(key);
    if (value) return value;
    else return 0;
}

// 初始状态
const initialState = {
    dataSource: [],
    queriedDataSource: [],
    backupDataSource: [],
    bordered: false,
    layout: 'fixed',
    increment: initialIncrement()
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

            return {
                ...state,
                dataSource: updateRow(state.dataSource, selectedRowKey, action.data),
                queriedDataSource: updateRow(state.queriedDataSource, selectedRowKey, action.data)
            }

        // 4. 删除行
        case DataTableAction.DELETE_ROWS:
            // 需要删除的行的keys
            let selectedRowKeys = action.selectedRowKeys;

            return {
                ...state,
                dataSource: deleteRows(state.dataSource, selectedRowKeys),
                queriedDataSource: deleteRows(state.queriedDataSource, selectedRowKeys)
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

        // 8. 设置新爬取的条目数
        case DataTableAction.SET_INCREMENT:
            return {
                ...state,
                increment: action.increment
            }

        // 8. 清空
        case DataTableAction.CLEAR:
            return initialState

        default:
            return state
    }
}

export default dataTableReducer;