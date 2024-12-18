import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./Header";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <div className="w-full h-full min-h-[100vh]">
        <Header />
        {children}
      </div>
    </>
  );
};

export default ProtectedRoute;
