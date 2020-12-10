// React
import React from 'react';

// Redux
import { connect } from 'react-redux';

// 路由
import * as routes from "../routes";
import { BrowserRouter as Router } from "react-router-dom";

// 自定义组件
import Menu from './common/Menu/Menu';
import AdminPage from './Admin/AdminPage';

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
                <Router routes={routes.userRoutes}>
                    <Layout style={{ minHeight: '100vh' }}>
                        {/* 左侧菜单栏 */}
                        <Menu />
                        {/* 右侧内容 */}
                        <Layout className="site-layout">
                            {/* 内容 */}
                            {routes.userRoutes}
                        </Layout>
                    </Layout>
                </Router>
                :
                <AdminPage />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps, null)(App);