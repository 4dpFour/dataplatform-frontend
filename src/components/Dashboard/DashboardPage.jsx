import React from 'react';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Layout } from "antd";

// css
import './DashboardPage.css'

const { Content } = Layout;

class DashboardPage extends React.Component {

    render() {
        return (
            <Content style={{ margin: '15px 15px 15px 15px' }}>
                <div className="site-layout-background" style={{ padding: 20, minHeight: 800 }}>
                    数据看板
                </div>
            </Content>
        )
    }

}

export default DashboardPage;