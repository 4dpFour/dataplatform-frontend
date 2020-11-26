// React
import React from 'react';

// 路由
import routes from "../routes";
import { BrowserRouter as Router } from "react-router-dom";

// 自定义组件
import DPMenu from './common/DPMenu/DPMenu';

// 组件库 & css
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

export default class App extends React.Component {

    render() {
        return (
            <Router routes={routes}>
                <Layout style={{ minHeight: '100vh' }}>
                    {/* 左侧菜单栏 */}
                    <DPMenu />
                    {/* 右侧内容 */}
                    <Layout className="site-layout">
                        {/* 内容 */}
                        {routes}
                    </Layout>
                </Layout>
            </Router>
        )
    }

}