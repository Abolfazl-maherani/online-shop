const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const app = express(express);
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const redisClient = require("redis").createClient();

class Server {
  constructor(dbUri) {
    this.configApp();
    this.configDatabase(dbUri);
    this.configRedis();
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
    // morgan.token("");
    app.use(morgan("dev"));
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
      if (err) return console.log(err.message);
    });
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to db");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("mongoose disconnected to db");
    });
    process.on("SIGINT", async () => {
      const result = await mongoose.connection.close();
      if (result) console.log(result);
      process.exit(0);
    });
  }

  configRoutes() {
    const routes = require("./http/routes");
    app.use(routes);
    app.use(
      "/swagger-api",
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            info: {
              title: "Online shop",
              version: "1.0.0",
              description: "فروشگاه آنلاین با نود جی اس و اکسپرس",
            },
          },
          apis: ["./app/http/routes/*/*.js"],
          Server: [
            {
              url: "http://localhost" + process.env.PORT,
            },
          ],
        })
      )
    );
    this.#notFind();
  }
  configErrorHandler() {
    app.use((err, req, res, next) => {
      const createInternalError = createError.InternalServerError("خطای سرور");
      const {
        message = createInternalError.message,
        success = false,
        status = createInternalError.status,
      } = err;
      process.env.NODE_ENV === "development" ? console.log(err) : null;
      return res.status(status).json({
        errors: {
          status,
          message,
          success,
        },
      });
    });
  }
  configRedis() {
    redisClient.connect();
    redisClient.on("connect", () => {
      console.log("connected redis");
    });
    redisClient.on("error", () => {
      client.disconnect();
      console.log("error redis");
    });
    module.exports.redisClient = redisClient;
  }
  #notFind() {
    app.use((req, res, next) =>
      next(createError.NotFound("صفحه مورد نظر پیدا نشد"))
    );
  }
}
module.exports.redisClient = redisClient;
module.exports = Server;
