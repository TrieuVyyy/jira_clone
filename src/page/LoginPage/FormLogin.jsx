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
        navigate("/");
        // đẩy data lên redux
        dispatch(setUser(res.data.content));
        // lưu data xuống localStorage để user load trang sẽ không mất data
        let dataJson = JSON.stringify(res.data.content);
        localStorage.setItem("USER_INFOR", dataJson);
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
    <div className="login-page ml-20 pt-32">
      <div className="login-form-container">
        <h1 className="title text-center pb-4 font-semibold font-mono">
          Login CyberBugs
        </h1>
        <Form
          name="normal_login"
          layout="vertical"
          style={{
            maxWidth: 1000,
          }}
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

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="ml-28" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-blue-600"
              type="primary"
              htmlType="submit"
              style={{ width: "100%", color: "#fff" }}
            >
              Login
            </Button>
            Or <a href="/signup">sign up now!</a>
          </Form.Item>
        </Form>

        <div className="social flex justify-center">
          <Button
            className="bg-blue-800"
            type="primary"
            shape="circle"
            icon={<FacebookFilled />}
            size={"large"}
          />
          <Button
            className="bg-sky-500 ml-5"
            type="primary"
            shape="circle"
            icon={<TwitterOutlined />}
            size={"large"}
          />
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
