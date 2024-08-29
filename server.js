const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
/*CORS*/
let corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Routes
// const routesBussiness = require('./routes/bussiness');
const routesAuth = require("./routes/auth");
const routesBiodata = require("./routes/biodata");
const routesPendidikan = require("./routes/pendidikanTerakhir");
const routesPekerjaan = require("./routes/riwayatPekerjaan");
const routesPelatihan = require("./routes/riwayatPelatihan");

app.use("/v1/", routesAuth);
app.use("/v1/", routesBiodata);
app.use("/v1/", routesPendidikan);
app.use("/v1/", routesPekerjaan);
app.use("/v1/", routesPelatihan);

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port `, PORT);
});
