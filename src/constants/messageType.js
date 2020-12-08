const messageType = {
    Success: {
        // 用户相关
        LOGIN_OK: '登录成功！',
        LOGOUT_OK: '退出成功！',
        REGISTER_OK: '注册成功！',
        // 数据存取相关
        FETCH_DATA_OK: '数据获取成功！',
        EXPORT_DATA_OK: '导出数据成功！',
        CRAWL_DATA_OK: (increment) => {
            return `更新了${increment}条数据！`
        },
        QUERY_DATA_OK: '查询成功！',
        // 数据操作相关
        ADD_DATA_OK: '添加成功！',
        DELETE_DATA_OK: '删除成功！',
        UPDATE_DATA_OK: '更新成功！'
    },
    Warning: {
        // 数据存取相关
        DATA_NOT_FOUND: '未发现数据！',
        QUERY_DATA_NOT_FOUND: '结果为空！',
        NEED_URL_CONFIG: '尚未进行网址配置，无法添加！'
    },
    Error: {
        ERROR_HAPPEN: '发生错误！',
        // 用户相关
        LOGOUT_FAIL: '退出失败！',
        PASSWORD_UNEQUAL: '两次密码输入不相同！',
        // 数据操作相关
        ADD_DATA_FAIL: '添加失败！',
        DELETE_DATA_FAIL: '删除失败！',
        UPDATE_DATA_FAIL: '更新失败！'
    },
    Loading: {
        // 用户相关
        LOGGING_IN: '登录中...',
        REGISTERING: '注册中...',
        // 数据存取相关
        FETCHING_DATA: '获取数据中...',
        CRAWLING_DATA: '正在爬取数据中...',
        QUERYING_DATA: '查询中...',
        // 数据操作相关
        ADDING_DATA: '添加中...',
        DELETING_DATA: '删除中...',
        UPDATING_DATA: '更新中...'
    }
}

export default messageType;