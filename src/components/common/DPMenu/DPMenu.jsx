// React
import React from 'react';
import { Link } from "react-router-dom";

// Ant Design组件库 & css
import 'antd/dist/antd.css';
import './DPMenu.css';
import { Menu, Layout } from 'antd';
import {
    PieChartOutlined,
    BarChartOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Redux Action
import * as headerActions from "../../../redux/actions/header";

const { Sider } = Layout;

class DPMenu extends React.Component {

    menuItems = [
        {
            title: "数据看板",
            icon: <PieChartOutlined />,
            link: '/dashboard'
        },
        {
            title: "数据列表",
            icon: <BarChartOutlined />,
            link: '/table'
        },
        {
            title: "网址配置",
            icon: <FileOutlined />,
            link: '/urlconfig'
        },
        {
            title: "个人中心",
            icon: <UserOutlined />,
            link: '/mine'
        },
    ]

    // 构造器
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            itemTitle: '数据看板'
        }
    }

    // 当收起侧栏时触发这个回调
    onCollapse = (collapsed) => {
        this.setState({
            collapsed: collapsed
        });
    };

    // 当点击item上课触发这个回调
    onClickMenuItem = ({ item, key, keyPath, domEvent }) => {
        this.setState({
            itemTitle: key
        });

        this.props.headerActions.changeHeaderTitle(key);
    }

    render() {
        const { collapsed } = this.state;

        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="title">
                    <span className="frontTitle">数据</span>
                    <span className="behindTitle">平台</span>
                </div>
                <Menu theme="dark" defaultSelectedKeys={[this.state.itemTitle]} mode="inline" onClick={this.onClickMenuItem}>
                    {
                        this.menuItems.map(item => {
                            return (
                                <Menu.Item key={item.title} icon={item.icon}>
                                    {/* 链接 */}
                                    <Link to={item.link}>{item.title}</Link>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Sider>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        headerActions: bindActionCreators(headerActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(DPMenu);