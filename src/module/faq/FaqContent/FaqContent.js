import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import FaqContentAccount from './FaqComponentContent/FaqContentAccount';
import FaqContentAppointment from './FaqComponentContent/FaqContentAppointment';
import FaqContentCreating from './FaqComponentContent/FaqContentCreating';
import FaqContentReading from './FaqComponentContent/FaqContentReading';
import FaqContentViewing from './FaqComponentContent/FaqContentViewing';


function FaqContent() {
    //staff
    const [isIcon, setIsicon] = useState(false);
    const [isExpanded, setExpanded] = useState(true);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    function handleOnClick() {
        setIsicon(!isIcon);
        setExpanded(!isExpanded);
    }
    return (
        <div>
            <div className="w-[100%] rounded-3xl">
                <div className="w-[100%] flex  h-[70px]">
                    <div className="w-[70%] rounded-3xl h-[35px]">
                        {isExpanded ? (
                            <div className="h-[100px] w-[100%] cursor-pointer ">
                                <div className="w-[100%] flex">
                                    <div className="w-[50%]">
                                        <h1 className="text-[25px] text-gradientLeft" >
                                            Về ClinicMate
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[100px] w-[100%] cursor-pointer ">
                                <div className="w-[100%] flex">
                                    <div className="w-[50%]">
                                        <h1 className="text-[25px]   text-gradientLeft" >
                                            Về ClinicMate
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        className="w-[30%] flex justify-end text-[60px] text-gradientLeft cursor-pointer"
                        {...getToggleProps({ onClick: handleOnClick })}
                    >
                        {isIcon ? <AiOutlinePlus /> : <AiOutlineMinus />}
                    </div>
                </div>
                <div className='w-[100%] h-[30px] flex items-start'>
                    <hr className="w-[100%] text-gradientLeft" />
                </div>
                <div {...getCollapseProps()}>
                    <div className=" min-h-[800px] w-[100%]">
                        <div className="w-[100%] min-h-[700px] ">
                            <div className="w-[100%] h-[180px] ">
                                <div className="w-[100%] h-[40px] ">
                                    <h1 className="font-semibold text-[21px]">1. Clinicmate là gì?</h1>
                                </div>
                                <div className="w-[100%] min-h-[100px]  flex justify-center">
                                    <p className="text-[21px] font-light w-[95%] ml-[15px]">
                                        Clinicmate là một ứng dụng được phát triển bởi Hệ thống Chăm sóc Sức khỏe Clinicmate giúp các cá nhân và gia đình quản lý sức khỏe của họ với trọng tâm là chăm sóc chủ động, phòng ngừa và cá nhân hóa. Nó cho phép khách hàng tích cực tham gia vào hành trình điều trị của họ cũng như hành trình chăm sóc sức khỏe của chính họ và những người thân yêu.
                                    </p>
                                </div>
                            </div>
                            <div className="w-[100%] min-h-[210px] ">
                                <div className="w-[100%] h-[40px] ">
                                    <h1 className="font-semibold text-[21px]">2. Ai nên sử dụng Clinicmate?</h1>
                                </div>
                                <div className="w-[100%] min-h-[100px]  flex justify-center">
                                    <p className="text-[21px] font-light w-[95%] ml-[15px]">
                                        Nếu bạn là người quan tâm đến sức khỏe của mình, ứng dụng Clinicmate có thể hỗ trợ bạn trong hành trình chăm sóc sức khỏe. Các tiện ích và nội dung của Clinicmate được phát triển để hỗ trợ các nhu cầu khác nhau của các nhóm người dùng khác nhau, từ những người có nhu cầu chăm sóc đặc biệt như phụ nữ mang thai hoặc gia đình có con nhỏ, đến những người dùng thông thường có nhu cầu chăm sóc sức khỏe như thanh thiếu niên. Tại Clinicmate, tất cả các nhóm người dùng đều có thể tìm thấy thông tin chăm sóc sức khỏe cần thiết cho bản thân.

                                    </p>
                                </div>
                            </div>
                            <div className="w-[100%] h-[180px]">
                                <div className="w-[100%] h-[40px] ">
                                    <h1 className="font-semibold text-[21px]">3. Phiên bản Clinicmate 1.0 bao gồm những gì?</h1>
                                </div>
                                <div className="w-[100%] min-h-[100px]  flex justify-center">
                                    <p className="text-[21px] font-light w-[95%] ml-[15px]">
                                        Trong phiên bản 1.0, Clinicmate có 9 tính năng cơ bản: đăng ký và đăng nhập, đọc tin tức, gọi điện đến các bệnh viện Clinicmate, đặt lịch hẹn và nhắc nhở, xem kết quả khám và lịch sử bệnh án tại Clinicmate, mã sức khỏe khách hàng Clinicmate, và xem kết quả khám sức khỏe tổng quát. Trong các phiên bản tiếp theo, Clinicmate sẽ có nhiều tính năng đáng chú ý khác.
                                    </p>
                                </div>
                            </div>
                            <div className="w-[100%]h-[180px] ">
                                <div className="w-[100%] h-[40px] ">
                                    <h1 className="font-semibold text-[21px]">4. Clinicmate có thể được sử dụng trên những thiết bị nào?</h1>
                                </div>
                                <div className="w-[100%] min-h-[100px]  flex justify-center">
                                    <p className="text-[21px] font-light w-[95%] ml-[15px]">
                                        Clinicmate được sử dụng trên trang web Clinicmate.io.vn, nơi người dùng có thể đăng nhập vào tài khoản Clinicmate của họ để truy cập các tính năng khác nhau.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[100%] rounded-3xl">
                <FaqContentAccount />
            </div>
            <div className="w-[100%] rounded-3xl">
                <FaqContentReading />
            </div>
            <div className="w-[100%] rounded-3xl">
                <FaqContentAppointment />
            </div>
            <div className="w-[100%] rounded-3xl">
                <FaqContentCreating />
            </div>
            <div className="w-[100%] rounded-3xl">
                <FaqContentViewing />
            </div>
            <div className='w-[100%] min-h-[200px] '>
                <p className="text-[18px] w-[95%]">
                    Trong trường hợp bạn không thể tìm thấy thông tin cần thiết, vui lòng liên hệ với chúng tôi qua địa chỉ email hello@clinicmate.io.vn hoặc bất kỳ số hotline nào của hệ thống phòng khám tư nhân Clinicmate. Chúng tôi luôn sẵn sàng phục vụ và lắng nghe phản hồi và góp ý của bạn.
                </p>
            </div>
        </div>
    );
};

export default FaqContent