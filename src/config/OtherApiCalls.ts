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


export const downloadResume = async (r:string, u:string, f:string) => {
  const response = await fetch("/api/generate-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ r, u, f }),
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${f} resume.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } else {
    const errorData = await response.json();
    console.error("Error generating PDF:", errorData.error);
  }
};

export { uploadImageToCloudinary };
