// React
import React from 'react';

// Redux
import { connect } from 'react-redux';

// Ant Design组件库
import { Card } from 'antd';
import { Column } from '@ant-design/charts';

// Util
import * as analysis from '../../../utils/analysis';

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
        meta: {
            source: { alias: '网站' },
            number: { alias: '数量' }
        },
    };

    constructor(props) {
        super(props);
    }

    render() {
        this.config.data = analysis.barData(this.props.dataSource);

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