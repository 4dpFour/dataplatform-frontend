// React 
import React from 'react';

// Ant Design组件库
import { Card, Row, Col } from 'antd';

class InfoCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { config } = this.props;

        return (
            <Card style={{ height: 120}}>
                <Row style={{ height: 10 }}></Row>
                <Row>
                    <Col span={18}>
                        <Row>
                            <h4 style={{ color: '#9E9E9E' }}>
                                {config.title}
                            </h4>
                        </Row>
                        <Row>
                            <h2 style={{ color: '#414141' }}>
                                {config.value}
                            </h2>
                        </Row>
                    </Col>
                    <Col span={6}>
                        {config.icon}
                    </Col>
                </Row>
                <Row style={{ height: 20 }}></Row>
            </Card>
        )
    }
}

export default InfoCard;