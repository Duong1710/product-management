const express = require("express");
const router = express.Router();

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
router.post("/create", controller.createPost);

module.exports = router;
