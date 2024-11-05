const express = require('express') // kết nối express
const bodyParser = require('body-parser')
// Cụm express-flash
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// hết cụm
require('dotenv').config(); // kết nối .evn
const methodOverride = require('method-override'); // sử dụng thư viện này để thêm patch trong file html/pug
const systemConfig = require("./config/system");
const app = express();
const port = process.env.PORT; // gọi cổng

const databse = require("./config/database"); //kết nối database
databse.connect(); // Kết nối database
const routeAdmin = require("./routes/admin/index.route"); // Gọi đường dẫn đến file index.route bên admin
const routeClient = require("./routes/client/index.route"); // Gọi đường dẫn đến file index.route bên client

// Khai báo biến toàn cục cho file pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Dùng express-flash
app.use(cookieParser('JKSLSF'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// Khai báo đường dẫn
routeAdmin.index(app)
routeClient.index(app)

app.use(express.static(`${__dirname}/public`)); // Thiết lập thư mục chứa file tĩnh

app.set('views', `${__dirname}/views`) // tìm tđến thư mục tên là views
app.set('view engine', 'pug') // temlate engine sử dụng: Pugn



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
