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

        const data = {
            id: Math.round(Math.random() * 1000),
            contractNo: this.state.contractNo,
            contractName: this.state.contractName,
            projectNo: this.state.projectNo,
            projectName: this.state.projectName,
            purchaser: this.state.purchaser,
            purchaserTelNo: this.state.purchaserTelNo,
            supplier: this.state.supplier,
            supplierTelNo: this.state.supplierTelNo,
            subjectName: this.state.subjectName,
            subjectUnitPrice: this.state.subjectUnitPrice,
            contractValue: this.state.contractValue,
            announceDate: this.state.announceDate,
            description: "我是一个段落"
        }
        this.props.dataTableActions.addRow(data);

        // 清空表单所有字段值
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

    // 取消
    onClickCancelButton = () => {
        this.props.handleVisibility(false);
    }

    // 当表单字段值更新触发的回调
    onValuesChange = (changedValues, allValues) => {
        // 更新字段值
        this.setState({
            contractNo: allValues.contractNo ? allValues.contractNo : '无',
            contractName: allValues.contractName ? allValues.contractName : '无',
            projectNo: allValues.projectNo ? allValues.projectNo : '无',
            projectName: allValues.projectName ? allValues.projectName : '无',
            purchaser: allValues.purchaser ? allValues.purchaser : '无',
            purchaserTelNo: allValues.purchaserTelNo ? allValues.purchaserTelNo : '无',
            supplier: allValues.supplier ? allValues.supplier : '无',
            supplierTelNo: allValues.supplierTelNo ? allValues.supplierTelNo : '无',
            subjectName: allValues.subjectName ? allValues.subjectName : '无',
            subjectUnitPrice: allValues.subjectUnitPrice ? allValues.subjectUnitPrice : 0,
            contractValue: allValues.contractValue ? allValues.contractValue : 0
        })
    }

    // 当时间发生变化的回调
    onDatePickerValueChange = (date, dateString) => {
        this.setState({ announceDate: dateString })
    }

    getFormattedDate() {
        const date = new Date();
        const formattedDate = date.toLocaleDateString().split('/').join('-');

        return formattedDate;
    }

    render() {
        return (
            <Modal
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
                                <Input />
                            </Form.Item>
                            <Form.Item label="合同名称" name='contractName'>
                                <Input />
                            </Form.Item>
                            <Form.Item label="项目编号" name='projectNo'>
                                <Input />
                            </Form.Item>
                            <Form.Item label="项目名称" name='projectName'>
                                <Input />
                            </Form.Item>
                            <Form.Item label="采购人(甲方)" name='purchaser'>
                                <Input />
                            </Form.Item>
                            <Form.Item label="采购人联系电话" name='purchaserTelNo'>
                                <Input />
                            </Form.Item>
                            <Form.Item label="供应商(乙方)" name='supplier'>
                                <Input />
                            </Form.Item>
                            <Form.Item label="供应商联系电话" name='supplierTelNo'>
                                <Input />
                            </Form.Item>
                            <Form.Item label="主要标的名称" name='subjectName'>
                                <Input />
                            </Form.Item>
                            <Form.Item label="主要标的单价" name='subjectUnitPrice'>
                                <InputNumber defaultValue={0} />
                            </Form.Item>
                            <Form.Item label="合同金额" name='contractValue'>
                                <InputNumber defaultValue={0} />
                            </Form.Item>
                            <Form.Item label="合同公告日期" name='annouceDate'>
                                <DatePicker
                                    defaultValue={moment(this.getFormattedDate(), 'YYYY-MM-DD')}
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