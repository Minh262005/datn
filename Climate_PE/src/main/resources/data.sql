-- Reset auto-increments (optional, safe if empty DB)
-- SET SQL_SAFE_UPDATES = 0;

-- Chuyên khoa
-- Normalize legacy data to avoid nulls in primitive fields
UPDATE role SET COMMAND_FLAG = 0 WHERE COMMAND_FLAG IS NULL;

INSERT INTO specialty (SPEC_NAME, SPEC_DESCRIPTION, COMMAND_FLAG) VALUES
('Nhi khoa', 'Điều trị và chăm sóc trẻ em', 0),
('Tim mạch', 'Bệnh lý tim mạch và tuần hoàn', 0),
('Da liễu', 'Bệnh da và thẩm mỹ da', 0),
('Sản phụ khoa', 'Sức khỏe phụ nữ và thai sản', 0),
('Răng hàm mặt', 'Nha khoa và phẫu thuật hàm mặt', 0);

-- Triệu chứng (gắn với chuyên khoa)
INSERT INTO symptom (SYMPTOM_NAME, SYMPTOM_DESCRIPTION, COMMAND_FLAG, SPEC_ID) VALUES
('Sốt cao', 'Nhiệt độ cơ thể trên 38.5°C', 0, 1),
('Đau đầu', 'Đau nhức vùng đầu kéo dài', 0, 2),
('Ho kéo dài', 'Ho liên tục trên 2 tuần', 0, 1),
('Khó thở', 'Cảm giác hụt hơi, nặng ngực', 0, 2),
('Phát ban', 'Tổn thương da rải rác/lan tỏa', 0, 3);

-- Vai trò nội bộ
INSERT INTO role (NAME, COMMAND_FLAG) VALUES
('ADMIN', 0),
('DOCTOR', 0),
('NURSE', 0),
('PATIENT', 0);

-- Cơ sở (Location: dùng DESCRIPTION thay cho địa chỉ chi tiết)
INSERT INTO location (NAME, DESCRIPTION, COMMAND_FLAG) VALUES
('ClinicMate Hà Nội', 'Tòa nhà Climate, 285 Đội Cấn, Ba Đình, Hà Nội', 0),
('ClinicMate Hồ Chí Minh', 'Tòa nhà Climate, 123 Nguyễn Văn Linh, Quận 7, TP.HCM', 0),
('ClinicMate Đà Nẵng', 'Tòa nhà Climate, 50 Bạch Đằng, Hải Châu, Đà Nẵng', 0);

-- Tài khoản nội bộ (bác sĩ, admin)
-- PASSWORD là bcrypt mẫu: 123456 (không dùng cho production)
INSERT INTO internal_account (
  EMAIL, PASSWORD, NAME, BIRTHDATE, GENDER, PHONE,
  YEAR_OF_EXP, EDUCATION, AVATAR, COMMAND_FLAG, INTRODUCT, REGISTER_TIME,
  LOCATION, ROLE, SPECIATLY
) VALUES
('admin@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'Nguyễn Quản Trị', '1980/01/01', 'Nam', '0901234567',
  15, 'ĐH Bách Khoa', NULL, 0, 'Quản trị hệ thống', '2025/09/10 09:00:00:000', 1, 1, NULL),
('bsnam@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Hoàng Nam', '1985/05/12', 'Nam', '0912345678',
  10, 'ĐH Y Hà Nội', NULL, 0, 'Chuyên Nhi hô hấp', '2025/09/10 09:10:00:000', 1, 2, 1),
('bslinh@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Thu Linh', '1988/09/20', 'Nữ', '0923456789',
  8, 'ĐH Y Dược TP.HCM', NULL, 0, 'Chuyên Tim mạch', '2025/09/10 09:20:00:000', 2, 2, 2);

-- Bổ sung bác sĩ cho các chuyên khoa khác nhau
INSERT INTO internal_account (
  EMAIL, PASSWORD, NAME, BIRTHDATE, GENDER, PHONE,
  YEAR_OF_EXP, EDUCATION, AVATAR, COMMAND_FLAG, INTRODUCT, REGISTER_TIME,
  LOCATION, ROLE, SPECIATLY
) VALUES
('bsminh@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Minh Khoa', '1982/02/10', 'Nam', '0902233445',
  12, 'ĐH Y Hà Nội', NULL, 0, 'Da liễu tổng quát', '2025/09/10 09:30:00:000', 1, 2, 3),
('bshanh@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Hạnh Phúc', '1987/11/25', 'Nữ', '0911222333',
  9, 'ĐH Y Dược TP.HCM', NULL, 0, 'Sản phụ khoa', '2025/09/10 09:35:00:000', 2, 2, 4),
('bsloc@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Lộc Nha', '1984/07/07', 'Nam', '0933444556',
  11, 'ĐH Y Huế', NULL, 0, 'Răng hàm mặt', '2025/09/10 09:40:00:000', 1, 2, 5),
