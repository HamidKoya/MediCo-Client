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
import { Button, Modal } from "flowbite-react";
function SlotsDoctor() {
  const { currentDoctor } = useSelector((state) => state.doctor);
  const doctorId = currentDoctor.doctorData._id;
  const [slots, setSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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

  const handleClick = (id) => {
    try {
      const selectedSlot = slots.find((slot) => slot._id === id);
      setSelectedSlot(selectedSlot);
      setOpenModal(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
                    <button onClick={()=>handleClick(slot._id)} className="bg-green-400 p-1 rounded-md h-7">
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
        {slots && pageSize && (
          <div className="flex justify-center mt-4 bg-blue-50">
            {Array.from(
              { length: Math.ceil(slots.length / pageSize) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`pagination-btn border w-10 ${
                    index + 1 === currentPage
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}

        <Modal className="max-w-xl max-h-[500px] bg-transparent mx-auto mt-16" show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header className="bg-white ">Time Slots</Modal.Header>
          <Modal.Body>
            {selectedSlot && (
              <div>
                <p className="text-lg font-bold mb-4 sticky">
                  Slot {slots.indexOf(selectedSlot) + 1}
                </p>
                <div className="grid gap-4">
                  {selectedSlot.timeSlots.map((time, timeIndex) => (
                    <div
                      key={timeIndex}
                      className="bg-white p-4 border rounded-md"
                    >
                      <p className="text-xl font-semibold mb-2">
                        Time: {time.start} - {time.end}
                      </p>
                      <p
                        className={`text-${time.booked ? "green" : "red"}-600`}
                      >
                        Booked: {time.booked ? "Yes" : "No"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="bg-white p-4">
            <Button
              className="bg-blue-500 text-white"
              onClick={() => setOpenModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default SlotsDoctor;
