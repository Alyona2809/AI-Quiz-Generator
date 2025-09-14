const errorRouter = require("express").Router();
const formatResponse = require("../utils/formatResponse");

errorRouter.use((req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Ресурс не найден", null, "Ресурс не найден"));
});

module.exports = errorRouter;
