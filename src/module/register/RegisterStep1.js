import React from "react";
import Input from "../../components/input/Input";
import InputBirthDay from "../../components/input/InputBirthDay";

const RegisterStep1 = ({ control }) => {
  return (
    <div className="p-[9rem_154px] gap-[76px] flex">
      <div className="flex flex-col flex-1 gap-[32px]">
        <Input
          placeholder="Họ và tên*"
          type="text"
          control={control}
          name="pname"
        />
        <Input
          placeholder="Mật khẩu*"
          type="password"
          control={control}
          name="password"
        />
        <InputBirthDay
          placeholder="Ngày sinh*"
          type="date"
          control={control}
          name="bdate"
        />
      </div>
      <div className="flex flex-col flex-1 gap-[32px]">
        <Input
          placeholder="Email*"
          type="email"
          control={control}
          name="email"
        />
        <Input
          placeholder="Xác nhận mật khẩu *"
          type="password"
          control={control}
          name="cpassword"
        />
        <Input
          placeholder="Số căn cước công dân *"
          type="text" // đổi từ number sang text
          control={control}
          name="socialsecurity"
        />
      </div>
    </div>
  );
};

export default RegisterStep1;
