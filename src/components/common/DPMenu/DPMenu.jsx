import React from 'react';
import 'antd/dist/antd.css';
import './DPMenu.css';
import { Menu, Layout } from 'antd';
import {
    PieChartOutlined,
    BarChartOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

class DPMenu extends React.Component {

    menuItems = [
        {
            title: "数据看板",
            icon: <PieChartOutlined />
        },
        {
            title: "数据列表",
            icon: <BarChartOutlined />
        },
        {
            title: "网址配置",
            icon: <FileOutlined />
        },
        {
            title: "个人中心",
            icon: <UserOutlined />
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

    // 组件装载完毕后执行这个方法
    componentDidMount() {
        this.setState({
            itemTitle: this.props.menuItemTitle
        })
    }

    // 当收起侧栏触发这个回调
    onCollapse = (collapsed) => {
        this.setState({
            collapsed: collapsed
        });
    };

    // 当click侧栏item触发这个回调
    onClickMenuItem = ({ item, key, keyPath, domEvent }) => {
        this.setState({
            itemTitle: key
        })
        // 传递数据到父组件
        this.props.onTitleChanged(key);
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
                                    {item.title}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Sider>
        )
    }

}

export default DPMenu;