import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
const Listdata = [
  {
    id: 1,
    name: " Chẩn đoán và điều trị các bệnh tim mạch như bệnh mạch vành và tăng huyết áp",
    name1:
      " Đánh giá và điều trị bất thường nhịp tim, bệnh tim mạch ở trẻ em và các cơn cấp cứu tim mạch như bệnh mạch vành",
    name2:
      " Điều trị cấp cứu tăng huyết áp, tắc nghẽn/mất ý thức",
  },
];
function Sevirce() {
  const [isIcon, setIsicon] = useState(false);
  const [isExpanded, setExpanded] = useState(true);
  // const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  function handleOnClick() {
    setIsicon(!isIcon);
    setExpanded(!isExpanded);
  }
  return (
    <div className="w-[100%]  rounded-3xl bg-white shadow-lg">
      <div className="w-[100%] flex">
        <div className="w-[10%]">
          <BsFillInfoCircleFill className="text-[18px] mt-[30%] ml-[40%] text-[#c5d7f4]" />
        </div>
        <div className="w-[60%] rounded-3xl h-[35px]">
          {isExpanded ? (
            <h1 className="p-3 ml-1 font-bold text-[15px]">
              Trình độ học vấn
            </h1>
          ) : (
            <h1 className="p-3 ml-1 font-bold text-[15px]">
              Trình độ học vấn
            </h1>
          )}
        </div>
        <div
          className="w-[30%] text-[60px] cursor-pointer flex justify-center"
          {...getToggleProps({ onClick: handleOnClick })}
        >
          {isIcon ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
      <hr className="w-[90%] ml-5 text-[rgb(212,212,212)]" />
      <div {...getCollapseProps()}>
        {Listdata.map((data) => (
          <div key={data.id}>
            <div
              className=" text-[14px] justify-around w-[100%] ml-2 font-light p-[10px]"
              style={{ lineHeight: "35px" }}
            >
              {data.name}
              <hr className="w-[100%] text-[rgb(212,212,212)]" />
              {data.name1}
              <hr className="w-[100%] text-[rgb(212,212,212)]" />
              {data.name2}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Sevirce;
