require("dotenv").config();
const express = require("express");
const serverConfig = require("./configs/serverConfig");
const apiRouter = require("./routes/apiRouter");
const errorRouter = require("./routes/errorRouter");

const app = express();
const PORT = process.env.PORT || 3001;

serverConfig(app);

app.use("/api", apiRouter);

app.use(errorRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
