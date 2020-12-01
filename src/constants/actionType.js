const ActionType = {
    // Header相关
    header: {
        CHANGE_HEADER_TITLE: 'CHANGE_HEADER_TITLE'
    },
    // 数据列表相关
    dataTable: {
        // 数据操作相关
        FETCH_DATA: 'FETCH_DATA',
        FETCH_MOCK_DATA: 'FETCH_MOCK_DATA',
        ADD_ROW: 'ADD_ROW',
        UPDATE_ROW: 'UPDATE_ROW',
        DELETE_ROWS: 'DELETE_ROWS',
        // 表格样式相关
        TOGGLE_BORDER: 'TOGGLE_BORDER',
        TOGGLE_LAYOUT: 'TOGGLE_LAYOUT'
    },
    // 用户相关
    auth: {
        LOG_IN: 'LOG_IN',
        LOG_OUT: 'LOG_OUT',
        REGISTER: 'REGISTER'
    }
}

export default ActionType;