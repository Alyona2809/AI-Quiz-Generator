const express = require("express");
const path = require("path");
const morgan = require("morgan");
const removeHttpHeader = require("../middlewares/removeHttpHeader");
const cors = require("cors");

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
};

const serverConfig = (app) => {
  app.use(cors(corsOptions));
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(removeHttpHeader("x-powered-by"));
  app.use(express.static(path.resolve(__dirname, "..", "public")));
};

module.exports = serverConfig;
