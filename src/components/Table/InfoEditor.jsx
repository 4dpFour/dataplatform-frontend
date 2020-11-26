// React
import React from 'react';

// Redux 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux Action
import * as dataTableActions from '../../redux/actions/dataTable';

// Ant Design组件库
import { Form, Modal, Input, DatePicker, InputNumber } from 'antd';

// Date
import moment from 'moment';

class InfoEditor extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        // 初始状态
        this.state = {
            // 表单值
            contractNo: '无',
            contractName: '无',
            projectNo: '无',
            projectName: '无',
            purchaser: '无',
            purchaserTelNo: '无',
            supplier: '无',
            supplierTelNo: '无',
            subjectName: '无',
            subjectUnitPrice: 0,
            contractValue: 0,
            announceDate: this.getFormattedDate(),
        }
    }

    // 确认
    onClickOKButton = () => {
        this.props.handleVisibility(false);
        const { selectedRowKey } = this.props;

        // 添加行
        if (selectedRowKey == -1) {
            this.addRow();
        }
        // 更新行
        else {
            this.updateRow(selectedRowKey);
        }

        this.clearFieldsValue();
    }

    // 取消
    onClickCancelButton = () => {
        this.props.handleVisibility(false);
    }

    // 添加行
    addRow = () => {
        const { contractNo, contractName,
            projectNo, projectName,
            purchaser, purchaserTelNo,
            supplier, supplierTelNo,
            subjectName, subjectUnitPrice, contractValue, announceDate } = this.state;
        const newData = {
            id: Math.round(Math.random() * 10000),
            contractNo: contractNo,
            contractName: contractName,
            projectNo: projectNo,
            projectName: projectName,
            purchaser: purchaser,
            purchaserTelNo: purchaserTelNo,
            supplier: supplier,
            supplierTelNo: supplierTelNo,
            subjectName: subjectName,
            subjectUnitPrice: subjectUnitPrice,
            contractValue: contractValue,
            announceDate: announceDate
        }
        this.props.dataTableActions.addRow(newData);
    }

    // 更新行
    updateRow = (selectedRowKey) => {
        const ref = this.formRef.current;
        let selectedRowData = this.props.selectedRowData;
        selectedRowData = {
            id: selectedRowData.id,
            contractNo: ref.getFieldValue('contractNo') ? ref.getFieldValue('contractNo') : selectedRowData.contractNo,
            contractName: ref.getFieldValue('contractName') ? ref.getFieldValue('contractName') : selectedRowData.contractName,
            projectNo: ref.getFieldValue('projectNo') ? ref.getFieldValue('projectNo') : selectedRowData.projectNo,
            projectName: ref.getFieldValue('projectName') ? ref.getFieldValue('projectName') : selectedRowData.projectName,
            purchaser: ref.getFieldValue('purchaser') ? ref.getFieldValue('purchaser') : selectedRowData.purchaser,
            purchaserTelNo: ref.getFieldValue('purchaserTelNo') ? ref.getFieldValue('purchaserTelNo') : selectedRowData.purchaserTelNo,
            supplier: ref.getFieldValue('supplier') ? ref.getFieldValue('supplier') : selectedRowData.supplier,
            supplierTelNo: ref.getFieldValue('supplierTelNo') ? ref.getFieldValue('supplierTelNo') : selectedRowData.supplierTelNo,
            subjectName: ref.getFieldValue('subjectName') ? ref.getFieldValue('subjectName') : selectedRowData.subjectName,
            subjectUnitPrice: ref.getFieldValue('subjectUnitPrice') ? ref.getFieldValue('subjectUnitPrice') : selectedRowData.subjectUnitPrice,
            contractValue: ref.getFieldValue('contractValue') ? ref.getFieldValue('contractValue') : selectedRowData.contractValue,
            announceDate: ref.getFieldValue('announceDate') ? ref.getFieldValue('announceDate') : selectedRowData.announceDate
        }
        this.props.dataTableActions.updateRow(selectedRowKey, selectedRowData);
        this.props.updateSelectedRowData(selectedRowData);
        this.clearFieldsValue();
    }

    // 清空表单
    clearFieldsValue() {
        this.formRef.current.setFieldsValue({
            contractNo: '',
            contractName: '',
            projectNo: '',
            projectName: '',
            purchaser: '',
            purchaserTelNo: '',
            supplier: '',
            supplierTelNo: '',
            subjectName: '',
            subjectUnitPrice: 0,
            contractValue: 0,
            announceDate: this.getFormattedDate(),
        })
    }

    // 当表单字段值更新触发的回调
    onValuesChange = (changedValues, allValues) => {
        const { contractNo, contractName,
            projectNo, projectName,
            purchaser, purchaserTelNo,
            supplier, supplierTelNo,
            subjectName, subjectUnitPrice, contractValue } = this.state;
        // 更新字段值
        this.setState({
            contractNo: allValues.contractNo ? allValues.contractNo : contractNo,
            contractName: allValues.contractName ? allValues.contractName : contractName,
            projectNo: allValues.projectNo ? allValues.projectNo : projectNo,
            projectName: allValues.projectName ? allValues.projectName : projectName,
            purchaser: allValues.purchaser ? allValues.purchaser : purchaser,
            purchaserTelNo: allValues.purchaserTelNo ? allValues.purchaserTelNo : purchaserTelNo,
            supplier: allValues.supplier ? allValues.supplier : supplier,
            supplierTelNo: allValues.supplierTelNo ? allValues.supplierTelNo : supplierTelNo,
            subjectName: allValues.subjectName ? allValues.subjectName : subjectName,
            subjectUnitPrice: allValues.subjectUnitPrice ? allValues.subjectUnitPrice : subjectUnitPrice,
            contractValue: allValues.contractValue ? allValues.contractValue : contractValue
        })
    }

    // 当时间发生变化的回调
    onDatePickerValueChange = (date, dateString) => {
        this.setState({ announceDate: dateString });
        this.formRef.current.setFieldsValue({
            announceDate: dateString
        });
    }

    getFormattedDate() {
        const date = new Date();
        const formattedDate = date.toLocaleDateString().split('/').join('-');

        return formattedDate;
    }

    render() {
        const { selectedRowData } = this.props;

        return (
            <Modal
                destroyOnClose={true}
                title="编辑"
                okText='确认'
                cancelText='取消'
                visible={this.props.visible}
                onOk={this.onClickOKButton}
                onCancel={this.onClickCancelButton}>
                {
                    (
                        <Form
                            ref={this.formRef}
                            layout="vertical"
                            onValuesChange={this.onValuesChange}>
                            <Form.Item label="合同编号" name='contractNo'>
                                <Input defaultValue={selectedRowData.contractNo} />
                            </Form.Item>
                            <Form.Item label="合同名称" name='contractName' >
                                <Input defaultValue={selectedRowData.contractName} />
                            </Form.Item>
                            <Form.Item label="项目编号" name='projectNo'>
                                <Input defaultValue={selectedRowData.projectNo} />
                            </Form.Item>
                            <Form.Item label="项目名称" name='projectName'>
                                <Input defaultValue={selectedRowData.projectName} />
                            </Form.Item>
                            <Form.Item label="采购人(甲方)" name='purchaser'>
                                <Input defaultValue={selectedRowData.purchaser} />
                            </Form.Item>
                            <Form.Item label="采购人联系电话" name='purchaserTelNo'>
                                <Input defaultValue={selectedRowData.purchaserTelNo} />
                            </Form.Item>
                            <Form.Item label="供应商(乙方)" name='supplier'>
                                <Input defaultValue={selectedRowData.supplier} />
                            </Form.Item>
                            <Form.Item label="供应商联系电话" name='supplierTelNo'>
                                <Input defaultValue={selectedRowData.supplierTelNo} />
                            </Form.Item>
                            <Form.Item label="主要标的名称" name='subjectName'>
                                <Input defaultValue={selectedRowData.subjectName} />
                            </Form.Item>
                            <Form.Item label="主要标的单价" name='subjectUnitPrice'>
                                <InputNumber defaultValue={selectedRowData.subjectUnitPrice ? selectedRowData.subjectUnitPrice : 0} />
                            </Form.Item>
                            <Form.Item label="合同金额" name='contractValue'>
                                <InputNumber defaultValue={selectedRowData.contractValue ? selectedRowData.contractValue : 0} />
                            </Form.Item>
                            <Form.Item label="合同公告日期" name='annouceDate'>
                                <DatePicker
                                    defaultValue={moment(selectedRowData.announceDate ? selectedRowData.announceDate : this.getFormattedDate(), 'YYYY-MM-DD')}
                                    onChange={this.onDatePickerValueChange} />
                            </Form.Item>
                        </Form>
                    )
                }
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dataTableActions: bindActionCreators(dataTableActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(InfoEditor);