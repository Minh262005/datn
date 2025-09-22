import React from "react";
import Vectorneurology from "../../../ImageService/Vectorneurology.png";
import MdChildCare from "../../../ImageService/Paediatric.png";
import GiBrokenBone from "../../../ImageService/GroupXray.png";
import FaTooth from "../../../ImageService/dentalcare.png";
import FaMicroscope from "../../../ImageService/Laboratory.png";
import FaEye from "../../../ImageService/eyeEyeCare.png";
import { useNavigate } from "react-router-dom";
const listCmt = [
  {
    id: 1,
    comment:
      "“Ứng dụng nhanh chóng, tính năng liên kết hữu ích và an toàn để tra cứu lịch sử thi”",
    avatar: Vectorneurology,
    fullname: "Thần kinh học",
  },
  {
    id: 2,
    comment: "“Đặt lịch hẹn dễ dàng. Ứng dụng thông minh và tiện ích cho người dùng”",
    avatar: MdChildCare,
    fullname: "Nhi khoa",
  },
  {
    id: 3,
    comment: "“Rất tiện lợi. Tiết kiệm rất nhiều thời gian. Đơn giản nhưng hiệu quả”",
    avatar: GiBrokenBone,
    fullname: "Chụp X-quang",
  },
  {
    id: 4,
    comment:
      "“Giao diện đẹp. Chờ phiên bản tiếp theo. Cảm ơn ClinicMate”",
    avatar: FaTooth,
    fullname: "Chăm sóc răng miệng",
  },
  {
    id: 5,
    comment:
      "“Giao diện đẹp. Chờ phiên bản tiếp theo. Cảm ơn ClinicMate”",
    avatar: FaMicroscope,
    fullname: "Phòng xét nghiệm",
  },
  {
    id: 6,
    comment:
      "“Giao diện đẹp. Chờ phiên bản tiếp theo. Cảm ơn ClinicMate”",
    avatar: FaEye,
    fullname: "Chăm sóc mắt",
  },
];

const InformationCatalogueService = () => {
  const navigate = useNavigate();
  const handleNewPage = () => {
    navigate("/newspage");
  };
  return (
    <div className="grid grid-cols-3 gap-10 py-[20px]">
      {listCmt.length > 0 &&
        listCmt?.map((item) => {
          return (
            <div
              className="p-[32px] shadow-lg bg-white flex flex-col gap-8 rounded-[32px]"
              key={item.id}
              onClick={handleNewPage}
            >
              <div className="w-[80px] h-[80px] overflow-hidden">
                <img src={item.avatar} alt="" />
              </div>
              <div className="">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-black2 text-[20px]">
                    {item.fullname}
                  </span>
                </div>
              </div>
              <span className="font-light italic text-[20px] text-black2">
                {item.comment}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default InformationCatalogueService;
