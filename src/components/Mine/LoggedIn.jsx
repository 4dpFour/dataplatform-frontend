// React 
import React from 'react';

// Redux 
import { connect } from 'react-redux';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Row, Col, Card } from "antd";


class LoggedIn extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Row style={{height: 200}}>
                    <Col span={24}></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={10}></Col>
                    <Col span={4}>
                        <Card title="当前用户"
                            bordered
                            style={{ textAlign: 'center' }}>
                            {this.props.username}
                        </Card>
                    </Col>
                    <Col span={10}></Col>
                </Row>
                <Row>
                    <Col span={24}></Col>
                </Row>
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username
    }
}

export default connect(mapStateToProps, null)(LoggedIn);