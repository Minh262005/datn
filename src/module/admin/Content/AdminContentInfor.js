import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { publicPort } from "../../../components/url/link";

// Tạo một mảng gồm 20 object để có đủ dữ liệu để cuộn lăn chuột


function AdminContentInfor() {

  const tabButtons1 = "Bác sĩ";
  const tabButtons2 = "Chuyên khoa";
  const [showList1, setShowList1] = useState(true);
  const [showList2, setShowList2] = useState(false);

  const [listOrigin, setListOrigin] = useState([]);
  // Tạo một mảng gồm 20 object để có đủ dữ liệu để cuộn lăn chuột
  useEffect(() => {
    const listDoctor = async () => {
      try {
        const response = await axios.get(
          publicPort + "api/countByDoctorOfApointment"
        );
        // Validate response data
        if (response.data && Array.isArray(response.data)) {
          setListOrigin(response.data);
        } else {
          console.warn("Invalid API response format");
          setListOrigin([]);
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        if (error.response?.status === 500) {
          console.error("Server error - API endpoint may have issues");
        }
        setListOrigin([]);
      }
    };
    listDoctor();
  }, []);
  const handleShowList1 = () => {
    setShowList1(true);
    setShowList2(false);
  };

  const handleShowList2 = () => {
    setShowList1(false);
    setShowList2(true);
  };


  return (
    <div className="w-[100%] h-[100%] rounded-3xl bg-white shadow-lg">
      <div className="w-[100%] rounded-3xl h-[100px]">
        <div className="flex w-[100%]">
          <div className="w-[50%] flex justify-center">
            <button
              onClick={handleShowList1}
              className={`bg-[#5463f7] text-[#e6efff] text-[20px] rounded-2xl h-[50px] w-[70%] ${showList1 ? "bg-gradientLeft" : "bg-white"}`}
            >
              {tabButtons1}
            </button>
          </div>
          <div className="w-[50%]">
            <button
              onClick={handleShowList2}
              className={`text-[#e6efff] text-[20px] rounded-2xl h-[50px] w-[70%] ${showList2 ? "bg-gradientLeft" : "bg-white"}`}
            >
              {tabButtons2}
            </button>
          </div>
        </div>
        <div className="flex justify-center h-[50px] items-center">
          <div className="w-[100%]">
            <div className="flex w-[100%] ">
              <div className="w-[60%] flex">
                <div className="w-[45%] flex justify-center">
                  <h5 className="text-[#75a2cf]">ID</h5>
                </div>
                <div className="w-[55%]">
                  <h5 className="text-[16px] font-light text-[#75a2cf]">Tên</h5>
                </div>
              </div>
              <div className="w-[40%]">
                <div className="flex w-[100%]">
                  <div className="w-[50%]  flex justify-center">
                    <h5 className="text-[16px] font-light text-[#75a2cf]">
                    Đặt lịch hẹn                    </h5> 
                  </div>
                  <div className="w-[50%]  flex justify-center">
                    <h5 className="text-[16px] font-light text-[#75a2cf]">
                      Hoàn thành
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-[90%] ml-5 text-[#d4d4d4]" />
      <div className="overflow-y-scroll h-[340px] w-[100%] flex justify-center">
        <div className="w-[90%]">
          {listOrigin.length === 0 ? (
            <div className="flex justify-center items-center h-[200px]">
              <div className="text-center">
                <div className="text-gray-400 text-4xl mb-2">📊</div>
                  <p className="text-gray-600">Không có dữ liệu</p>
                <p className="text-gray-500 text-sm">Hiện tại chưa có thông tin thống kê</p>
              </div>
            </div>
          ) : (
            <>
              {showList1 && listOrigin.map((data, index) => (
                <div className="flex w-[100%] h-[28px]" key={data.id || `doctor-${index}`}>
                  <div className="w-[80%] flex">
                    <div className="w-[30%] flex justify-center">
                      <h5>{data.id || 'N/A'}</h5>
                    </div>
                    <div className="w-[70%]">
                      <h5 className="text-[16px] font-light">{data.nameDoctor || 'Bác sĩ'}</h5>
                    </div>
                  </div>
                  <div className="w-[40%]">
                    <div className="flex w-[100%]">
                      <div className="w-[50%] flex justify-center">
                        <h5 className="text-[18px]">{data.online || 0}</h5>
                      </div>
                      <div className="w-[50%] flex justify-end">
                        <h5 className="text-[18px]">{data.examination || 0}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {showList2 && listOrigin.map((data, index) => (
                <div className="flex w-[100%] h-[28px]" key={data.idspe || `specialty-${index}`}>
                  <div className="w-[80%] flex">
                    <div className="w-[30%] flex justify-center">
                      <h5>{data.idspe || 'N/A'}</h5>
                    </div>
                    <div className="w-[70%]">
                      <h5 className="text-[16px] font-light">{data.nameSepcial || 'Chuyên khoa'}</h5>
                    </div>
                  </div>
                  <div className="w-[40%]">
                    <div className="flex w-[100%]">
                      <div className="w-[50%] flex justify-center">
                        <h5 className="text-[18px]">{data.online || 0}</h5>
                      </div>
                      <div className="w-[50%] flex justify-end">
                        <h5 className="text-[18px]">{data.examination || 0}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminContentInfor;