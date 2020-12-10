import { defaultColumns } from '../constants/table';

const formatData = (header, data) => {
    const rows = data.map(item => {
        return [
            item.url,
            item.contractNo,
            item.contractName,
            item.projectNo,
            item.projectName,
            item.purchaser,
            item.purchaserTelNo,
            item.supplier,
            item.supplierTelNo,
            item.subjectName,
            item.subjectUnitPrice,
            item.contractValue,
            item.announceDate
        ].join(',')
    });

    return [header.join(',')].concat(rows);
};

export const exportData = (dataSource) => {
    const header = defaultColumns.map(item => item.title);

    const data = formatData(header, dataSource);

    // 创建文件并保存
    const blob = new Blob(['\ufeff' + data.join('\n')], { type: 'text/csv,charset=UTF-8' });
    const csvUrl = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.download = `data_${new Date().getTime()}.csv`;
    link.href = csvUrl;

    // 触发下载
    link.click();
}

