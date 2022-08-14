require("dotenv").config();
const server = require("./app/server");
new server(process.env.DB_URL);
