import axios from "axios";
import { useEffect, useState } from "react";
import { publicPort } from "../../../components/url/link";
import { useNavigate } from "react-router-dom";
import React from "react";

function AppointmentDetailsContent({ appointment }) {
  const tabButtons1 = "Quay lại";
  const tabButtons2 = "Hoàn tất khám";
  var result = {
    appointment: {
      id: "",
    },
    doctorId: "",
    sumaryResult: "",
    clinicProcess: "",
    treatment: "",
    releaseDate: "",
  };
  // console.log(appointment);
  //
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDateTime = currentDateTime
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hour12: false,
      timeZone: "UTC",
    })
    .replace(",", "");
  //
  const [type, setType] = useState("Xác nhận lịch hẹn");
  const navigate = useNavigate();
  const [showMedicalSummary, setShowMedicalSummary] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);

  const [clinicProcess, setclinicProcess] = useState({
    Cprocess: "",
  });
  const [clinicSummary, setclinicSummary] = useState({
    Csummary: "",
  });
  const [clinicTreatment, setclinicTreatment] = useState({
    Ctreatment: "",
  });
  const handleAddMedicalRecord = () => {
    setShowMedicalSummary(true);
  };
  const handleReturnToPrevious = () => {
    setShowMedicalSummary(false);
  };
  const handleshowConfirm = () => {
    setshowConfirm(false);
  };
  const handleUnshowConfirm = () => {
    setshowConfirm(true);
  };
  const [datas, setDatas] = useState([
    {
      id: 1,
      status: "Approved",
      form: "Specialty examination at the hospital",
      customer: "Nguyễn Quang Hưng",
      date: "10/06/1975",
      email: "hung@gmail.com",
      gender: "Male",
      phone: "0931936165",
      reason:
        "Lorem ipsum dolor sit amet consectetur. Cursus mauris vitae posuere id lacus. Ipsum elementum mi at mauris dui. Consequat suspendisse sit vitae nunc sed nec adipiscing.",
      doctor: "Dr. Phan Nguyen Thanh Binh",
      examinationtime: "08:00, 12/06/2023",
      location: "Clinicmate Da Nang",
      specialty: "Nutrition",
    },
  ]);
  const handleCompletionOfExamination = async () => {
    setshowConfirm(false);
    setShowMedicalSummary(false);

    result.appointment.id = appointment.appointment.id;
    result.doctorId = appointment.inaccounts.id;
    result.clinicProcess = clinicProcess.Cprocess;
    result.sumaryResult = clinicSummary.Csummary;
    result.treatment = clinicTreatment.Ctreatment;
    result.releaseDate = formattedDateTime;

    if (result.process == "" || result.sumary == "" || result.treatment == "") {
      alert("Vui lòng điền đầy đủ thông tin");
    } else {
      console.log(result);
      const response = await axios.post(
        publicPort + `medicalrecord/create`,
        result
      );

      console.log(response);
      if (response.data === "cannot find patient") {
        window.alert("Không tìm thấy bệnh nhân");
      }

      if (response.data === "Medical record created successfully.") {
        navigate("/schedules");
      } else {
        alert(response.data);
      }
    }
  };

  const goBack = () => {
    navigate("/schedules");
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);

    if (name == "Cprocess") {
      const newprocess = { ...clinicProcess, [name]: value };
      setclinicProcess(newprocess);
    }

    if (name == "Csummary") {
      const newsummary = { ...clinicSummary, [name]: value };
      setclinicSummary(newsummary);
    }

    if (name == "Ctreatment") {
      const newtreatment = { ...clinicTreatment, [name]: value };
      setclinicTreatment(newtreatment);
    }
  };

  return (
    <div>
      <div className="flex w-[100%] items-center pb-[30px]">
        <div className=" w-[50%]  text-6xl font-bold">
          <h1>Chi tiết cuộc hẹn</h1>
        </div>
      </div>
      <div className="bg-white p-5 rounded-3xl shadow-lg ">
        <div className="pl-[64px] pt-5 pb-10">
          <div key={appointment != undefined ? appointment.id : ""}>
            <div>
              <h1 className="text-[#4976f7] text-3xl font-semibold">Dịch vụ</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Hình thức dịch vụ</span>
                <span className="w-[65%]">
                  Khám chuyên khoa tại bệnh viện
                </span>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Bệnh nhân</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Khách hàng</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.patientName
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Ngày sinh</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.birthday
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">CMND/CCCD</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.patient != null
                      ? appointment.appointment.patient.id
                      : ""
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Giới tính</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.gender
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Số điện thoại</span>
                <span>
                  {appointment != undefined
                    ? appointment.appointment.phone
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Triệu chứng</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.symptom
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Mô tả</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.description
                    : " "}
                </span>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Bác sĩ</h1>
              <div className="pt-6 flex">
                <span className="w-[35%]">Bác sĩ</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.doctorName
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Chuyên khoa</span>
                <span className="">
                  {appointment != undefined
                    ? appointment.appointment.speciatly
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Ngày khám</span>
                <span className="">
                  {appointment != undefined
                    ? appointment.appointment.examDate
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Giờ khám</span>
                <span className="">
                  {appointment != undefined
                    ? appointment.appointment.examTime
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Địa điểm</span>
                <span className="">
                  {appointment != undefined
                    ? appointment.appointment.bookPlace
                    : ""}
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
            onClick={goBack}
            style={{
              borderColor: "#5562f7",
              color: "#5562f7",
            }}
          >
            {tabButtons1}
          </button>
          {showMedicalSummary ? (
            <button
              key={tabButtons2}
              className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px]"
              style={{
                borderColor: "#5562f7",
                color: "white",
                backgroundColor: "#4e6df7",
              }}
              onClick={handleUnshowConfirm}
            >
              {tabButtons2}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailsContent;
