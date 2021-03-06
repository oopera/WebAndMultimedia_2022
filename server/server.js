const express = require("express");
const app = express();
const cors = require('cors')
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT;

console.log("I EXIST")

app.use(cors())
app.use(express.json());
app.use(require("./routes/routes"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {

  console.log("I EXIST ALSO")
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
