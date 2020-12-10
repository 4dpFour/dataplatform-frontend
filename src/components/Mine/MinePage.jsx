// React
import React from 'react';
import { withRouter } from 'react-router-dom';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Layout } from "antd";

// 自定义组件
import LoggedIn from './LoggedIn';

// css
import './MinePage.css';

const { Content } = Layout;

class MinePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content style={{ margin: '15px 15px 15px 15px' }}>
                {/* 内容 */}
                <LoggedIn />
            </Content>
        )
    }

}

export default withRouter(MinePage);