import React from "react";

const ImageUpload = ({ error, setError, images, setImages, allowedLength }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files?.length > allowedLength) {
      setImages([]);
      setError(`${allowedLength} image allowed`);
    } else if (files) {
      const newImages = [];
      let errorMessage = null;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
          errorMessage = "File size must be less than 2MB.";
          break;
        }

        if (!file.type.startsWith("image/")) {
          errorMessage = "Please upload only image files.";
          break;
        }
        if (newImages.length < 10) {
          newImages.push(file);
        }
      }
      handleUpload(newImages);

      if (errorMessage) {
        setError(errorMessage);
        setImages([]);
      } else {
        setError(null);
        setImages([]);
      }
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleUpload = async (images) => {
    debugger;
    if (images.length === 0) {
      setError("Please select at least one image to upload.");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image);
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/file`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Upload successful:", result);
        if (result?.urls?.length > 0) {
          setImages([...result.urls]);
        } else {
          setImages([]);
        }
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message || "An error occurred while uploading.");
        setImages([]);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      setError("An error occurred while uploading.");
      setImages([]);
    }
  };

  return (
    <div className="mb-[10px]">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {images.map((image, index) => (
          <div key={index} style={{ margin: "10px", display: "inline-block" }}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
