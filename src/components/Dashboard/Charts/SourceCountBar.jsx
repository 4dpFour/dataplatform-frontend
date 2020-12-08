// React
import React from 'react';

// Redux
import { connect } from 'react-redux';

// Ant Design组件库
import { Card } from 'antd';
import { Column } from '@ant-design/charts';

// Util
import * as analysis from '../../../utils/analysis';
import { maxBy } from 'lodash';

class AvgValueBar extends React.Component {

    config = {
        data: [],
        height: 300,
        xField: 'source',
        yField: 'number',
        color: '#5BA8F5',
        label: {
            position: 'middle',
            fontSize: 15,
            style: {

                fill: '#FFFFFF',
                opacity: 0.6
            }
        },
        yAxis: {
            max: 400
        },
        meta: {
            source: { alias: '网站' },
            number: { alias: '数量' }
        },
    };

    constructor(props) {
        super(props);
    }

    render() {
        const data = analysis.barData(this.props.dataSource);
        this.config.data = data;
        if (data.length != 0) {
            const yMax = maxBy(data, item => item.number).number + 50;
            this.config.yAxis.max = yMax;
        }

        return (
            <Card>
                <Column {...this.config} />
            </Card>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        dataSource: state.dataTable.dataSource
    }
}

export default connect(mapStateToProps, null)(AvgValueBar);