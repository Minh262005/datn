import axios from "axios";
import { publicPort } from "components/url/link";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

function DoctorSearch({ handleChangeName, handleSearchInputChange }) {
  const [listSpec, setListSpec] = useState([]);
  const [listLo, setListLo] = useState([]);

  useEffect(() => {
    const app = async () => {
      try {
        const response = await axios.get(publicPort + `spec/list`);
        setListSpec(response.data || []);
        const response1 = await axios.get(publicPort + `location/list`);
        setListLo(response1.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    app();
  }, []);

  return (
    <div className="flex">
      <div className="flex w-[85%]">
        {/* Location Select */}
        <div className="w-[31%] h-[50px] bg-[#fff] rounded-3xl border border-[#d8d7da] p-4 flex items-center justify-center mr-[20px] text-[#828282]">
          <div className="text-5xl">
            <FaMapMarkerAlt />
          </div>
          <select name="lo" onChange={handleChangeName} defaultValue="">
            <option value="">Location</option>
            {listLo.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>

        {/* Specialty Select */}
        <div className="w-[35%] h-[50px] bg-[#fff] rounded-3xl border border-[#d8d7da] p-4 flex items-center justify-center mr-[20px] text-[#828282]">
          <div className="text-5xl">
            <FaBuilding />
          </div>
          <select name="spc" onChange={handleChangeName} defaultValue="">
            <option value="">Specialty</option>
            {listSpec.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="border-[1px] rounded-2xl flex border-[#c5c4c4]">
        <button className="w-[15%]">
          <BiSearch className="text-[25px] ml-[5px] text-[#c5c4c4]" />
        </button>
        <input
          placeholder="Search"
          className="w-[83%] h-[100%]"
          name="sn"
          onChange={handleSearchInputChange}
        />
      </div>
    </div>
  );
}

export default DoctorSearch;
