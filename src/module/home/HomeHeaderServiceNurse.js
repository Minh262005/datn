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
    to: "",
    title: "Lịch hẹn",
  },
  {
    id: 3,
    to: "",
    title: "Điểm danh",
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
    to: "/register",
  },
];

const HomeHeaderServiceNurse = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [role, setRole] = useState("");
  const [nameInter, setnameInter] = useState("");
  const [viewer, setViewer] = useState();
  useEffect(() => {
    try {
      const decoded = jwtDecode(storedName);
      const role = decoded.roles[0].authority;
      const mal = decoded.sub;
      setRole(role);
      const nameuser = decoded.nameInternal;
      setnameInter(nameuser);

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
          // console.log(response.data);
          setViewer(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      listApp();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const [visibleItem, setVisibleItem] = useState(null);
  const [visibleItem1, setVisibleItem1] = useState(null);
  const [visibleItem2, setVisibleItem2] = useState(null);

  const handleShow = (index) => {
    // setshow(!show);
    if (visibleItem === index) {
      setVisibleItem(null);
    } else {
      setVisibleItem(index);
      setVisibleItem1(null);
      setVisibleItem2(null);
    }
  };
  const handleShow1 = (index) => {
    // setshow(!show);
    if (visibleItem1 === index) {
      setVisibleItem1(null);
    } else {
      setVisibleItem(null);
      setVisibleItem1(index);
      setVisibleItem2(null);
    }
  };
  const handleShow2 = (index) => {
    // setshow(!show);
    if (visibleItem2 === index) {
      setVisibleItem2(null);
    } else {
      setVisibleItem(null);
      setVisibleItem1(null);
      setVisibleItem2(index);
    }
  };

  const handleAppointments = () => {
    window.location.href = "/appointments";
  };
  const handleAddAppointment = () => {
    window.location.href = "/book_appointment";
  };
  const handleCheckins = () => {
    window.location.href = "/examination-list";
  };
  const handleAddCheckin = () => {
    window.location.href = "/checkin";
  };
  const handleDoctors = () => {
    // navigate("/login-user");
    window.location.href = "/listDoctor";
  };
  const handlePatients = () => {
    // navigate("/login-user");
    window.location.href = "/listPatientForAll";
  };
  const handleNews = () => {
    window.location.href = "/newspage";
  };

  return (
    <header className="max-w-[1156px] gap-[46px] mx-auto flex items-center pt-[45px] relative z-50">
      <div>
        <Logo></Logo>
      </div>
      <div className="flex items-center justify-between w-full">
        <nav className="home-nav">
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
                          case "Lịch hẹn":
                            handleShow(index);
                            break;
                          case "Tra cứu":
                            handleShow1(index);
                            break;
                          case "Điểm danh":
                            handleShow2(index);
                            break;

                          default:
                            break;
                        }
                      }}
                    >
                      {(() => {
                        const displayMap = {
                          "Trang chủ": "Trang chủ",
                          "Lịch hẹn": "Lịch hẹn",
                          "Điểm danh": "Điểm danh",
                          "Tra cứu": "Tra cứu",
                        };
                        const base = displayMap[item.title] || item.title;
                        const needsCaret =
                          item.title === "Tra cứu" ||
                          item.title === "Lịch hẹn" ||
                          item.title === "Điểm danh";
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
                            left: "43rem",
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
                            onClick={handleAddAppointment}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Đặt lịch hẹn</p>
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
                            left: "73.2rem",
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
                            onClick={handlePatients}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Bệnh nhân</p>
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

                      {visibleItem2 === index && (
                        <div
                          className=" w-[7%] mt-[5rem] ml-[-3rem]"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            borderRadius: "1rem",
                            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                            width: "18rem",
                            position: "absolute",
                            top: "5rem",
                            left: "60.2rem",
                          }}
                        >
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
                            onClick={handleAddCheckin}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Thêm điểm danh</p>
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
            <div className="font-bold">{nameInter}</div>
            <div className="absolute top-[3px] left-[83%]">
              <IoMdArrowDropdown style={{ fontSize: "30px" }} />
            </div>
          </div>
        </AccountMenu>
      </div>
    </header>
  );
};

export default HomeHeaderServiceNurse;
