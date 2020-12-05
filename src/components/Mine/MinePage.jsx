// React
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux Action
import * as serverActions from '../../utils/network';
import * as authActions from '../../redux/actions/auth';
import * as dashboardActions from '../../redux/actions/dashboard';
import * as dataTableActions from '../../redux/actions/dataTable';
import * as headerActions from '../../redux/actions/header';
import * as urlConfigActions from '../../redux/actions/urlConfig';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Layout, Menu, message } from "antd";

// 自定义组件
import LoggedIn from './LoggedIn';

// css
import './MinePage.css';

// Constants
import urls from '../../constants/urls';
import messageType from '../../constants/messageType';

const { Content } = Layout;

class MinePage extends React.Component {

    constructor(props) {
        super(props);

        this.userLinks = [
            {
                key: "退出",
                title: "退出",
                link: '/'
            },
        ]

    }

    // 点击菜单栏触发的回调
    onClickMenuItem = () => {
        this.props.serverActions.logoutRequest(urls.user_logout)
            .then(resp => resp.data)
            .then(data => {
                // 退出成功
                if (data.code == 200) {
                    this.props.authActions.logout();
                    // 清除相关信息
                    localStorage.removeItem('loginTicket');
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    this.props.dashboardActions.clear();
                    this.props.headerActions.clear();
                    this.props.dataTableActions.clear();
                    this.props.urlConfigActions.clear();

                    message.success(messageType.Success.LOGOUT_OK, 1.0);
                }
                // 退出失败
                else {
                    message.error(messageType.Error.LOGOUT_FAIL, 1.0);
                };
            })
            .catch(err => {
                message.error(messageType.Error.ERROR_HAPPEN, 1.0);
                this.props.authActions.logout();
            })
    }

    render() {
        return (
            <Content style={{ margin: '15px 15px 15px 15px' }}>
                {/* 导航栏 */}
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    onClick={this.onClickMenuItem}>
                    {
                        this.userLinks.map(item => {
                            return (
                                <Menu.Item key={item.key}>
                                    <Link to={item.link}>{item.title}</Link>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
                {/* 内容 */}
                <LoggedIn />
            </Content>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        serverActions: bindActionCreators(serverActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch),
        headerActions: bindActionCreators(headerActions, dispatch),
        dataTableActions: bindActionCreators(dataTableActions, dispatch),
        urlConfigActions: bindActionCreators(urlConfigActions, dispatch),
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MinePage));