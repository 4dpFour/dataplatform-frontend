// React 
import React from 'react';

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
import { SettingOutlined } from '@ant-design/icons';
import { Row, Col, Card, Avatar, Dropdown, Menu, message } from "antd";

// Util
import urls from '../../constants/urls';
import messageType from '../../constants/messageType';

// Asset
import avatar from '../../asset/avatar.png';
import background from '../../asset/background.png';

const { Meta } = Card;

class LoggedIn extends React.Component {

    onClickMenuItem = ({ key }) => {
        switch (key) {
            case 'logout':
                this.logout();
                break;

            default:
                break
        }
    };

    logout = () => {
        const loading = message.loading(messageType.Loading.LOGGING_OUT, 0);

        this.props.serverActions.logoutRequest(urls.user_logout)
            .then(resp => {
                setTimeout(loading, 1);
                return resp.data;
            })
            .then(data => {
                // 退出成功
                if (data.code === 200) {
                    this.props.authActions.logout();
                    // 清除相关信息
                    this.clearUserInfo();

                    message.success(messageType.Success.LOGOUT_OK, 1.0);
                }
                // 退出失败
                else {
                    message.error(messageType.Error.LOGOUT_FAIL, 1.0);
                };
            })
            .catch(() => {
                setTimeout(loading, 1);
                message.error(messageType.Error.ERROR_HAPPEN, 1.0);
                // 发生错误时还是要退出
                this.props.authActions.logout();
                // 清除相关信息
                this.clearUserInfo();
            });
    }

    clearUserInfo = () => {
        localStorage.removeItem('loginTicket');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        this.props.dashboardActions.clear();
        this.props.headerActions.clear();
        this.props.dataTableActions.clear();
        this.props.urlConfigActions.clear();
    }

    render() {
        const menu = (
            <Menu onClick={this.onClickMenuItem}>
                <Menu.Item key="logout" style={{ textAlign: 'center' }}>退出登录</Menu.Item>
            </Menu>
        );

        return (
            <>
                <Row style={{ height: 100 }}>
                    <Col span={24}></Col>
                </Row>
                <Row>
                    <Col span={9}></Col>
                    <Col span={8}>
                        <Card
                            style={{ width: 300 }}
                            cover={<img alt="example" src={background} />}
                            actions={[
                                <Dropdown trigger='click' overlay={menu}>
                                    <SettingOutlined key="setting" />
                                </Dropdown>]} >
                            <Meta
                                avatar={<Avatar src={avatar} shape='square' />}
                                title={this.props.username}
                                description='系统管理员' />
                        </Card>
                    </Col>
                    <Col span={7}></Col>
                </Row>
                <Row>
                    <Col span={24}></Col>
                </Row>
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username
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

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);