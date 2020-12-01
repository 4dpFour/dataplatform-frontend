// React
import React from 'react';

// Redux
import { connect } from 'react-redux';

// Ant Design组件库 & css
import { Layout, Row, Col } from 'antd';
import './LoginPage.css'

// 自定义组件
import LoginForm from './LoginForm';

class LoginPage extends React.Component {

    render() {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Row style={{ minHeight: 200 }} />
                <Row>
                    <Col span={9}></Col>
                    <Col span={6}>
                        <LoginForm />
                    </Col>
                    <Col span={9}></Col>
                </Row>
                <Row style={{ minHeight: 200 }} />
            </Layout>
        )
    }

}

export default LoginPage;