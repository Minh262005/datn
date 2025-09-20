import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicPort } from "../../components/url/link";
import { BsFillFileTextFill } from "react-icons/bs";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import jwtDecode from "jwt-decode";

function AppointmentDetailContent({ appointment }) {
  const tabButtons1 = "Return to previous";
  // console.log(appointment);

  const navigate = useNavigate();
  const [showConfirmCancel, setshowConfirmCancel] = useState(false);
  const [showConfirmApprove, setshowConfirmApprove] = useState(false);
  //cancel
  const handleshowConfirmCancel = () => {
    setshowConfirmCancel(true);
  };
  const handleUnshowConfirmCancel = () => {
    setshowConfirmCancel(false);
  };
  //approve
  const handleshowConfirmApprove = () => {
    setshowConfirmApprove(true);
  };
  const handleUnshowConfirmApprove = () => {
    setshowConfirmApprove(false);
  };

  const [role, setrole] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (!storedName) return;
    try {
      const decoded = /** @type {any} */ (jwtDecode(storedName));
      const r = decoded?.roles?.[0]?.authority || "";
      setrole(r);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const Approve = async () => {
    // console.log(appointment);
    const response = await axios.put(
      publicPort +
        `appointment/commandFlag?appointmentId=${appointment.id}&command=approve`
    );
    console.log(response);
    if (response.data === "CommandFlag updated successfully.") {
      navigate("/appointments");
    } else {
      alert(response.data);
    }
  };
  const Cancel = async () => {
    console.log(appointment);
    const response = await axios.put(
      publicPort +
        `appointment/commandFlag?appointmentId=${appointment.id}&command=cancel`
    );
    console.log(response);
    if (response.data === "CommandFlag updated successfully.") {
      navigate("/appointments");
    } else {
      alert(response.data);
    }
  };

  const handleEditAppointment = () => {
    console.log(appointment);
    navigate("/update_appointment", { state: { appointment } });
  };

  const goBack = () => {
    navigate("/appointments");
  };

  return (
    <div>
      <div className="flex w-[100%] items-center pb-[30px]">
        <div className=" w-[50%]  text-6xl font-bold">
          <p style={{ fontSize: "3rem" }}>Chi tiết lịch hẹn</p>
        </div>
        {role === "NURSE" || role === "DOCTOR" ? (
          appointment !== undefined && appointment.commandFlag === "0" ? (
            <div className="h-[50px] w-[50%] flex justify-end items-center">
              <div
                className="border-[1px] border-[#dddddd]  w-[40%] h-[40px] flex items-center justify-center rounded-3xl cursor-pointer"
                onClick={handleEditAppointment}
              >
                <span className="w-[10%] text-[30px] text-gradientLeft ]">
                  <FaPencilAlt />
                </span>
                <span className="font-medium text-gradientLeft ">
                  Sửa lịch hẹn
                </span>
              </div>
            </div>
          ) : (
            <></>
          )
        ) : (
          ""
        )}
      </div>
      <div className="bg-white p-5 rounded-3xl shadow-lg ">
        <div className="pl-[64px] pt-5 pb-10">
          <div key={appointment != undefined ? appointment.id : ""}>
            <div>
              <h1 className="text-[#4976f7] text-3xl font-semibold">Status</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Status of Appointment</span>
                <span className="w-[65%]">
                  {appointment !== undefined &&
                  appointment.commandFlag === "0" ? (
                    <p
                      className={`w-[10%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-warning"}`}
                    >
                      Chờ xác nhận
                    </p>
                  ) : appointment !== undefined &&
                    appointment.commandFlag === "1" ? (
                    <p
                      className={`w-[13.5%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-success"}`}
                    >
                        Đã xác nhận
                    </p>
                  ) : (
                    <p
                      className={`w-[11%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-error"}`}
                    >
                      Đã hủy
                    </p>
                  )}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-[#4976f7] text-3xl font-semibold">Sevices</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Form of Service</span>
                <span className="w-[65%]">
                  Khám chuyên khoa
                </span>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Patient</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Khách hàng</span>
                <span className="w-[65%]">
                  {appointment !== undefined ? appointment.patientName : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Ngày sinh</span>
                <span className="w-[65%]">
                  {appointment !== undefined ? appointment.birthday : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">CMND</span>
                <span className="w-[65%]">
                  {appointment !== undefined
                    ? appointment.patient != null
                      ? appointment.patient.id
                      : ""
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Giới tính</span>
                <span className="w-[65%]">
                  {appointment !== undefined ? appointment.gender : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Số điện thoại</span>
                <span>{appointment !== undefined ? appointment.phone : ""}</span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Triệu chứng</span>
                <span className="w-[65%]">
                  {appointment !== undefined ? appointment.symptom : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Mô tả</span>
                <span className="w-[65%]">
                  {appointment !== undefined ? appointment.note : ""}
                </span>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Doctor</h1>
              <div className="pt-6 flex">
                <span className="w-[35%]">Bác sĩ</span>
                <span className="w-[65%]">
                  {appointment !== undefined ? appointment.doctorName : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Chuyên khoa</span>
                <span className="">
                  {appointment !== undefined ? appointment.speciatly : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Ngày khám</span>
                <span className="">
                  {appointment !== undefined ? appointment.examDate : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Examination Time</span>
                <span className="">
                  {appointment !== undefined ? appointment.examTime : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Location</span>
                <span className="">
                  {appointment !== undefined ? appointment.bookPlace : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <button
            key={tabButtons1}
            className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px]"
            style={{
              borderColor: "#5562f7",
              color: "#5562f7",
            }}
            onClick={() => goBack()}
          >
            {tabButtons1}
          </button>
          {role === "NURSE" || role === "DOCTOR" ? (
            appointment !== undefined && appointment.commandFlag === "0" ? (
              <>
                <button
                  className=" rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px] bg-error"
                  style={{ color: "white" }}
                  onClick={() => handleshowConfirmCancel()}
                >
                  Hủy lịch hẹn
                </button>
                <button
                  className=" rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px] bg-success"
                  onClick={() => handleshowConfirmApprove()}
                  style={{ color: "white" }}
                >
                  Xác nhận lịch hẹn
                </button>
              </>
            ) : (
              <></>
            )
          ) : (
            ""
          )}
        </div>
      </div>
      {showConfirmCancel ? (
        <div className="w-[100%] h-[100vh] fixed bg-gray2 inset-0 bg-opacity-50 ">
          <div className="w-[40%] h-[300px] bg-white shadow-xl rounded-3xl fixed top-1/2 left-1/2 z-1000  transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  ">
            <div>
              <div
                className="w-[100%] h-[50px]  text-[70px] text-gradientLeft flex justify-center items-center"
                style={{ color: "#eb5757" }}
              >
                <BsFillFileTextFill />
              </div>
              <div className="w-[100%] h-[100px] flex justify-center items-center">
                <div>
                  <h1 className="font-bold text-[18px] w-[100%] flex justify-center">
                    Hủy lịch hẹn
                  </h1>
                  <p>Bạn có muốn hủy lịch hẹn này?</p>
                </div>
              </div>
              <div className="w-[100%] h-[50px] flex justify-center">
                <div className="w-[100%]  flex justify-between items-center">
                  <span
                    className="w-[40%] h-[50px] flex justify-center items-center  rounded-2xl bg-[#dddddd] cursor-pointer"
                    onClick={handleUnshowConfirmCancel}
                  >
                    <button onClick={handleUnshowConfirmCancel}>
                      Không, đóng!
                    </button>
                  </span>
                  <span
                    className="w-[40%] cursor-pointer h-[50px] flex justify-center items-center text-white rounded-2xl bg-gradientLeft"
                    onClick={Cancel}
                    style={{ backgroundColor: "#eb5757" }}
                  >
                    <button>Đồng ý, đã khám!</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showConfirmApprove ? (
        <div className="w-[100%] h-[100vh] fixed bg-gray2 inset-0 bg-opacity-50 ">
          <div className="w-[40%] h-[300px] bg-white shadow-xl rounded-3xl fixed top-1/2 left-1/2 z-1000  transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  ">
            <div>
              <div
                className="w-[100%] h-[50px]  text-[70px] text-gradientLeft flex justify-center items-center"
                style={{ color: "#27ae60" }}
              >
                <BsFillFileTextFill />
              </div>
              <div className="w-[100%] h-[100px] flex justify-center items-center">
                <div>
                  <h1 className="font-bold text-[18px] w-[100%] flex justify-center">
                    Xác nhận lịch hẹn
                  </h1>
                  <p>Bạn có muốn xác nhận lịch hẹn này?</p>
                </div>
              </div>
              <div className="w-[100%] h-[50px] flex justify-center">
                <div className="w-[100%]  flex justify-between items-center">
                  <span
                    className="w-[40%] h-[50px] flex justify-center items-center  rounded-2xl bg-[#dddddd] cursor-pointer"
                    onClick={handleUnshowConfirmApprove}
                  >
                    <button onClick={handleUnshowConfirmApprove}>
                      Không, đóng!
                    </button>
                  </span>
                  <span
                    className="w-[40%] cursor-pointer h-[50px] flex justify-center items-center text-white rounded-2xl bg-gradientLeft"
                    onClick={Approve}
                    style={{ backgroundColor: "#27ae60" }}
                  >
                    <button>Đồng ý, đã khám!</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default AppointmentDetailContent;
