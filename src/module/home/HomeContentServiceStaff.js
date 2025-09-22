import React, { useEffect, useState } from "react";
import imgAdmin from "../../Images/imgAdmin.png";
import imgDoctor from "../../Images/imgDoctor.png";
import imgNurseStaff from "../../Images/imgNurseStaff.png";
import HomeDoctorLookupSevirce from "./part/HomeDoctorLookupSevirce";
import InformationCatalogueService from "./part/InformationCatalogueService";
import { useNavigate } from "react-router-dom";
import FeaturedSeliderSevirce from "./part/FeaturedSeliderSevirce";
import LatestNewService from "./part/LatestNewService";
import { publicPort } from "../../components/url/link";
import jwtDecode from "jwt-decode";
import SolutionContent from "./ContentService/SolutionContent";
import SolutionContentDoctor from "./ContentService/SolutionContentDoctor";
import SolutionContentNurse from "./ContentService/SolutionContentNurse";
const HomeContentServiceStaff = () => {
  const tabButtons = ["In-Person", "E - consultations"];
  const [type, setType] = useState("In-Person");
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [role, setRole] = useState("");
  const [nameInter, setnameInter] = useState("");
  useEffect(() => {
    try {
      const decoded = jwtDecode(storedName);
      const role = decoded.roles[0].authority;
      setRole(role);
      const nameuser = decoded.nameInternal;
      setnameInter(nameuser);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlelocations = () => {
    navigate("/locations");
  };

  const handleInternals = () => {
    navigate("/internals");
  };
  const handleAppointments = () => {
    navigate("/appointments");
  };

  const handleSchedules = () => {
    navigate("/schedules");
  };
  const handleCheckin = () => {
    navigate("/checkin");
  };

  const handlebookappointment = () => {
    navigate("/book_appointment");
  };
  const handleExamination = () => {
    navigate("/examination-list");
  };
  const roleMap = {
    ADMIN: "Quản trị viên",
    DOCTOR: "Bác sĩ",
    NURSE: "Y Tá",
  };
  return (
    <div className="bg-white">
      <div className="flex items-center gap-[141px] justify-between max-w-[1156px] mx-auto h-[620px]">
        <div className="flex flex-col w-[590px]">
          <div>
            <div className="text-[32px] font-bold">Xin chào,</div>
            <div className="text-[32px] text-[#fff0] font-bold bg-clip-text w-max bg-gradient-to-tr from-gradientLeft to-gradientRight">
              {roleMap[role] || role} : {nameInter}
            </div>
          </div>
          {role == "ADMIN" ? (
            <div>
              <span className="mt-3 font-bold text-[17px] text-black1">
                Vai trò Quản trị viên
              </span>
              <p className="mt-8 text-textColor2">
                Quản trị viên thực hiện nhiều trách nhiệm như quản lý tài khoản người dùng, bảo mật hệ thống, cài đặt và cấu hình phần mềm, giải quyết vấn đề kỹ thuật, tạo báo cáo và thống kê, và đảm bảo hoạt động mượt mà và hiệu quả
                reports and statistics, and ensuring the smooth and effective
                functioning of the system.{" "}
                trong hệ thống.
              </p>
            </div>
          ) : role == "DOCTOR" ? (
            <div>
              <span className="mt-3 font-bold text-[17px] text-black1">
                Gây mê và Điều trị Đau
                trị Đau
              </span>
              <p className="mt-8 text-textColor2">
                Bác sĩ có 23 năm kinh nghiệm trong việc điều trị các bệnh nội khoa. Hiện tại, ông làm việc tại Bệnh viện Nội Khoa và Khoa Ngoại tại Bệnh viện Clinicmate tại Đà Nẵng.
                trị các bệnh nội khoa. Hiện tại, ông làm việc tại Bệnh viện Nội Khoa và Khoa Ngoại tại Bệnh viện Clinicmate tại Đà Nẵng.
                Bệnh tim mạch. Hiện tại, bác sĩ đang công tác tại Khoa Nội và Phòng khám Ngoại trú, Phòng khám Clinicmate Đà Nẵng.

              </p>
            </div>
          ) : (
            <div>
              <span className="mt-3 font-bold text-[17px] text-black1">
                Lịch khám và Đặt lịch khám
              </span>
              <p className="mt-8 text-textColor2">
                Bác sĩ có 23 năm kinh nghiệm trong việc điều trị các bệnh tim mạch. Hiện tại, bác sĩ đang công tác tại Khoa Nội và Phòng khám Ngoại trú, Phòng khám Clinicmate Đà Nẵng.



                Bệnh tim mạch.Đặt lịch hẹn ngay lập tức giải quyết các yêu cầu y tế khẩn cấp, đảm bảo tiếp cận các dịch vụ chăm sóc sức khỏe một cách kịp thời. Mặt khác, Đặt lịch khám hỗ trợ các chuyến thăm khám theo kế hoạch và mang lại sự thuận tiện cho những bệnh nhân thích sắp xếp các cuộc hẹn vào một ngày cụ thể trong tương lai.
              </p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingTop: "20px",
            }}
          >
            {role == "ADMIN" ? (
              <>
                <button
                  className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                  style={{
                    color: "#ffff",
                    backgroundColor: "#3681f8",
                  }}
                  onClick={handlelocations}
                >
                  Nội bộ
                </button>
                <button
                  className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                  style={{
                    color: "#5562f7",
                  }}
                  onClick={handleInternals}
                >
                  Tài khoản
                </button>
              </>
            ) : role == "DOCTOR" ? (
              <>
                <button
                  className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                  style={{
                    color: "#ffff",
                    backgroundColor: "#3681f8",
                  }}
                  onClick={handleSchedules}
                >
                  Lịch hẹn của tôi
                </button>
                <button
                  className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                  style={{
                    color: "#5562f7",
                  }}
                  onClick={handleExamination}
                >
                  Đơn thăm khám của tôi.
                </button>
              </>
            ) : (
              <>
                <button
                  className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                  style={{
                    color: "#ffff",
                    backgroundColor: "#3681f8",
                  }}
                  onClick={handleCheckin}
                >
                  Lịch khám của tôi.
                </button>
                <button
                  className="border-[3px] rounded-2xl h-[50px] w-[40%] mr-[35px]"
                  style={{
                    color: "#5562f7",
                  }}
                  onClick={handlebookappointment}
                >
                  Đặt lịch khám.
                </button>
              </>
            )}
          </div>
        </div>
        <div className="w-[46%]">
          {role == "ADMIN" ? (
            <img src={imgAdmin} style={{ marginLeft: "96px" }} alt="" />
          ) : role == "DOCTOR" ? (
            <img src={imgDoctor} style={{ marginLeft: "96px" }} alt="" />
          ) : (
            <img src={imgNurseStaff} style={{ marginLeft: "96px" }} alt="" />
          )}
        </div>
      </div>
      <div className="bg-[#e2edff] pb-[80px] pt-[40px]">
        <div className="max-w-[1156px] mx-auto">
          {role == "ADMIN" ? (
            <SolutionContent />
          ) : role == "DOCTOR" ? (
            <SolutionContentDoctor />
          ) : (
            <SolutionContentNurse />
          )}
        </div>
      </div>
      <div className="max-w-[1156px] mx-auto pt-[70px]">
        <div>
          <h1 className="pb-[50px] font-bold" style={{ fontSize: "40px" }}>
            Tin nổi bật.
          </h1>
          <FeaturedSeliderSevirce />
        </div>
        <div>
          <h1 className="pb-[50px] font-bold" style={{ fontSize: "40px" }}>
            Thông tin cá nhân.
          </h1>
          <InformationCatalogueService />
        </div>
        <div>
          <h1
            className="font-bold pb-[30px]"
            style={{ fontSize: "40px", marginTop: "100px" }}
          >
            Tin tức mới nhất.
          </h1>
          <LatestNewService />
        </div>
      </div>
    </div>
  );
};

export default HomeContentServiceStaff;
