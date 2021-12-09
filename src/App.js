import "./App.css";
import { Button, Card, Checkbox, Col, Form, Input, message } from "antd";
import AvatarSelector from "./components/AvatarSelector";
import { useEffect, useState } from "react";
import FloatingAvatars from "./components/FloatingAvatar";
import { getAvatarResources, uploadFile } from "./utils/api";

function App() {
  const [avatars, setAvatars] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getAvatarResources({ successCallback: setAvatars });
  }, []);

  const onFinish = (values) => {
    setIsUploading(true);
    const showUploadedAvatar = values.showAvatar || false;
    uploadFile({
      file: uploadedFile,
      successCallback: (data) => {
        setIsUploading(false);
        if (showUploadedAvatar) {
          setAvatars((oldAvatars) => [...oldAvatars, data]);
        }
        message.success(`Welcome ${values.username}!!!`);
      },
      addTag: showUploadedAvatar,
    });
  };

  const onFailedSubmission = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="App" style={{ margin: "5%" }}>
      <Card style={{ margin: "auto", width: "50%" }}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFailedSubmission}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Col span={16} offset={9}>
            <AvatarSelector setUploadedFile={setUploadedFile} />
          </Col>
          <Form.Item
            name="showAvatar"
            valuePropName="checked"
            wrapperCol={{ offset: 9, span: 16 }}
          >
            <Checkbox>Show my avatar</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isUploading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <FloatingAvatars avatars={avatars} />
    </div>
  );
}

export default App;
