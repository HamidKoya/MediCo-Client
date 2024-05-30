import React, { useEffect, useState } from "react";
import Header from "@/components/doctor/Header";
import Footer from "@/components/doctor/Footer";
import DashboardData from "@/components/doctor/DashboardData";
import LineChart from "@/components/doctor/LineChart";
import PieChart from "@/components/doctor/PieChart";
import Loading from "@/components/user/Loading";
import axios from "axios";
import { useSelector } from "react-redux";

function DashboardDoctor() {
  const { currentDoctor } = useSelector((state) => state.doctor);
  const _id = currentDoctor.doctorData._id;
  const [data, setData] = useState();
  const [pieData, setPieData] = useState();
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/doctor/chartDetails?drId=${_id}`)
      .then((res) => {
        setLoading(false);
        setPieData(res?.data?.obj);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/doctor/counts?doctorId=${_id}`
        );
        setData(res?.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getReport = async () => {
      try {
        const report = await axios.get(
          `http://localhost:3000/doctor/doctorReport`
        );
        setReportData(report?.data?.appointmentData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCount();
    getReport();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-blue-50 ">
        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center min-h-screen">
            <div className="spinnerouter">
              <Loading />
            </div>
          </div>
        ) : (
          <div>
            <div className=" bg-blue-50 text-3xl p-6 underline text-black text-center ">
              <h1>Dashboard</h1>
            </div>
            <div className="m-5">
              <div className="">
                <div className="flex justify-center">
                  <div className="max-w-screen-lg w-full">
                    <DashboardData data={data} />
                  </div>
                </div>

                <div className="lg:flex justify-center ">
                  <div className="lg:w-2/3 ">
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
        )}

        <br />
      </div>
      <Footer />
    </div>
  );
}

export default DashboardDoctor;
