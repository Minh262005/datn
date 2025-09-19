import React from "react";
import Logo from "../../components/Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import EnsignVN from "../../Images/vn.png";
import EnsignAnh from "../../Images/anh.png";

const HomeNav = [
  { id: 1, to: "/", title: "Trang chủ" },
  { id: 2, to: "/about", title: "Giới thiệu" },
  { id: 3, to: "/faq", title: "Hỏi đáp" },
  { id: 4, to: "/newspage", title: "Tin tức" },
  { id: 5, to: "/listDoctorForAll", title: "Danh sách bác sĩ" },
];

const HomeHeader = ({ storedName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login-user");
  };

  return (
    <header className="max-w-[1156px] gap-[46px] mx-auto flex items-center pt-[45px]">
      <div>
        <Logo />
      </div>

      <div className="flex items-center justify-between w-full">
        {/* Navigation */}
        <nav className="home-nav">
          <ul>
            {HomeNav.map((item) => (
              <li key={item.id}>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={item.to}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}

            <li>
              <NavLink
                to={storedName ? "/book_appointment" : "/book_appointment_guest"}
              >
                Đặt lịch hẹn
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right side (login/logout + flags) */}
        <div className="flex items-center gap-8">
          {storedName ? (
            <Button
              onClick={handleLogout}
              className="!p-[10px_40px] rounded-lg text-[18px]"
            >
              Đăng xuất
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login-user")}
              className="!p-[10px_40px] rounded-lg text-[18px]"
            >
              Đăng nhập
            </Button>
          )}

          <div className="flex gap-2">
            <div className="w-[50px] h-[35px]">
              <img src={EnsignVN} alt="Vietnam flag" />
            </div>
            <div className="w-[50px] h-[35px]">
              <img src={EnsignAnh} alt="UK flag" width={50} height={35} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
