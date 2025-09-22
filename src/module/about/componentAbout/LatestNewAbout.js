import imgAbout3 from "../../../Images/Rectangle 1127.png"
import imgAbout4 from "../../../Images/Rectangle 1128.png"
import imgAbout5 from "../../../Images/Rectangle 1129.png"

import React from "react";
const listCmt = [
  {
    id: 1,
    comment:
      "Là thành viên đầu tiên đi vào hoạt động và đánh dấu sự hiện diện của thương hiệu Chăm sóc Sức khỏe Clinicmate, Clinicmate đóng vai trò quan trọng đặc biệt trong sự phát triển của hệ thống. Mỗi...",
    photo:
      imgAbout3,
    fullname:
      "Sinh nhật Clinicmate: Thành tựu đặc biệt với các đánh dấu chuyên môn",
    title: "đọc thêm",
  },
  {
    id: 2,
    comment:
      "Clinicmate hợp tác với Hiệp hội Dịch tễ học Ung thư Gan Quốc tế (ILCEC) và Hội đồng Điều phối Dịch tễ học Châu Á (ACC) để tổ chức hội nghị thường niên...",
    photo:
      imgAbout4,
    fullname:
      "Clinicmate chia sẻ nhiều nghiên cứu khoa học tại Hội nghị ACC & ILCEC",
    title: "đọc thêm",
  },
  {
    id: 3,
    comment:
      "Mỗi năm, hơn 9,6 triệu người tử vong do ung thư trên toàn thế giới, vượt quá số ca tử vong do HIV/AIDS, sốt rét và lao phổi cộng lại. Ước tính đến năm 2030, số ca tử vong do ung thư...",
    photo:
      imgAbout5,
    fullname:
      "Ngày Ung thư Thế giới 4/2: Clinicmate cam kết cung cấp dịch vụ chăm sóc khác biệt và hiệu quả cho bệnh nhân ung thư tại Việt Nam",
      title: "đọc thêm",
  },
];
const LatestNewService = () => {
  return (
    <div>
      {listCmt.length > 0 &&
        listCmt?.map((item) => {
          return (
            <div className="pb-[50px] bg-white  gap-8 " key={item.id}>
              <div className=" flex items-center gap-4">
                <div className="w-[35%] h-[200px] rounded-[20px] overflow-hidden">
                  <img src={item.photo} alt="" />
                </div>
                <div className="flex flex-col gap-1 w-[90%] pl-[96px] mt-[10px]">
                  <span className="font-bold text-black2 text-[20px]">
                    {item.fullname}
                  </span>
                  <span className="font-light italic text-[20px] text-black2 py-[5px]">
                    {item.comment}
                  </span>
                  <div className="flex items-center gap-[2px] cursor-pointer">
                    <span className="font-light text-gradientLeft text-[20px] pt-5 ">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LatestNewService;
