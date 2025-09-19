import React from "react";
import Logo from "../../components/Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import EnsignVN from "../../Images/vn.png";
import EnsignAnh from "../../Images/anh.png";
import { IoMdArrowDropdown } from "react-icons/io";
import imgDoctor from "../../Images/Doctor2.png";
import Wrapper from "../../Popper/Wrapper";
import AccountMenu from "../../Popper/menu/AccountMenu";
import { CiLogin } from "react-icons/ci";
const HomeNav = [
  {
    id: 1,
    to: "/",
    title: "Trang chủ",
  },
  {
    id: 3,
    to: "/About",
    title: "Giới thiệu",
  },
  {
    id: 4,
    to: "/faq",
    title: "Hỏi đáp",
  },
  {
    id: 5,
    to: "/newspage",
    title: "Tin tức",
  },
  {
    id: 6,
    to: "/book_appointment_guest",
    title: "Đặt lịch khám",
  },
];

const MENU_ITEMS = [
  {
    title: "Tài khoản",
  },
  {
    title: "Hồ sơ",
  },
  {
    title: "Phiên riêng tư",
  },
  {
    title: "Cài đặt",
  },
  {
    title: "Đăng xuất",
    icon: <CiLogin />,
    to: "/register",
  },
];

const HomeHeaderServiceGuest = () => {
  const navigate = useNavigate();
  return (
    <header className="max-w-[1156px] gap-[46px] mx-auto flex items-center pt-[45px] relative z-50">
      <div>
        <Logo></Logo>
      </div>
      <div className="flex items-center justify-between w-full">
        <nav className="home-nav">
          <ul>
            {HomeNav.length > 0 &&
              HomeNav.map((item) => {
                return (
                  <li key={item.id}>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : null)}
                      to={item.to}
                    >
                      {item.title}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-8">
        <Button
          onClick={() => {
            navigate("/login-user");
          }}
          className="!p-[10px_40px] rounded-lg text-[18px]"
        >
          Đăng nhập
        </Button>
      </div>
    </header>
  );
};

export default HomeHeaderServiceGuest;
