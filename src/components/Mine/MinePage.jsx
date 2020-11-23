import React from 'react';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Layout } from "antd";

// css
import './MinePage.css'

const { Content } = Layout;

class MinePage extends React.Component {

    render() {
        return (
            <Content style={{ margin: '15px 15px 15px 15px' }}>
                <div className="site-layout-background" style={{ padding: 20, minHeight: 800 }}>
                    个人中心
                </div>
            </Content>
        )
    }

}

export default MinePage;