('bstrang@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Ngọc Trang', '1990/03/18', 'Nữ', '0944555666',
  6, 'ĐH Y Dược TP.HCM', NULL, 0, 'Da liễu - thẩm mỹ', '2025/09/10 09:45:00:000', 2, 2, 3),
('bsson@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Sơn Tùng', '1986/12/12', 'Nam', '0955666777',
  10, 'ĐH Y Hà Nội', NULL, 0, 'Sản phụ khoa', '2025/09/10 09:50:00:000', 1, 2, 4);

-- Bác sĩ theo thành phố/cơ sở
-- Hà Nội (LOCATION=1): bổ sung Tim mạch
INSERT INTO internal_account (
  EMAIL, PASSWORD, NAME, BIRTHDATE, GENDER, PHONE,
  YEAR_OF_EXP, EDUCATION, AVATAR, COMMAND_FLAG, INTRODUCT, REGISTER_TIME,
  LOCATION, ROLE, SPECIATLY
) VALUES
('bshungtm@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Hùng Tâm', '1983/04/22', 'Nam', '0966777888',
  12, 'ĐH Y Hà Nội', NULL, 0, 'Tim mạch can thiệp', '2025/09/10 09:55:00:000', 1, 2, 2);

-- Hồ Chí Minh (LOCATION=2): bổ sung Nhi khoa
INSERT INTO internal_account (
  EMAIL, PASSWORD, NAME, BIRTHDATE, GENDER, PHONE,
  YEAR_OF_EXP, EDUCATION, AVATAR, COMMAND_FLAG, INTRODUCT, REGISTER_TIME,
  LOCATION, ROLE, SPECIATLY
) VALUES
('bsanhnh@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Ánh Nhi', '1991/08/08', 'Nữ', '0977888999',
  5, 'ĐH Y Dược TP.HCM', NULL, 0, 'Nhi tổng quát', '2025/09/10 10:00:00:000', 2, 2, 1);

-- Đà Nẵng (LOCATION=3): thêm đủ bác sĩ các chuyên khoa chính
INSERT INTO internal_account (
  EMAIL, PASSWORD, NAME, BIRTHDATE, GENDER, PHONE,
  YEAR_OF_EXP, EDUCATION, AVATAR, COMMAND_FLAG, INTRODUCT, REGISTER_TIME,
  LOCATION, ROLE, SPECIATLY
) VALUES
('bsduydn@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Duy Đà Nẵng', '1989/06/15', 'Nam', '0909090901',
  9, 'ĐH Y Huế', NULL, 0, 'Nhi khoa hô hấp', '2025/09/10 10:05:00:000', 3, 2, 1),
('bsmydn@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Mỹ Đà Nẵng', '1986/10/12', 'Nữ', '0909090902',
  10, 'ĐH Y Đà Nẵng', NULL, 0, 'Tim mạch', '2025/09/10 10:10:00:000', 3, 2, 2),
('bsluandn@clinicmate.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', 'BS. Luân Nha', '1984/02/02', 'Nam', '0909090903',
  11, 'ĐH Y Huế', NULL, 0, 'Răng hàm mặt', '2025/09/10 10:15:00:000', 3, 2, 5);

-- Bệnh nhân (Patient) – lưu ý cột khoá chính là PAINTED_ID (CCCD)
INSERT INTO patient (
  PAINTED_ID, NAME, EMAIL, PASSWORD, ADDRESS, PHONE, GENDER, AVATAR, BIRTHDATE, REGISTRATION_TIME, COMMAND_FLAG, ROLE
) VALUES
('001199000001', 'Trần Văn An', 'an.tran@example.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', '15 Trần Phú, Ba Đình, Hà Nội', '0987654321', 'Nam', NULL, '1990/05/15', '2025/09/10 10:00:00:000', 0, 'USER'),
('079198500002', 'Nguyễn Thị Bình', 'binh.nguyen@example.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', '28 Lê Lợi, Quận 1, TP.HCM', '0976543210', 'Nữ', NULL, '1985/08/20', '2025/09/10 10:05:00:000', 0, 'USER'),
('048199500003', 'Lê Hoàng Cường', 'cuong.le@example.vn', '$2a$10$rAFl9C7upAkcBzqWH5Uf7OENZi/d4xMw0RyCeGK8jqIOO4GvBJ2oG', '45 Nguyễn Huệ, Hải Châu, Đà Nẵng', '0965432109', 'Nam', NULL, '1995/03/10', '2025/09/10 10:10:00:000', 0, 'USER');

