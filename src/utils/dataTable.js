import { findIndex } from 'lodash';

export const deleteRows = (dataSource, selectedRowKeys) => {
    return dataSource.filter(item => {
        // 判断item的id是否在keys中
        let targetIndex = findIndex(selectedRowKeys, (val) => {
            return val === item.id;
        });

        if (targetIndex === -1) {
            return true;
        } else {
            return false;
        }
    });
}

export const updateRow = (dataSource, selectedRowKey, data) => {
    const targetIndex = findIndex(dataSource, { id: selectedRowKey });

    if (targetIndex >= 0) {
        return [
            ...dataSource.slice(0, targetIndex),
            data,
            ...dataSource.slice(targetIndex + 1)
        ]
    }

    return dataSource;
}