// @ts-nocheck
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import PopupDoctor from "../propup/PopupDoctor";
import axios from "axios";
import { publicPort } from "../url/link";
const CreatePortalDoctor = ({
  visible,
  onClose,
  handleClose,
  changeDoctorList,
  spec,
  doctor,
  place,
  checkinDoctor,
}) => {
  const [doctorList, setDoctorList] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const [doctorListSearch, setDoctorListSearch] = useState([]);

  useEffect(() => {
    const doctos = async () => {
      try {
        let data = [];
        if (place && place.id) {
          const resByPlace = await axios.get(publicPort + `api/list_lo/${place.id}`);
          if (Array.isArray(resByPlace.data) && resByPlace.data.length > 0) {
            data = resByPlace.data;
          }
        }
        if (data.length === 0) {
          try {
            const resDoctors = await axios.get(publicPort + `api/doctors`);
            if (Array.isArray(resDoctors.data) && resDoctors.data.length > 0) {
              data = resDoctors.data;
            }
          } catch (e) {}
        }
        if (data.length === 0) {
          try {
            const resDoctorsAdmin = await axios.get(publicPort + `api/doctorsForAdmin`);
            if (Array.isArray(resDoctorsAdmin.data) && resDoctorsAdmin.data.length > 0) {
              data = resDoctorsAdmin.data;
            }
          } catch (e) {}
        }
        if (data.length === 0) {
          try {
            const resAll = await axios.get(publicPort + `api/list`);
            if (Array.isArray(resAll.data) && resAll.data.length > 0) {
              // lọc chỉ bác sĩ
              data = resAll.data.filter((item) => item?.role && (item.role.name === 'DOCTOR' || item.role.id === 2));
            }
          } catch (e) {}
        }
        setDoctorList(Array.isArray(data) ? data : []);
        setListOrigin(Array.isArray(data) ? data : []);
      } catch (error) {
        setDoctorList([]);
        setListOrigin([]);
      }
    };
    doctos();
  }, [place]);

  useEffect(() => {
    if (checkinDoctor != undefined) {
      const places = async () => {
        const response = await axios.get(publicPort + `api/doctors`);
        const findItemByName = (name) => {
          return response.data.find((item) => item.id == name);
        };
        const selectedItem = findItemByName(checkinDoctor);
        changeDoctorList(selectedItem);
      };
      places();
    }
  }, [checkinDoctor]);


  useEffect(() => {
    // Luôn dựa trên listOrigin mới nhất, sau khi fetch xong
    const baseList = Array.isArray(listOrigin) ? listOrigin : [];
    if (spec !== undefined) {
      const filteredItems = baseList.filter((item) => {
        const isDoctor = item?.role && (item.role.name === 'DOCTOR' || item.role.id === 2);
        const matchSpec = item?.specialty != null && spec?.id == item.specialty.id;
        return isDoctor && matchSpec;
      });
      if (filteredItems.length === 0) {
        setDoctorList(baseList);
        setDoctorListSearch(baseList);
      } else {
        setDoctorList(filteredItems);
        setDoctorListSearch(filteredItems);
      }
    } else {
      setDoctorList(baseList);
      setDoctorListSearch(baseList);
    }
  }, [spec, listOrigin]);

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    if (searchInput === "") {
      setDoctorList(listOrigin);
    } else {
      const filteredList = doctorListSearch.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );

      setDoctorList(filteredList);
    }
  };

  return (
    <CSSTransition
      in={visible}
      timeout={200}
      unmountOnExit
      classNames="my-node"
    >
      {(state) =>
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-5  ${
              visible ? "" : "opacity-0 invisible"
            }`}
          >
            <div
              className="absolute inset-0 bg-black1 bg-opacity-40 overlay"
              onClick={handleClose}
            ></div>
            <div className="bg-white z-50 p-[2rem_3rem] shadow-md content absolute rounded-lg max-w-[70rem] w-full">
              <PopupDoctor
                doctor={doctor}
                handleSearchInputChange={handleSearchInputChange}
                changeDoctorList={changeDoctorList}
                listData={doctorList}
                handleClose={onClose}
                header="Danh sách bác sĩ"
                describe="Chọn bác sĩ"
              ></PopupDoctor>
            </div>
          </div>,
          document.body
        )
      }
    </CSSTransition>
  );
};

export default CreatePortalDoctor;
