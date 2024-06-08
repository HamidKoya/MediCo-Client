import React, { useEffect, useState } from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/admin/Footer";
import LineChart from "@/components/admin/LineChart";
import axios from "axios";
import Loading from "@/components/user/Loading";
import api from "@/utils/api";
import { Toaster, toast } from "sonner";

function Dashboard() {
  const [data, setData] = useState(null);
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    api
      .get("/admin/tokenChecker")
      .then((res) => {
        if (res) {
          setToken(true);
        }
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  },[]);

  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await axios.get("https://medico-server-b7s5.onrender.com/admin/counts");
        setData(res?.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getReport = async () => {
      try {
        setLoading(true);
        const report = await axios.get(
          "https://medico-server-b7s5.onrender.com/admin/adminReport"
        );
        setReportData(report?.data);
        setLoading(false);
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
      <Toaster position="top-center" expand={false} richColors closeButton />

      <div className="flex">
        <Sidebar />
        {token && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <div className="w-[84vw] sm:w-full bg-slate-900 p-2 justify-center">
                {data && (
                  <div className="flex flex-col items-center lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    <div className="sm:w-64 w-32 h-15 sm:h-20 rounded-md bg-blue-500 text-white text-center sm:text-2xl text-lg flex items-center justify-center">
                      <div>
                        Doctors Count:
                        <div>{data.doctor}</div>
                      </div>
                    </div>
                    <div className="sm:w-64 w-32 h-15 sm:h-20 rounded-md bg-blue-500 text-white text-center sm:text-2xl text-lg flex items-center justify-center">
                      <div>
                        Users Count:
                        <div>{data.user}</div>
                      </div>
                    </div>
                    <div className="sm:w-64 w-32 h-15 sm:h-20 rounded-md bg-blue-500 text-white text-center sm:text-2xl text-lg flex items-center justify-center">
                      <div>
                        Admin Revenue:
                        <div>{data.thirtyPercent}</div>
                      </div>
                    </div>
                    <div className="sm:w-64 w-32 h-15 sm:h-20 rounded-md bg-blue-500 text-white text-center sm:text-2xl text-lg flex items-center justify-center">
                      <div>
                        Total Revenue:
                        <div>{data.total}</div>
                      </div>
                    </div>
                  </div>
                )}
                {reportData && (
                  <div className="overflow-x-scroll sm:overflow-hidden">
                    <div className="min-w-[400px]  w-full bg-base-100 h-[600px]">
                      <LineChart
                        usersByYear={reportData?.usersData}
                        doctorsByYear={reportData?.doctorsData}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
