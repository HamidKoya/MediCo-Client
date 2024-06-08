import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import Header2 from "@/components/user/Header2";
import Footer from "@/components/user/Footer";

const MedicalReportUser = () => {
  const location = useLocation();
  const [report, setReport] = useState();
  const { data } = location.state || {};
  const pdfRef = useRef();

  const downloadPdf = () => {
    try {
      const input = pdfRef.current;
      html2canvas(input).then((canvas) => {
        const imageData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imageWidth = canvas.width;
        const imageHeight = canvas.height;
        const aspectRatio = imageWidth / imageHeight;

        // Calculate the width and height to maintain aspect ratio within the PDF
        let imgWidth = pdfWidth;
        let imgHeight = pdfWidth / aspectRatio;

        // If the calculated height is greater than the PDF height, reset the dimensions
        if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight;
          imgWidth = pdfHeight * aspectRatio;
        }

        const imageX = (pdfWidth - imgWidth) / 2;
        const imageY = (pdfHeight - imgHeight) / 2;

        pdf.addImage(imageData, "PNG", imageX, imageY, imgWidth, imgHeight);
        pdf.save("MedicalReport.pdf");
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`https://medico-server-b7s5.onrender.com/medicalReport?id=${data._id}`)
      .then((res) => {
        setReport(res?.data?.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header2 />
      {report ? (
        <div className="bg-blue-50 min-h-screen p-5">
          <div className="flex justify-center">
            <div
              className="bg-white min-h-screen mt-10 w-[900px] shadow-lg overflow-hidden"
              ref={pdfRef}
            >
              <div className="bg-emerald-500 h-32 w-full">
                <h1 className="text-3xl text-white font-bold text-center p-10">
                  MediCo <FontAwesomeIcon icon={faStethoscope} />
                  <p className="text-lg underline">Medical Report</p>
                </h1>
              </div>
              <h1 className=" p-5 bg-white text-blue-700">
                Date : {report.date}
              </h1>
              <div className="p-8 bg-white">
                <h1 className="text-xl font-bold text-black mb-4">
                  Bio Data :
                </h1>
                <div className="grid grid-cols-2 gap-4 bg-white">
                  <div className="text-gray-800">
                    <p className="text-lg">Name: {report.patientName}</p>
                    <br />
                    <p className="text-lg">Age: {report.age}</p>
                  </div>
                  <div className="text-gray-800">
                    <p className="text-lg">Sex: {report.gender}</p>
                    <br />
                    <p className="text-lg">Weight: {report.weight}</p>
                  </div>
                </div>
              </div>
              {/* <hr className='m-5 bg-white' /> */}
              <div className="p-8 bg-white">
                <h1 className="text-xl bg-white  text-black font-bold mb-4">
                  Presenting Complaint :
                </h1>
                <p className="text-lg text-gray-800">{report.complaint}</p>
              </div>
              {/* <hr className='m-5 bg-white' /> */}
              <div className="p-8 bg-white">
                <h1 className="text-xl bg-white text-black font-bold mb-4">
                  Past Medical and Surgical History :
                </h1>
                <p className="text-lg text-gray-800">{report.medicalHistory}</p>
              </div>
              {/* <hr className='m-5 bg-white' /> */}
              <div className="p-8 bg-white">
                <h1 className="text-xl bg-white text-black font-bold mb-4">
                  Investigation :
                </h1>
                <p className="text-lg text-gray-800">{report.investigation}</p>
              </div>
              {/* <hr className='m-5 bg-white' /> */}
              <div className="p-8 bg-white">
                <h1 className="text-xl bg-white text-black font-bold mb-4">
                  Diagnosis :
                </h1>
                <p className="text-lg text-gray-800">{report.diagnosis}</p>
              </div>
              {/* <hr className='m-5 bg-white' /> */}
              <div className="p-8 bg-white">
                <h1 className="text-xl bg-white text-black font-bold mb-4">
                  {" "}
                  Additional Info :
                </h1>
                <p className="text-lg text-gray-800">{report.additionalInfo}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center p-10">
            <button className="border-2 border-green-400 text-black p-2 rounded-md font-medium hover:bg-green-400 hover:text-white" onClick={downloadPdf}>
              Download Pdf
            </button>
          </div>
        </div>
      ) : (
        <div className="hero bg-blue-50 min-h-screen">
          <h1 className="text-green-500 text-4xl">Medical report not added</h1>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MedicalReportUser;
