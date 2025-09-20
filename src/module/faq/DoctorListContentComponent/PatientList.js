import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaPhone, FaTransgender } from "react-icons/fa";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase-config";

export default function PatientList({ docList, searchname }) {
  const navigate = useNavigate();
  const [listOrigin, setListOrigin] = useState(docList);
  const [specList, setSpecList] = useState(docList);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    setListOrigin(docList);
    setSpecList(docList);
  }, [docList]);

  // 🔥 Tạo state lưu nhiều avatar theo id/email
  const [avatars, setAvatars] = useState({});

  // Hàm lấy URL avatar
  const getAvatarUrl = async (imageName, key) => {
    try {
      if (!imageName) return; // tránh /o/null
      const storageRef = ref(storage, imageName);
      const url = await getDownloadURL(storageRef);
      setAvatars((prev) => ({ ...prev, [key]: url }));
    } catch (error) {
      console.error("Error getting avatar URL: ", error);
    }
  };

  // 🔥 load avatar cho từng patient
  useEffect(() => {
    if (specList?.length > 0) {
      specList.forEach((item) => {
        if (item?.avatar) {
          getAvatarUrl(item.avatar, item.email || item.id);
        }
      });
    }
  }, [specList]);

  useEffect(() => {
    if (searchname != undefined) {
      const places = () => {
        if (searchname.sn === "") {
          return listOrigin;
        } else {
          return listOrigin.filter((item) =>
            item.name.toLowerCase().includes(searchname.sn.toLowerCase())
          );
        }
      };
      setSpecList(places());
    }
  }, [searchname]);

  useEffect(() => {
    setSpecList(docList?.slice(indexOfFirstItem, indexOfLastItem));
  }, [itemsPerPage, currentPage, docList]);

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    if (searchInput === "") {
      setSpecList(listOrigin);
    } else {
      const filteredList = listOrigin.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSpecList(filteredList);
    }
  };

  const view_detail = (item) => {
    const id = item.email;
    navigate("/informationpatientstaff", { state: { id } });
  };

  function handlePageClick(event, pageNumber) {
    event.preventDefault();
    setCurrentPage(pageNumber);
  }

  function handleItemsPerPageChange(event) {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(docList?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div>
        {specList?.map((data) => (
          <div
            key={data.id}
            className=" w-[100%] h-[150px] mb-[20px] rounded-[15px]"
          >
            <div className="flex p-4 relative bg-white rounded-[15px] shadow-xl">
              <div className="w-[15%] h-[120px] rounded-[15px] overflow-hidden mr-[30px] mt-2 ">
                <img
                  className="w-[100%] h-[100%] object-cover"
                  src={avatars[data.email || data.id] || "/default-avatar.png"}
                  alt="avatar"
                />
              </div>
              <div className="w-[85%] pr-[20%]">
                <h1 className="font-semibold">{data.name}</h1>
                <div className="flex">
                  <FaTransgender className="text-2xl pr-2" />
                  <span className="text-2xl font-light">{data.gender}</span>
                </div>
                <div className="flex pt-1">
                  <FaPhone className="text-xl pr-2" />
                  <span className="text-2xl font-light">{data.phone}</span>
                </div>
                <div>
                  <span className="text-lg font-light">{data.address}</span>
                  <span className=" text-lg text-gradientLeft cursor-pointer">
                    <p onClick={() => view_detail(data)}> Read more</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ textAlign: "center" }}>
        <div>
          {pageNumbers?.map((pageNumber) => (
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
            <option value="1">1 per page</option>
            <option value="7">7 per page</option>
            <option value="10">10 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
