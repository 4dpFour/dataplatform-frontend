// React
import React from 'react';

// Ant Design组件库
import { Card } from 'antd';
import { Column } from '@ant-design/charts';

class AvgValueBar extends React.Component {

    mockData = [
        { date: '11/01', value: 447000 },
        { date: '11/02', value: 541000 },
        { date: '11/03', value: 332000 },
        { date: '11/04', value: 25600 },
        { date: '11/05', value: 640000 },
        { date: '11/06', value: 447000 },
        { date: '11/07', value: 541000 },
        { date: '11/08', value: 332000 },
        { date: '11/09', value: 25600 },
        { date: '11/10', value: 640000 },
    ];

    config = {
        data: this.mockData,
        height: 300,
        xField: 'date',
        yField: 'value',
        color: '#5BA8F5',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6
            }
        },
        meta: {
            value: { alias: '合同平均金额' }
        }
    };

    render() {
        return (
            <Card>
                <Column {...this.config} />
            </Card>
        )
    }

}

export default AvgValueBar;