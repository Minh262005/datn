import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import IconSpecialty from "../../icon/IconSpecialty";
import SelectCard from "./part/SelectCardSymtom";
import IconClinic from "../../icon/IconClinic";
import IconDoctor from "../../icon/IconDoctor";
import ButtonIcon from "../../components/button/ButtonIcon";
import IconCal from "../../icon/IconCal";
import Calendar from "react-calendar";
import CreatePortalSpecialty from "../../components/createPortal/CreatePortalSpecialty";
import InputInfo from "../../components/input/InputInfo";
import IconPen from "../../icon/IconPen";
import IconPhone from "../../icon/IconPhone";
import IconBirthday from "../../icon/IconBirthday";
import IconGender from "../../icon/IconGender";
import IconDown from "../../icon/IconDown";
import Booking from "../../components/booking/Booking";
import IconPolyclinicvl from "../../icon/IconPolyclinicvl";
import IconDoctorvl from "../../icon/IconDoctorvl";
import IconSysptomvl from "../../icon/IconSysptomvl";
import IconSysptom from "../../icon/IconSysptom";
import CreatePortalSysptom from "../../components/createPortal/CreatePortalSysptom";
import CreatePortalDoctor from "../../components/createPortal/CreatePortalDoctor";
import CreatePortalPlace from "../../components/createPortal/CreatePortalPlace";
import SelectCardSymtom from "./part/SelectCardSymtom";
import SelectCardSpec from "./part/SelectCardSpec";
import SelectCardDoctor from "./part/SelectCardDoctor";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { bool, number } from "prop-types";
import IconSearch from "../../icon/IconSearch";
import IconRight from "../../icon/IconRight";
import { localPort } from "../../components/url/link";
import { publicPort } from "../../components/url/link";

const hoursList = [
  {
    id: 1,
    from: "09h00AM",
    to: "09h30AM",
  },
  {
    id: 2,
    from: "09h30AM",
    to: "10h00AM",
  },
  {
    id: 3,
    from: "10h00AM",
    to: "10h30AM",
  },
  {
    id: 4,
    from: "10h30AM",
    to: "11h00AM",
  },
  {
    id: 5,
    from: "11h00AM",
    to: "11h30AM",
  },
  {
    id: 6,
    from: "01h00PM",
    to: "01h30PM",
  },
  {
    id: 7,
    from: "01h30PM",
    to: "02h00PM",
  },
  {
    id: 8,
    from: "02h00PM",
    to: "02h30PM",
  },
  {
    id: 9,
    from: "02h30PM",
    to: "03h00PM",
  },
  {
    id: 10,
    from: "03h00PM",
    to: "03h30PM",
  },
  {
    id: 11,
    from: "03h30PM",
    to: "04h00PM",
  },
  {
    id: 12,
    from: "04h00PM",
    to: "04h30PM",
  },
  {
    id: 13,
    from: "04h30PM",
    to: "05h00PM",
  },
];