-- Lịch hẹn (Appointment) – tham chiếu PATIENT_ID đến PAINTED_ID
INSERT INTO appointment (
  PATIENT_ID, REGISTER_TIME, COMMAND_FLAG, DOCTOR_NAME, EXAM_DATE, EXAM_TIME, NOTE, SPECIATLY, SYMPTOM,
  PATIENT_NAME, BIRTHDAY, GENDER, PHONE, BOOK_PLACE
) VALUES
('001199000001', '2025/09/12 08:00:00:000', 0, 'BS. Hoàng Nam', '2025/09/15', '09:00', 'Khám theo hẹn', 'Nhi khoa', 'Sốt cao',
  'Trần Văn An', '1990/05/15', 'Nam', '0987654321', 'ClinicMate Hà Nội'),
('079198500002', '2025/09/12 08:10:00:000', 0, 'BS. Thu Linh', '2025/09/16', '10:30', 'Đau đầu kéo dài', 'Tim mạch', 'Đau đầu',
  'Nguyễn Thị Bình', '1985/08/20', 'Nữ', '0976543210', 'ClinicMate Hồ Chí Minh');

-- Lịch làm việc (Schedule) – nối với appointment và internal_account
-- Giả định INTERNAL_ID: 2 = BS. Hoàng Nam, 3 = BS. Thu Linh (theo thứ tự insert ở trên)
INSERT INTO schedule (COMMAND_FLAG, EXAM_DATE, EXAM_TIME, RELEASE_TIME, appointment_id, internal_id) VALUES
(0, '2025/09/15', '09:00', '2025/09/12 09:00:00:000', 1, 2),
(0, '2025/09/16', '10:30', '2025/09/12 09:05:00:000', 2, 3);

INSERT INTO checkin (COMMAND_FLAG, REGISTER_TIME, APPOINTMENT_ID, PATIENT_ID) VALUES
(0, '2025/09/15 08:45:00:000', '1', '001199000001');

-- Tin tức
INSERT INTO news_detail (
  TITLE, CONTENT, DESCRIPTION, IMAGE, RATE, LIKE_COUNT, DISLIKE_COUNT, SPECIATLY, CREATEBY
) VALUES
('Khai trương cơ sở mới tại Hà Nội', 'Khai trương cơ sở mới',
 'ClinicMate khai trương cơ sở mới tại Đội Cấn, Ba Đình, phục vụ từ 7h-21h hàng ngày.',
 NULL, 5, 0, 0, 'Tin tức', 'Admin'),
('Tuần lễ khám tim mạch', 'Tuần lễ khám tim mạch',
 'Giảm 30% gói khám tim mạch từ 12-18/09 dành cho khách hàng trên 50 tuổi.',
 NULL, 5, 0, 0, 'Tin tức', 'Admin');

-- Hồ sơ bệnh án (MedicalRecord)
-- Lưu ý: CHECKIN_ID tham chiếu tới bảng checkin (giả định CHECKIN_ID=1 tồn tại từ insert phía trên)
INSERT INTO medicalrecord (
  COMMAND_FLAG, RELEASE_TIME, DOCTOR_ID, CLINIC_PROCESS, SUMARY_RESULT, TREATMENT, CHECKIN_ID
) VALUES
(0, '12/09/2025 09:15:30', '2',
 N'Khám lâm sàng: bệnh nhi sốt 38.8°C, mạch 100 lần/phút, phổi thông khí tốt. Làm test nhanh cúm âm tính. Chỉ định xét nghiệm máu cơ bản.',
 N'Chẩn đoán: Nhiễm siêu vi đường hô hấp trên. Không ghi nhận dấu hiệu bội nhiễm.',
 N'Hạ sốt bằng Paracetamol 10–15 mg/kg khi sốt >38.5°C; uống nhiều nước; theo dõi tại nhà. Tái khám nếu sốt trên 3 ngày hoặc xuất hiện khó thở.',
 1);

-- Tạo thêm một lượt checkin và bệnh án cho cuộc hẹn thứ 2
INSERT INTO checkin (COMMAND_FLAG, REGISTER_TIME, APPOINTMENT_ID, PATIENT_ID) VALUES
(0, '2025/09/16 10:10:00:000', '2', '079198500002');

INSERT INTO medicalrecord (
  COMMAND_FLAG, RELEASE_TIME, DOCTOR_ID, CLINIC_PROCESS, SUMARY_RESULT, TREATMENT, CHECKIN_ID
) VALUES
(0, '12/09/2025 10:45:00', '3',
 N'Khám lâm sàng: đau đầu vùng trán 3 tuần, không nôn, không mờ mắt. Huyết áp 130/80 mmHg. Điện tâm đồ bình thường. Tư vấn thay đổi lối sống.',
 N'Chẩn đoán: Đau đầu căng cơ. Chưa nghĩ nhiều đến nguyên nhân thực thể.',
 N'Ngủ đủ 7–8 giờ, hạn chế caffeine, vận động 150 phút/tuần. Dùng Paracetamol khi đau nhiều, không quá 3 ngày liên tiếp. Tái khám sau 2 tuần.',
 2);