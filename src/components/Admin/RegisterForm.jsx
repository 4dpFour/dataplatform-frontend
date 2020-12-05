// React
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux Action
import * as authActions from '../../redux/actions/auth';
import * as serverActions from '../../utils/network';

// Ant Design组件库 & css
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './RegisterForm.css';

// Constants
import urls from '../../constants/urls';
import messageType from '../../constants/messageType';

class RegisterForm extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
    }

    // 点击注册按钮触发的回调
    onClickRegisterButton = () => {
        const ref = this.formRef.current;
        const username = ref.getFieldValue('username');
        const password = ref.getFieldValue('password');
        const passwordConfirmation = ref.getFieldValue('passwordConfirmation');

        // 两次密码输入不相同
        if (password !== passwordConfirmation) {
            message.error(messageType.Error.PASSWORD_UNEQUAL, 1.0);
        }

        if (username && password && passwordConfirmation && (password === passwordConfirmation)) {
            this.register(username, password);
        }
    }

    // 用户注册
    register = (username, password) => {
        const userdata = { username, password };
        const loading = message.loading(messageType.Loading.REGISTERING, 0);

        this.props.serverActions.registerRequest(urls.user_register, userdata)
            .then(resp => resp.data)
            .then(data => {
                setTimeout(loading, 1);
                // 注册成功
                if (data.code == 200) {
                    message.success(messageType.Success.REGISTER_OK, 1.0);

                    const cookie = document.cookie.split('=')[1];
                    this.props.authActions.register({ username, password, cookie });
                    // 保存相关信息到本地
                    localStorage.setItem("loginTicket", cookie);
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                    // 注册成功后自动登录
                    message.success(messageType.Success.LOGIN_OK, 1.0);
                }
                // 注册失败
                else {
                    message.error(data.msg, 1.0);
                }
            })
            .catch(err => {
                setTimeout(loading, 1);
                message.error(messageType.Error.ERROR_HAPPEN);
                return;
            });
    }

    render() {
        return (
            <Card
                title="注册账号"
                className='basic-card'
                bordered>
                <Form
                    ref={this.formRef}
                    name="normal-login"
                    className="register-form"
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
                    <Form.Item
                        name="passwordConfirmation"
                        rules={[{ required: true, message: '请输入确认密码！' }]}>
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password Confirmation" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="register-form-button"
                            onClick={this.onClickRegisterButton}>
                            注册
                        </Button>
                        <Link to='/'>返回首页</Link>
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

export default withRouter(connect(null, mapDispatchToProps)(RegisterForm));