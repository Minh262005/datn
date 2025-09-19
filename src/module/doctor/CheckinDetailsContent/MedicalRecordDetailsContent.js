import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function MedicalRecordDetailsContent({ checkin, role }) {
  const tabButtons1 = "Quay lại";
  const tabButtons2 = "Hoàn tất khám";
  var result = {
    checkinId: "",
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

  const goBack = () => {
    navigate("/medicalhistory");
  };

  const navigate = useNavigate();
  const [showMedicalSummary, setShowMedicalSummary] = useState(true);
  const formatDateToRight = (dateString) => {
    let date = new Date(dateString);
    let formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(formattedDate);
    return formattedDate;
  };
  return (
    <div className="pt-[5rem]">
      <div className="flex w-[100%] items-center pb-[30px]">
        <div className=" w-[70%]  text-6xl font-bold">
          <h1>Chi tiết hồ sơ khám</h1>
        </div>
      </div>
      <div className="bg-white p-5 rounded-3xl shadow-lg ">
        <div className="pl-[64px] pt-5 pb-10">
          <div key={checkin != undefined ? checkin.appointmentId : ""}>
            <div className="min-h-[80px]">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Trạng thái</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Trạng thái điểm danh</span>
                <span className="w-[65%]">
                  {checkin != undefined &&
                  checkin.checkin.commandFlag == "0" ? (
                    <p
                      className={`w-[14%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-[#9747ff]"}`}
                    >
                      Đã điểm danh
                    </p>
                  ) : checkin != undefined &&
                    checkin.checkin.commandFlag == "1" ? (
                    <p
                      className={`w-[12%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-[#6c87ae]"}`}
                    >
                      Đang khám
                    </p>
                  ) : checkin != undefined &&
                    checkin.checkin.commandFlag == "2" ? (
                    <p
                      className={`w-[13.5%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-success"}`}
                    >
                      Hoàn tất
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
              <h1 className="text-[#4976f7] text-3xl font-semibold">Dịch vụ</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Hình thức dịch vụ</span>
                <span className="w-[65%]">
                  Specialty examination at the hospital
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Phí khám</span>
                <span className="">300.000 VND</span>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Bệnh nhân</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Khách hàng</span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin.checkin.patientName : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Ngày sinh</span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin.checkin.birthday : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Mã bệnh nhân</span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin?.checkin?.patient?.id : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Mã lịch hẹn</span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin.checkin.appointmentId : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Giới tính</span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin.checkin.gender : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Số điện thoại</span>
                <span>{checkin != undefined ? checkin.checkin.phone : ""}</span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Triệu chứng</span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin.checkin.symptom : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Mô tả</span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin.checkin.note : " "}
                </span>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Bác sĩ</h1>
              <div className="pt-6 flex">
                <span className="w-[35%]">Mã bác sĩ</span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin.doctorId : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Chuyên khoa</span>
                <span className="">
                  {checkin != undefined ? checkin.checkin.speciatly : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Ngày khám</span>
                <span className="">
                  {checkin != undefined ? checkin.checkin.examDate : ""}
                </span>
              </div>

              <div className="pt-3 flex">
                <span className="w-[35%]">Địa điểm</span>
                <span className="">
                  {checkin != undefined ? checkin.checkin.bookPlace : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showMedicalSummary ? (
        <div className="w-[100%] min-h-[600px] bg-white mt-[50px] shadow-xl rounded-3xl">
          <div className=" w-[100%] h-[80px] flex justify-end">
            <h1 className="font-semibold text-gradientLeft w-[93.5%] mt-[20px] text-[20px]">
              Tóm tắt y khoa
            </h1>
          </div>
          <div className=" w-[100%] min-h-[500px]">
            <div className="font-medium w-[80%] h-[150px] ml-[79px]">
              <h1 className="mb-[10px]">Diễn tiến lâm sàng</h1>
              <div className="w-[100%] h-[126px] border-[1px] border-[#dddddd] rounded-3xl flex">
                <div className="w-[1%]"></div>
                <textarea
                  disabled={true}
                  value={checkin != undefined ? checkin.clinicProcess : ""}
                  className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                />
              </div>
            </div>
            <div className="font-medium w-[80%] h-[150px] ml-[79px] m-[20px]">
              <h1 className="mb-[10px]">Tổng hợp kết quả cận lâm sàng</h1>
              <div className="w-[100%] h-[126px] border-[1px] border-[#dddddd] rounded-3xl flex">
                <div className="w-[1%]"></div>
                <textarea
                  disabled={true}
                  value={checkin != undefined ? checkin.sumaryResult : ""}
                  className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                />
              </div>
            </div>
            <div className="font-medium w-[80%] h-[200px] ml-[79px]">
              <h1 className="mb-[10px]">Phác đồ điều trị</h1>
              <div className="w-[100%] h-[126px] border-[1px] border-[#dddddd] rounded-3xl flex">
                <div className="w-[1%]"></div>
                <textarea
                  disabled={true}
                  value={checkin != undefined ? checkin.treatment : ""}
                  className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                />
              </div>
            </div>
            <div className="font-medium w-[80%] h-[200px] ml-[79px]">
              <h1 className="mb-[10px]">Thời điểm xuất viện</h1>
              <div className="w-[100%] h-[126px] border-[1px] border-[#dddddd] rounded-3xl flex">
                <div className="w-[1%]"></div>
                <input
                  disabled={true}
                  value={
                    checkin != undefined
                      ? formatDateToRight(checkin.releaseTime)
                      : ""
                  }
                  className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
        </div>
      </div>
    </div>
  );
}

export default MedicalRecordDetailsContent;
