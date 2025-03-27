import { Button, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/userApi";
import "./Auth.css";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (values) => {
    try {
      const userData = await loginUser(values);

        // Save JWT to localStorage
        localStorage.setItem("token", userData.token);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("roles", JSON.stringify(userData.roles));
      
        // ✅ Update context
        setUser({
          token: userData.token,
          username: userData.username,
          roles: userData.roles,
        });
      console.log("userData: ", userData);
      message.success("Login successful!");
      navigate("/");
    } catch (error) {
      message.error("Invalid username or password.");
    }
  };

  return (
    <div className="auth-page-container">
      <span className="auth-header">Login to Your Account</span>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin}
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
            Login
          </Button>
        </Form.Item>
        <div className="form-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
