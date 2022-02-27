import { Form, Input } from "antd";
import { validation } from "../../validation";

const EmailInput = ({ name, label }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required: true, message: validation.email.required },
        { type: "email", message: validation.email.invalid },
      ]}
    >
      <Input placeholder={validation.email.placeholder} />
    </Form.Item>
  );
};

export default EmailInput;
