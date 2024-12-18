import { useRouter } from "next/router";
import ProtectedRoute from "../../../components/ProtectedRoute";
import CarForm from "@/components/CarForm";
import { useState } from "react";

const InsertCarPage = () => {
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [allowedLength, setAllowedLength] = useState(1);
  const router = useRouter();

  const handleAddCar = async (values) => {
    const { model, price, phoneNumber, maxNumberOfImages } = values;
    debugger;
    if (!images?.length > 0 || images?.length > allowedLength) {
      setError("Images Error");
    } else {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/car`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              model,
              price,
              phoneNumber,
              maxNumberOfImages,
              images: [
                "https://storage.googleapis.com/file-upload-reactjs-firebase.appspot.com/1734512786601-order-number-bata.png",
              ],
            }),
          }
        );
        const data = await res.json();
        if (res.ok) {
          alert("Car added successfully");
          router.push("/car");
        } else {
          alert(data.message || "Failed to add car");
        }
      } catch (err) {
        console.error("Error adding car", err);
      }
    }
  };

  return (
    <ProtectedRoute>
      <CarForm
        handleAddCar={handleAddCar}
        error={error}
        setError={setError}
        images={images}
        setImages={setImages}
        allowedLength={allowedLength}
        setAllowedLength={setAllowedLength}
      />
    </ProtectedRoute>
  );
};

export default InsertCarPage;
