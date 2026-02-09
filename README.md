# Product Management

Ứng dụng quản lý sản phẩm xây dựng bằng Node.js và Express, cung cấp cả giao diện dành cho quản trị viên (Admin) và khách hàng (Client).

## 🛠 Công Nghệ Sử Dụng

### Backend
- **Node.js** - Runtime JavaScript cho phía server
- **Express.js** - Framework web cho Node.js
- **MongoDB & Mongoose** - Cơ sở dữ liệu NoSQL và ODM
- **Mongoose Slug Updater** - Tự động tạo slug URL-friendly từ tiêu đề

### Frontend
- **Pug** - Template engine cho views
- **Bootstrap/CSS** - Styling và responsive design
- **JavaScript** - Client-side interactivity

### Middleware & Utilities
- **Body-parser** - Parse request body
- **Cookie-parser** - Quản lý cookies
- **Express-session** - Quản lý sessions người dùng
- **Express-flash** - Hiển thị thông báo tạm thời
- **Multer** - Upload file/hình ảnh
- **Method-override** - Hỗ trợ HTTP PATCH trong forms
- **Dotenv** - Quản lý environment variables
- **Nodemon** - Auto-reload server khi code thay đổi

## ✨ Tính Năng Đã Code

### 🔐 Admin Panel (`/admin`)
- **Dashboard** - Trang tổng quan quản lý
- **Quản Lý Sản Phẩm**
  - ✅ Liệt kê danh sách sản phẩm
  - ✅ Thêm sản phẩm mới
  - ✅ Chỉnh sửa thông tin sản phẩm
  - ✅ Xem chi tiết sản phẩm
  - ✅ Xóa mềm (soft delete) sản phẩm
  - ✅ Khôi phục sản phẩm từ thùng rác
  - ✅ Tìm kiếm sản phẩm theo tên (keyword)
  - ✅ Lọc theo trạng thái sản phẩm
  - ✅ Phân trang danh sách sản phẩm
  - ✅ Sắp xếp sản phẩm theo vị trí (position)
  - ✅ Upload hình ảnh sản phẩm

### 👥 Client Side
- **Trang Chủ** - Hiển thị thông tin chính
- **Danh Sách Sản Phẩm**
  - ✅ Hiển thị danh sách sản phẩm có sẵn
  - ✅ Xem chi tiết sản phẩm
  - ✅ Tìm kiếm sản phẩm
  - ✅ Lọc sản phẩm theo danh mục/trạng thái

### 📊 Dữ Liệu & Mô Hình
- **Product Model** - Schema định nghĩa cấu trúc sản phẩm với các thuộc tính:
  - Title (tiêu đề)
  - Slug (URL-friendly)
  - Description (mô tả)
  - Price (giá)
  - Discount Percentage (phần trăm chiết khấu)
  - Stock (số lượng tồn kho)
  - Thumbnail (hình ảnh)
  - Status (trạng thái)
  - Position (vị trí sắp xếp)
  - Deleted (trạng thái xóa mềm)

## 📁 Cấu Trúc Dự Án

```
product-management/
├── config/              # Cấu hình hệ thống
│   ├── database.js      # Kết nối MongoDB
│   └── system.js        # Cấu hình chung
├── controllers/         # Xử lý logic ứng dụng
│   ├── admin/           # Controllers cho admin
│   └── client/          # Controllers cho client
├── models/              # MongoDB schemas
│   └── product.model.js # Schema sản phẩm
├── routes/              # Định tuyến URL
│   ├── admin/           # Routes cho admin
│   └── client/          # Routes cho client
├── validate/            # Xác thực dữ liệu
│   └── admin/
├── views/               # Pug templates
│   ├── admin/           # Views cho admin
│   └── client/          # Views cho client
├── public/              # Tệp tĩnh (CSS, JS, images)
│   ├── admin/
│   ├── css/
│   ├── js/
│   └── uploads/         # Thư mục lưu upload
├── index.js             # Entry point
└── package.json         # Dependencies
```

## 🚀 Cài Đặt & Chạy

### Yêu cầu
- Node.js (v14 hoặc cao hơn)
- MongoDB (cục bộ hoặc cloud)

### Cài đặt
```bash
# Clone hoặc tải dự án
# Cài đặt dependencies
npm install
```

### Cấu hình Environment
Tạo file `.env` trong thư mục gốc:
```
PORT=3000
MONGODB_URL=mongodb://localhost:27017/product-management
```

### Chạy ứng dụng
```bash
# Chạy với auto-reload (development)
npm start

# Server sẽ khởi động tại http://localhost:3000
```

## 📌 Lưu Ý Quan Trọng
- Dự án sử dụng **soft delete** cho sản phẩm (không xóa hoàn toàn từ database)
- Hỗ trợ upload hình ảnh sản phẩm qua Multer
- Slug tự động được tạo từ tiêu đề sản phẩm
- Session được quản lý qua express-session và cookies

