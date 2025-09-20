import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Schema validation
const schema = yup.object().shape({
  agreedToTerms: yup
    .boolean()
    .oneOf([true], "Bạn phải đồng ý với Điều khoản và Điều kiện."),
  agreedToMarketing: yup.boolean(),
});

const RegisterStep2 = () => {
  // ✅ Khởi tạo react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      agreedToTerms: false,
      agreedToMarketing: false,
    },
  });

  // ✅ Xử lý submit
  const onSubmit = (data) => {
    console.log("Dữ liệu hợp lệ:", data);
    // TODO: Gọi API hoặc chuyển sang bước tiếp theo
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-[40px_48px] text-textColor2"
    >
      <p>
        Trong môi trường lâm sàng, bệnh nhân có thể nhận được nhiều dịch vụ chăm sóc sức khỏe
        khác nhau. Khám sức khỏe định kỳ rất quan trọng để theo dõi sức khỏe tổng thể và
        phát hiện sớm mọi vấn đề tiềm ẩn. Các bệnh mãn tính như tiểu đường, hen suyễn hoặc bệnh tim
        cần được quản lý liên tục để kiểm soát các triệu chứng.
      </p>
      <br />
      <p>
        Vấn đề sức khỏe tinh thần có thể được điều trị bằng bác sĩ, tư vấn, hoặc thuốc.
        Các bệnh tật tức thời như cúm hoặc nhiễm trùng hô hấp có thể được quản lý bằng
        điều trị để tăng tốc độ hồi phục. Chăm sóc phòng ngừa như các xét nghiệm ung thư
        và tiêm phòng có thể giúp ngăn ngừa bệnh tật. Bệnh nhân bị chấn thương có thể
        nhận được các phương pháp điều trị như vật lý trị liệu để giúp họ phục hồi.
        Dịch vụ chăm sóc sức khỏe phụ nữ bao gồm chăm sóc sức khỏe sinh sản như
        xét nghiệm sàng lọc và chăm sóc thai kỳ. Trẻ em có thể nhận được chăm sóc
        để theo dõi sự phát triển, trong khi người lớn tuổi có thể nhận được chăm sóc
        cho các bệnh lý liên quan đến tuổi tác như bệnh Alzheimer hoặc viêm khớp.
      </p>
      <br />
      <p>
        Cuối cùng, dịch vụ chăm sóc khẩn cấp có sẵn cho bệnh nhân có nhu cầu y tế ngay lập tức.
        Trong môi trường lâm sàng, các chuyên gia chăm sóc sức khỏe làm việc để cung cấp cho
        bệnh nhân dịch vụ chăm sóc mà họ cần để duy trì và cải thiện sức khỏe của họ.
      </p>
      <br />

      {/* ✅ Checkbox Điều khoản & Điều kiện */}
      <div className="flex items-center gap-6">
        <Controller
          name="agreedToTerms"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              id="termsAndConditions"
              className="h-[29px] w-[29px]"
              {...field}
              checked={field.value}
            />
          )}
        />
        <label htmlFor="termsAndConditions">
          Tôi đồng ý với{" "}
          <span className="text-textColor">Điều khoản và điều kiện (T&C)</span>
        </label>
      </div>
      {errors.agreedToTerms && (
        <p className="text-red-500 text-sm mt-1">
          {errors.agreedToTerms.message}
        </p>
      )}

      {/* ✅ Checkbox Marketing */}
      <div className="flex items-center gap-6 mt-2">
        <Controller
          name="agreedToMarketing"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              id="marketingConsent"
              className="h-[29px] w-[29px]"
              {...field}
              checked={field.value}
            />
          )}
        />
        <label htmlFor="marketingConsent">
          Tôi đồng ý với việc sử dụng dữ liệu cá nhân của tôi cho mục đích tiếp thị và khảo sát.
        </label>
      </div>

      {/* ✅ Submit button */}
      <button
        type="submit"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Tiếp tục
      </button>
    </form>
  );
};

export default RegisterStep2;
