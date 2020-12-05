import ActionType from '../../constants/actionType';

const DataTableAction = ActionType.dataTable;

// Action: 调用API获取数据
export const fetchData = (data) => {
    return {
        type: DataTableAction.FETCH_DATA,
        data
    }
}

// Action: 查询数据
export const queryData = (data) => {
    return {
        type: DataTableAction.QUERY_DATA,
        data
    }
}

// Action: 添加行
export const addRow = (data) => {
    return {
        type: DataTableAction.ADD_ROW,
        data
    }
}

// Action: 更新行
export const updateRow = (selectedRowKey, data) => {
    return {
        type: DataTableAction.UPDATE_ROW,
        selectedRowKey, data
    }
}

// Action: 删除行
export const deleteRows = (selectedRowKeys) => {
    return {
        type: DataTableAction.DELETE_ROWS,
        selectedRowKeys
    }
}

// Action: 切换表格边框状态
export const toggleBorder = (bordered) => {
    return {
        type: DataTableAction.TOGGLE_BORDER,
        bordered
    }
}

// Action: 选择表格布局
export const toggleLayout = (layout) => {
    return {
        type: DataTableAction.TOGGLE_LAYOUT,
        layout
    }
}

// Action: 清除数据
export const clear = () => {
    return {
        type: DataTableAction.CLEAR
    }
}