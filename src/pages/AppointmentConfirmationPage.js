import HomeHeaderService from "../module/home/HomeHeaderService";
import AppointmentConfirmationContent from "../module/appointmentConfirmation/AppointmentConfirmationContent";
import Footer from "../module/home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import React from "react";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";

const AppointmentConfirmationPage = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [appointment, setAppointment] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const rol = decoded.roles[0].authority;
        // if (role !== 'USER') {
        //   navigate("/")
        // }
        setRole(rol);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const location = useLocation();
  useEffect(() => {
    const appointment = location?.state?.registers;
    // console.log(appointment);
    if (appointment == undefined) {
      navigate("/book_appointment");
    } else {
      setAppointment(appointment);
    }
  }, []);

  return (
    <div className="bg-white">
      <div className="bg-white">
        {role == "NURSE" ? (
          <HomeHeaderServiceNurse></HomeHeaderServiceNurse>
        ) : (
          <HomeHeaderService></HomeHeaderService>
        )}
      </div>
      <div className="pt-[80px] pl-[190px] text-6xl font-bold py-[20px]">
        <h1>Xác nhận lịch hẹn</h1>
      </div>
      <div style={{ padding: "3% 12%" }}>
        <AppointmentConfirmationContent
          appointment={appointment}
        ></AppointmentConfirmationContent>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default AppointmentConfirmationPage;
