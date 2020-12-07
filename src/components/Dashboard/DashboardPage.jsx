// React
import React from 'react';

// Ant Design组件库 & css
import './DashboardPage.css';
import 'antd/dist/antd.css';
import { Layout, Row, Col } from "antd";

// 自定义组件
import ContractLine from './Charts/ContractLine';
import SourceCountBar from './Charts/SourceCountBar';
import InfoCardContainer from './InfoCardContainer';
import MiniTable from './MiniTable';

const { Content } = Layout;

class DashboardPage extends React.Component {

    render() {
        return (
            <Content style={{ margin: '15px 15px 15px 15px' }}>
                <div className="site-layout-background" style={{ padding: 10, minHeight: 800 }}>
                    {/* Row 1 */}
                    <InfoCardContainer />
                    {/* Row 2 */}
                    <Row gutter={10}>
                        <Col span={12}>
                            <ContractLine />
                        </Col>
                        <Col span={12}>
                            <SourceCountBar />
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