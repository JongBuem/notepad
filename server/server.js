const express = require("express");    
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(express.urlencoded({ extended : true  }));
app.use(express.static(__dirname+ "./routes"));

const folder = require("./routes/folder");
app.use('/folder',folder);                  // 홈페이지
app.listen(8080)