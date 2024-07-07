const uploadImageToCloudinary = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "your_preset");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  return res.json();
};

export { uploadImageToCloudinary };
