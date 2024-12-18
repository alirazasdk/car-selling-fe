import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Card, Col, Row } from "antd";
const { Meta } = Card;

const CarPage = () => {
  const [cars, setCars] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/car`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          console.log("cars", data);
          setCars(data);
        } else {
          alert(data.message || "Failed to fetch cars");
        }
      } catch (err) {
        console.error("Error fetching cars", err);
      }
    };

    fetchCars();
  }, []);

  return (
    <ProtectedRoute>
      <div className="mt-[40px]">
        <Row gutter={[16, 16]}>
          {cars.map((car, i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={i}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={
                  <img
                    alt="example"
                    src={car?.images?.length ? car.images[0] : ""}
                  />
                }
              >
                <Meta title={car?.model} description={`PRICE: ${car?.price}`} />
                <Meta description={`PH No. ${car?.phoneNumber}`} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </ProtectedRoute>
  );
};

export default CarPage;
