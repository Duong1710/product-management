const express = require('express')

require('dotenv').config();

const app = express(); 
const port = process.env.PORT;
const databse = require("./config/database");
databse.connect();
 const routeClient = require("./routes/client/index.route");
 app.use(express.static('public')); // Thiết lập thư mục chứa file tĩnh

app.set('views', './views') // tìm tđến thư mục tên là views
app.set('view engine', 'pug') // temlate engine sử dụng: Pugn

routeClient.index(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
