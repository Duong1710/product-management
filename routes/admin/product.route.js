const express = require("express");
const router = express.Router();
// Dùng thư viện multer
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/') // địa chỉ để lưu ảnh
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`; // thời gian + tên của gốc file sẽ tạo nên 1 link, 1 tên unique
      cb(null, fileName) // tên của ảnh
    }
  });
  
  const upload = multer({ storage: storage }); // Khởi tạo multer với cấu hình đã tạo, tên là upload, chính là upload tí dùng bên dưới trong createPost
  
const validate = require("../../validate/admin/product.validate");
const controller = require("../../controllers/admin/product.controller");
router.get("/", controller.index);
router.get("/trash", controller.trash);
router.patch("/change-status", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.patch("/delete", controller.delete);
router.patch("/change-position", controller.changePosition);
// Đường dẫn cho trang thùng rác
router.delete("/delete-permanent", controller.deletePermanent);
router.patch("/restore", controller.restore);
// Hết

// Đường dẫn cho trang tạo mới
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single('thumbnail'), 
  validate.createPost,
  controller.createPost
); 
// Hết

// Đường dẫn cho trang chỉnh sửa sản phẩm
router.get("/edit/:id",controller.edit); 

// Đường dẫn để chỉnh sửa sản phẩm
router.patch(
  "/edit/:id",
  upload.single('thumbnail'), // up ảnh
  validate.createPost, // validate điều kiện
  controller.editPatch
);
// Hết

router.get("/detail/:id", controller.detail);
module.exports = router;
