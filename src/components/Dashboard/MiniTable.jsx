// React 
import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Redux 
import * as dataTableActions from '../../redux/actions/dataTable';
import * as serverActions from '../../utils/network';

// Ant Design组件库
import { Table, message } from 'antd';

// Util
import urls from '../../constants/urls';

const columns = [
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

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const len = this.props.dataSource.length;

        // 没有数据则向服务端请求数据
        if (len == 0) {
            const loading = message.loading('数据加载中...', 0);

            this.props.serverActions.fetchData(urls.contract_list)
                .then(resp => {
                    setTimeout(loading, 1);
                    return resp.data;
                })
                .then(data => {
                    if (data.msg != 'OK') {
                        message.error('数据加载失败！', 1.0);
                        return;
                    } else {
                        // data这个字段名字没取好...
                        message.success('数据加载成功！', 1.0);
                        return data.data;
                    }
                })
                .then(data => {
                    // 把请求到的数据填入到store中
                    this.props.dataTableActions.fetchData(data);
                })
                .catch(() => {
                    setTimeout(loading, 1);
                    message.error("发生错误！");
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
        dataSource = dataSource.slice(0, 5);
        const tableColumns = columns.map(item => ({ ...item, align: 'center' }));

        return (
            <Table
                bordered
                tableLayout='fixed'
                pagination={{ pageSize: 5 }}
                scroll={{ x: '200vw' }}
                columns={tableColumns}
                pagination={false}
                dataSource={dataSource}
            />
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