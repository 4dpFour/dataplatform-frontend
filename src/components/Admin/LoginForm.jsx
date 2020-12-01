// React
import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux Action
import * as authActions from '../../redux/actions/auth';
import * as serverActions from '../../utils/network';

// Ant Design组件库 & css
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.css';

// Constants
import urls from '../../constants/urls';

class LoginForm extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
    }

    // 点击登录按钮触发的回调
    onClickLoginButton = () => {
        const ref = this.formRef.current;
        const username = ref.getFieldValue('username');
        const password = ref.getFieldValue('password');

        // 用户名和密码都不为空
        if (username && password) {
            this.login(username, password);
        }
    }

    // 用户登录
    login = (username, password) => {
        const userdata = { username, password };

        this.props.serverActions.loginRequest(urls.user_login, userdata)
            .then(resp => resp.data)
            .then(data => {
                // 登录成功
                if (data.code == 200) {
                    message.success("登录成功！", 1.0);

                    const cookie = document.cookie.split('=')[1];
                    this.props.authActions.login({ username, password, cookie });
                    // 保存相关信息到本地
                    localStorage.setItem("loginTicket", cookie);
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                }
                // 登录失败
                else {
                    message.error(data.msg, 1.0);
                }
            })
    }

    render() {
        return (
            <Card
                title="数据平台"
                style={{ textAlign: 'center' }}
                bordered>
                <Form
                    ref={this.formRef}
                    name="normal-login"
                    className="login-form"
                    initialValues={{ remember: true }}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }]}>
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={this.onClickLoginButton}>
                            登录
                        </Button>
                        <div style={{ height: 10 }}></div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button">
                            注册
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        serverActions: bindActionCreators(serverActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);