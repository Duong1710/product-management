const express = require('express')
const app = express()
const port = 4000 


app.set('views', './views') // tìm tđến thư mục tên là views
app.set('view engine', 'pug') // temlate engine sử dụng: Pug

app.get('/', (req, res) => {
  res.render("client/pages/home/index.pug");
});


app.get('/product', (req, res) => {
  res.render("client/pages/products/index")
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});