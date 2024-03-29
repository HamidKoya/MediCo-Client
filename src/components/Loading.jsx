import { HashLoader } from "react-spinners";
function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color="#36D7B7" size={50} />
    </div>
  );
}

export default Loading;
