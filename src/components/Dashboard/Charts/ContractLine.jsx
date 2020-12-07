// React
import React from 'react';

// Redux
import { connect } from 'react-redux';

// Ant Design组件库
import { Card } from 'antd';
import { Line } from '@ant-design/charts';

// Util
import * as analysis from '../../../utils/analysis';

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
                fill: '#aaa',
            },
        },
        legend: { position: 'top' },
        smooth: true,
        meta: {
            date: { alias: '日期' },
            value: { alias: '合同总数' }
        }
    };

    render() {
        this.config.data = analysis.lineData(this.props.dataSource);

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