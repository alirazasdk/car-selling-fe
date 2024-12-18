import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input } from "antd";
import PublicRoute from "@/components/PublicRoute";

const Login = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onValuesChange = (_, allValues) => {
    form
      .validateFields()
      .then((v) => {
        setIsFormValid(true);
      })
      .catch((error) => {
        console.log("error", error);
        if (
          !error?.errorFields?.length &&
          error?.values?.email &&
          error.values?.password
        ) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
      });
  };

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/car");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error logging in", err);
    }
  };

  return (
    <PublicRoute>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          email: "",
          password: "",
        }}
        onFinish={handleLogin}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters long!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" disabled={!isFormValid}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </PublicRoute>
  );
};

export default Login;
