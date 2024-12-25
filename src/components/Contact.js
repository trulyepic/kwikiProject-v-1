import React from "react";
import { Form, Input, Button } from "antd";
import "./Contact.css";
import Footer from "./Footer";

const Contact = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <React.Fragment>
      <div className="contact-container">
        <h1 className="contact-text">Contact Us</h1>
        <Form
          name="contact"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input className="contact-input" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input className="contact-input" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea rows={4} className="contact-input" />
          </Form.Item>

          <Form.Item>
            <div className="contact-button-wrapper">
              <Button
                type="primary"
                htmlType="submit"
                className="contact-button"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Contact;
