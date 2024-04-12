import React, { forwardRef } from "react";
import { Form, Input, InputNumber } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const FormComponent = forwardRef(({ user, onSubmit }, ref) => {
  const { name, email, phone, website } = user;

  const onFinish = (values) => {
    onSubmit(values.user);
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
      ref={ref}
      initialValues={user}
    >
      <Form.Item
        name={["user", "name"]}
        label="Name"
        initialValue={name}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        initialValue={email}
        rules={[
          {
            required: true,
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "phone"]}
        label="Phone"
        initialValue={phone}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["user", "website"]}
        label="Website"
        initialValue={website}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});

export default FormComponent;
