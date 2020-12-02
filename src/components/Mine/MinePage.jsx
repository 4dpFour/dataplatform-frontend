// React
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux Action
import * as serverActions from '../../utils/network';
import * as authActions from '../../redux/actions/auth';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Layout, Menu, message, Divider } from "antd";

// 自定义组件
import LoggedIn from './LoggedIn';

// css
import './MinePage.css';

// Constants
import urls from '../../constants/urls';

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

                    message.success("退出成功！", 1.0);
                }
                // 退出失败
                else {
                    message.error("退出失败！", 1.0);
                };
            })
            .catch(err => {
                message.error('发生错误！', 1.0);
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
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MinePage));