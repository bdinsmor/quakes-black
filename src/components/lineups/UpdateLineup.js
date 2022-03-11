import React, { useState, useEffect } from 'react';

import DataService from '../../services/DataService';
import { notification, Input, Button, Row, Col, Form, Space, Divider, Typography, Skeleton } from 'antd';

import { CloseOutlined } from '@ant-design/icons';

const UpdateLineup = (props) => {
  const [form] = Form.useForm();
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async function () {
      setIsLoading(true);
      setIsNew(props.isNew);
      form.setFieldsValue(props.option);

      setIsLoading(false);
    };
    init();
  }, [form, props.isNew, props.option]);

  const save = async (values) => {
    setIsLoading(true);
    try {
      const updates = {
        id: props.option.id,
        optionId: props.option.optionId && props.option.optionId !== '' ? props.option.optionId : values.optionId,
        optionName: values.optionName,
        optionValue: values.value,
        optionFamilyId: values.openFamilyId,
        sizeClassId: props.option.sizeClassId,
        modelYear: props.option.modelYear,
      };

      await DataService.updateOption(isNew, updates);
      form.resetFields();
      setIsLoading(false);
      notification.success({
        message: 'Option Updated',
        duration: 2,
      });
      if (props.onSaveSuccess) props.onSaveSuccess();
    } catch (e) {
      notification.error({
        message: 'Error Updating Option',
        duration: 2,
      });
      setIsLoading(false);
    }
  };

  const cancel = () => {
    form.resetFields();
    if (props.onCancel) props.onCancel();
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Skeleton active loading={isLoading}></Skeleton>
      <Form scrollToFirstError={true} hidden={isLoading} onFinish={save} form={form} layout="vertical" hideRequiredMark>
        <Row align="middle">
          <Col>
            <div>
              <Typography style={{ fontSize: '20px' }}>
                {props.option.sizeClassId && props.option.modelYear && (
                  <span>
                    Size Class Id: {props.option.sizeClassId} | Model Year: {props.option.modelYear}
                  </span>
                )}
                {(!props.option.sizeClassId || !props.option.modelYear) && <span>New Option</span>}
              </Typography>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              name="optionName"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Option Name cannot be empty',
                },
              ]}
            >
              <Input placeholder="Option Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              name="optionValue"
              label="Value"
              rules={[
                {
                  required: true,
                  message: 'Option Value cannot be empty',
                },
              ]}
            >
              <Input placeholder="Option Value" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item name="optionFamilyId" label="Family Id">
              <Input placeholder="Family Id" />
            </Form.Item>
          </Col>
        </Row>
        <Space>
          <Form.Item>
            <Button className="login-form-button" icon={<CloseOutlined />} type="ghost" onClick={() => cancel()}>
              Cancel
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Space>
  );
};

export default UpdateLineup;
