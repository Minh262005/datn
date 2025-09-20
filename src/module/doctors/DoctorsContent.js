import axios from "axios";
import React, { useState, useEffect } from "react";
import { publicPort } from "../../components/url/link";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function DoctorsContent({ role, mail }) {
  const [listData, setListData] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const listtitle = [
    {
      id: 1,
      title: "STT",
    },
    {
      id: 2,
      title: "Tên bác sĩ",
    },
    {
      id: 3,
      title: "Chuyên khoa",
    },
    {
      id: 4,
      title: "Nơi làm việc",
    },
    {
      id: 5,
      title: "Xem chi tiết",
    },
  ];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [inputValue, setInputValue] = useState("");
  const currentItems = listOrigin.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const listApp = async () => {
      try {
        const response = await axios.get(publicPort + "api/doctors");
        setListOrigin(response.data);
        setListData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    listApp();
  }, []); // Không cần dependency 'mail' và 'role' vì API lấy danh sách bác sĩ không phụ thuộc vào chúng

  useEffect(() => {
    setListData(listOrigin.slice(indexOfFirstItem, indexOfLastItem));
  }, [itemsPerPage, currentPage, listOrigin]); // Thêm listOrigin vào dependency array

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

  const handleFilter = (status) => {
    setStatusFilter(status);
    if (status === "All") {
      setListData(listOrigin.slice(indexOfFirstItem, indexOfLastItem));
    } else {
      const filteredList = listOrigin.filter(
        (item) => item.commandFlag == status
      );
      setListData(filteredList.slice(indexOfFirstItem, indexOfLastItem));
    }
  };

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    setInputValue(searchInput);
    if (searchInput === "") {
      setListData(listOrigin);
    } else {
      const filteredList = listOrigin.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setListData(filteredList);
    }
  };

  const view_detail = (item) => {
    const id = item.id;
    navigate("/doctorinformation", { state: { id } });
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-2xl w-[100%] min-h-[500px]">
      <div className="w-[100%] h-[50px]">
        <div className="mt-[40px] h-[50px] w-[30%] border-[1px] rounded-2xl flex border-[#c5c4c4] ml-[10px]">
          <button className="w-[15%]">
            <BiSearch className="text-[25px] ml-[13px] text-[#c5c4c4]" />
          </button>
          <input
            placeholder="Tìm kiếm"
            className="w-[83%] h-[100%]"
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <div className="min-h-[550px]">
        <div>
          <table className="w-[100%]">
            <thead className="h-[100px]">
              <tr className="text-[30px]">
                {listtitle.map((data) => (
                  <th
                    key={data.id}
                    className="text-[#8d8b8b] w-[1%] text-center"
                  >
                    {data.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-[100%] h-[200px]">
              {listData.map((listD) => (
                <tr
                  className={`text-center ${
                    listD.id % 2 === 0 ? "bg-white" : "bg-[#e2edff]"
                  }`}
                  key={listD.id}
                >
                  <td className="w-[10%]">{listD.id}</td>
                  <td className="w-[15%]">{listD.name}</td>
                  <td className="w-[12%]">
                    <p>{listD.specialty.name}</p>
                  </td>
                  <td className="w-[12%]">
                    <p>
                      {listD.workingPlace.name} - {listD.workingPlace.description}
                    </p>
                  </td>
                  <td className="pb-[10px] pt-[10px] w-[13%]">
                    <button
                      className="w-[80%] h-[40px] bg-gradientLeft rounded-3xl text-white"
                      onClick={() => view_detail(listD)}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
export default DoctorsContent;