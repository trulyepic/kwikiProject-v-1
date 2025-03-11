import { Button, Form, Input, message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./AddCharacterDetails.css";
import { saveCharacterDetails, updateCharacterDetails } from "../../api/api";

const { TextArea } = Input;

const AddCharacterDetails = () => {
  const { characterName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [abilities, setAbilities] = useState([]);
  const [limitations, setLimitations] = useState([]);
  const [relationships, setRelationships] = useState([]);

  const isEditing = !!location.state?.characterContent;
  const characterData =
    location.state?.characterData ||
    JSON.parse(localStorage.getItem("selectedCharacter"));
  const characterContent = useMemo(() => {
    return location.state?.characterContent || {};
  }, [location.state?.characterContent]);

  useEffect(() => {
    if (characterData) {
      form.setFieldsValue({
        characterId: characterData.id || "",
        biography: characterContent.biography || "",
        personality: characterContent.personality || "",
        relationships: "",
      });

      // Parse existing data if available
      try {
        // setAbilities(JSON.parse(characterContent.abilities || "{}"));
        // setLimitations(JSON.parse(characterContent.limitations || "{}"));
        // setRelationships(JSON.parse(characterContent.relationships || "{}"));
        setAbilities(
          characterContent.abilities
            ? Object.entries(JSON.parse(characterContent.abilities)).map(
                ([key, value]) => ({ name: key, description: value })
              )
            : []
        );
        setLimitations(
          characterContent.limitations
            ? Object.entries(JSON.parse(characterContent.limitations)).map(
                ([key, value]) => ({ name: key, description: value })
              )
            : []
        );
        setRelationships(
          characterContent.relationships
            ? Object.entries(JSON.parse(characterContent.relationships)).map(
                ([key, value]) => ({ name: key, description: value })
              )
            : []
        );
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    }
  }, [characterData, characterContent, form]);

  // Handle adding abilities and limitations dynamically
  const handleAddItem = (setStateFunction) => {
    setStateFunction((prev) => [...prev, { name: "", description: "" }]);
  };

  const handleItemChange = (index, key, value, setStateFunction) => {
    setStateFunction((prev) => {
      const updatedItems = [...prev];
      updatedItems[index] = { ...updatedItems[index], [key]: value };
      return updatedItems;
    });
  };

  const handleRemoveItem = (index, setStateFunction) => {
    setStateFunction((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values) => {
    try {
      //convert abilites and limitaitons to JSON format
      const formattedAbilities = abilities.reduce((obj, item) => {
        if (item.name.trim() && item.description.trim()) {
          obj[item.name] = item.description;
        }
        return obj;
      }, {});

      const formattedLimitations = limitations.reduce((obj, item) => {
        if (item.name.trim() && item.description.trim()) {
          obj[item.name] = item.description;
        }
        return obj;
      }, {});

      const formattedRelationships = relationships.reduce((obj, item) => {
        if (item.name.trim() && item.description.trim()) {
          obj[item.name] = item.description;
        }
        return obj;
      }, {});

      const detailsPayload = {
        contentId: characterContent.contentId,
        characterId: characterData.id,
        ...values,
        abilities: JSON.stringify(formattedAbilities),
        limitations: JSON.stringify(formattedLimitations),
        relationships: JSON.stringify(formattedRelationships),
      };

      console.log("detailsPayload: ", detailsPayload);
      if (isEditing) {
        if (!detailsPayload.contentId) {
          message.error("Error: Missing content ID for update.");
          return;
        }
        await updateCharacterDetails(detailsPayload);
        message.success("Character details updated successfully!");
      } else {
        await saveCharacterDetails(detailsPayload);
        message.success("Character details added successfully!");
      }

      navigate(-1);
    } catch (error) {
      message.error("Failed to save character details.");
    }
  };

  return (
    <div className="add-character-details-container">
      <span className="add-character-details-header">
        {isEditing ? "Edit Character Details" : "Enter Character Details"}
      </span>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="add-character-details-form"
      >
        <Form.Item
          name="characterId"
          label="Character ID"
          initialValue={characterData?.id}
        >
          <Input disabled className="add-character-details-form-input" />
        </Form.Item>

        <Form.Item name="biography" label="Biography">
          <TextArea rows={4} className="add-character-details-form-input" />
        </Form.Item>

        <Form.Item name="personality" label="Personality">
          <TextArea rows={4} className="add-character-details-form-input" />
        </Form.Item>

        {/* Abilities Section */}
        <Form.Item label="Abilities">
          {abilities.map((ability, index) => (
            <div key={index} className="ability-input-group">
              <Input
                placeholder="Ability Name"
                value={ability.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value, setAbilities)
                }
                className="add-character-details-form-input"
              />
              <TextArea
                placeholder="Ability Description"
                value={ability.description}
                onChange={(e) =>
                  handleItemChange(
                    index,
                    "description",
                    e.target.value,
                    setAbilities
                  )
                }
                className="add-character-details-form-input"
                rows={2}
              />
              <Button
                type="danger"
                onClick={() => handleRemoveItem(index, setAbilities)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="dashed"
            onClick={() => handleAddItem(setAbilities)}
            className="add-ability-btn"
          >
            + Add Ability
          </Button>
        </Form.Item>

        {/* Limitations Section */}
        <Form.Item label="Limitations">
          {limitations.map((limitation, index) => (
            <div key={index} className="limitation-input-group">
              <Input
                placeholder="Limitation Name"
                value={limitation.name}
                onChange={(e) =>
                  handleItemChange(
                    index,
                    "name",
                    e.target.value,
                    setLimitations
                  )
                }
                className="add-character-details-form-input"
              />
              <TextArea
                placeholder="Limitation Description"
                value={limitation.description}
                onChange={(e) =>
                  handleItemChange(
                    index,
                    "description",
                    e.target.value,
                    setLimitations
                  )
                }
                className="add-character-details-form-input"
                rows={2}
              />
              <Button
                type="danger"
                onClick={() => handleRemoveItem(index, setLimitations)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="dashed"
            onClick={() => handleAddItem(setLimitations)}
            className="add-limitation-btn"
          >
            + Add Limitation
          </Button>
        </Form.Item>

        {/* Relationships Section */}
        <Form.Item label="Relationships">
          {relationships.map((relationship, index) => (
            <div key={index} className="input-group">
              <Input
                placeholder="Relationship Name"
                value={relationship.name}
                onChange={(e) =>
                  handleItemChange(
                    index,
                    "name",
                    e.target.value,
                    setRelationships
                  )
                }
                className="add-character-details-form-input"
              />
              <TextArea
                placeholder="Relationship Description"
                value={relationship.description}
                onChange={(e) =>
                  handleItemChange(
                    index,
                    "description",
                    e.target.value,
                    setRelationships
                  )
                }
                className="add-character-details-form-input"
                rows={2}
              />
              <Button
                type="danger"
                onClick={() => handleRemoveItem(index, setRelationships)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="dashed"
            onClick={() => handleAddItem(setRelationships)}
            className="add-btn"
          >
            + Add Relationship
          </Button>
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

export default AddCharacterDetails;
