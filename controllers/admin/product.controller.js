
const Product = require("../../models/product.model"); // Khai báo ra form của Product
const systemConfig = require("../../config/system"); // Khai báo ra đường dẫn cho từ: admin
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

  const products = await Product
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort({
      position: "desc"
    });

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
  req.flash('success', 'Đổi trạng thái thành công!'); // Tương tác của express-flash
  res.json({
    code: "success"
  });
  // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
}
// Hết thay đổi trạng thái 1 sản phẩm

// Thay đổi trạng thái nhiều sản phẩm
module.exports.changeMulti = async (req, res) => {
  switch (req.body.status) {
    case 'active':
    case 'inactive':
      await Product.updateMany({
        _id: req.body.ids // tìm đối tượng có id là id của nút mình thay đổi
      }, {
        status: req.body.status // cập nhật lại trạng thái cho đối tượng mình bấm vào
      });
      // thay đổi dữ liệu trong bảng products trong mongoDB
      req.flash('success', 'Đổi trạng thái thành công!');
      res.json({
        code: "success",
        message: "Đổi trạng thái thành công!"
      });
      // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
      break;

    case 'delete':
      await Product.updateMany({
        _id: req.body.ids // tìm đối tượng có id là id của nút mình thay đổi
      }, {
        deleted : true // xóa mềm bản ghi
      });
      // thay đổi dữ liệu trong bảng products trong mongoDB
      req.flash('success', `Xóa mềm thành công!`);
      res.json({
        code: "success"
      });
      // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
      break;

    case 'restore':
      await Product.updateMany({
        _id: req.body.ids // tìm đối tượng có id là id của nút mình thay đổi
      }, {
        deleted : false // khôi phục bản ghi
      });
      // thay đổi dữ liệu trong bảng products trong mongoDB
      req.flash('success', "Khôi phục thành công!");
      res.json({
        code: "success"
      });
      // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
      break;  

    case 'delete-permanent':
      await Product.deleteMany({
        _id: req.body.ids // tìm đối tượng có id là id của nút mình thay đổi
      });
      // thay đổi dữ liệu trong bảng products trong mongoDB
      req.flash('success', "Xóa vĩnh viễn thành công!");
      res.json({
        code: "success"
      });
      // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
      break;  
    default:
      res.json({
        code: "error",
        message: "Trạng thái không hợp lệ!"
      });
      // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
      break;
  }
}
// Hết thay đổi trạng thái nhiều sản phẩm

// Xóa mềm 1 sản phẩm
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
// Hết xóa mềm 1 sản phẩm

//Tạo thùng rác
module.exports.trash = async (req, res) => {
  const find = {
    deleted : true
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

  res.render("admin/pages/products/trash", {
    pageTitle: "Danh sách sản phẩm",
    products : products,
    totalPage: totalPage,
    currentPage: page // truyền giá tị của page vào currentPage, dùng biến tên currentPage trên file index.pug
  });
}
// Hết tạo thùng rác


// Xóa vĩnh viễn 1 bản ghi
module.exports.deletePermanent = async (req, res) => {
  await Product.deleteOne({
    _id: req.body.id
  });
  // xóa sản phẩm theo id của FE truyền vào BE
  res.json({
    code: "success", 
    message: "Đổi trạng thái thành công!"
  });
  // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
}
// Hết xóa vĩnh viễn 1 bản ghi

// Khôi phục lại 1 bản ghi
module.exports.restore = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id
  },{
    deleted : false // cập nhật lại thuộc tính deleted bằng false với ý là không xóa nữa => khôi phục lại
  });
  // xóa sản phẩm theo id của FE truyền vào BE
  res.json({
    code: "success", 
    message: "Đổi trạng thái thành công!"
  });
  // đoạn code mà back end phản hồi lại cho front end khi đã thực hiện click vào button
}

// Đổi vị trí
module.exports.changePosition = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id
  }, {
    position: req.body.position
  });
  req.flash('success', "Đổi vị trí thành công!");
  res.json({
    code: "success"
  });
}
// Hết đổi vị trí

// Tạo trang sản phẩm mới
module.exports.create = async (req, res) => {
  res.render(`${systemConfig.prefixAdmin}/pages/products/create`, {
    pageTitle: "Thêm mới sản phẩm"
  });
}
// Hết tạo trang sản phẩm mới

//Submit form tạo mới 1 sản phẩm
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);  
  req.body.stock = parseInt(req.body.stock);
  const totalRecord = await Product.countDocuments();
  if(req.body.position){
    req.body.position = parseInt(req.body.position);
  } else{
    req.body.position = totalRecord + 1;
  }
  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  console.log(req.file);
  console.log(req.body);

  const record = new Product(req.body); // Tạo 1 bản ghi mới
  await record.save(); // Lưu bản ghi vào CSDL
  // Đợi lưu xong bản ghi thì chuyển hướng về lại trang sản phẩm
  res.redirect(`/${systemConfig.prefixAdmin}/products`);
}