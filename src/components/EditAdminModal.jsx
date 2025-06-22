import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const EditAdminModal = ({ visible, record, onUpdate, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (record) {
      // Jangan set password agar tetap kosong
      const { password, ...rest } = record;
      form.setFieldsValue(rest);
    }
  }, [record, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onUpdate(values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Edit Admin"
      okText="Update"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="edit_admin_form">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input admin name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          tooltip="Leave blank to keep current password"
          hasFeedback
          rules={[]}
        >
          <Input.Password placeholder="Leave blank to keep current password" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select role!' }]}
        >
          <Select>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status!' }]}
        >
          <Select>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAdminModal;
