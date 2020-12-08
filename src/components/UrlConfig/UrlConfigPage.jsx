import React from 'react';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Layout } from "antd";

// css
import './UrlConfigPage.css'

// 自定义组件
import UrlConfigForm from './UrlConfigForm';

const { Content } = Layout;

class UrlConfigPage extends React.Component {

    render() {
        return (
            <Content style={{ margin: '15px 15px 15px 15px' }}>
                <div className="site-layout-background" style={{ padding: 20, minHeight: 800 }}>
                    <UrlConfigForm />
                </div>
            </Content>
        )
    }

}

export default UrlConfigPage;