import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <div
      className="w-[100] h-[50px] flex justify-end items-center px-[20px]"
      style={{ borderBottom: "1px solid black" }}
    >
      {router?.pathname === "/car" && (
        <button
          className="bg-[blue] text-[white] px-[10px] py-[4px] rounded mr-2"
          onClick={() => {
            router.push("/car/add");
          }}
        >
          Add Car
        </button>
      )}
      {router?.pathname === "/car/add" && (
        <button
          className="bg-[green] text-[white] px-[10px] py-[4px] rounded mr-2"
          onClick={() => {
            router.push("/car");
          }}
        >
          See All Cars
        </button>
      )}
      <button
        className="bg-[red] text-[white] px-[10px] py-[4px] rounded"
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};
export default Header;
