import ActionType from '../../constants/actionType';

const DataTableAction = ActionType.dataTable;

// Action: 从本地获取假数据
export const fetchMockData = (dataSource) => {
    return {
        type: DataTableAction.FETCH_MOCK_DATA,
        data: dataSource.contracts
    }
}

// Action: 调用API获取数据
export const fetchData = (url) => {
    return {
        type: DataTableAction.FETCH_DATA,
        url
    }
}

// Action: 添加行
export const addRow = (data) => {
    return {
        type: DataTableAction.ADD_ROW,
        data
    }
}

// Action: 删除行
export const deleteRows = (selectedRowKeys) => {
    return {
        type: DataTableAction.DELETE_ROWS,
        selectedRowKeys
    }
}