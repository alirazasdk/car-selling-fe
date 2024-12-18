import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Row,
  Col,
  Typography,
} from "antd";
import { useForm } from "sunflower-antd";
import ImageUpload from "@/components/ImageUpload";
const CarForm = ({
  handleAddCar,
  error,
  setError,
  images,
  setImages,
  allowedLength,
  setAllowedLength,
}) => {
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };
  const [form] = Form.useForm();
  const { formProps } = useForm({
    form,
  });
  return (
    <div className="flex justify-center items-center w-full">
      <Form
        {...formProps}
        name="carForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          model: "",
          price: 0,
          phoneNumber: "",
          maxNumberOfImages: 1,
        }}
        onFinish={handleAddCar}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* Model */}
        <Form.Item
          label="Model"
          name="model"
          rules={[
            { required: true, message: "Please input the model!" },
            { min: 3, message: "Model must be at least 3 characters long!" },
          ]}
        >
          <Input placeholder="Enter the model" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input the price!" },
            {
              type: "number",
              min: 1,
              message: "Price must be a greater than 0!",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter the price"
            style={{ width: "100%" }}
            type="number"
          />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
            { len: 11, message: "Phone number must be exactly 11 digits!" },
            {
              pattern: /^\d+$/,
              message: "Phone number must contain only numeric characters!",
            },
          ]}
        >
          <Input placeholder="Enter the phone number" />
        </Form.Item>

        <Form.Item
          label="Max Images"
          name="maxNumberOfImages"
          rules={[
            {
              required: true,
              message: "Please select the max number of images!",
            },
          ]}
        >
          <Select
            onChange={(value) => {
              setAllowedLength(value);
              setError(null);
            }}
          >
            <Select.Option key={1} value={1}>
              1
            </Select.Option>
            <Select.Option key={2} value={2}>
              2
            </Select.Option>
          </Select>
        </Form.Item>
        <Row>
          <Col span={8}>
            <Typography marginLeft={"auto"}>Images</Typography>
          </Col>
          <Col span={16}>
            <ImageUpload
              error={error}
              setError={setError}
              images={images}
              setImages={setImages}
              allowedLength={allowedLength}
            />
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={images?.length < 1 && images?.length > allowedLength}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CarForm;
