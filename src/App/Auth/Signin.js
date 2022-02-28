import { useState } from "react";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import classNames from "./Auth.module.scss";
import API from "../Api";
import { EmailInput, PasswordInput, SubmitBtn } from "./Common";
import { validation } from "../validation";

const Signin = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOnfinish = (input) => {
    setLoading(true);
    API.post("/user/signin", {
      username: input.username,
      password: input.password,
    })
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          message.success("Login successfully!");
          window.localStorage.setItem(
            "MANGO.loggedUser",
            JSON.stringify(res.data.data.data)
          );
          navigate("/");
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
          <EmailInput name={"username"} label="Email" />
          <PasswordInput
            name={"password"}
            label="Password"
            rules={[
              { required: true, message: validation.password.required },
              { min: 8, message: validation.password.min },
              { max: 16, message: validation.password.max },
            ]}
            placeholder={validation.password.placeholder}
          />
          <SubmitBtn
            classNames={classNames}
            displayLabel="Sign in"
            onClick={form.submit}
            loading={loading}
          />
        </Form>
      </div>
    </div>
  );
};

export default Signin;
