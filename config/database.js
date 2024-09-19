const mongoose = require('mongoose');
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Đã kết nối thành công DB")
    } catch (error) {
        console.log("Kết nối thất bại");
        console.log(error);
    }
}