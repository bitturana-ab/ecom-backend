import cloudinary from "cloudinary";

// function to upload files to cloudinary
/**
 * Uploads a file buffer to Cloudinary using async/await.
 * Converts buffer to Base64 Data URI to avoid manual Promise wrapping.
 */
const uploadToCloudinary = async (file) => {
  try {
    // convert the buffer to a base64 string
    if (!file) return null;
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    // upload to cloudinary
    const result = await cloudinary.v2.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "ecom_uploads",
    });
    return result; // contains public_id and secured_url
  } catch (error) {
    return null;
  }
};

export default uploadToCloudinary;
