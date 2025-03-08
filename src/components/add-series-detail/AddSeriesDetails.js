import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./AddSeriesDetails.css";
import { saveSeriesDetails, updateSeriesDetails } from "../../api/api";

const { TextArea } = Input;

const AddSeriesDetails = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [awards, setAwards] = useState([]);

  // check if editing an existing entry
  const isEditing = !!location.state?.seriesContent;
  const seriesContent = location.state?.seriesContent || {};

  useEffect(() => {
    if (isEditing) {
      //pre-populate from existing data
      form.setFieldsValue({
        synopsis: seriesContent.synopsis || "",
        development: seriesContent.development || "",
        awardsAndNominations: "",
        references: seriesContent.references || "",
        description: seriesContent.description || "",
        receptionAndImpact: seriesContent.receptionAndImpact || "",
      });

      // parse awards from stored JSON
      try {
        const parsedAwards = JSON.parse(
          seriesContent.awardsAndNominations || "{}"
        );
        setAwards(
          Object.entries(parsedAwards).map(([awardName, description]) => ({
            awardName,
            description,
          }))
        );
      } catch (error) {
        console.error("Error parsing awards JSON:", error);
      }
    }
  }, [isEditing, seriesContent, form]);

  const seriesData =
    location.state?.seriesData ||
    JSON.parse(localStorage.getItem("selectedSeries"));

  const handleAddAward = () => {
    setAwards([...awards, { awardName: "", description: "" }]);
  };

  const handleAwardChange = (index, key, value) => {
    const updatedAwards = [...awards];
    updatedAwards[index][key] = value;
    setAwards(updatedAwards);
  };

  const handleRemoveAward = (index) => {
    const updatedAwards = awards.filter((_, i) => i !== index);
    setAwards(updatedAwards);
  };

  const handleSubmit = async (values) => {
    try {
      // Convert awards array to an object format
      const formattedAwards = awards.reduce((obj, award) => {
        if (award.awardName.trim() && award.description.trim()) {
          obj[award.awardName] = award.description;
        }
        return obj;
      }, {});

      const detailsPayload = {
        detailId: seriesContent.detailId || null,
        seriesId: seriesContent.seriesId || null,
        ...values,
        awardsAndNominations: JSON.stringify(formattedAwards), // Store as JSON string
      };

      if (isEditing) {
        if (!detailsPayload.detailId) {
          message.error("Error: Missing detail ID for update.");
          return;
        }
        await updateSeriesDetails(detailsPayload);
        message.success("Series details updated successfully!");
      } else {
        await saveSeriesDetails(detailsPayload);
        message.success("Series details added successfully!");
      }
      message.success("Series details saved successfully.");
      navigate(-1);
    } catch (error) {
      message.error("Failed to save series details.");
    }
  };

  return (
    <div className="add-series-details-container">
      <span className="add-series-details-header">
        {isEditing ? "Edit Series Details" : "Enter Series Details"}
      </span>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="add-series-details-form"
      >
        <Form.Item
          name="seriesId"
          label="Series ID"
          initialValue={seriesData?.id}
        >
          <Input disabled className="add-series-details-form-input" />
        </Form.Item>

        <Form.Item
          name="synopsis"
          label="Synopsis"
          rules={[{ required: true, message: "Please enter a synopsis." }]}
        >
          <TextArea rows={4} className="add-series-details-form-input" />
        </Form.Item>

        <Form.Item
          name="development"
          label="Development"
          rules={[
            {
              message: "Please enter development details.",
            },
          ]}
        >
          <TextArea
            rows={4}
            className="add-series-details-form-input"
            placeholder=" use ## for subtitles e.g ##subtitle"
          />
        </Form.Item>

        {/* Awards and Nominations Section */}
        <Form.Item label="Awards and Nominations">
          {awards.map((award, index) => (
            <div key={index} className="award-input-group">
              <Input
                placeholder="Award Name"
                value={award.awardName}
                onChange={(e) =>
                  handleAwardChange(index, "awardName", e.target.value)
                }
                className="add-series-details-form-input"
              />
              <TextArea
                placeholder="Award Description"
                value={award.description}
                onChange={(e) =>
                  handleAwardChange(index, "description", e.target.value)
                }
                className="add-series-details-form-input"
                rows={2}
              />
              <Button type="danger" onClick={() => handleRemoveAward(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="dashed"
            onClick={handleAddAward}
            className="add-award-btn"
          >
            + Add Award
          </Button>
        </Form.Item>

        <Form.Item name="references" label="References">
          <TextArea
            rows={4}
            className="add-series-details-form-input"
            placeholder="use \n to list links e.g www.example.com\n"
          />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={4} className="add-series-details-form-input" />
        </Form.Item>

        <Form.Item name="receptionAndImpact" label="Reception and Impact">
          <TextArea rows={4} className="add-series-details-form-input" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="submit-btn">
            {isEditing ? "Update" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSeriesDetails;
