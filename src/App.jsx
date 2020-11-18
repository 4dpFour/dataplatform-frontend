import React from 'react';

// 引入自己的组件库
import DPMenu from './components/common/DPMenu/DPMenu';
import DPHeader from './components/common/DPHeader/DPHeader';

// 引入Ant Design组件库
import 'antd/dist/antd.css';
import './App.css';
import { Layout } from 'antd';

const { Content } = Layout;

class App extends React.Component {

    // class构造器
    constructor(props) {
        super(props);

        this.state = {
            menuItemTitle: '数据看板'
        }
    }

    // 当点击了menu item触发这个回调
    onMenuItemTitleChanged = (title) => {
        this.setState({
            menuItemTitle: title
        })
        console.log("Menu Item变为：" + title)
    }

    render() {
        const { collapsed } = this.state;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                {/* 左侧菜单 */}
                <DPMenu menuItemTitle={this.state.menuItemTitle} onTitleChanged={this.onMenuItemTitleChanged} />
                {/* 右侧内容 */}
                <Layout className="site-layout">
                    {/* Header */}
                    <DPHeader headerTitle={this.state.menuItemTitle} />
                    {/* TODO: - 内容 */}
                    <Content style={{ margin: '15px 15px 15px 15px' }}>
                        <div className="site-layout-background" style={{ padding: 20, minHeight: 800 }}>
                            具体内容
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;