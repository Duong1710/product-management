const express = require('express')
const app = express()
const port = 4000 

app.get('/', (req, res) => {
  res.send("Trang chủ")
});


app.get('/product', (req, res) => {
  res.send("Trang danh sách sản phẩm")
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});