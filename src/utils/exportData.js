const formatData = (header, data) => {
    const rows = data.map(item => {
        return [
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
    const header = [
        '合同编号', '合同名称',
        '项目编号', '项目名称',
        '采购人(甲方)', '采购人联系电话',
        '供应商(乙方)', '供应商联系电话',
        '主要标的名称', '主要标的单价',
        '合同金额', '合同公告日期',];

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

