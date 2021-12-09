import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AvatarSelector = ({ setUploadedFile, isUploading }) => {
  const props = {
    name: "file",
    onRemove: () => {
      setUploadedFile(null);
    },
    beforeUpload: (file) => {
      setUploadedFile(file);
      return false;
    },
    showUploadList: false,
    maxCount: 1,
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />} loading={isUploading}>
        Click to Upload
      </Button>
    </Upload>
  );
};

export default AvatarSelector;
