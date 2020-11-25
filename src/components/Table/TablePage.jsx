// React
import React from 'react';

// Ant Design组件库
import 'antd/dist/antd.css';
import { Layout } from "antd";

// 自定义组件
import DataTable from "./DataTable";

const { Content } = Layout;

// 容器组件
class TablePage extends React.Component {

    render() {
        return (
            <Content style={{ margin: '15px 15px 15px 15px' }}>
                <DataTable />
            </Content>
        )
    }

}

export default TablePage;