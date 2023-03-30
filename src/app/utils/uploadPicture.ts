import {Cloudinary} from "../core/interfaces/cloudinary";

export const uploadPicture = async (file: File): Promise<string> => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/dsgf3i8sw/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, { method: "POST", body: formData });
    if (!resp.ok) {
      throw new Error(`Failed to upload picture: ${await resp.text()}`);
    }
    const cloudResp = (await resp.json()) as Cloudinary;
    return cloudResp.secure_url;

  } catch (error) {
    throw new Error(`Failed to upload picture: ${error}`);
  }
};


