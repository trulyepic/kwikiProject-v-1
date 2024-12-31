import { Button, Form, Input, message, Upload } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveSeries } from "../../api/api";
import "./AddSeries.css";

const { TextArea } = Input;

const AddSeries = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (file) => {
    const isPngOrJpg = file.type === "image/png" || file.type === "image/jpeg";
    if (!isPngOrJpg) {
      message.error("Only PNG or JPG file are allowed.");
      return false;
    }

    // validate image dimentions
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width !== 350 || img.height < 350 || img.height > 500) {
        message.error("Image dimentions must be 350x350and height <= 500.");
        return false;
      }
      setImageFile(file);
    };
    return false; //prevent auto-upload
  };

  const handleSubmit = async (values) => {
    if (!imageFile) {
      message.error("Please upload a valid image.");
      return;
    }

    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    formData.append("image", imageFile);

    try {
      await saveSeries(formData);
      message.success("Series added successfully!");
      navigate("/seriesList");
    } catch (error) {
      message.error("Error adding series. ");
    }
  };

  return (
    <div className="add-series-page-container">
      <span className="add-series-header">Enter New Series Detail</span>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="add-series-form"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please enter the series title." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="genre"
          label="Genre"
          rules={[{ required: true, message: "Please enter the genre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="director"
          label="Director"
          rules={[
            { required: true, message: "Please enter the director's name." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="writer"
          label="Writer"
          rules={[
            { required: true, message: "Please enter the writer's name." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="network"
          label="Network"
          rules={[
            { required: true, message: "Please enter the network name." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="seasons"
          label="Seasons"
          rules={[
            { required: true, message: "Please enter the number of seasons." },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="episode"
          label="Episodes"
          rules={[
            { required: true, message: "please enter the number of episodes." },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="originalRelease"
          label="Original Release"
          rules={[
            { required: true, message: "Please enter the release data." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload beforeUpload={handleFileChange} listType="picture">
            <Button>click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block className="submit-btn">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSeries;
