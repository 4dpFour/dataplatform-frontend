import React from 'react';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Layout, Row, Col } from "antd";
import {
    PieChartFilled,
    AreaChartOutlined,
    PayCircleFilled,
    UserOutlined
} from '@ant-design/icons';

// css
import './DashboardPage.css';

// 自定义组件
import ContractLine from './Charts/ContractLine';
import AvgValueBar from './Charts/AvgValueBar';
import InfoCard from './Charts/InfoCard';
import MiniTable from './MiniTable';

const { Content } = Layout;

class DashboardPage extends React.Component {

    cards = [
        {
            title: '总条目数',
            value: 444,
            icon: <PieChartFilled style={{ fontSize: '50px', color: '#95CDED' }} />
        },
        {
            title: '平均金额',
            value: 'mock',
            icon: <PayCircleFilled style={{ fontSize: '50px', color: '#EFEE99' }} />
        },
        {
            title: '今日新增',
            value: 562,
            icon: <AreaChartOutlined style={{ fontSize: '50px', color: '#F28D90' }} />
        },
        {
            title: '在线用户',
            value: 'mock',
            icon: <UserOutlined style={{ fontSize: '50px', color: '#9FEBB0' }} />
        }
    ]

    render() {
        return (
            <Content style={{ margin: '15px 15px 15px 15px' }}>
                <div className="site-layout-background" style={{ padding: 10, minHeight: 800 }}>
                    {/* Row 1 */}
                    <Row gutter={10}>
                        <Col flex={1}>
                            <InfoCard config={this.cards[0]} />
                        </Col>
                        <Col flex={1}>
                            <InfoCard config={this.cards[1]} />
                        </Col>
                        <Col flex={1}>
                            <InfoCard config={this.cards[2]} />
                        </Col>
                        <Col flex={1}>
                            <InfoCard config={this.cards[3]} />
                        </Col>
                    </Row>
                    <div style={{ height: 10 }}></div>

                    {/* Row 2 */}
                    <Row gutter={10}>
                        <Col span={12}>
                            <ContractLine />
                        </Col>
                        <Col span={12}>
                            <AvgValueBar />
                        </Col>
                    </Row>
                    <div style={{ height: 10 }}></div>
                    {/* Row 3 */}
                    <MiniTable />
                </div>
            </Content>
        )
    }

}

export default DashboardPage;