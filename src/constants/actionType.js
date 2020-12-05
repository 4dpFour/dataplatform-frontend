const ActionType = {
    // Header相关
    header: {
        CHANGE_HEADER_TITLE: 'CHANGE_HEADER_TITLE',
        CLEAR: 'CLEAR'
    },
    // 数据列表相关
    dataTable: {
        CLEAR: 'CLEAR',
        // 数据操作相关
        FETCH_DATA: 'FETCH_DATA',
        QUERY_DATA: 'QUERY_DATA',
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
    },
    // 网址配置相关
    urlConfig: {
        CLEAR: 'CLEAR',
        SAVE_URLS: 'SAVE_URLS'
    },
    // 数据看板相关
    dashboard: {
        CLEAR: 'CLEAR',
        SET_INCREMENT: 'SET_INCREMENT',
        SET_AVG_VALUE: 'SET_AVG_VALUE',
    }
}

export default ActionType;