// React
import React from "react";

// Redux
import { connect } from "react-redux";

// Ant Design组件 & css
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import './DPHeader.css';

const { Header } = Layout;

class DPHeader extends React.Component {

    render() {
        return (
            <Header className="site-layout-background" style={{ paddingLeft: 20, margin: '15px 15px 0px 15px' }}>
                {/* Header Title由父组件传递的数据决定 */}
                <span className="navTitle">{this.props.headerTitle}</span>
            </Header>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        headerTitle: state.header.title
    }
}

export default connect(mapStateToProps, null)(DPHeader);