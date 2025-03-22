import React from "react";
import { Button, Form, Input, message } from "antd";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      await registerUser(values);
      console.log("values :", values);
      message.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      message.error("Registration failed.");
    }
  };

  return (
    <div className="auth-page-container">
      <span className="auth-header">Create a New Account</span>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleRegister}
        className="auth-form"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true }]}
        >
          <Input className="auth-form-input" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password className="auth-form-input" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block className="submit-btn">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
