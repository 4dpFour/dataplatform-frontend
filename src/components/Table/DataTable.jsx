// React 
import React from 'react';

// Redux
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

// Redux Action
import * as dataTableActions from '../../redux/actions/dataTable';
import * as dashboardActions from '../../redux/actions/dashboard';
import * as serverActions from '../../utils/network';

// Ant Design组件库 & css
import 'antd/dist/antd.css';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Switch, Radio, Form, Button, Modal, message, Input } from 'antd';

// 组件
import InfoEditor from './InfoEditor';

// Util
import { findIndex } from 'lodash';
import { exportData } from '../../utils/exportData';

// Constants
import urls from '../../constants/urls';
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

class DataTable extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            // 表格相关
            selectedRowKeys: [],
            rowNumber: 0,
            // button相关
            addButtonDisabled: false,
            deleteButtonDisabled: true,
            editRowButtonDisabled: true,
            // 提示框相关
            deleteRowsConfirmationVisible: false,
            infoEditorVisible: false,
            selectedRowData: {},
            // 输入框相关
            isQuerying: false
        };

        // 选中行时触发
        this.rowSelection = {
            onChange: (selectedRowKeys) => {
                let addButtonDisabled = true;
                let deleteButtonDisabled = true;
                let editRowButtonDisabled = true;
                let selectedRowData = {};

                // 按钮是否可以点击
                addButtonDisabled = selectedRowKeys.length === 0 ? false : true;
                deleteButtonDisabled = selectedRowKeys.length === 0 ? true : false;
                editRowButtonDisabled = selectedRowKeys.length === 1 ? false : true;

                // 当selectedRowKeys长度为1时表示可以编辑
                const selectedRowKey = selectedRowKeys.length === 1 ? selectedRowKeys[0] : -1;
                if (selectedRowKey !== -1) {
                    const targetIndex = findIndex(this.props.dataSource, { id: selectedRowKey });
                    selectedRowData = this.props.dataSource[targetIndex];
                }

                // 当selectedRowKeys长度为0时清空selectedRowData
                if (selectedRowKeys.length == 0) {
                    this.setState({ selectedRowData: {} });
                }

                // 更新状态
                this.setState({
                    selectedRowKeys,
                    addButtonDisabled,
                    deleteButtonDisabled,
                    editRowButtonDisabled,
                    selectedRowData
                });
            }
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    // 向服务器请求数据
    fetchData = () => {
        const len = this.props.dataSource.length;

        // 没有数据则向服务端请求数据
        if (len == 0) {
            const loading = message.loading(messageType.Loading.FETCHING_DATA, 0);

            this.props.serverActions.fetchData(urls.contract_list)
                .then(resp => {
                    setTimeout(loading, 1);
                    return resp.data;
                })
                .then(data => {
                    if (data.code != 200) {
                        message.warning(messageType.Warning.DATA_NOT_FOUND, 1.0);
                        return;
                    } else {
                        // data这个字段名字没取好...
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
                .catch(err => {
                    setTimeout(loading, 1);
                    message.error(messageType.Error.ERROR_HAPPEN);
                });
        }
    }

    // 重新向服务器获取数据
    refetchData = () => {
        const loading = message.loading(messageType.Loading.FETCHING_DATA, 0);

        this.props.serverActions.fetchData(urls.contract_list)
            .then(resp => {
                setTimeout(loading, 1);
                return resp.data;
            })
            .then(data => {
                if (data.code != 200) {
                    message.warning(messageType.Warning.DATA_NOT_FOUND, 1.0);
                    return;
                } else {
                    // data这个字段名字没取好...
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
            .catch(err => {
                setTimeout(loading, 1);
                message.error(messageType.Error.ERROR_HAPPEN);
            });
    }

    toggleBorder = () => {
        const bordered = this.props.bordered;
        this.props.dataTableActions.toggleBorder(!bordered);
    }

    // 切换表格布局
    handleTableLayoutChange = e => {
        this.props.dataTableActions.toggleLayout(e.target.value);
    };

    // 添加行
    onClickAddRowButton = () => {
        // 弹出编辑框
        this.setState({ infoEditorVisible: true });
    }

    // 编辑行
    onClickEditRowButton = () => {
        // 弹出编辑框
        this.setState({ infoEditorVisible: true });
    }

    updateSelectedRowData = (data) => {
        this.setState({
            selectedRowData: data
        })
    }

    // 设置弹出框的可视状态
    handleInfoEditorVisible = (visible) => {
        this.setState({ infoEditorVisible: visible })
    }

    // 点击删除按钮时触发这个回调
    onClickDeleteRowsButton = () => {
        // 弹出提示框
        this.setState({ deleteRowsConfirmationVisible: true });
    }

    // 导出文件
    onClickExportButton = () => {
        exportData(this.props.dataSource);
        message.success(messageType.Success.EXPORT_DATA_OK, 1.0);
    }

    // 点击爬取按钮时触发的回调
    onClickCrawlButton = () => {
        const loading = message.loading(messageType.Loading.CRAWLING_DATA, 0);

        this.props.serverActions.crawlData(urls.contract_crawl)
            .then(resp => {
                setTimeout(loading, 1);
                return resp.data;
            })
            .then(data => {
                if (data.code == 200) {
                    const increment = data.data.increment;
                    this.props.dashboardActions.setIncrement(increment);
                    message.success(messageType.Success.CRAWL_DATA_OK(increment), 1.0);
                    // 重新向服务器请求数据
                    this.refetchData();
                } else {
                    message.warning(data.msg, 1.0);
                    return;
                }
            })
            .catch(() => {
                setTimeout(loading, 1);
                message.error(messageType.Error.ERROR_HAPPEN, 1.0);
            });
    }


    // 删除行
    deleteRows = (selectedRowKeys) => {
        const loading = message.loading(messageType.Loading.DELETING_DATA, 0);

        const config = {
            data: {
                ids: selectedRowKeys
            }
        }
        this.props.serverActions.deleteRows(urls.delete_rows, config)
            .then(resp => {
                setTimeout(loading, 1);
                return resp.data;
            })
            .then(data => {
                // 成功删除
                if (data.code == 200) {
                    message.success(messageType.Success.DELETE_DATA_OK, 1.0);
                    this.props.dataTableActions.deleteRows(selectedRowKeys);

                    // state中更新rowNumber
                    const currentRowNumber = this.props.dataSource.length - selectedRowKeys.length;
                    this.setState({
                        rowNumber: currentRowNumber,
                        selectedRowKeys: [],
                        selectedRowData: {},
                        // 当前没有数据或未选中行
                        deleteButtonDisabled: currentRowNumber === 0 || selectedRowKeys.length,
                        addButtonDisabled: false
                    })
                } else {
                    message.error(messageType.Error.DELETE_DATA_FAIL, 1.0);
                }
            })
            .catch(() => {
                setTimeout(loading, 1);
                message.error(messageType.Error.ERROR_HAPPEN);
            });
    }

    // 确认删除行
    handleDeleteRowsOK = () => {
        this.setState({
            deleteRowsConfirmationVisible: false,
            editRowButtonDisabled: true
        });
        this.deleteRows(this.state.selectedRowKeys);
    }

    // 取消删除行
    handleDeleteRowsCancel = () => {
        this.setState({ deleteRowsConfirmationVisible: false });
    }

    // 点击重置按钮
    onClickResetButton = () => {
        this.setState({
            isQuerying: false
        });
        this.props.dataTableActions.queryData([]);
    }

    // 查询数据
    queryData = () => {
        const ref = this.formRef.current;
        const queryString = ref.getFieldValue('query');
        this.setState({ isQuerying: true });
        const loading = message.loading(messageType.Loading.QUERYING_DATA, 0);

        this.props.serverActions.queryData(urls.query_data, queryString)
            .then(resp => {
                setTimeout(loading, 1);
                return resp.data;
            })
            .then(data => {
                // 查询到
                if (data.code == 200) {
                    message.success(messageType.Success.QUERY_DATA_OK, 1.0);
                    return data.data;
                }
                // 未查询到
                else {
                    message.warning(messageType.Warning.QUERY_DATA_NOT_FOUND, 1.0);
                    return;
                }
            })
            .then(data => {
                if (data != null) {
                    this.props.dataTableActions.queryData(data);
                }
            })
            .catch(() => {
                setTimeout(loading, 1);
                message.error(messageType.Error.ERROR_HAPPEN, 1.0);
            });
    }

    render() {
        const { addButtonDisabled, editRowButtonDisabled, deleteButtonDisabled, isQuerying } = this.state;
        const { bordered } = this.props;

        let dataSource = [];
        // 查询状态下
        if (isQuerying) {
            dataSource = this.props.queriedDataSource;
        }
        // 非查询状态下
        else {
            dataSource = this.props.dataSource;
        }
        dataSource = dataSource.map(contract => {
            return {
                // key用来定位每一行
                key: contract.id,
                ...contract
            }
        });
        const tableColumns = columns.map(item => ({ ...item, align: 'center' }));

        return (
            <div>
                {/* 用于设置Table的表单 */}
                <Form
                    ref={this.formRef}
                    layout="inline"
                    className="components-table-demo-control-bar"
                    style={{ marginBottom: 16, marginLeft: 16, marginRight: 16 }}>
                    <Form.Item label="边框">
                        <Switch checked={bordered} onChange={this.toggleBorder} />
                    </Form.Item>

                    <Form.Item label="表格布局">
                        <Radio.Group value={this.props.layout} onChange={this.handleTableLayoutChange}>
                            <Radio.Button value={undefined}>默认</Radio.Button>
                            <Radio.Button value='fixed'>固定</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            disabled={addButtonDisabled}
                            onClick={this.onClickAddRowButton}>
                            添加
                        </Button>
                        <Button
                            type='primary'
                            disabled={deleteButtonDisabled}
                            style={{ marginLeft: 5 }}
                            onClick={this.onClickDeleteRowsButton}>
                            删除
                        </Button>
                        <Button
                            type='primary'
                            disabled={editRowButtonDisabled}
                            onClick={this.onClickEditRowButton}
                            style={{ marginLeft: 4 }}>
                            编辑
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='default'
                            style={{ marginRight: 5 }}
                            onClick={this.onClickCrawlButton}>
                            爬取
                        </Button>
                        <Button
                            type='default'
                            onClick={this.onClickExportButton}>
                            导出
                        </Button>
                    </Form.Item>

                    <Form.Item name='query'>
                        <Input
                            placeholder='查询'
                            prefix={<SearchOutlined />}
                            onPressEnter={this.queryData} />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            style={{ marginLeft: -10 }}
                            onClick={this.onClickResetButton}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>

                {/* Table */}
                <Table
                    bordered={this.props.bordered}
                    tableLayout={this.props.layout}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: '200vw' }}
                    rowSelection={this.rowSelection}
                    columns={tableColumns}
                    dataSource={dataSource}
                />

                {/* 删除行提示框 */}
                <Modal
                    visible={this.state.deleteRowsConfirmationVisible}
                    title='提示'
                    okText='确认'
                    cancelText='取消'
                    onOk={this.handleDeleteRowsOK}
                    onCancel={this.handleDeleteRowsCancel}>
                    确定要删除吗？
                </Modal>
                {/* 添加行提示框 */}
                <InfoEditor
                    visible={this.state.infoEditorVisible}
                    handleVisibility={this.handleInfoEditorVisible}
                    selectedRowKey={this.state.selectedRowKeys.length !== 1 ? -1 : this.state.selectedRowKeys[0]}
                    selectedRowData={this.state.selectedRowData}
                    updateSelectedRowData={this.updateSelectedRowData} />
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataSource: state.dataTable.dataSource,
        queriedDataSource: state.dataTable.queriedDataSource,
        bordered: state.dataTable.bordered,
        layout: state.dataTable.layout
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dataTableActions: bindActionCreators(dataTableActions, dispatch),
        dashboardActions: bindActionCreators(dashboardActions, dispatch),
        serverActions: bindActionCreators(serverActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);