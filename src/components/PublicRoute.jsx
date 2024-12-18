import { useEffect } from "react";
import { useRouter } from "next/router";

const PublicRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/car/add");
    }
  }, [router]);

  return (
    <>
      <div className="w-full h-full min-h-[100vh] flex justify-center items-center">
        {children}
      </div>
    </>
  );
};

export default PublicRoute;
