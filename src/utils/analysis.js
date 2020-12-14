import { uniq, findIndex } from 'lodash';

// 柱状图
export const barData = (dataSource) => {
    if (dataSource.length === 0) return [];

    // 来源网站
    let sources = dataSource.map(item => item.url);
    let uniqueSources = uniq(sources);

    // 计算每个来源网站出现的次数
    let data = uniqueSources.map(source => {
        return { source, number: 0 };
    });
    sources.forEach(source => {
        let targetIndex = findIndex(data, { source });
        data[targetIndex].number += 1;
    });

    return data;
}

// 折线图
export const lineData = (dataSource) => {
    if (dataSource.length === 0) return [];

    // 日期的正则表达式
    // 格式：YYYY-MM-DD
    const regExp = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
    // 日期
    let dates = dataSource.map(item => item.announceDate).filter(date => regExp.test(date));
    let uniqueDates = uniq(dates);

    // 计算每个日期的合同数量
    let data = uniqueDates.map(date => {
        return { date, number: 0 };
    });
    dates.forEach(date => {
        let targetIndex = findIndex(data, { date });
        data[targetIndex].number += 1;
    });

    return data.slice(0, 10).reverse();
}

export const formattedNumber = (num) => {
    let fn = 0;
    if (num > 1000) {
        fn = (num / 1000).toString();
        fn = fn.split('.')[0];
        fn = fn + 'K';

        return fn;
    } else {
        return num;
    }
}