import axios from "axios";
import { publicPort } from "components/url/link";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function MedicalHistoryContent({ email, role }) {
  const [listData, setListData] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [Email, setMail] = useState();
  const [rol, setRol] = useState();
  const navigate = useNavigate();

  function handlePageClick(event, pageNumber) {
    event.preventDefault();
    setCurrentPage(pageNumber);
  }

  function handleItemsPerPageChange(event) {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listOrigin.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setListData(listOrigin?.slice(indexOfFirstItem, indexOfLastItem));
  }, [itemsPerPage, currentPage, listOrigin]); // Thêm listOrigin vào dependency array

  useEffect(() => {
    if (email === undefined) {
      setMail(email);
    }

    const listApp = async () => {
      try {
        let response;
        let response1;
        let userRole = role; // Lấy role từ props

        if (userRole && userRole.name === "DOCTOR") {
          response = await axios.get(
            publicPort + `api/internal-accounts/search-email?email=${email}`
          );
          response1 = await axios.get(
            publicPort + `medicalrecord/listByDoctorId?id=${response.data.id}`
          );
        } else if (userRole === "USER") {
          response = await axios.get(
            publicPort + `patient/profile?email=${email}`
          );
          response1 = await axios.get(
            publicPort + `medicalrecord/listByPatientId?id=${response.data.id}`
          );
        }
        setListOrigin(response1.data);
        setListData(response1.data);
      } catch (error) {
        console.log(error);
      }
    };

    listApp();
  }, [email, rol, role]); // Thêm role vào dependency array

  const handleDetails = (checkin) => {
    navigate("/medicaldetails", { state: { checkin } });
  };

  const [searchInput, setInputValue] = useState("");
  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    setInputValue(searchInput);
    if (searchInput === "") {
      setListData(listOrigin);
    } else {
      const filteredList = listOrigin.filter((item) =>
        item.checkin?.patientName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setListData(filteredList);
    }
  };

  const formatDateToRight = (dateString) => {
    let date = new Date(dateString);
    let formattedDate = date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedDate;
  };

  return (
    <div className="bg-white">
      <div className="flex w-[100%] items-center pb-[30px]">
        <div className="w-[50%] text-6xl font-bold">
          <h1>Hồ sơ bệnh án</h1>
        </div>
        <div className="h-[50px] w-[50%] flex justify-end items-center">
          <div className="border-[1px] border-[#dddddd] w-[40%] h-[40px] flex items-center justify-center rounded-3xl cursor-pointer">
            <input
              onChange={handleSearchInputChange}
              className="w-[80%] h-[100%]"
              placeholder="Tìm kiếm bệnh nhân"
            />
            <span className="font-medium text-[#dddddd] w-[10%] text-[30px]">
              <GoSearch />
            </span>
          </div>
        </div>
      </div>
      <div className="w-[100%] min-h-[500px] bg-white">
        {listData.map((checkin) => (
          <div
            className="flex justify-between w-[100%] shadow-xl rounded-2xl min-h-[110px] mb-[50px]"
            key={checkin.id}
          >
            <div className="flex w-[80%]">
              <div className="w-[15%] flex justify-center items-center text-gradientLeft border-r-[2px] border-[#ddd]">
                <div>
                  <h1 className="w-[100%] flex justify-center font-bold">
                    {checkin.id}
                  </h1>
                </div>
              </div>
              <div className="w-[70%] ml-[5%]">
                <h1 className="font-bold text-[#6c87ae]">
                  {checkin.checkin?.patientName}
                </h1>
                <div className="pt-[10px]">
                  <p className="text-[14px] text-[#9b9999]">
                    Nơi khám: {checkin.checkin?.bookPlace}
                  </p>
                  <p className="text-[14px] text-[#9b9999]">
                    Điện thoại: {checkin.checkin?.phone}
                  </p>
                  <p className="text-[14px] text-[#9b9999]">
                    Chuyên khoa: {checkin.checkin?.speciatly}
                  </p>
                  <p className="text-warning">
                    Thời gian khám: {formatDateToRight(checkin.releaseTime)}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[20%] flex justify-center items-center">
              <div className="bg-gradientLeft w-[60%] h-[40px] flex justify-center items-center rounded-2xl text-white">
                <button onClick={() => handleDetails(checkin)}>
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="" style={{ textAlign: "center" }}>
        <div>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={(event) => handlePageClick(event, pageNumber)}
              style={{ margin: "5px" }}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <div>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="3">3 mục/trang</option>
            <option value="7">7 mục/trang</option>
            <option value="10">10 mục/trang</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default MedicalHistoryContent;