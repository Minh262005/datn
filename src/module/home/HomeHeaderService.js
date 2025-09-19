import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import EnsignAnh from "../../Images/anh.png";
import AvatarFallback from "../../Images/avatar.png";
import { IoMdArrowDropdown } from "react-icons/io";
import AccountMenu from "../../Popper/menu/AccountMenu";
import { CiLogin } from "react-icons/ci";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { publicPort } from "components/url/link";
const HomeNav = [
  {
    id: 1,
    to: "/service",
    title: "Trang chủ",
  },
  {
    id: 2,
    to: "/book_appointment",
    title: "Đặt lịch hẹn",
  },
  {
    id: 3,
    to: "",
    title: "Hồ sơ",
  },
  {
    id: 4,
    to: "",
    title: "Tra cứu",
  },
];

const MENU_ITEMS = [
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
  },
];

const HomeHeaderService = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [role, setRole] = useState("");
  const [viewer, setViewer] = useState();

  const [nameuser, setNameUser] = useState("");
  useEffect(() => {
    try {
      if (!storedName) return;
      const decoded = jwtDecode(storedName);
      const role = decoded.roles?.[0]?.authority;
      const mal = decoded.sub;
      setRole(role);
      const nameuser = decoded.nameUser;
      setNameUser(nameuser);

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

  const [imageData, setImageData] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      if (viewer?.avatar) {
        try {
          const response = await axios.get(
            publicPort + `images/${viewer.avatar}`,
            {
              responseType: "blob",
            }
          );
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageData(reader.result);
          };
          reader.readAsDataURL(response.data);
        } catch (error) {
          console.error("Error fetching image:", error);
          setImageData(null);
        }
      } else {
        setImageData(null);
      }
    };

    fetchImage();
  }, [viewer?.avatar]);

  const handleLogout = () => {
    //log out here
    localStorage.removeItem("token");
    navigate("/login-user");
  };
  const handleAppointments = () => {
    window.location.href = "/listofappointment";
  };
  const handleCheckins = () => {
    window.location.href = "/examination-list";
  };
  const handleMedicalHistory = () => {
    window.location.href = "/medicalhistory";
  };
  const handleDoctors = () => {
    // navigate("/login-user");
    window.location.href = "/listDoctor";
  };
  const handleNews = () => {
    window.location.href = "/newspage";
  };

  const [visibleItem, setVisibleItem] = useState(null);
  const [visibleItem1, setVisibleItem1] = useState(null);

  const handleShow = (index) => {
    // setshow(!show);
    if (visibleItem === index) {
      setVisibleItem(null);
    } else {
      setVisibleItem(index);
      setVisibleItem1(null);
    }
  };
  const handleShow1 = (index) => {
    // setshow(!show);
    if (visibleItem1 === index) {
      setVisibleItem1(null);
    } else {
      setVisibleItem(null);
      setVisibleItem1(index);
    }
  };
  // removed duplicate image effect

  return (
    <header className="max-w-[1156px] gap-[46px] mx-auto flex items-center pt-[45px] relative z-50">
      <div>
        <Logo></Logo>
      </div>
      <div className="flex items-center justify-between w-full">
        <nav className="home-nav w-[84rem]">
          <ul>
            {HomeNav.length > 0 &&
              HomeNav.map((item, index) => {
                return (
                  <li key={item.id} style={{ display: "contents" }}>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : null)}
                      to={item.to}
                      onClick={() => {
                        switch (item.title) {
                          case "Hồ sơ":
                            handleShow(index);
                            break;
                          case "Tra cứu":
                            handleShow1(index);
                            break;

                          default:
                            break;
                        }
                      }}
                    >
                      {(() => {
                        const displayMap = {
                          "Trang chủ": "Trang chủ",
                          "Đặt lịch hẹn": "Đặt lịch hẹn",
                          "Danh sách bác sĩ": "Danh sách bác sĩ",
                          "Hồ sơ": "Hồ sơ", 
                          "Tra cứu": "Tra cứu",
                        };
                        const base = displayMap[item.title] || item.title;
                        const needsCaret = item.title === "Tra cứu" || item.title === "Hồ sơ";
                        return needsCaret ? base + " ▽" : base;
                      })()}

                      {visibleItem === index && (
                        <div
                          className=" w-[13%] mt-[5rem] ml-[-3rem]"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            borderRadius: "1rem",
                            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                            position: "absolute",
                            top: "5rem",
                            left: "62.5rem",
                          }}
                        >
                          <span
                            onClick={handleAppointments}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Danh sách lịch hẹn</p>
                          </span>
                          <span
                            onClick={handleCheckins}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Danh sách lượt khám</p>
                          </span>
                          <span
                            onClick={handleMedicalHistory}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Hồ sơ bệnh án</p>
                          </span>
                        </div>
                      )}

                      {visibleItem1 === index && (
                        <div
                          className=" w-[7%] mt-[5rem] ml-[-3rem]"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            borderRadius: "1rem",
                            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                            position: "absolute",
                            top: "5rem",
                            left: "75.2rem",
                          }}
                        >
                          <span
                            onClick={handleDoctors}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Bác sĩ</p>
                          </span>
                          <span
                            onClick={handleNews}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Tin tức</p>
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </nav>
        <AccountMenu items={MENU_ITEMS}>
          <div
            className=" relative flex h-[35px] !p-[5px_40px] bg-[#e2edff] rounded-2xl  "
            style={{ color: "#3f84f6", borderRadius: "20px" }}
          >
            <img
              className=" absolute rounded-full w-[24px] h-[24px] top-[6px] left-[4px]"
              src={imageData || AvatarFallback}
              alt="avatar"
            ></img>
            <div className="font-bold">{nameuser} </div>
            <div className="absolute top-[3px] left-[83%]">
              <IoMdArrowDropdown style={{ fontSize: "30px" }} />
            </div>
          </div>
        </AccountMenu>
      </div>
    </header>
  );
};

export default HomeHeaderService;
