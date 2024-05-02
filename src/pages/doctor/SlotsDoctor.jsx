import React from "react";
import Header from "@/components/doctor/Header";
import Footer from "@/components/doctor/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSelector } from "react-redux";
function SlotsDoctor() {
  const { currentDoctor } = useSelector((state) => state.doctor);
  const doctorId = currentDoctor.doctorData._id;
  const [slots, setSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    axios
      .post("http://localhost:3000/doctor/slotDetails", { doctorId })
      .then((response) => {
        setSlots(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [doctorId, currentPage, pageSize]);

  const paginatedSlots = slots.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <Header />
      <div className="bg-blue-50 w-full h-full p-4">
        <h1 className="text-xl font-semibold flex justify-center py-4">
          Slots List
        </h1>
        <div className="mx-auto sm:p-8 mb-10 bg-[#71A0A8]">
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[100px] text-blue-700">
                  No
                </TableHead>
                <TableHead className="text-center text-blue-700">
                  Date
                </TableHead>
                <TableHead className="text-center text-blue-700">
                  Starting Time
                </TableHead>
                <TableHead className="text-center text-blue-700">
                  Ending Time
                </TableHead>
                <TableHead className=" text-blue-700 text-center">
                  Duration
                </TableHead>
                <TableHead className="text-center text-blue-700">
                  View Slots
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSlots.map((slot, index) => (
                <TableRow key={slot._id}>
                  <TableCell className="font-medium text-center">
                    {(currentPage - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(slot.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {slot.startTime}
                  </TableCell>
                  <TableCell className="text-center">{slot.endTime}</TableCell>
                  <TableCell className="text-center">
                    {slot.slotDuration}
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    <button className="bg-green-400 p-1 rounded-md h-7">
                      Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} className="text-blue-700">
                  Total Slots
                </TableCell>
                <TableCell className="text-center text-blue-700">
                  {slots.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SlotsDoctor;
