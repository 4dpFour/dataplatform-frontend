// React
import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Redux Action
import * as serverActions from '../../utils/network';
import * as urlConfigActions from '../../redux/actions/urlConfig';

// Ant Design组件库
import { Form, Button, Checkbox, Radio, Row, Col, message, Upload } from 'antd';

// Util
import urls from '../../constants/urls';
import * as urlConfigContant from '../../constants/urlConfig';
import messageType from '../../constants/messageType';
import { findIndex } from 'lodash';

const createTitle = (text) => {
    return (
        <h3>
            {text}
        </h3>
    )
}

const instructionInfo = () => {
    return (
        <div>
            <p style={{ fontSize: 10, color: '#D8D8D8', marginTop: 10 }}>
                导入文件的内容请使用回车键分隔。例如：
            </p>
            <p style={{ fontSize: 10, color: '#D8D8D8', marginTop: 10 }}>
                文件名：test.txt<br />
                文件内容：<br />
                中国政府采购网<br />
                北京市政府采购网<br />
                安徽省政府采购网<br />
            </p>
        </div>
    )
}

class UrlConfigForm extends React.Component {

    // checkbox的值发生变化时触发的回调
    onCheckboxValuesChange = (list) => {
        this.props.urlConfigActions.saveSelectedUrls(list);
    }

    // 点击保存按钮触发的回调
    onClickSaveButton = () => {
        if (this.props.selectedUrls.length == 0) {
            message.warning(messageType.Warning.EMPTY_URL_CONFIG, 1.0);
            return;
        }

        this.saveUrls(this.props.selectedUrls);
    }

    // 保存网址
    saveUrls = (sources) => {
        const loading = message.loading(messageType.Loading.SAVING_URLS, 0);

        const data = { urls: sources }
        this.props.serverActions.saveUrls(urls.url_submit, data)
            .then(resp => {
                setTimeout(loading, 1);
                return resp.data;
            })
            .then(data => {
                if (data.code == 200) {
                    message.success(messageType.Success.SAVE_URLS_OK, 1.0);
                    this.props.urlConfigActions.saveUrls(sources);
                } else {
                    message.error(data.msg, 1.0);
                    return;
                }
            })
            .catch(() => {
                setTimeout(loading, 1);
                message.error(messageType.Error.ERROR_HAPPEN, 1.0);
            });
    }

    render() {
        const importFileButtonProps = {
            // 选择了文件后不自动上传
            beforeUpload: file => {
                const reader = new FileReader();
                reader.onload = () => {
                    let matchSources = [];
                    const sources = reader.result.split('\n').filter(item => item != "");
                    sources.forEach(item => {
                        if (findIndex(urlConfigContant.defaultSources, val => val == item) != -1) {
                            matchSources.push(item);
                        }
                    });
                    if (matchSources.length >= 1) {
                        message.success(messageType.Success.IMPORT_CONFIG_OK, 1.0);
                        this.props.urlConfigActions.saveSelectedUrls(matchSources);
                    } else {
                        message.error(messageType.Error.IMPORT_CONFIG_FAIL, 1.0);
                    }
                }
                reader.readAsText(file, 'utf-8');

                return false;
            }
        }

        return (
            <>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="vertical">
                    <Form.Item
                        label={createTitle('配置方式')}
                        name="method">
                        <Upload {...importFileButtonProps}>
                            <Button style={{ marginRight: 10 }} type='dashed'>
                                文件导入
                            </Button>
                        </Upload>
                        {instructionInfo()}
                    </Form.Item>
                    <Form.Item label={createTitle('手动选择')} style={{marginTop: -10}}>
                        <Checkbox.Group
                            style={{ width: '100%' }}
                            onChange={this.onCheckboxValuesChange}
                            value={this.props.selectedUrls}
                            defaultValue={this.props.selectedUrls}>
                            <Row>
                                {
                                    urlConfigContant.defaultSources.map(item => {
                                        return (
                                            <Col span={6}>
                                                <Checkbox key={item} value={item}>
                                                    {item}
                                                </Checkbox>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary' onClick={this.onClickSaveButton}>保存设置</Button>
                    </Form.Item>
                </Form>
            </>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        urls: state.urlConfig.urls,
        selectedUrls: state.urlConfig.selectedUrls
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        serverActions: bindActionCreators(serverActions, dispatch),
        urlConfigActions: bindActionCreators(urlConfigActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlConfigForm);