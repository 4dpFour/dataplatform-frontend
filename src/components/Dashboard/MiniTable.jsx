// React 
import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Redux Action
import * as dataTableActions from '../../redux/actions/dataTable';
import * as serverActions from '../../utils/network';

// Ant Design组件库
import { Row, Col, Table, message } from 'antd';

// Util
import urls from '../../constants/urls';

// Constants
import messageType from '../../constants/messageType';

const columns = [
    { title: '来源', dataIndex: 'url' },
    { title: '合同编号', dataIndex: 'contractNo' },
    { title: '合同名称', dataIndex: 'contractName' },
    { title: '项目编号', dataIndex: 'projectNo' },
    { title: '项目名称', dataIndex: 'projectName' },
    { title: '采购人(甲方)', dataIndex: 'purchaser' },
    { title: '采购人联系电话', dataIndex: 'purchaserTelNo' },
    { title: '供应商(乙方)', dataIndex: 'supplier' },
    { title: '供应商联系电话', dataIndex: 'supplierTelNo' },
    { title: '主要标的名称', dataIndex: 'subjectName' },
    { title: '主要标的单价', dataIndex: 'subjectUnitPrice' },
    { title: '合同金额', dataIndex: 'contractValue' },
    { title: '合同公告日期', dataIndex: 'announceDate' }
]

class MiniTable extends React.Component {

    componentDidMount() {
        this.fetchData();
    }

    // 向服务器请求数据
    fetchData = () => {
        const len = this.props.dataSource.length;

        // 没有数据则向服务端请求数据
        if (len === 0) {
            const loading = message.loading(messageType.Loading.FETCHING_DATA, 0);

            this.props.serverActions.fetchData(urls.contract_list)
                .then(resp => {
                    setTimeout(loading, 1);
                    return resp.data;
                })
                .then(data => {
                    if (data.code !== 200) {
                        message.warning(messageType.Warning.DATA_NOT_FOUND, 1.0);
                        return;
                    } else {
                        message.success(messageType.Success.FETCH_DATA_OK, 1.0);
                        return data.data;
                    }
                })
                .then(data => {
                    if (data != null) {
                        // 把请求到的数据填入到store中 
                        this.props.dataTableActions.fetchData(data);
                    }
                })
                .catch(() => {
                    setTimeout(loading, 1);
                    message.error(messageType.Error.ERROR_HAPPEN, 1.0);
                })
        }
    }

    render() {
        let dataSource = this.props.dataSource.map(contract => {
            return {
                // key用来定位每一行
                key: contract.id,
                ...contract
            }
        });
        // 取前5条数据
        dataSource = dataSource.slice(0, 5);
        const tableColumns = columns.map(item => ({ ...item, align: 'center' }));

        return (
            <Row>
                <Col span={24}>
                    <Table
                        title={() => '最近5条数据'}
                        bordered
                        tableLayout='fixed'
                        pagination={false}
                        scroll={{ x: '200vw' }}
                        columns={tableColumns}
                        dataSource={dataSource} />
                </Col>
            </Row>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        dataSource: state.dataTable.dataSource
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dataTableActions: bindActionCreators(dataTableActions, dispatch),
        serverActions: bindActionCreators(serverActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MiniTable);