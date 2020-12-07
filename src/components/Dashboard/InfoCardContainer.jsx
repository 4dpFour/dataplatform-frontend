// React
import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Redux Action
import * as urlConfigActions from '../../redux/actions/urlConfig';
import * as serverActions from '../../utils/network';

// Ant Design组件库 & css
import { Row, Col } from "antd";
import {
    PieChartFilled,
    AreaChartOutlined,
    ProfileFilled,
    HomeFilled
} from '@ant-design/icons';

// 自定义组件
import InfoCard from './Charts/InfoCard';

// Util
import urls from '../../constants/urls';
import * as analysis from '../../utils/analysis';

class InfoCardContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // 获取来源网站
        this.props.serverActions.getUrls(urls.url_list)
            .then(resp => resp.data)
            .then(data => {
                if (data.code == 200) return data.data;
                else return;
            })
            .then(data => {
                if (data != null) {
                    this.props.urlConfigActions.saveUrls(data);
                }
            })
    }

    render() {
        const cards = [
            {
                title: '总条目数',
                value: this.props.totalRowNumber,
                icon: <PieChartFilled style={{ fontSize: '50px', color: '#FAA118' }} />
            },
            {
                title: '来源网站',
                value: this.props.urlNumber,
                icon: <ProfileFilled style={{ fontSize: '50px', color: '#37CE6F' }} />
            },
            {
                title: '最近新增',
                value: this.props.increment,
                icon: <AreaChartOutlined style={{ fontSize: '50px', color: '#F28D90' }} />
            },
            {
                title: '在线用户',
                value: this.props.user,
                icon: <HomeFilled style={{ fontSize: '50px', color: '#1D9BFF' }} />
            }
        ]

        return (
            <>
                <Row gutter={10}>
                    <Col span={6}>
                        <InfoCard config={cards[0]} />
                    </Col>
                    <Col span={6}>
                        <InfoCard config={cards[1]} />
                    </Col>
                    <Col span={6}>
                        <InfoCard config={cards[2]} />
                    </Col>
                    <Col span={6}>
                        <InfoCard config={cards[3]} />
                    </Col>
                </Row>
                <div style={{ height: 10 }}></div>
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        totalRowNumber: state.dataTable.dataSource.length,
        increment: state.dashboard.increment,
        user: state.auth.username,
        urlNumber: state.urlConfig.urls.length
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        urlConfigActions: bindActionCreators(urlConfigActions, dispatch),
        serverActions: bindActionCreators(serverActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCardContainer);