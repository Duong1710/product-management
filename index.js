const express = require('express') // kết nối express
const bodyParser = require('body-parser')
require('dotenv').config(); // kết nối .evn
const systemConfig = require("./config/system");
const app = express();
const port = process.env.PORT; // gọi cổng

const databse = require("./config/database"); //kết nối database
databse.connect(); // Kết nối database
const routeAdmin = require("./routes/admin/index.route"); // Gọi đường dẫn đến file index.route bên admin
const routeClient = require("./routes/client/index.route"); // Gọi đường dẫn đến file index.route bên client

// Khai báo biến toàn cục cho file pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// parse application/json
app.use(bodyParser.json())

// Khai báo đường dẫn
routeAdmin.index(app)
routeClient.index(app)

app.use(express.static('public')); // Thiết lập thư mục chứa file tĩnh

app.set('views', './views') // tìm tđến thư mục tên là views
app.set('view engine', 'pug') // temlate engine sử dụng: Pugn



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
