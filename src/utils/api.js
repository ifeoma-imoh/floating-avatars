import axios from "axios";
import { cloudName, uploadPreset, uploadTag } from "../cloudinaryConfig";

export const getAvatarResources = ({ successCallback }) => {
  axios
    .get(`https://res.cloudinary.com/${cloudName}/image/list/${uploadTag}.json`)
    .then((response) => successCallback(response.data.resources));
};

export const uploadFile = ({ file, successCallback, addTag }) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);
  if (addTag) {
    data.append("tags", uploadTag);
  }
  axios
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => successCallback(response.data));
};
