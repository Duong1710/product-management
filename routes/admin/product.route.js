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
  
  const upload = multer({ storage: storage }); // lưu ảnh vào địa chỉ kia
  

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
router.get("/create", controller.create);
router.post("/create",upload.single('thumbnail'), controller.createPost);

module.exports = router;
