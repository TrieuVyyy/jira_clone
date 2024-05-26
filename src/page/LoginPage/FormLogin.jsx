import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { https } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import {
  MailFilled,
  LockFilled,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";

const FormLogin = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    https
      .post("/api/Users/signin", values)
      .then((res) => {
        // chuyển hướng user về home sau khi đăng nhập thành công
        navigate("/projectmanager");
        // đẩy data lên redux
        dispatch(setUser(res.data.content));
        message.success("Login successfully");
      })
      .catch((err) => {
        message.error("Login failed. Please try again.");
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-form space-y-5">
      <div className="flex justify-between items-center space-x-5">
        <h2 className="title text-center font-semibold font-mono">Login</h2>
        <a href="/signup" className="no-underline text-xs font-mono">
          Don't have an account?
        </a>
      </div>
      <Form
        name="normal_login"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<MailFilled />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="passWord"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password prefix={<LockFilled />} placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" noStyle>
          <div className="flex justify-between">
            <Checkbox className="text-xs font-mono">Remember me</Checkbox>
            <a className="no-underline text-xs font-mono" href="">
              Forgot password
            </a>
          </div>
        </Form.Item>

        <Form.Item className="py-4">
          <Button
            className="bg-blue-600"
            type="primary"
            htmlType="submit"
            style={{ width: "100%", color: "#fff" }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <div className="social flex justify-center space-x-4">
        <Button
          className="bg-blue-800"
          type="primary"
          shape="circle"
          icon={<FacebookFilled />}
          size={"large"}
        />
        <Button
          className="bg-sky-500"
          type="primary"
          shape="circle"
          icon={<TwitterOutlined />}
          size={"large"}
        />
      </div>
    </div>
  );
};
export default FormLogin;
