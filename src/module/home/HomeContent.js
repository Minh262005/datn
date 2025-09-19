import React from "react";
import imgDoctor from "../../Images/doctor.png";
import ButtonIcon from "../../components/button/ButtonIcon";
import HomeSlider from "./part/HomeSlider";
import FeaturedComment from "./part/FeaturedComment";
import HomeUtilities from "./part/HomeUtilities";
import IconRight from "../../icon/IconRight";
import { useNavigate } from "react-router-dom";

const HomeContent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center gap-[141px] justify-between max-w-[1156px] mx-auto mt-[6px]">
        <div className="flex flex-col w-[590px]">
          <span className="text-[20px] text-textColor2">
            Ứng dụng quản lý phòng khám
          </span>
          <span className="text-[56px] mt-6 text-[#fff0] font-bold bg-clip-text w-max bg-gradient-to-tr from-gradientLeft to-gradientRight">
            ClinicMate
          </span>
          <span className="mt-2 text-textColor2">
            Ứng dụng chăm sóc sức khỏe hàng đầu cho gia đình bạn
          </span>
          <p className="mt-8 text-textColor2">
            Khi những ngày bận rộn trôi qua, chúng ta đã trở nên lơ là với tài sản 
            quý giá nhất của mình: Sức khỏe. Hãy để ClinicMate trở thành người 
            giữ gìn đáng tin cậy cho tài sản đó của bạn và gia đình.
          </p>
          <ButtonIcon
            onClick={() => {
              navigate("/register");
            }}
            iconRight={<IconRight />}
            type="button"
            className="mt-8 rounded-full gap-[40px] px-[27px] w-max"
          >
            Đăng ký ngay
          </ButtonIcon>
        </div>
        <div className="w-[500px]">
          <img src={imgDoctor} alt="" />
        </div>
      </div>
      <div className="bg-secondary py-[188px]">
        <div className="max-w-[1156px] mx-auto">
          <HomeSlider></HomeSlider>
        </div>
      </div>
      <div className="max-w-[1156px] mx-auto">
        <FeaturedComment></FeaturedComment>
        <HomeUtilities></HomeUtilities>
      </div>
    </>
  );
};

export default HomeContent;
