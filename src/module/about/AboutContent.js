import React from "react";
import EnsignAnh from "../../Images/anh.png";
import FeedbackButton from "./componentAbout/FeedbackButton";
import LatestNewAbout from "./componentAbout/LatestNewAbout";
import imgAbout1 from "../../Images/Rectangle 1123.png"
import imgAbout2 from "../../Images/Rectangle 1124.png"


function AboutContent() {
  return (
    <div style={{ lineHeight: "30px" }}>
      <div className="w-[100%] h-[40px] flex items-center">
        <span className="mr-[8px] text-4xl">Chia sẻ: </span>
        <button>
          <img
            className="rounded-full w-[24px] h-[24px] mr-[8px]"
            src={EnsignAnh}
          ></img>
        </button>
        <button>
          <img className="rounded-full w-[24px] h-[24px]" src={EnsignAnh}></img>
        </button>
      </div>
      <div>
        <div className="pt-[10px]">
          <h1 className=" font-semibold pt-[15px] text-4xl">
            Phòng khám Tư nhân Clinicmate
          </h1>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            Clinicmate là hệ thống chăm sóc sức khỏe được phát triển bởi các sinh viên từ 
            Đại học FPT, một trường đại học tư thục đa ngành tại Việt Nam.
          </p>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            Với cơ sở vật chất hiện đại, đội ngũ chuyên gia và bác sĩ giàu kinh nghiệm, 
            việc áp dụng liên tục các phương pháp điều trị tiên tiến nhất trên thế giới, 
            và chất lượng dịch vụ xuất sắc, Clinicmate đã trở thành nhà cung cấp dịch vụ 
            chăm sóc sức khỏe đạt tiêu chuẩn quốc tế đáng tin cậy tại Việt Nam.
          </p>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            Trong những năm qua, Clinicmate đã không ngừng nỗ lực để hoàn thành sứ mệnh 
            cao cả của mình là trở thành hệ thống chăm sóc sức khỏe tư nhân tại Việt Nam, 
            với những thành tựu sau:
          </p>
        </div>
        <div className="pt-[5px] pl-[3%]">
          <ul className="font-light" style={{ listStyle: "disc" }}>
            <li>Hoạt động không vì mục tiêu lợi nhuận.</li>
            <li className="pt-[5px]">
              Có hai bệnh viện tư nhân đáp ứng các tiêu chuẩn an toàn nghiêm ngặt nhất 
              của JCI (Joint Commission International).
            </li>
            <li className="pt-[5px]">
              Đầu tư đáng kể vào nghiên cứu và công nghệ để nâng cao chất lượng 
              dịch vụ chăm sóc sức khỏe.
            </li>
          </ul>
        </div>
        <div className="pt-[10px]">
          <p className="font-light text-3xl">
            Được cấu trúc thành ba thành phần liên kết chặt chẽ:
          </p>
          <div className="pl-[3%] pt-[10px]">
            <ul className="font-light" style={{ listStyle: "disc" }}>
              <li>Hoạt động không vì mục tiêu lợi nhuận.</li>
              <li className="pt-[5px]">
                Có hai bệnh viện tư nhân đáp ứng các tiêu chuẩn an toàn nghiêm ngặt nhất 
                của JCI (Joint Commission International).
              </li>
              <li className="pt-[5px]">
                Đầu tư đáng kể vào nghiên cứu và công nghệ để nâng cao chất lượng 
                dịch vụ chăm sóc sức khỏe.
              </li>
            </ul>
          </div>
          <p className=" pt-[10px] font-light text-3xl">
            Ngoài việc phát triển chuỗi bệnh viện, Clinicmate cũng thành lập và 
            phát triển các viện nghiên cứu chuyên ngành.
          </p>
        </div>
        <div
          className="w-[35%] h-[250px] rounded-[20px] overflow-hidden"
          style={{ margin: "40px auto" }}
        >
          <img src={imgAbout1}></img>
        </div>
        <div>
          <h1 className=" font-semibold text-4xl">Tầm nhìn</h1>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            Trở thành hệ thống chăm sóc sức khỏe học thuật nổi tiếng quốc tế với ba trụ cột: 
            nghiên cứu đột phá, chất lượng điều trị xuất sắc và dịch vụ chăm sóc hoàn hảo.
          </p>
        </div>
        <div className="pt-[5px]">
          <h1 className=" font-semibold pt-[15px] text-4xl">Sứ mệnh</h1>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            Cung cấp dịch vụ chăm sóc với tài năng, sự chính trực và sự đồng cảm.
          </p>
        </div>
        <div
          className="w-[35%] h-[250px] rounded-[20px] overflow-hidden"
          style={{ margin: "40px auto" }}
        >
          <img src={imgAbout2}></img>
        </div>
        <div>
          <h1 className=" font-semibold pt-[15px] text-4xl">Giá trị cốt lõi</h1>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            Bốn chữ cái C-A-R-E đại diện cho những ý nghĩa sau:
          </p>
          <div className="pl-[3%] pt-[5px]">
            <ul className="font-light" style={{ listStyle: "disc" }}>
              <li>
                Sáng tạo (Creativity): Không ngừng đổi mới và mang đến những giải pháp 
                sáng tạo cho bệnh nhân.
              </li>
              <li>
                Trách nhiệm (Accountability): Chịu trách nhiệm cao nhất đối với bệnh nhân 
                và gia đình của họ về tính chính trực, kỹ năng, kiến thức và tiêu chuẩn 
                chuyên môn tại Clinicmate.
              </li>
              <li>
                Đáng tin cậy (Reliability): Cam kết chỉ làm những gì tốt nhất cho bệnh nhân 
                và cung cấp mức độ tin cậy cao nhất cho cộng đồng.
              </li>
              <li>
                Xuất sắc (Excellence): Phấn đấu để đạt được chất lượng dịch vụ cao nhất 
                và quy trình chăm sóc sức khỏe xuất sắc.
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-[3%]">
          <h1 className=" font-semibold pt-[15px] text-4xl">
            Cam kết với khách hàng
          </h1>
          <div className="pl-[3%] pt-[5px]">
            <ul className="font-light" style={{ listStyle: "disc" }}>
              <li>Bệnh nhân được khám bởi các chuyên gia có trình độ cao.</li>
              <li>
                Thực hành lâm sàng dựa trên bằng chứng, đảm bảo chất lượng 
                chăm sóc bệnh nhân.
              </li>
              <li>
                Bệnh viện được vận hành với ưu tiên về an toàn bệnh nhân và 
                trải qua các đánh giá định kỳ và phân tích kỹ lưỡng để cải thiện 
                chất lượng dịch vụ.
              </li>
              <li>
                Tình trạng sức khỏe của bệnh nhân được đánh giá liên tục trước, 
                trong và sau điều trị.
              </li>
              <li>
                Các giao thức điều trị cho bệnh nhân được lựa chọn cẩn thận để 
                đảm bảo phù hợp và hiệu quả cho từng trường hợp.
              </li>
              <li>
                Bệnh nhân và gia đình được giáo dục và cung cấp kiến thức 
                chăm sóc sức khỏe.
              </li>
              <li>
                Quyền của bệnh nhân được tôn trọng và nhấn mạnh, đặc biệt là 
                quyền riêng tư và bảo mật thông tin, cũng như đáp ứng nhu cầu 
                tâm lý và văn hóa.
              </li>
              <li>
                Tuân thủ các quy trình và quy định kiểm soát nhiễm trùng bệnh viện 
                để giảm thiểu nguy cơ nhiễm trùng mắc phải tại bệnh viện cho bệnh nhân.
              </li>
              <li>
                Tất cả nhân viên tham gia các khóa đào tạo ứng phó khẩn cấp 
                để đảm bảo an toàn cho bệnh nhân.
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-[3%]  text-[#5365f7]">
          <h1 className=" font-semibold pt-[15px] text-4xl">
            Để biết thêm thông tin:
          </h1>
          <div className="pl-[3%] pt-[5px]">
            <ul className="font-semibold" style={{ listStyle: "disc" }}>
              <li>
                <a href="#">
                  Clinicmate tạo ra giá trị đặc biệt trong lĩnh vực chăm sóc sức khỏe tại Việt Nam.
                </a>
              </li>
              <li>
                <a href="#">
                  Clinicmate đã được vinh danh là "Bệnh viện Tiến bộ Nhất" và "An toàn cho Bệnh nhân".
                </a>
              </li>
              <li>
                <a href="#">
                  Clinicmate đã thực hiện thành công ca cấy ghép tim nhân tạo để hỗ trợ bệnh nhân suy tim giai đoạn cuối.
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-14">
          <FeedbackButton></FeedbackButton>
        </div>
        <div className="pt-16">
          <LatestNewAbout />
        </div>
      </div>
    </div>
  );
}
export default AboutContent;
