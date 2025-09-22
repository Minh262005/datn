import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Listdata = [
  {
    id: 1,
    name: "  Mức độ hài lòng trung bình của khách hàng được hiển thị dưới đây, lấy từ khảo sát trải nghiệm khách hàng độc lập được thực hiện bởi Bộ quản lý chất lượng.",
    name1:
      " Các câu trả lời được đo trên thang điểm từ 1 đến 5, với 5 là điểm cao nhất tương đương với 'Rất tốt.'",
    name2:
      " Các nhận xét phản ánh quan điểm và ý kiến chủ quan của khách hàng.",
  },
  {
    id: 2,
    name4: " Hiện tại không có đánh giá cho bác sĩ này.",
  },
];
function Assessment() {
  return (
    <div className="w-[77%] ml-[170px] mt-[80px] bg-white  flex justify-center">
      <div className="mb-[20px] w-[45%] rounded-3xl bg-white shadow-lg">
        <div className="w-[100%] flex">
          <div className="w-[5%]">
            <BsFillInfoCircleFill className="text-[18px] mt-[36%] ml-[40%] text-[#c5d7f4]" />
          </div>
          <div className="w-[90%] rounded-3xl h-[35px]">
            <h1 className="p-3 font-bold text-[15px]">
              Đánh giá khách hàng cho Dr. Nguyen Thuy Dung: 0 đánh giá
            </h1>
          </div>
        </div>
        <hr className="w-[90%] ml-5 text-[rgb(212,212,212)]" />
        <div>
          {Listdata.map((data) => (
            <div
              className=" text-[13px] justify-around w-[100%] ml-2 font-light p-[10px]"
              key={data.id}
              style={{ lineHeight: "35px" }}
            >
              <p>{data.name}</p>
              <p className="mt-[5%] mb-[5%]">{data.name1}</p>
              <p>{data.name2}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-[20px] w-[45%] rounded-3xl h-[100%] bg-white shadow-lg ml-[5%]">
        <div className="w-[100%] flex">
          <div className="w-[5%]">
            <BsFillInfoCircleFill className="text-[18px] mt-[36%] ml-[40%] text-[#c5d7f4]" />
          </div>
          <div className="w-[90%] rounded-3xl h-[35px]">
              <h1 className="p-3 font-bold text-[15px]">Số lượng đánh giá: 0 </h1>
          </div>
        </div>
        <hr className="w-[90%] ml-5 text-[rgb(212,212,212)]" />
        <div>
          {Listdata.map((data) => (
            <div
              className=" text-[13px] justify-around w-[100%] ml-2 font-light p-[10px]"
              key={data.id}
            >
              <p>{data.name4}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Assessment;
