
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

  if(req.query.page){
    page = parseInt(req.query.page);
  }

  if(req.query.limit){
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