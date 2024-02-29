import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { https } from "../../service/api";

const FormSignup = () => {
  let navigate = useNavigate();
  const onFinish = (values) => {
    https
      .post("/api/Users/signup", values)
      .then((res) => {
        // chuyển hướng user về home sau khi đăng nhập thành công
        navigate("/login");
        message.success("Signup success");
      })
      .catch((err) => {
        message.success("Signup fail");
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Name"
        name="hoTen"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="soDt"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input />
      </Form.Item>



      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Button className="bg-orange-400" htmlType="submit">Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormSignup;
