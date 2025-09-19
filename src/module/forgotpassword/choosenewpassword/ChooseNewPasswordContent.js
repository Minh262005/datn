import axios from "axios";
import { useEffect, useState } from "react";
import { localPort, publicPort } from "../../../components/url/link";
import { useNavigate } from "react-router";
import React from "react";

function ChooseNewPasswordContent({ email }) {
  const navigate = useNavigate();
  const [newpass, setNewPass] = useState([
    {
      newp: "",
    },
  ]);
  const [newRepass, setNewRePass] = useState([
    {
      newrep: "",
    },
  ]);
  const handleChangePass = (event) => {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);

    if (name === "newp") {
      const newp = {
        ...newpass,
        [name]: value,
      };
      console.log("set new pass");
      setNewPass(newp);
    }

    if (name === "newrep") {
      const newrp = {
        ...newRepass,
        [name]: value,
      };
      console.log("set new repass");
      setNewRePass(newrp);
    }
  };

  const handleCancel = () => {
    navigate("/login-user");
  };

  const handleClickSave = async () => {
    console.log(newpass);
    console.log(newRepass);
    if (
      newpass.newp != "" &&
      newRepass.newrep != "" &&
      newpass.newp == newRepass.newrep
    ) {
      const response = await axios.put(
        publicPort +
          `patient/updatepassword?email=${email}&newpass=${newpass.newp}`
      );
      console.log(response);
      if (response.data == "Update success") {
        navigate("/login-user");
      } else {
        alert(response.data);
      }
    } else {
      alert(
        "Vui lòng điền đầy đủ thông tin hoặc kiểm tra mật khẩu và xác nhận mật khẩu trùng khớp"
      );
    }
  };

  return (
    <div className="flex justify-center">
      <div className="min-h-[500px] w-[50%] mb-[100px] bg-white mt-[50px] rounded-[20px]">
        <div className="pt-[5%] pl-[8%] pr-[7%]">
          <div className="w-[100%] h-[80px]">
            <h1 className="text-[30px] font-bold w-[75%]">Nhập mã bảo mật</h1>
          </div>
          <div className=" w-[100%]">
            <span className="text-grayborder2">
              Tạo mật khẩu mới dài tối thiểu 6 ký tự. Mật khẩu mạnh nên gồm
              chữ, số và ký tự đặc biệt.
            </span>
          </div>
          <div className="w-[100%] h-[70px] flex items-center">
            <div className="w-[60%] h-[45px] rounded-2xl flex justify-center items-center border-[#dddddd] border-[1px]">
              <input
                type="password"
                name="newp"
                className="w-[90%] h-[40px]"
                onChange={handleChangePass}
                placeholder="Mật khẩu mới *"
              />
            </div>
          </div>
          <div className="w-[100%] h-[70px] flex items-center">
            <div className="w-[60%] h-[45px] rounded-2xl flex justify-center items-center border-[#dddddd] border-[1px]">
              <input
                type="password"
                name="newrep"
                className="w-[90%] h-[40px]"
                onChange={handleChangePass}
                placeholder="Xác nhận mật khẩu mới *"
              />
            </div>
          </div>
          <div>
            <span className="text-success font-bold text-2xl">Mạnh</span>
          </div>
          <hr className="w-[100%] text-grayborder2 font-normal mt-[5%] mb-[5%]" />
          <div className=" w-[100%] h-[45px] flex justify-end">
            <span className="w-[30%] bg-[#b9b4b4] h-[50px] mr-[30px] rounded-2xl flex items-center justify-center">
              <button onClick={handleCancel}>Hủy</button>
            </span>
            <span className="w-[30%] bg-[#516af8] h-[50px] rounded-2xl">
              <button
                onClick={handleClickSave}
                className="w-[100%] h-[40px] text-white mt-[5px] font-bold"
              >
                Lưu
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChooseNewPasswordContent;
