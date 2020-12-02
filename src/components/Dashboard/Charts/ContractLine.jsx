// React
import React from 'react';

// Ant Design组件库
import { Card } from 'antd';
import { Line } from '@ant-design/charts';

class ContractLine extends React.Component {

    // mock data
    mockData = [
        { date: '11/01', value: 578 },
        { date: '11/02', value: 683 },
        { date: '11/03', value: 798 },
        { date: '11/04', value: 844 },
        { date: '11/05', value: 951 },
        { date: '11/06', value: 578 },
        { date: '11/07', value: 683 },
        { date: '11/08', value: 798 },
        { date: '11/09', value: 844 },
        { date: '11/10', value: 951 },
    ];

    config = {
        data: this.mockData,
        height: 300,
        xField: 'date',
        yField: 'value',
        color: '#EA4D38',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
        legend: { position: 'top' },
        smooth: true,
        meta: {
            value: { alias: '合同总数' }
        }
    };

    render() {
        return (
            <Card>
                <Line {...this.config} />
            </Card>
        )
    }

}

export default ContractLine;