import React from 'react';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Layout } from "antd";

// css
import './TablePage.css'

const { Content } = Layout;

class TablePage extends React.Component {

    render() {
        return (
            <Content style={{ margin: '15px 15px 15px 15px' }}>
                <div className="site-layout-background" style={{ padding: 20, minHeight: 800 }}>
                    数据列表
                </div>
            </Content>
        )
    }

}

export default TablePage;