import React, { useEffect, useState } from "react";
import Header from "@/components/doctor/Header";
import Footer from "@/components/doctor/Footer";
import DashboardData from "@/components/doctor/DashboardData";
import LineChart from "@/components/doctor/LineChart";
import PieChart from "@/components/doctor/PieChart";
import Loading from "@/components/user/Loading";
import axios from "axios";
import { useSelector } from "react-redux";
import api from "@/utils/api";
import { Toaster, toast } from "sonner";

function DashboardDoctor() {
  const { currentDoctor } = useSelector((state) => state.doctor);
  const _id = currentDoctor.doctorData._id;
  const [data, setData] = useState();
  const [pieData, setPieData] = useState();
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    api
      .get("https://medico-server-b7s5.onrender.com/doctor/checkToken")
      .then((res) => {
        if (res) {
          setToken(true);
        }
      })
      .catch((err) => {
        toast.info(err.response.data.message);
        console.log(err.message);
      });
  }, []); // <-- Add an empty dependency array to avoid infinite loop

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://medico-server-b7s5.onrender.com/doctor/chartDetails?drId=${_id}`)
      .then((res) => {
        setLoading(false);
        setPieData(res?.data?.obj);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }, [_id]); // <-- Add _id as a dependency

  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await axios.get(
          `https://medico-server-b7s5.onrender.com/doctor/counts?doctorId=${_id}`
        );
        setData(res?.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getReport = async () => {
      try {
        const report = await axios.get(
          `https://medico-server-b7s5.onrender.com/doctor/doctorReport`
        );
        setReportData(report?.data?.appointmentData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCount();
    getReport();
  }, [_id]); // <-- Add _id as a dependency

  return (
    <div>
      <Header />
      <Toaster position="top-center" expand={false} richColors closeButton/>
      <div className="min-h-[600px] bg-blue-50">
        {token &&
          (loading ? (
            <div className="fixed inset-0 flex items-center justify-center min-h-screen">
              <div className="spinnerouter">
                <Loading />
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-blue-50 text-3xl p-6 underline text-black text-center">
                <h1>Dashboard</h1>
              </div>
              <div className="m-5">
                <div>
                  <div className="flex justify-center">
                    <div className="max-w-screen-lg w-full">
                      <DashboardData data={data} />
                    </div>
                  </div>
                  <div className="lg:flex justify-center">
                    <div className="lg:w-2/3">
                      <LineChart appointmentsByYear={reportData} />
                    </div>
                    <div className="lg:w-1/3 xl:w-1/4">
                      <PieChart count={pieData} />
                      <h1 className="text-center text-2xl text-blue-500 m-10">
                        PIE CHART OF STATUS
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default DashboardDoctor;
