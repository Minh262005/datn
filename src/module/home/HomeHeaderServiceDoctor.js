import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import AvatarFallback from "../../Images/avatar.png";
import { IoMdArrowDropdown } from "react-icons/io";
import AccountMenu from "../../Popper/menu/AccountMenu";
import { CiLogin } from "react-icons/ci";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { publicPort } from "components/url/link";

const HomeNav = [
  { id: 1, to: "/service", title: "Trang chủ" },
  { id: 2, to: "", title: "Lịch làm việc" },
  { id: 3, to: "", title: "Tra cứu" },
];

const MENU_ITEMS = [
  { title: "Hồ sơ" },
  { title: "Phiên riêng tư" },
  { title: "Cài đặt" },
  { title: "Đăng xuất", icon: <CiLogin />, to: "/register" },
];

const HomeHeaderServiceDoctor = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");

  const [role, setRole] = useState("");
  const [nameuser, setNameUser] = useState("");
  const [viewer, setViewer] = useState(null);
  const [imageData, setImageData] = useState(null);

  // decode token + load profile
  useEffect(() => {
    if (!storedName) return;
    try {
      const decoded = jwtDecode(storedName);
      const role = decoded.roles[0].authority;
      const mal = decoded.sub;
      setRole(role);
      setNameUser(decoded.nameInternal);

      const listApp = async () => {
        try {
          let response;
          if (role === "USER") {
            response = await axios.get(
              publicPort + `patient/profile?email=${mal}`
            );
          } else {
            response = await axios.get(
              publicPort + `api/internal-accounts/search-email?email=${mal}`
            );
          }
          setViewer(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      listApp();
    } catch (error) {
      console.log(error);
    }
  }, [storedName]);

  // load avatar image
  useEffect(() => {
    if (viewer?.avatar) {
      setImageData(publicPort + `images/${viewer.avatar}`);
    } else {
      setImageData(null);
    }
  }, [viewer?.avatar]);

  // dropdown state
  const [visibleItem, setVisibleItem] = useState(null);

  const handleToggle = (index) => {
    setVisibleItem((prev) => (prev === index ? null : index));
  };

  // menu handlers
  const handleSchedules = () => navigate("/schedules");
  const handleCheckins = () => navigate("/examination-list");
  const handlePatients = () => navigate("/listPatientForAll");
  const handleNews = () => navigate("/newspage");
  const handleMedRecord = () => navigate("/medicalhistory");

  return (
    <header className="max-w-[1156px] gap-[46px] mx-auto flex items-center pt-[45px] relative z-50">
      <div>
        <Logo />
      </div>
      <div className="flex items-center justify-between w-full">
        <nav className="home-nav">
          <ul className="flex gap-6">
            {HomeNav.map((item, index) => {
              const needsDropdown =
                item.title === "Lịch làm việc" || item.title === "Tra cứu";
              return (
                <li key={item.id} className="relative">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active font-bold" : ""
                    }
                    to={item.to}
                    onClick={(e) => {
                      if (needsDropdown) {
                        e.preventDefault();
                        handleToggle(index);
                      }
                    }}
                  >
                    {item.title} {needsDropdown && "▽"}
                  </NavLink>

                  {/* Dropdown for "Lịch làm việc" */}
                  {visibleItem === index && item.title === "Lịch làm việc" && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-50">
                      <button
                        onClick={handleSchedules}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Danh sách lịch làm việc
                      </button>
                      <button
                        onClick={handleCheckins}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Danh sách lượt khám
                      </button>
                    </div>
                  )}

                  {/* Dropdown for "Tra cứu" */}
                  {visibleItem === index && item.title === "Tra cứu" && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-50">
                      <button
                        onClick={handlePatients}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Bệnh nhân
                      </button>
                      <button
                        onClick={handleNews}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Tin tức
                      </button>
                      <button
                        onClick={handleMedRecord}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Hồ sơ bệnh án
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Account menu */}
        <AccountMenu items={MENU_ITEMS}>
          <div
            className="relative flex items-center gap-2 h-[35px] px-4 bg-[#e2edff] rounded-2xl cursor-pointer"
            style={{ color: "#3f84f6" }}
          >
            <img
              className="rounded-full w-[24px] h-[24px]"
              src={imageData || AvatarFallback}
              alt="avatar"
            />
            <div className="font-bold">{nameuser}</div>
            <IoMdArrowDropdown className="text-xl" />
          </div>
        </AccountMenu>
      </div>
    </header>
  );
};

export default HomeHeaderServiceDoctor;
