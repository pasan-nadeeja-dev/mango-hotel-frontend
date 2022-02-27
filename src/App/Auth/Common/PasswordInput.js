import { Form, Input } from "antd";

const PasswordInput = ({ name, label, rules, placeholder }) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input type="password" placeholder={placeholder} />
    </Form.Item>
  );
};

export default PasswordInput;
