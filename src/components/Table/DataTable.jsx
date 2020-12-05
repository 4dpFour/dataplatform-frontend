// React 
import React from 'react';

// Redux
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

// Redux Action
import * as dataTableActions from '../../redux/actions/dataTable';
import * as mockServerActions from '../../utils/network';

// Ant Design组件库 & css
import 'antd/dist/antd.css';
import { Table, Switch, Radio, Form, Button, Modal, message } from 'antd';

// 组件
import InfoEditor from './InfoEditor';

// Util
import { findIndex } from 'lodash';
import { exportData } from '../../utils/exportData';

// Constants
import urls from '../../constants/urls';
import messageType from '../../constants/messageType';

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

class DataTable extends React.Component {

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
            selectedRowData: {}
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

                // 
                const selectedRowKey = selectedRowKeys.length === 1 ? selectedRowKeys[0] : -1;
                if (selectedRowKey !== -1) {
                    const targetIndex = findIndex(this.props.dataSource, { id: selectedRowKey });
                    selectedRowData = this.props.dataSource[targetIndex];
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
        const len = this.props.dataSource.length;
        if (len == 0) {
            this.props.mockServerActions.fetchData(urls.contract_list)
                .then(resp => resp.data)
                // data这个字段名字没取好...
                .then(data => data.data)
                .then(data => {
                    // 把请求到的数据填入到store中
                    this.props.dataTableActions.fetchData(data);
                })
        }
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
        message.success('导出成功！');
    }

    // 删除行
    deleteRows = (selectedRowKeys) => {
        this.props.dataTableActions.deleteRows(selectedRowKeys);

        // state中更新rowNumber
        const currentRowNumber = this.props.dataSource.length - selectedRowKeys.length;
        this.setState({
            rowNumber: currentRowNumber,
            selectedRowKeys: [],
            // 当前没有数据或未选中行
            deleteButtonDisabled: currentRowNumber === 0 || selectedRowKeys.length,
            addButtonDisabled: false
        })
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

    render() {
        const { addButtonDisabled, editRowButtonDisabled, deleteButtonDisabled } = this.state;
        const { bordered } = this.props;

        const dataSource = this.props.dataSource.map(contract => {
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
                            disabled={true}>
                            保存
                        </Button>
                        <Button
                            type='default'
                            onClick={this.onClickExportButton}>
                            导出
                        </Button>
                    </Form.Item>
                </Form>

                {/* Table */}
                <Table
                    bordered={this.props.bordered}
                    tableLayout={this.props.layout}
                    pagination={{ pageSize: 20 }}
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
        bordered: state.dataTable.bordered,
        layout: state.dataTable.layout
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dataTableActions: bindActionCreators(dataTableActions, dispatch),
        mockServerActions: bindActionCreators(mockServerActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);