import vietnam from "../../../ImageService/VietNam.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const listCmt = [
  {
    id: 1,
    comment:
      "Là thành viên đầu tiên đi vào hoạt động và đánh dấu sự hiện diện của thương hiệu Chăm sóc Sức khỏe Clinicmate, Clinicmate đóng vai trò quan trọng đặc biệt trong sự phát triển của hệ thống. Mỗi...",
    photo:
      "https://retailinsider.b-cdn.net/wp-content/uploads/2020/08/the-health-clinic-shoppers-exterior.jpg",
    fullname:
      "Sinh nhật Clinicmate: Những bước đột phá với các cột mốc chuyên môn đặc biệt",
    title: "đọc thêm",
  },
  {
    id: 2,
    comment:
      "Clinicmate hợp tác với Hiệp hội Dịch tễ học Ung thư Gan Quốc tế (ILCEC) và Hội đồng Điều phối Dịch tễ học Châu Á (ACC) để tổ chức hội nghị thường niên...",
    photo:
      "https://sahyadrihospital.com/wp-content/uploads/2021/05/speciality-clinic.jpg",
    fullname:
      "Clinicmate chia sẻ nhiều nghiên cứu khoa học tại Hội nghị ACC & ILCEC",
    title: "đọc thêm",
  },
  {
    id: 3,
    comment:
      "Mỗi năm, hơn 9,6 triệu người tử vong do ung thư trên toàn thế giới, vượt quá số ca tử vong do HIV/AIDS, sốt rét và lao phổi cộng lại. Ước tính đến năm 2030, số ca tử vong do ung thư...",
    photo:
      "https://img.freepik.com/free-photo/pediatrician-doctor-nurse-sitting-desk-medical-office-talking-with-child-healthcare-practitioner-specialist-medicine-providing-professional-radiographic-treatment-hospital-clinic_482257-6769.jpg",
    fullname:
      "Ngày Ung thư Thế giới 4/2: Clinicmate cam kết cung cấp dịch vụ chăm sóc khác biệt và hiệu quả cho bệnh nhân ung thư tại Việt Nam",
    title: "đọc thêm",
  },
];

const listnew = [
  {
    id: 1,
    name: "Thần kinh học",
  },
  {
    id: 2,
    name: "Nhi khoa",
  },
  {
    id: 3,
    name: "Chăm sóc răng miệng",
  },
  {
    id: 4,
    name: "Chụp X-quang",
  },
  {
    id: 5,
    name: "Phòng xét nghiệm",
  },
  {
    id: 6,
    name: "Chăm sóc mắt",
  },
];

function NewsPageContent() {
  const [showDiv, setShowDiv] = useState(false);

  const handleClick = () => {
    setShowDiv(!showDiv);
  };
  return (
    <div className="min-h-[1000px] w-[100%] flex justify-center">
      <div className=" flex w-[80%] bg-white">
        <div className="w-[20%] min-h-[100px] ">
          <div className="flex w-[100%] items-center justify-center ">
            <h1 className="text-[20px] font-bold w-[80%] text-gradientLeft cursor-pointer">
              Tin tức sức khỏe
            </h1>
            <button
              type="button"
              className="mt-2  w-[20%] rounded"
              onClick={handleClick}
              style={{ color: "#3A8EF6", fontSize: "50px" }}
            >
              {showDiv ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
            <button onClick={handleClick}></button>
          </div>

          {showDiv && (
            <div>
              {listnew.map((news) => (
                <div key={news.id}>
                  <h2 className="text-[18px] font-bold pb-[8px] cursor-pointer">
                    {news.name}
                  </h2>
                </div>
              ))}
            </div>
          )}
          <div className="w-[100%] pb-[20px] pt-[20px]">
            <h1 className="text-[18px] font-bold  text-gradientLeft cursor-pointer">
              Thông báo nóng
            </h1>
          </div>
          <div className="w-[100%]">
            <h1 className="text-[20px] font-bold w-[100%] text-gradientLeft cursor-pointer">
              Lời chứng thực
            </h1>
          </div>
        </div>
        <div className="w-[80%] min-h-[100px">
          <div className="w-[100%] min-h-[300px">
            <div>
              <div className="w-[100%] h-[40px] font-semibold">
                <h1 className="text-[22px]">Tin tức sức khỏe</h1>
              </div>
              <div className="flex">
                <div className="w-[50%] min-h-[300px]">
                  <img src="https://thumbs.dreamstime.com/b/doctor-explain-to-patient-medical-clinic-hospital-healthcare-wellness-living-163682454.jpg" />
                </div>
                <div className="w-[40%] min-h-[260px] flex justify-center">
                  <div className="w-[80%] min-h-[30px]">
                    <div>
                      <h1 className="text-[20px] font-semibold">
                        Những lưu ý quan trọng trước khi khám sức khỏe tổng quát
                      </h1>
                    </div>
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Maecenas iaculis
                        dignissim bibendum sit cras non sagittis enim. Sapien at
                        nunc fusce viverra dolor elementum sem quam. Quisque
                        morbi mi congue facilisis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <hr className=" text-[#dddddd] mt-[20px] w-[95%] h-5" />
              </div>
            </div>
            <div className="pt-[10px]">
              {listCmt.length > 0 &&
                listCmt?.map((item) => {
                  return (
                    <div className=" bg-white  gap-8 " key={item.id}>
                      <div className=" flex gap-4">
                        <div className="w-[30%] h-[200px] rounded-[20px] overflow-hidden">
                          <img src={item.photo} alt="" />
                        </div>
                        <div className="w-[90%]">
                          <div className="flex flex-col gap-1 w-[80%] ml-[10px]">
                            <span className="font-semibold text-black2 text-[18px]">
                              {item.fullname}
                            </span>
                            <span className="font-light italic text-[18px] text-black2">
                              {item.comment}
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr className="m-[2%] text-[#dddddd] w-[90%] " />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="pb-[20px]" style={{ textAlign: "center" }}>
            <button className="button text-[30px] w-10 h-10 bg-gradientLeft mr-[30px]">
              <MdKeyboardArrowLeft className="ml-[2px]" />
            </button>
            <button className="button text-[30px] w-10 h-10 bg-gradientLeft">
              <MdKeyboardArrowRight className="ml-[3px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewsPageContent;
