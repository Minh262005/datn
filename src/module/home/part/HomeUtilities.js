import React from "react";
import utilitiImg from "../../../Images/img2.png";
import ButtonIcon from "../../../components/button/ButtonIcon";
import IconCall from "../../../icon/IconCall";
import IconHome from "../../../icon/IconHome";
import { useNavigate } from "react-router-dom";
const HomeUtilities = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mt-[240px] pb-[143px]">
      <div className="w-[505px] ">
        <h2 className="font-semibold text-[32px] text-black2">
          ClinicMate - Chúng tôi chăm sóc sức khỏe của bạn trong khi bạn theo đuổi hạnh phúc 
        </h2>
        <p className="text-textColor2 mt-[16px]">
          Trải nghiệm ClinicMate ngay hôm nay. Tham gia ClinicMate trên con đường hướng tới
          tạo ra một hệ thống y tế tiên tiến, tiện lợi và thực tế hơn cho hàng triệu người
        </p>
        <ButtonIcon
          onClick={() => {
            navigate("/register");
          }}
          className="rounded-full w-max p-[16px_28px] mt-[32px]"
          iconLeft={<IconCall />}
        >
          Đăng ký ngay
        </ButtonIcon>
      </div>
      <div className="w-[540px]  relative">
        <img src={utilitiImg} alt="" />
        <span className="absolute top-[47%] left-[53%] -translate-x-2/4 -translate-y-2/4">
          <IconHome />
        </span>
      </div>
    </div>
  );
};

export default HomeUtilities;
