
const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const find = {
    deleted : false
  };
  // Lọc theo trạng thái
  if(req.query.status) {
    find.status = req.query.status;
  }
   // Hết Lọc theo trạng thái

   // Lọc theo title
   if(req.query.keyword) {  
    const regex = new RegExp(req.query.keyword,"i"); 
    // tìm kiếm tương đối (có 1 số biểu hiện là tìm được rồi) và không phân biệt chữ hoa, chữ thường
    find.title = regex;
  }
  // Hết Lọc theo title  
  // Giải thích mấy cái lọc
  // nếu mà trên cái dòng tìm localhost ấy sau
  //   dấu ? có cái giá trị của keyword thì biến const find bên trên chỗ index
  //   kia kìa sẽ có thêm cái giá trị title và người ta sẽ lọc theo cái title đó

  // Tình năng phân trang
  let limitItems = 4;
  let page = 1;

  if(req.query.page){ // chính là mấy cái chữ trên dòng tìm kiếm là chữ page á
    page = parseInt(req.query.page);
  }

  if(req.query.limit){ // là giá trị của chữ limit trên dòng tìm kiếm á, nếu có thì gán giá trị liền
    limitItems = parseInt(req.query.limit);
  }

  const skip = (page -1) * limitItems; 
  const totalProduct = await Product.countDocuments(find);
  const totalPage = Math.ceil(totalProduct/limitItems);
  // Hết tính năng phân trang

  const products = await Product.find(find).limit(limitItems).skip(skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products : products,
    totalPage: totalPage,
    currentPage: page
  });
}
// Thay đổi trạng thái 1 sản phẩm
module.exports.changeStatus = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id // tìm đối tượng có id là id của nút mình thay đổi
  }, {
    status: req.body.status // cập nhật lại trạng thái cho đối tượng mình bấm vào
  });
  // thay đổi dữ liệu trong bảng products trong mongoDB
  res.json({
    code: "success", 
    message: "Đổi trạng thái thành công!"
  });
  // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
}
// Hết thay đổi trạng thái 1 sản phẩm

// Thay đổi trạng thái nhiều sản phẩm
module.exports.changeMulti = async (req, res) => {
  await Product.updateMany({
    _id: req.body.ids // tìm đối tượng có id là id của nút mình thay đổi
  }, {
    status: req.body.status // cập nhật lại trạng thái cho đối tượng mình bấm vào
  });
  // thay đổi dữ liệu trong bảng products trong mongoDB
  res.json({
    code: "success", 
    message: "Đổi trạng thái thành công!"
  });
  // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
}
// Hết thay đổi trạng thái nhiều sản phẩm

// Xóa vĩnh viễn 1 sản phẩm
module.exports.delete = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id
  },{
    deleted : true // cập nhật lại thuộc tính deleted bằng true với tính năng xóa mềm
  });
  // xóa sản phẩm theo id của FE truyền vào BE
  res.json({
    code: "success", 
    message: "Đổi trạng thái thành công!"
  });
  // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
}