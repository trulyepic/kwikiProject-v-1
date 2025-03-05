import {
  Select,
  Form,
  Input,
  Button,
  Checkbox,
  Modal,
  Upload,
  List,
  DatePicker,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddSeriesCharacter.css";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {
  addActor,
  addCharacter,
  checkActorExists,
  getCharacterById,
  updateCharacter,
} from "../../api/api";
import { use } from "react";

const { Option } = Select;

const AddSeriesCharacter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [playedByModalVisible, setPlayedByModalVisible] = useState(false);
  const [seriesId, setSeriesId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [actorExists, setActorExists] = useState(null);
  const [checkingActor, setCheckingActor] = useState(false);
  const [friendType, setFriendType] = useState("");
  const [friendName, setFriendName] = useState("");
  const [friendsList, setFriendsList] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const [familyRole, setFamilyRole] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [familyList, setFamilyList] = useState({});

  const [enemyType, setEnemyType] = useState("");
  const [enemyName, setEnemyName] = useState("");
  const [enemiesObject, setEnemiesObject] = useState({});
  const [description, setDescription] = useState("");

  const [loveType, setLoveType] = useState("");
  const [loveName, setLoveName] = useState("");
  const [loveInterestObject, setLoveInterestObject] = useState({});
  const [playedByName, setPlayedByName] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // auto populate seriesId
  //   useEffect(() => {
  //     if (location.state?.seriesId) {
  //       setSeriesId(location.state.seriesId);
  //       form.setFieldsValue({ series_id: location.state.seriesId });
  //     }

  //     if (location.state?.character) {
  //       const char = location.state.character;
  //       form.setFieldsValue({
  //         name: char.name,
  //         gender: char.gender,
  //         age: char.age,
  //         role: char.role,
  //         status: char.status,
  //         species: char.species,
  //         affiliation: char.affiliation,
  //         occupation: char.occupation,
  //         played_by: char.playedBy || "",
  //         description: char.description,
  //         hasData: char.hasData ?? false,
  //       });

  //       setFriendsList(JSON.parse(char.friends || "{}"));
  //       setFamilyList(JSON.parse(char.family || "{}"));
  //       setEnemiesObject(JSON.parse(char.enemies || "{}"));
  //       setLoveInterestObject(JSON.parse(char.loveInterest || "{}"));
  //       setDescription(char.description || "");
  //       setImageFile(char.imageUrl || null);
  //     }
  //   }, [location.state, form]);

  useEffect(() => {
    const fetchCharacterDetails = async (characterId) => {
      try {
        const char = await getCharacterById(characterId);
        console.log("Fetched Character from API:", char);
        setIsEdit(true);

        form.setFieldsValue({
          name: char.name || "",
          gender: char.gender || "",
          age: char.age || "",
          role: char.role || "",
          status: char.status || "",
          species: char.species || "",
          affiliation: char.affiliation || "",
          occupation: char.occupation || "",
          playedBy: char.playedBy?.realName || "",
          description: char.description || "",
          hasData: char.hasData ?? false,
          imageUrl: char.imageUrl,
        });

        setImageUrl(char.imageUrl || "");
        setPlayedByName(char.playedBy?.realName || "");
        setFriendsList(JSON.parse(char.friends || "{}"));
        setFamilyList(JSON.parse(char.family || "{}"));
        setEnemiesObject(JSON.parse(char.enemies || "{}"));
        setLoveInterestObject(JSON.parse(char.loveInterest || "{}"));
        setDescription(char.description || "");
        setImageFile(char.imageUrl || null);
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    // Always set seriesId from state
    if (location.state?.seriesId) {
      setSeriesId(location.state.seriesId);
      form.setFieldsValue({ series_id: location.state.seriesId });
    }

    // If editing, use location data first
    if (location.state?.character) {
      console.log(
        "Editing Character (from location.state):",
        location.state.character
      );
      const char = location.state.character;

      form.setFieldsValue({
        name: char.name || "",
        gender: char.gender || "",
        age: char.age || "",
        role: char.role || "",
        status: char.status || "",
        species: char.species || "",
        affiliation: char.affiliation || "",
        occupation: char.occupation || "",
        playedBy: char.playedBy?.realName || "",
        description: char.description || "",
        hasData: char.hasData ?? false,
      });

      setPlayedByName(char.playedBy?.realName || "");
      setFriendsList(JSON.parse(char.friends || "{}"));
      setFamilyList(JSON.parse(char.family || "{}"));
      setEnemiesObject(JSON.parse(char.enemies || "{}"));
      setLoveInterestObject(JSON.parse(char.loveInterest || "{}"));
      setDescription(char.description || "");
      setImageFile(char.imageUrl || null);
    }
    // If editing but character data is missing, fetch from API
    else if (location.state?.characterId) {
      console.log(
        "Fetching character from API, ID:",
        location.state.characterId
      );
      fetchCharacterDetails(location.state.characterId);
    }
  }, [location.state, form]);

  const checkActor = async (realName) => {
    setCheckingActor(true);
    const existingActor = await checkActorExists(realName);
    setActorExists(existingActor);
    setCheckingActor(false);

    if (realName) {
      setPlayedByName(realName);
      form.setFieldsValue({ playedBy: realName });
    }
  };

  const handleFileChange = ({ file }) => {
    const isPngOrJpg = file.type === "image/png" || file.type === "image/jpeg";
    if (!isPngOrJpg) {
      message.error("Only PNG or JPG files are allowed.");
      return false;
    }

    // Validate image dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file.originFileObj || file); // Use `originFileObj` if available

    img.onload = () => {
      //   if (img.width < 350 || img.width > 500) {
      //     message.error("Image width must be between 350 and 500 pixels.");
      //     return false;
      //   }

      console.log("✅ Image file selected:", file.originFileObj || file);
      setImageFile(file.originFileObj || file); // Store the correct file
    };

    return false; // Prevent auto-upload
  };

  const addFriend = () => {
    if (!friendType || !friendName) return;

    setFriendsList((prev) => {
      const updatedFriends = { ...prev };

      if (Array.isArray(updatedFriends[friendType])) {
        updatedFriends[friendType].push(friendName);
      } else if (updatedFriends[friendType]) {
        updatedFriends[friendType] = [updatedFriends[friendType], friendName];
      } else {
        updatedFriends[friendType] = friendName;
      }

      return updatedFriends;
    });

    setFriendName("");
  };

  const removeFriendType = (type) => {
    setFriendsList((prev) => {
      const updatedFriends = { ...prev };
      delete updatedFriends[type];
      return updatedFriends;
    });
  };

  // Add a family member
  const addFamily = () => {
    if (!familyRole || !familyName) return;

    setFamilyList((prev) => ({
      ...prev,
      [familyRole]: familyName,
    }));

    setFamilyRole("");
    setFamilyName("");
  };

  // Remove a family role
  const removeFamilyRole = (role) => {
    setFamilyList((prev) => {
      const updatedFamily = { ...prev };
      delete updatedFamily[role];
      return updatedFamily;
    });
  };

  // Add an enemy
  const addEnemy = () => {
    if (!enemyType || !enemyName) return;

    setEnemiesObject((prev) => ({
      ...prev,
      [enemyType]: enemyName,
    }));

    setEnemyType("");
    setEnemyName("");
  };

  // Remove an enemy type
  const removeEnemyType = (type) => {
    setEnemiesObject((prev) => {
      const updatedEnemies = { ...prev };
      delete updatedEnemies[type];
      return updatedEnemies;
    });
  };

  // Add a love interest
  const addLoveInterest = () => {
    if (!loveType || !loveName) return;

    setLoveInterestObject((prev) => ({
      ...prev,
      [loveType]: loveName,
    }));

    setLoveType("");
    setLoveName("");
  };

  // Remove a love interest type
  const removeLoveInterest = (type) => {
    setLoveInterestObject((prev) => {
      const updatedLoveInterests = { ...prev };
      delete updatedLoveInterests[type];
      return updatedLoveInterests;
    });
  };

  // Handle description input to ensure "\n\n" is preserved
  const handleDescriptionChange = (e) => {
    const text = e.target.value.replace(/\n/g, "\n\n"); // Ensure newline format
    setDescription(text);
  };

  const handlePlayedBySubmit = async (values) => {
    try {
      let actor;
      if (!actorExists) {
        actor = await addActor(values);
        message.success("New actor added successfully!");
      } else {
        actor = actorExists;
        message.info("Using existing actor.");
      }

      setPlayedByName(values.real_name);
      form.setFieldsValue({ playedBy: values.real_name });
      setPlayedByModalVisible(false);
    } catch (error) {
      message.error("Error saving actor.");
    }
  };

  const handleSubmit = async (values) => {
    if (!imageUrl && !imageFile) {
      message.error("Either an image URL or an uploaded image is required.");
      return;
    }
    try {
      const characterData = {
        ...values,
        hasData: values.hasData || false,
        series: { id: seriesId },
        playedBy: values.playedBy ? { realName: values.playedBy } : null,
        description: description,
        friends: JSON.stringify(friendsList),
        family: JSON.stringify(familyList),
        enemies: JSON.stringify(enemiesObject),
        loveInterest: JSON.stringify(loveInterestObject),
      };

      console.log("✅ Sending characterData:", characterData);
      if (isEdit) {
        // call update api if editing
        await updateCharacter(
          location.state.characterId,
          characterData,
          imageFile
        );
        message.success("Character updated successfully!");
      } else {
        // call add api if creating
        await addCharacter(characterData, imageFile);
        message.success("Character added successfully!");
      }

      //   message.success("Character added successfully!");
      navigate(-1);
    } catch (error) {
      message.error("Error adding character.");
    }
  };

  return (
    <div className="add-series-character">
      <h2>{isEdit ? "Update Character" : "Add New Character"}</h2>
      <Form
        form={form}
        layout="vertical"
        className="add-series-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Character Name"
          rules={[{ required: true }]}
        >
          <Input
            placeholder="Enter character name"
            className="add-series-char-input"
          />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <Select placeholder="Select gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item name="age" label="Age">
          <Input placeholder="Enter age" className="add-series-char-input" />
        </Form.Item>

        <Form.Item name="role" label="Role">
          <Input
            placeholder="e.g., Main character, Supporting"
            className="add-series-char-input"
          />
        </Form.Item>

        <Form.Item name="species" label="Species">
          <Input
            placeholder="Enter species"
            className="add-series-char-input"
          />
        </Form.Item>

        <Form.Item name="affiliation" label="Affiliation">
          <Input
            placeholder="Enter affiliation"
            className="add-series-char-input"
          />
        </Form.Item>

        <Form.Item name="occupation" label="Occupation">
          <Input
            placeholder="Enter occupation"
            className="add-series-char-input"
          />
        </Form.Item>

        {/* Family Section */}
        <Form.Item name="family" label="Family">
          <div className="friend-inputs">
            <Input
              placeholder="Enter relationship (e.g., Father, Mother, Daughter)"
              value={familyRole}
              onChange={(e) => setFamilyRole(e.target.value)}
              className="add-series-char-input"
            />
            <Input
              placeholder="Enter name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="add-series-char-input"
            />
            <Button type="primary" onClick={addFamily} icon={<PlusOutlined />}>
              Add
            </Button>
          </div>
          <List
            dataSource={Object.entries(familyList)}
            renderItem={([role, name]) => (
              <List.Item
                actions={[
                  <Button
                    danger
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => removeFamilyRole(role)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <strong>{role}:</strong> {name}
              </List.Item>
            )}
          />
        </Form.Item>

        <Form.Item name="friends" label="Friends">
          <div className="friend-inputs">
            <Input
              placeholder="Enter friend type (e.g., Colleague)"
              value={friendType}
              onChange={(e) => setFriendType(e.target.value)}
              className="add-series-char-input"
            />
            <Input
              placeholder="Enter friend name"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              className="add-series-char-input"
            />

            <Button type="primary" onClick={addFriend} icon={<PlusOutlined />}>
              {" "}
              Add
            </Button>
          </div>
          <List
            dataSource={Object.entries(friendsList)}
            renderItem={([type, names]) => (
              <List.Item
                actions={[
                  <Button
                    danger
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => removeFriendType(type)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <strong>{type}:</strong>{" "}
                {Array.isArray(names) ? names.join(", ") : names}
              </List.Item>
            )}
          />
        </Form.Item>

        {/* Enemies Section */}
        <Form.Item name="enemies" label="Enemies">
          <div className="friend-inputs">
            <Input
              placeholder="Enter enemy type (e.g., CEO)"
              value={enemyType}
              onChange={(e) => setEnemyType(e.target.value)}
              className="add-series-char-input"
            />
            <Input
              placeholder="Enter enemy name"
              value={enemyName}
              onChange={(e) => setEnemyName(e.target.value)}
              className="add-series-char-input"
            />
            <Button type="primary" onClick={addEnemy} icon={<PlusOutlined />}>
              Add
            </Button>
          </div>
          <List
            dataSource={Object.entries(enemiesObject)}
            renderItem={([type, name]) => (
              <List.Item
                actions={[
                  <Button
                    danger
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => removeEnemyType(type)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <strong>{type}:</strong> {name}
              </List.Item>
            )}
          />
        </Form.Item>

        {/* Love Interest Section */}
        <Form.Item name="loveInterest" label="Love Interest">
          <div className="friend-inputs">
            <Input
              placeholder="Enter relationship type (e.g., Romantic Partner)"
              value={loveType}
              onChange={(e) => setLoveType(e.target.value)}
              className="add-series-char-input"
            />
            <Input
              placeholder="Enter love interest name"
              value={loveName}
              onChange={(e) => setLoveName(e.target.value)}
              className="add-series-char-input"
            />
            <Button
              type="primary"
              onClick={addLoveInterest}
              icon={<PlusOutlined />}
            >
              Add
            </Button>
          </div>
          <List
            dataSource={Object.entries(loveInterestObject)}
            renderItem={([type, name]) => (
              <List.Item
                actions={[
                  <Button
                    danger
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => removeLoveInterest(type)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <strong>{type}:</strong> {name}
              </List.Item>
            )}
          />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Input
            placeholder="e.g., Alive, Deceased"
            className="add-series-char-input"
          />
        </Form.Item>

        {/* Description Field (Maintains \n\n Format) */}
        <Form.Item name="description" label="Description">
          <TextArea
            placeholder="Enter character description"
            rows={6}
            value={description}
            onChange={handleDescriptionChange}
            className="add-series-char-input"
          />
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleFileChange}
            maxCount={1}
            disabled={!!imageUrl}
          >
            <Button disabled={!!imageUrl}>click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="imageUrl" label="imageUrl">
          <Input
            className="add-series-char-input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="playedBy" label="Played By">
          <Input
            placeholder="Enter actor name"
            // disabled
            value={playedByName}
            onChange={(e) => setPlayedByName(e.target.value)}
            readOnly
            className="add-series-char-input"
          />
          <Button type="link" onClick={() => setPlayedByModalVisible(true)}>
            Add Actor
          </Button>
        </Form.Item>

        <Form.Item name="series_id" label="Series ID">
          <Input value={seriesId} disabled className="add-series-char-input" />
        </Form.Item>

        <Form.Item name="hasData" valuePropName="checked">
          <Checkbox>Has Data</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Update" : "Submit"}
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
      {/* Modal for Played By */}
      <Modal
        className="add-series-char-modal"
        title="Add Actor"
        visible={playedByModalVisible}
        onCancel={() => setPlayedByModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handlePlayedBySubmit}>
          <Form.Item
            name="real_name"
            label="Real Name"
            rules={[{ required: true }]}
          >
            <Input
              onBlur={(e) => checkActor(e.target.value)}
              placeholder="Enter actor's real name"
              className="add-series-char-input"
              onChange={(e) => setPlayedByName(e.target.value)}
            />
          </Form.Item>

          {checkingActor && <p>Checking actor existence...</p>}
          {actorExists && (
            <p style={{ color: "green" }}>
              Actor exists: {actorExists.realName}
            </p>
          )}
          {!actorExists && !checkingActor && (
            <p style={{ color: "red" }}>Actor not found, you can add it.</p>
          )}

          <Form.Item name="birth_date" label="Birth Date">
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Select birth date"
              style={{ width: "100%" }}
              className="add-series-char-input"
              disabled={actorExists}
            />
          </Form.Item>

          <Form.Item name="nationality" label="Nationality">
            <Input
              placeholder="Enter nationality "
              className="add-series-char-input"
              disabled={actorExists}
            />
          </Form.Item>

          <Form.Item name="wiki_url" label="Wikipedia URL">
            <Input
              placeholder="Enter Wikipedia link"
              className="add-series-char-input"
              disabled={actorExists}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {actorExists ? "Use Existing Actor" : "Save New Actor"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddSeriesCharacter;
