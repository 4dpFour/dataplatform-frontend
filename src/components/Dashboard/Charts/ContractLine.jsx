// React
import React from 'react';

// Redux
import { connect } from 'react-redux';

// Ant Design组件库
import { Card } from 'antd';
import { Line } from '@ant-design/charts';

// Util
import * as analysis from '../../../utils/analysis';
import { maxBy } from 'lodash';

class ContractLine extends React.Component {

    config = {
        data: [],
        height: 300,
        xField: 'date',
        yField: 'number',
        color: '#EA4D38',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fontSize: 15,
                fill: '#aaa',
            },
        },
        yAxis: {
            max: 400
        },
        legend: { position: 'top' },
        smooth: true,
        meta: {
            date: { alias: '日期' },
            value: { alias: '合同总数' }
        },
    };

    render() {
        const data = analysis.lineData(this.props.dataSource);
        this.config.data = data;
        if (data.length != 0) {
            const yMax = maxBy(data, item => item.number).number + 50;
            this.config.yAxis.max = yMax;
        }

        return (
            <Card>
                <Line {...this.config} />
            </Card>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        dataSource: state.dataTable.dataSource
    }
}

export default connect(mapStateToProps, null)(ContractLine);