const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ExcelJS = require("exceljs");
const fs = require("fs");

const app = express();
const PORT = 3000;
const FILE_PATH = "ThongTinLienHe_Admin.xlsx";

app.use(cors());
app.use(bodyParser.json());

// API lưu contact
app.post("/api/contact", async (req, res) => {
    try {
        const { customerName, phone, email, inquiryType, bikeType, budget, message } = req.body;

        let workbook;
        let worksheet;

        // Nếu file đã tồn tại thì mở ra, ngược lại tạo file mới
        if (fs.existsSync(FILE_PATH)) {
            workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(FILE_PATH);
            worksheet = workbook.getWorksheet("DanhSachLienHe");
        } else {
            workbook = new ExcelJS.Workbook();
            worksheet = workbook.addWorksheet("DanhSachLienHe");

            worksheet.columns = [
                { header: "Họ và tên", key: "customerName", width: 25 },
                { header: "Số điện thoại", key: "phone", width: 20 },
                { header: "Email", key: "email", width: 25 },
                { header: "Loại yêu cầu", key: "inquiryType", width: 20 },
                { header: "Loại xe", key: "bikeType", width: 25 },
                { header: "Ngân sách", key: "budget", width: 15 },
                { header: "Tin nhắn", key: "message", width: 40 }
            ];
        }

        // Thêm dữ liệu mới
        worksheet.addRow({
            customerName,
            phone,
            email,
            inquiryType,
            bikeType,
            budget,
            message
        });

        // Lưu lại file Excel
        await workbook.xlsx.writeFile(FILE_PATH);

        res.json({ success: true, message: "Đã lưu vào Excel thành công!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi khi lưu Excel" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
