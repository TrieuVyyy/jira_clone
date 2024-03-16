import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { https } from "../../service/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import {
  AiOutlineMail,
  AiFillLock,
  AiOutlineUsergroupAdd,
  AiOutlinePhone,
} from "react-icons/ai";

const FormSignup = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    https
      .post("/api/Users/signup", values)
      .then((res) => {
        // chuyển hướng user về login sau khi đăng ký thành công
        navigate("/login");
        //đẩy data lên rudux
        dispatch(setUser(res.data.content));
        //lưu data xuống localStorege để  user load trang sẽ ko bị mất data
        let dataJson = JSON.stringify(res.data.content);
        localStorage.setItem("USER_INFOR", dataJson);
        message.success("Account created successfully!");
      })
      .catch((err) => {
        message.success("Signup failed");
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="signup-page ml-20 pt-32">
      <div className="signup-form-container">
        <h1 className="title text-center pb-4">Sign Up</h1>

        <Form
          name="basic"
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
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required!",
              },
            ]}
          >
            <Input prefix={<AiOutlineUsergroupAdd />} placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Phone Number is required!",
              },
            ]}
          >
            <Input prefix={<AiOutlinePhone />} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Email is required!",
              },
            ]}
          >
            <Input prefix={<AiOutlineMail />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="passWord"
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
            ]}
          >
            <Input.Password prefix={<AiFillLock />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button className="bg-orange-400" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default FormSignup;