const BAContentGuest = () => {
  const navigate = useNavigate();
  const [value, onChange] = useState();
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const [errors, setErrors] = useState({});

  const handleCheckboxChange = (event) => {
    setSelectedCheckbox(event.target.value);
    setErrors((e) => ({ ...e, gender: "" }));
  };

  const [numberOfSym, setNumberOfSym] = useState(0);

  const [fullName, setFullName] = useState([
    {
      fname: "",
    },
  ]);
  const [phone, setPhone] = useState([
    {
      pnum: "",
    },
  ]);
  const [birthday, setBirthDay] = useState([
    {
      bday: "",
    },
  ]);
  const [description, setDescription] = useState([
    {
      ds: "",
    },
  ]);
  const [idCard, setIdCard] = useState([
    {
      idC: "",
    },
  ]);

  const [showSpec, setShowSpec] = useState(false);
  const [showSysptom, setShowSysptom] = useState(false);
  const [showDoctor, setShowDoctor] = useState(false);
  const [showPlace, setShowPlace] = useState(false);
  const [showMore, setShowMore] = useState(true);

  const [symtomArr, setSymtomArr] = useState([]);
  const [spec, setSpec] = useState();
  const [doctor, setDoctor] = useState();
  const [place, setPlace] = useState();
  const [hour, setHour] = useState("");
  const [scheOfDoc, setScheOfDoc] = useState();

  useEffect(() => {
    if (value !== undefined && doctor) {
      // console.log(value);
      // Get the offset between UTC and your local time zone in minutes
      const offsetMinutes = value.getTimezoneOffset();

      // Convert the original date to your local time zone
      const localDate = new Date(value.getTime() - offsetMinutes * 60 * 1000);

      // Format the local date as a string with the desired format
      const formattedDate = localDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "/");
      const sche = async () => {
        try {
          const response = await axios.get(
            publicPort + `schedule/list_date/${doctor.id}?date=${formattedDate}`
          );
          setHour("");
          const arrr = response.data.map((item) => item.examTime);

          setScheOfDoc(arrr);
        } catch (error) {
          console.log(error);
        }
      };
      sche();
    }
  }, [doctor, value]);

  var registers = {
    name: "",
    phone: "",
    birthday: "",
    gender: "",
    bookPlace: "",
    symtom: "",
    spec: "",
    doctorName: "",
    bookDate: "",
    bookTime: "",
    description: "",
  };

  /////////////////////input
  const handleChangeName = (event) => {
    const { name, value } = event.target;

    // console.log(name);
    // console.log(value);

    if (name === "fname") {
      const newName = {
        ...fullName,
        [name]: value,
      };
      // console.log("set name");
      setFullName(newName);
    }

    if (name === "pnum") {
      const newPhone = {
        ...phone,
        [name]: value,
      };
      // console.log("set phone");
      setPhone(newPhone);
    }

    if (name === "bday") {
      const newBday = {
        ...birthday,
        [name]: value,
      };
      // console.log("set birth day");
      setBirthDay(newBday);
      setErrors((e) => ({ ...e, bday: "" }));
    }

    if (name === "idC") {
      const newIDs = {
        ...idCard,
        [name]: value,
      };
      // console.log("set ID");
      setIdCard(newIDs);
    }

    if (name === "ds") {
      const newDs = {
        ...description,
        [name]: value,
      };
      // console.log("set description");
      setDescription(newDs);
    }
  };

  //////////////////////////////////// place
  useEffect(() => {
    // setShowMore(!showMore)
    if (place) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  }, [place]);

  const addPlaceItem = (item) => {
    setPlace(item);

    setShowPlace(false);
    setErrors((e) => ({ ...e, place: "" }));
  };

  const deletePlaceItem = () => {
    setPlace();

    setShowPlace(false);
  };

  const changePlaceList = (item) => {
    if (place === item) {
      deletePlaceItem();
    } else {
      addPlaceItem(item);
    }
  };

  //////////////////////////////////// symtom
  const addSymtomItem = (item) => {
    const newArr = [...symtomArr, item];
    setSymtomArr(newArr);
  };

  const nextSpec = () => {
    setShowSysptom(false);
    setShowSpec(true);
    setDoctor();
    setSpec();
  };

  useEffect(() => {
    if (showSpec == true) {
      setDoctor();
      setSpec();
    }
  }, [showSpec]);

  useEffect(() => {
    setNumberOfSym(symtomArr.length);
  }, [symtomArr]);

  const deleteSymtomItem = (sym) => {
    const index = symtomArr.findIndex((item) => item.name === sym.name);

    const newItems = [...symtomArr];
    newItems.splice(index, 1);
    setSymtomArr(newItems);

    setShowPlace(false);
  };

  const changeSymtomList = (item) => {
    if (symtomArr.includes(item)) {
      deleteSymtomItem(item);
    } else {
      addSymtomItem(item);
    }
  };

  //////////////////////////////////// spec
  const addSpecItem = (item) => {
    setSpec(item);
    setShowSpec(false);
    setShowDoctor(true);
    setErrors((e) => ({ ...e, spec: "" }));
  };

  const deleteSpecItem = () => {
    setSpec();
    setShowSpec(false);
  };

  const changeSpecList = (item) => {
    if (spec === item) {
      deleteSpecItem();
    } else {
      addSpecItem(item);
    }
  };
  //////////////////////////////////// doctor
  const addDoctorItem = (item) => {
    // console.log(item);
    setDoctor(item);
    setShowDoctor(false);
    setErrors((e) => ({ ...e, doctor: "" }));
  };

  const deleteDoctorItem = () => {
    setDoctor();
    setShowDoctor(false);
  };

  const changeDoctorList = (item) => {
    if (doctor === item) {
      deleteDoctorItem();
    } else {
      addDoctorItem(item);
    }
  };

  const addHour = (item) => {
    let h = item.from + " - " + item.to;
    // console.log(h);
    setHour(h);
    setErrors((e) => ({ ...e, time: "" }));
  };

  const bookAppointment = async () => {
    const newErrors = {};
    if (!fullName.fname) newErrors.fname = "Vui lòng nhập họ tên";
    if (!phone.pnum) newErrors.pnum = "Vui lòng nhập số điện thoại";
    else if (!/^\d{10}$/.test(phone.pnum)) newErrors.pnum = "Số điện thoại phải gồm 10 chữ số";
    if (!birthday.bday) newErrors.bday = "Vui lòng chọn ngày sinh";
    if (!selectedCheckbox) newErrors.gender = "Vui lòng chọn giới tính";
    if (!place) newErrors.place = "Vui lòng chọn cơ sở";
    if (!spec) newErrors.spec = "Vui lòng chọn chuyên khoa";
    if (!doctor) newErrors.doctor = "Vui lòng chọn bác sĩ";
    if (!value) newErrors.date = "Vui lòng chọn ngày khám";
    if (!hour) newErrors.time = "Vui lòng chọn giờ khám";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    registers.name = fullName.fname;
    registers.phone = phone.pnum;
    registers.birthday = birthday.bday;
    registers.gender = selectedCheckbox;
    registers.bookPlace = place.name + " - " + place.description || "";
    if (symtomArr != undefined) {
      registers.symtom = symtomArr.map((item) => `${item.name}`).join(", ");
    }
    registers.spec = spec.name;
    registers.doctorName = doctor.name;
    // Get the offset between UTC and your local time zone in minutes
    const offsetMinutes = value.getTimezoneOffset();

    // Convert the original date to your local time zone
    const localDate = new Date(value.getTime() - offsetMinutes * 60 * 1000);

    // Format the local date as a string with the desired format
    const formattedDate = localDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "/");
    registers.bookDate = formattedDate;
    registers.bookTime = hour;
    registers.description = description.ds;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to start of day
    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);

    const bdatee = new Date(registers.birthday);
    if (bdatee > currentDate) {
      setErrors((e) => ({ ...e, bday: "Ngày sinh không hợp lệ" }));
      return;
    }

    if (selectedDate < currentDate) {
      setErrors((e) => ({ ...e, date: "Không thể đặt lịch cho ngày đã qua" }));
      return;
    }
    navigate("/appointmentConfirmationGuest", { state: { registers } });
  };

  return (
    <>
      <div className="max-w-[1156px] mx-auto mt-[8rem]">
        <CreatePortalPlace
          changePlaceList={changePlaceList}
          open={showPlace}
          onClose={() => setShowPlace(false)}
          visible={showPlace}
          handleClose={() => setShowPlace(false)}
        ></CreatePortalPlace>
        <CreatePortalSysptom
          symtomArr={symtomArr}
          nextSpec={nextSpec}
          numberOfSym={numberOfSym}
          changeSymtomList={changeSymtomList}
          open={showSysptom}
          onClose={() => setShowSysptom(false)}
          visible={showSysptom}
          handleClose={() => setShowSysptom(false)}
        ></CreatePortalSysptom>
        <CreatePortalSpecialty
          symtomArr={symtomArr}
          spec={spec}
          changeSpecList={changeSpecList}
          open={showSpec}
          onClose={() => setShowSpec(false)}
          visible={showSpec}
          handleClose={() => setShowSpec(false)}
        ></CreatePortalSpecialty>
        <CreatePortalDoctor
          place={place}
          doctor={doctor}
          spec={spec}
          changeDoctorList={changeDoctorList}
          open={showDoctor}
          onClose={() => setShowDoctor(false)}
          visible={showDoctor}
          handleClose={() => setShowDoctor(false)}
        ></CreatePortalDoctor>
        <h3 className="text-[32px] font-semibold text-gradient">Đặt lịch khám</h3>
        <div className="mt-[10rem]">
          <Header number={1} children={undefined} className={undefined}>
            Thông tin người đặt lịch
          </Header>
          <div className="mt-[4.4rem]">
            <div className="grid grid-cols-2 gap-x-[12.2rem] gap-y-[3rem]">
              <InputInfo
                handleChangeName={handleChangeName}
                icon={<IconPen />}
                name={"fname"}
                placeholder="Họ và tên"
                type={undefined}
              ></InputInfo>
              {errors.fname && (
                <span className="text-error text-[1.4rem]">{errors.fname}</span>
              )}
              <InputInfo
                handleChangeName={handleChangeName}
                name={"pnum"}
                icon={<IconPhone />}
                placeholder="Số điện thoại"
                type={undefined}
              ></InputInfo>
              {errors.pnum && (
                <span className="text-error text-[1.4rem]">{errors.pnum}</span>
              )}
              <InputInfo
                handleChangeName={handleChangeName}
                type={"date"}
                name={"bday"}
                icon={<IconBirthday />}
                placeholder="Ngày sinh"
              ></InputInfo>
              {errors.bday && (
                <span className="text-error text-[1.4rem]">{errors.bday}</span>
              )}
              <div className="relative flex gap-[2.4rem] py-[1.6rem] items-center border-b border-grayborder">
                <span>
                  <IconGender />
                </span>
                <div className="flex gap-[3.3rem] items-center">
                  <div className="flex items-center gap-[0.8rem]">
                    <input
                      className="w-[1.6rem] h-[1.6rem]"
                      type="checkbox"
                      checked={selectedCheckbox === "male"}
                      onChange={handleCheckboxChange}
                      name="gender"
                      value="male"
                      id="male"
                    />
                    <label htmlFor="male" className="font-semibold">
                      {" "}
                      Nam
                    </label>
                  </div>
                  <div className="flex items-center gap-[0.8rem]">
                    <input
                      id="female"
                      className="w-[1.6rem] h-[1.6rem]"
                      type="checkbox"
                      checked={selectedCheckbox === "female"}
                      onChange={handleCheckboxChange}
                      name="gender"
                      value="female"
                    />
                    <label htmlFor="female" className="font-semibold">
                      Nữ
                    </label>
                  </div>
                </div>
              </div>
              {errors.gender && (
                <span className="text-error text-[1.4rem]">{errors.gender}</span>
              )}
              <div className="flex items-center gap-[0.8rem]"></div>
            </div>
          </div>
        </div>
        <Header number={2} className="mt-[6.4rem]">
          Thông tin lịch hẹn
        </Header>

        <div className="mt-[4.4rem]" onClick={() => setShowPlace(true)}>
          <div className="flex items-center justify-between border border-grayborder p-[1.9rem_2.4rem] rounded-[1.6rem]">
            <div className="flex items-center gap-[1.6rem]">
              <span className="text-black1">
                <IconClinic />
              </span>
              <span className="text-gradient font-bold text-[1.8rem]">
                {!place ? (
                  <> Chọn cơ sở</>
                ) : (
                  <>
                    {place.description} - {place.name}
                  </>
                )}
              </span>
            </div>
            <span>
              <IconDown></IconDown>{" "}
            </span>
          </div>
        </div>
        {errors.place && (
          <div className="text-error text-[1.4rem] mt-2">{errors.place}</div>
        )}
        {showMore ? (
          <>
            <h4 className="text-[1.8rem] my-[3.2rem]">
              Phương thức đặt lịch ưu tiên <span className="text-error">*</span>
            </h4>
            <div className="flex items-center gap-[59px] justify-between">
              <SelectCardSymtom
                numberOfSym={numberOfSym}
                styleIcon="text-[#27AE60] bg-[#27AE60]"
                icon={<IconSysptom />}
                title="Triệu chứng"
                describe="Chọn triệu chứng"
                onClick={() => setShowSysptom(true)}
              ></SelectCardSymtom>
              <SelectCardSpec
                spec={spec}
                onClick={() => setShowSpec(true)}
                styleIcon="text-[#855FCE] bg-[#855FCE]"
                icon={<IconSpecialty />}
                title="Chuyên khoa"
                describe="Chọn chuyên khoa"
              ></SelectCardSpec>

              <SelectCardDoctor
                doctor={doctor}
                onClick={() => setShowDoctor(true)}
                styleIcon="text-[#2F80ED] bg-[#2F80ED]"
                icon={<IconDoctor />}
                title="Bác sĩ"
                describe="Chọn bác sĩ"
              ></SelectCardDoctor>
            </div>

            <div className="mt-[3.2rem] shadow-md p-[3.6rem_2.6rem] rounded-[3.2rem]">
              <div className="grid grid-cols-3 gap-[4rem]">
                {symtomArr.length <= 0 ? (
                  <></>
                ) : symtomArr.length > 2 ? (
                  <Booking
                    icon={<IconSysptomvl />}
                    value={
                      symtomArr[0].name +
                      "; " +
                      symtomArr[1].name +
                      ";" +
                      "......"
                    }
                  ></Booking>
                ) : symtomArr.length == 2 ? (
                  <Booking
                    icon={<IconSysptomvl />}
                    value={symtomArr[0].name + "; " + symtomArr[1].name}
                  ></Booking>
                ) : (
                  <Booking
                    icon={<IconSysptomvl />}
                    value={symtomArr[0].name}
                  ></Booking>
                )}
                {spec == undefined ? (
                  <></>
                ) : (
                  <Booking
                    icon={<IconPolyclinicvl />}
                    value={spec.name}
                  ></Booking>
                )}
                {!doctor ? (
                  <></>
                ) : (
                  <Booking
                    icon={<IconDoctorvl />}
                    value={doctor.name}
                  ></Booking>
                )}
              </div>
              {errors.spec && (
                <div className="text-error text-[1.4rem] mt-2">{errors.spec}</div>
              )}
              {errors.doctor && (
                <div className="text-error text-[1.4rem] mt-2">{errors.doctor}</div>
              )}
              <div className="mt-[2.4rem] text-[1.8rem] gap-[10.4rem] flex justify-end font-bold">
                <span className="text-gradient">Ước tính phí khám</span>
                {spec == null || doctor == null ? (
                  <>0đ</>
                ) : (
                  <span className="text-warning">300.000đ</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="mt-[6.4rem] gap-[80px] flex justify-between">
          <div className="flex-1">
            <Header number={3} children={undefined} className={undefined}>
              Chọn ngày
            </Header>
            <div className="p-[3.8rem_4.3rem] shadow-lg date_picker rounded-[24px] mt-[3.8rem]">
              <Calendar 
                onChange={onChange} 
                value={value}
                minDate={new Date()} // Disable past dates
                tileDisabled={({ date }) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
              />
            </div>
            {errors.date && (
              <div className="text-error text-[1.4rem] mt-2">{errors.date}</div>
            )}
          </div>
          <div className="flex-1">
            <Header number={4} children={undefined} className={undefined}>
              Chọn giờ
            </Header>
            <div className="p-[3.8rem_4.3rem] shadow-lg flex flex-wrap gap-x-[1rem] gap-y-[0.17rem] rounded-[24px] mt-[3.8rem]">
              {hoursList.length > 0 &&
                hoursList
                  .filter((item) => {
                    // Ẩn các giờ đã được đặt
                    const timeSlot = item.from + " - " + item.to;
                    const isBooked = scheOfDoc && scheOfDoc.length > 0 && 
                      scheOfDoc.includes(timeSlot);
                    
                    // Debug log để kiểm tra
                    if (scheOfDoc && scheOfDoc.length > 0) {
                      console.log("scheOfDoc:", scheOfDoc);
                      console.log("timeSlot:", timeSlot);
                      console.log("isBooked:", isBooked);
                    }
                    
                    return !isBooked;
                  })
                  .map((item) => {
                    const isSelected = hour.includes(item.from + " - " + item.to);
                    
                    return (
                      <div
                        onClick={() => addHour(item)}
                        style={{ width: "22rem" }}
                        className={`p-[1.4rem_1.6rem] cursor-pointer border rounded-[0.8rem] border-textColor2 hover:bg-gray-50
                          ${isSelected
                            ? "bg-gradient-to-tr from-gradientLeft to-gradientRight text-white"
                            : ""
                          }`}
                        key={item.id}
                      >
                        <span>{item.from}</span> - <span>{item.to}</span>
                      </div>
                    );
                  })}
            </div>
            {errors.time && (
              <div className="text-error text-[1.4rem] mt-2">{errors.time}</div>
            )}
          </div>
        </div>
        <div className="mt-[6.4rem] ">
          <Header number={5} children={undefined} className={undefined}>
            Lý do khám bệnh
          </Header>
          <div className="flex gap-[3rem] mt-[4.4rem] shadow-md rounded-[2.4rem] p-[2.8rem_3.2rem]">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2808 19.3922L20.1557 10.5173C18.6625 9.89388 17.3065 8.98305 16.1646 7.83658C15.0176 6.69448 14.1064 5.338 13.4827 3.84433L4.60783 12.7192C3.91545 13.4116 3.56867 13.7584 3.27108 14.14C2.91962 14.5903 2.61825 15.0775 2.37231 15.5931C2.16472 16.0299 2.00992 16.4955 1.70033 17.4242L0.0659923 22.3237C-0.00922858 22.548 -0.0203887 22.7889 0.033766 23.0192C0.0879207 23.2495 0.205244 23.4601 0.372547 23.6275C0.53985 23.7948 0.750502 23.9121 0.980824 23.9662C1.21115 24.0204 1.45201 24.0092 1.67633 23.934L6.57576 22.2997C7.50573 21.9901 7.97011 21.8353 8.40689 21.6277C8.92288 21.3817 9.41006 21.0805 9.86004 20.7289C10.2416 20.4313 10.5884 20.0845 11.2808 19.3922ZM22.618 8.05498C23.5029 7.17009 24 5.96992 24 4.7185C24 3.46707 23.5029 2.26691 22.618 1.38202C21.7331 0.497126 20.5329 9.32383e-09 19.2815 0C18.0301 -9.32383e-09 16.8299 0.497126 15.945 1.38202L14.8807 2.44638L14.9263 2.57957C15.4508 4.08038 16.3091 5.44255 17.4366 6.56343C18.591 7.72463 20.0008 8.59989 21.5536 9.11934L22.618 8.05498Z"
                  fill="black"
                />
              </svg>
            </span>
            <textarea
              onChange={handleChangeName}
              className="w-full h-[24rem]"
              name="ds"
              id=""
              placeholder="Mô tả chi tiết triệu chứng hoặc nhu cầu của bạn"
            ></textarea>
          </div>
        </div>
        <div className="pb-[6.4rem]">
          <ButtonIcon
            iconLeft={<IconCal />}
            className="!rounded-[1.6rem] p-[1.6rem_4rem] w-max mt-[6.4rem] "
            onClick={bookAppointment}
            children={undefined}
            iconRight={undefined}
          >
            Đặt lịch khám
          </ButtonIcon>
        </div>
      </div>
    </>
  );
};

export default BAContentGuest;
