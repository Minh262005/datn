import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import AvatarFallback from "../../Images/avatar.png";
import { IoMdArrowDropdown } from "react-icons/io";
import AccountMenu from "../../Popper/menu/AccountMenu";
import { CiLogin } from "react-icons/ci";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { publicPort } from "components/url/link";

const HomeNav = [
  { id: 1, to: "/service", title: "Trang chủ" },
  { id: 2, to: "#", title: "Lịch làm việc" },
  { id: 3, to: "#", title: "Tra cứu" },
];

const HomeHeaderServiceDoctor = () => {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");

  const [role, setRole] = useState("");
  const [nameuser, setNameUser] = useState("");
  const [viewer, setViewer] = useState(null);
  const [visibleItem, setVisibleItem] = useState(null);

  // fetch profile
  const fetchProfile = async (role, email) => {
    try {
      const url =
        role === "USER"
          ? `${publicPort}patient/profile?email=${email}`
          : `${publicPort}api/internal-accounts/search-email?email=${email}`;
      const res = await axios.get(url);
      setViewer(res.data);
    } catch (err) {
      console.error("Fetch profile error:", err);
    }
  };

  // decode token + load profile
  useEffect(() => {
    if (!storedToken) return;
    try {
      const decoded = jwtDecode(storedToken);
      setRole(decoded.roles[0].authority);
      setNameUser(decoded.nameInternal);
      fetchProfile(decoded.roles[0].authority, decoded.sub);
    } catch (err) {
      console.error("Decode token error:", err);
    }
  }, [storedToken]);

  const avatarUrl = viewer?.avatar
    ? `${publicPort}images/${viewer.avatar}`
    : AvatarFallback;

  const handleToggle = (index) => {
    setVisibleItem((prev) => (prev === index ? null : index));
  };

  // menu handlers
  const handleSchedules = () => navigate("/schedules");
  const handleCheckins = () => navigate("/examination-list");
  const handlePatients = () => navigate("/listPatientForAll");
  const handleNews = () => navigate("/newspage");
  const handleMedRecord = () => navigate("/medicalhistory");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const MENU_ITEMS = [
    { title: "Hồ sơ" },
    { title: "Phiên riêng tư" },
    { title: "Cài đặt" },
    { title: "Đăng xuất", icon: <CiLogin />, action: handleLogout },
  ];

  return (
    <header className="max-w-[1156px] gap-[46px] mx-auto flex items-center pt-[45px] relative z-50">
      <div>
        <Logo />
      </div>
      <div className="flex items-center justify-between w-full">
        {/* Navigation */}
        <nav className="home-nav" role="navigation" aria-label="Main Navigation">
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
                    {item.title}
                    {needsDropdown && (
                      <IoMdArrowDropdown className="inline ml-1" />
                    )}
                  </NavLink>

                  {/* Dropdown */}
                  {visibleItem === index && (
                    <div
                      className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-50"
                      role="menu"
                    >
                      {item.title === "Lịch làm việc" && (
                        <>
                          <button
                            onClick={handleSchedules}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Danh sách lịch làm việc
                          </button>
                          <button
                            onClick={handleCheckins}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Danh sách lượt khám
                          </button>
                        </>
                      )}
                      {item.title === "Tra cứu" && (
                        <>
                          <button
                            onClick={handlePatients}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Bệnh nhân
                          </button>
                          <button
                            onClick={handleNews}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Tin tức
                          </button>
                          <button
                            onClick={handleMedRecord}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Hồ sơ bệnh án
                          </button>
                        </>
                      )}
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
            role="button"
            tabIndex={0}
            aria-label="Account menu"
          >
            <img
              className="rounded-full w-[24px] h-[24px]"
              src={avatarUrl}
              alt={`avatar of ${nameuser || "user"}`}
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
