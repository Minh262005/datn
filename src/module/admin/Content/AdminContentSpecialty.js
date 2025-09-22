import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { publicPort } from "../../../components/url/link";

function AdminContentSpecialty() {
  const [expanded, setExpanded] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(10); // Hiển thị sẵn 10 dữ liệu
  const [listOrigin, setListOrigin] = useState([]);
  // Tạo một mảng gồm 20 object để có đủ dữ liệu để cuộn lăn chuột
  useEffect(() => {
    const listSpec = async () => {
      try {
        const response = await axios.get(
          publicPort + "api/doctors/specialty?specialty=****"
        );
        // Validate response data
        if (response.data && Array.isArray(response.data)) {
          setListOrigin(response.data);
        } else {
          setListOrigin([]);
        }
      } catch (error) {
        console.log(error);
        setListOrigin([]);
      }
    };
    listSpec();
  }, []);
  return (
    <div className="w-[100%] h-[100%] rounded-3xl bg-white shadow-lg">
      <div className="w-[100%] rounded-3xl h-[35px] flex justify-center">
        <h1 className="p-3 ml-1 font-bold text-3xl  w-[95%]">Chuyên khoa</h1>
      </div>
      <hr className="w-[90%] ml-5 text-[#d4d4d4]" />
      <div className="overflow-y-scroll h-[400px] w-[100%]  flex justify-center">
        <div className="w-[90%]">
          {listOrigin.map((data, index) => (
            <div className="flex w-[100%] h-[28px]" key={data.id || `specialty-${index}`}>
              <div className="w-[75%]  ">
                <h5 className="text-[16px] font-light">{data.nameSepcial || 'Chuyên khoa'}</h5>
              </div>
              <div className="w-[25%] ">
                <div className="flex items-center justify-center">
                  <span className="text-[18px] font-light pr-3">
                    {data.count || 0}
                  </span>
                  <span className="text-[18px]">
                    <BsFillPeopleFill />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminContentSpecialty;
