import EditProfile from "@/components/user/EditProfile";
import Wallet from "@/components/user/Wallet";
import Header2 from "@/components/user/Header2";
import Footer from "@/components/user/Footer";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { signInSuccess } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { ScaleLoader } from "react-spinners";
import api from "@/utils/api";

function Profile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.userData._id;
  const fileRef = useRef(null);

  const [token, setToken] = useState(false);

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhotoToBase(selectedPhoto);
  };

  const setPhotoToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const imageData = reader.result;
      sendImageToServer(imageData);
    };
  };

  useEffect(() => {
    api
      .get("/profileTest")
      .then((res) => {
        if (res) {
          setToken(true);
        }
      })
      .catch((err) => {
        toast.info(err.response.data.message);
        console.log(err);
      });
  }, []);

  const sendImageToServer = async (imageData) => {
    try {
      setLoading(true);
      const response = await axios.post("https://medico-server-b7s5.onrender.com/changePhoto", {
        imageData,
        userId,
      });
      setLoading(false);
      if (response.status === 200) {
        toast.success("Successfully profile photo changed");
        console.log(response.data);
        dispatch(signInSuccess(response.data));
      }
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <Toaster position="top-center" expand={false} richColors />

      <Header2 />
      <div className="flex justify-center bg-[#EBF5FF]">
        <div className="w-[350px] h-[450px] bg-slate-300 my-32 rounded-lg shadow-2xl shadow-slate-400 relative">
          {token && (
            <>
              {" "}
              <div className="flex justify-center items-center flex-col mt-10">
                {loading ? (
                  <ScaleLoader color="#36d7b7" height={20} width={5} />
                ) : (
                  <img
                    onClick={() => fileRef.current.click()}
                    src={currentUser.userData.photo}
                    alt="image"
                    className="w-20 h-20 rounded-full cursor-pointer ring object-cover"
                  />
                )}

                <input
                  onChange={handlePhotoChange}
                  accept="image/*"
                  hidden
                  type="file"
                  ref={fileRef}
                />
                <h1 className="text-xl font-semibold mt-3">
                  {currentUser.userData.name}
                </h1>
              </div>
              <div className="flex flex-col gap-3 mt-6 items-center justify-center">
                <p className="font-medium">
                  Email:
                  <span className="ml-2 font-medium">
                    {currentUser.userData.email}
                  </span>
                </p>
                <p className="font-medium">
                  Phone:
                  <span className="ml-2 font-medium">
                    {currentUser.userData.mobile}
                  </span>
                </p>
                <p className="font-medium">
                  Age:
                  <span
                    className={
                      currentUser.userData.age
                        ? "ml-2 font-medium"
                        : "ml-2 font-medium text-red-600"
                    }
                  >
                    {currentUser.userData.age
                      ? currentUser.userData.age
                      : "not added"}
                  </span>
                </p>
                <p className="font-medium">
                  Gender:
                  <span
                    className={
                      currentUser.userData.gender
                        ? "ml-2 font-medium"
                        : "ml-2 font-medium text-red-600"
                    }
                  >
                    {currentUser.userData.gender
                      ? currentUser.userData.gender
                      : "not added"}
                  </span>
                </p>
              </div>
              <div className="absolute bottom-2 left-2">
                <EditProfile />
              </div>
              <div className="absolute bottom-2 right-2">
                <Wallet />
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
