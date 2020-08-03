import winston from "winston";
import express from "express";
import config from "config";

import logging from "./startup/logging.js";
import routes from "./startup/routes.js";
import db from "./startup/db.js";
import configStartup from "./startup/config.js";
import validation from "./startup/validation.js";

const app = express();

logging();
routes(app);
db();
configStartup();
validation();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

export default server;
