import React from 'react';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Layout } from "antd";

// css
import './UrlConfigPage.css'

const { Content } = Layout;

class UrlConfigPage extends React.Component {

    render() {
        return (
            <Content style={{ margin: '15px 15px 15px 15px' }}>
                <div className="site-layout-background" style={{ padding: 20, minHeight: 800 }}>
                    网址配置
                </div>
            </Content>
        )
    }

}

export default UrlConfigPage;