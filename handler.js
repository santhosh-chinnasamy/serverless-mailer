const serverless = require("serverless-http");
const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use("/", routes);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
