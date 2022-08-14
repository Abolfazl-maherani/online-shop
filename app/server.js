const express = require("express");
const { dirname } = require("path");
const path = require("path");
const app = express(express);
class Server {
  constructor(dbUri) {
    this.configApp();
    this.configDatabase(dbUri);
    this.configRoutes();
    this.configErrorHandler();
    this.configServerListener();
  }
  configApp() {
    const PATH = require("path");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      express.static(
        PATH.join(PATH.dirname(require.main.filename), process.env.STATIC_DIR)
      )
    );
  }
  configServerListener() {
    const port = process.env.PORT | 8000;
    app.listen(port, () => {
      console.log(`app connect to port:${port}`);
    });
  }
  configDatabase(uri) {
    const mongoose = require("mongoose");
    mongoose.connect(uri, (err) => {
      if (err) return console.log(err);
      console.log("db connected succesfull");
    });
  }

  configRoutes() {
    const routes = require("./http/routes");
    app.use(routes);
    this.#notFind();
  }
  configErrorHandler() {
    app.use((err, req, res) => {
      const {
        message = "خطای سرور رخ داده است",
        success = false,
        status = 500,
      } = err;
      process.env.NODE_ENV === "development" ? console.log(err) : null;
      return res.json({
        status,
        message,
        success,
      });
    });
  }

  #notFind() {
    app.use((req, res, next) => {
      return res.json({
        status: 404,
        message: "صفحه ی مورد نظر یافت نشد",
        success: false,
      });
    });
  }
}
module.exports = Server;
