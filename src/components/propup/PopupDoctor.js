import React, { useState, useEffect } from "react";
import IconClose from "../../icon/IconClose";
import IconSearch from "../../icon/IconSearch";
import { Link } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase-config";
import avatarDefault from "../../Images/avatar.png";
import { v4 } from "uuid";


const PopupDoctor = ({
  header,
  describe,
  handleClose,
  listData,
  changeDoctorList,
  handleSearchInputChange,
  doctor,
}) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Hàm lấy URL của avatar
  const getAvatarUrl = async (imageName) => {
    try {
      if (!imageName) return null;
      const storageRef = ref(storage, `${imageName}`);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Error getting avatar URL: ', error);
      return null;
    }
  };
  const [avatarUrls, setAvatarUrls] = useState({});
  useEffect(() => {
    if (listData?.length > 0) {
      listData.forEach((items) => {
        const avatarName = items.avatar;
        if (avatarName) {
          getAvatarUrl(avatarName).then((url) => {
            setAvatarUrls((prevUrls) => ({
              ...prevUrls,
              [items.id]: url || avatarDefault,
            }));
          });
        } else {
          setAvatarUrls((prevUrls) => ({
            ...prevUrls,
            [items.id]: avatarDefault,
          }));
        }
      });
    }
  }, [listData]);
  return (
    <div className="p-[3.2rem_7.4rem] rounded-[1.6rem] bg-white">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[3.2rem] text-black1 font-semibold">{header}</h3>{" "}
        <span onClick={handleClose} className="cursor-pointer">
          <IconClose></IconClose>
        </span>
      </div>
      <span className="mt-[0.8rem] text-[#8D8B8B]">{describe}</span>
      <div className="mt-[3.3rem]">
        <div className="p-[1.4rem_2.5rem] border border-[#8D8B8B] relative rounded-[0.8rem]">
          <input
            onChange={handleSearchInputChange}
            style={{ width: "90%" }}
            className="ml-[5rem] "
            placeholder="Tìm bác sĩ"
            type="search"
          />
          <div className="absolute top-2/4 left-[2.4rem] -translate-y-2/4">
            <IconSearch></IconSearch>
          </div>
        </div>
        <div className="overflow-auto gap-[0.8rem] max-h-[40rem] mt-[2.4rem]">
          {Array.isArray(listData) && listData.length > 0 ? (
            listData.map((item) => {
              return doctor === item ? (
                <div
                key={item.id}
                className="shadow-md text-success justify-between flex items-center font-semibold text-[2rem] p-[2.7rem_4.7rem] rounded-[1.6rem] cursor-pointer"
                style={{ border: "1px solid green", marginBottom: "1rem" }}
              >               
                    <div className="flex items-center gap-[3.2rem]">
                    <div className="w-[5.7rem] h-[5.7rem] overflow-hidden rounded-full">
                      <img src={avatarUrls[item?.id] || avatarDefault} alt="" />
                    </div>
                    <span className="font-semibold text-[2rem]">
                      {item.name}
                    </span>
                  </div>
                  <Link className="text-gradient">thông tin</Link>
                </div>
              ) : (
                <div
                  onClick={() => changeDoctorList(item)}
                  key={item.id}
                  className="shadow-md justify-between flex items-center font-semibold text-[2rem] p-[2.7rem_4.7rem] rounded-[1.6rem] cursor-pointer"
                  style={{ marginBottom: "1rem" }}
                >
                  <div className="flex items-center gap-[3.2rem]">
                    <div className="w-[5.7rem] h-[5.7rem] overflow-hidden rounded-full">
                      <img src={avatarUrls[item?.id] || avatarDefault}  alt="" />
                    </div>
                    <span className="font-semibold text-[2rem]">
                      {item.name}
                    </span>
                  </div>
                  <Link className="text-gradient">thông tin</Link>
                </div>
              );
            })
          ) : (
            <div className="text-center text-[#8D8B8B] p-6">Không có bác sĩ khả dụng</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupDoctor;
