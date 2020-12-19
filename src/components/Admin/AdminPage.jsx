// React
import React from 'react';

// Ant Design组件库 & css
import { Layout, Row, Col } from 'antd';

// 路由
import { BrowserRouter as Router } from "react-router-dom";
import * as routes from '../../routes';

class AdminPage extends React.Component {

    render() {
        return (
            <Router routes={routes.guestRoutes}>
                <Layout style={{ minHeight: "100vh" }}>
                    <Row style={{ minHeight: 200 }} />
                    <Row>
                        <Col flex={8}></Col>
                        <Col flex={1}>
                            {routes.guestRoutes}
                        </Col>
                        <Col flex={8}></Col>
                    </Row>
                    <Row style={{ minHeight: 200 }} />
                </Layout>
            </Router>
        )
    }

}

export default AdminPage;