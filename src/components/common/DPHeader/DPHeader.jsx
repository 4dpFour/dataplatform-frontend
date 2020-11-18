import React from "react";

import 'antd/dist/antd.css';
import './DPHeader.css';
import { Layout } from 'antd';

const { Header } = Layout;

class DPHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header className="site-layout-background" style={{ paddingLeft: 20, margin: '15px 15px 0px 15px' }}>
                {/* Header Title由父组件传递的数据决定 */}
                <span className="navTitle">{this.props.headerTitle}</span>
            </Header>
        )
    }
}

export default DPHeader;