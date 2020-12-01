// React
import React from 'react';

// Redux
import { connect } from 'react-redux';

// 路由
import routes from "../routes";
import { BrowserRouter as Router } from "react-router-dom";

// 自定义组件
import DPMenu from './common/DPMenu/DPMenu';
import LoginPage from './Admin/LoginPage';

// 组件库 & css
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.loggedIn ?
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
                :
                <LoginPage />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps, null)(App);