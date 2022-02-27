import { useState } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../Api";
import { validation } from "../validation";
import classNames from "./Auth.module.scss";
import { EmailInput, PasswordInput, SubmitBtn } from "./Common";

const Signup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOnfinish = (input) => {
    setLoading(true);
    API.post("/user/signup", {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
    })
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          message.success("Registered successfully!");
          navigate("/signin");
        } else {
          message.error(res.data?.error?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error(error?.message);
      });
  };

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.authCardWrapper}>
        <Form
          requiredMark={false}
          layout="vertical"
          form={form}
          onFinish={handleOnfinish}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: validation.firstName.required }]}
          >
            <Input placeholder={validation.firstName.placeholder} />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: validation.lastName.required }]}
          >
            <Input placeholder={validation.lastName.placeholder} />
          </Form.Item>
          <EmailInput name={"email"} label="Email" />
          <PasswordInput
            name={"password"}
            label="Password"
            rules={[
              { required: true, message: validation.email.required },
              { min: 8, message: validation.password.min },
              { max: 16, message: validation.password.max },
            ]}
            placeholder={validation.password.placeholder}
          />
          <PasswordInput
            name={"confirmPassword"}
            label="Confirm Password"
            rules={[
              { required: true, message: validation.confirmPassword.required },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(validation.confirmPassword.match)
                  );
                },
              }),
            ]}
            placeholder={validation.confirmPassword.placeholder}
          />
          <SubmitBtn
            classNames={classNames}
            displayLabel="Sign up"
            onClick={form.submit}
            loading={loading}
          />
        </Form>
      </div>
    </div>
  );
};

export default Signup;
