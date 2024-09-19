const Product = require("../../models/product.model"); // gọi ra cái model

module.exports.index = async (req, res) => {
    // chạy trong mongoDB để lấy ra dữ liệu của các model có deleted là false
    const products = await Product.find({
        deleted: false
    });
    // gán giá trị cho thuộc tính priceNew trong từng model
    for(const item of products) {
        item.priceNew = item.price*(100 - item.discountPercentage)/100;
        item.priceNew = (item.priceNew).toFixed(0);
    }
    res.render("client/pages/products/index",
        {
            pageTitle : "Danh sách sản phẩm",
            products: products
        }
    )
};

