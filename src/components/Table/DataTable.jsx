// React 
import React from 'react';

// Redux
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

// Redux Action
import * as dataTableActions from '../../redux/actions/dataTable';

// Ant Design组件库 & css
import 'antd/dist/antd.css';
import { Table, Switch, Radio, Form, Button, Modal } from 'antd';

// 组件
import InfoEditor from './InfoEditor';

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
    { title: '合同公告日期', dataIndex: 'announceDate' },
]

class DataTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // 表格相关
            bordered: false,
            expandable: this.expandable,
            scroll: { x: '200vw' },
            hasData: true,
            tableLayout: 'fixed',
            selectedRowKeys: [],
            rowNumber: 0,
            // button相关
            deleteButtonDisabled: true,
            deleteRowsConfirmationVisible: false,
            infoEditorVisible: false
        };

        // 展开后的内容
        this.expandable = {
            expandedRowRender: item => {
                return (
                    <div>
                        <Button type='primary'>编辑此行</Button>
                    </div>

                )
            }
        };

        // 选中行时触发
        this.rowSelection = {
            onChange: (selectedRowKeys) => {
                let deleteButtonDisabled = true;
                // 按钮是否可以点击
                deleteButtonDisabled = selectedRowKeys.length == 0 ? true : false;
                this.setState({
                    deleteButtonDisabled, selectedRowKeys
                })
            }
        }
    }

    // 组件加载后执行这个回调
    componentDidMount() { }

    // 切换边框状态
    handleToggle = prop => enable => {
        this.setState({ [prop]: enable });
    };

    // 切换表格布局
    handleTableLayoutChange = e => {
        this.setState({ tableLayout: e.target.value });
    };

    // 添加行
    onClickAddRowButton = () => {
        // 弹出编辑框
        this.setState({ infoEditorVisible: true });
    }

    // 子组件会调用这个回调
    handleInfoEditorVisible = (visible) => {
        this.setState({ infoEditorVisible: visible })
    }

    // 点击删除按钮时触发这个回调
    onClickDeleteRowsButton = () => {
        // 弹出提示框
        this.setState({ deleteRowsConfirmationVisible: true });
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
            deleteButtonDisabled: currentRowNumber == 0 || selectedRowKeys.length
        })
    }

    // 确认删除行
    handleDeleteRowsOK = () => {
        this.setState({ deleteRowsConfirmationVisible: false });
        this.deleteRows(this.state.selectedRowKeys);
    }

    // 取消删除行
    handleDeleteRowsCancel = () => {
        this.setState({ deleteRowsConfirmationVisible: false });
    }

    render() {
        const state = this.state;

        const dataSource = this.props.dataSource.map(contract => {
            return {
                // key用来定位每一行
                key: contract.id,
                ...contract
            }
        })
        const tableColumns = columns.map(item => ({ ...item, align: 'center' }));

        return (
            <div>
                {/* 用于设置Table的表单 */}
                <Form
                    layout="inline"
                    className="components-table-demo-control-bar"
                    style={{ marginBottom: 16, marginLeft: 16, marginRight: 16 }}>
                    <Form.Item label="边框">
                        <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
                    </Form.Item>

                    <Form.Item label="表格布局">
                        <Radio.Group value={state.tableLayout} onChange={this.handleTableLayoutChange}>
                            <Radio.Button value={undefined}>默认</Radio.Button>
                            <Radio.Button value='fixed'>固定</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            disabled={this.state.deleteButtonDisabled}
                            style={{ marginRight: 5 }}
                            onClick={this.onClickDeleteRowsButton}>
                            删除
                        </Button>
                        <Button
                            type='primary'
                            onClick={this.onClickAddRowButton}>
                            添加
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='default'
                            style={{ marginRight: 5 }}>
                            保存
                        </Button>
                        <Button
                            type='default'>
                            导出
                        </Button>
                    </Form.Item>
                </Form>

                {/* Table */}
                <Table
                    {...this.state}
                    expandable={this.expandable}
                    rowSelection={this.rowSelection}
                    columns={tableColumns}
                    dataSource={state.hasData ? dataSource : null}
                    scroll={state.scroll}
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
                    handleVisibility={this.handleInfoEditorVisible} />
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataSource: state.dataTable.dataSource
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dataTableActions: bindActionCreators(dataTableActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);