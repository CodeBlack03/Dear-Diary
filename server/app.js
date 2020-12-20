const express = require("express");
const path = require("path");

const noteRouter = require("./Routes/noteRoutes");
const globalErrorHandler = require("./Controllers/errorController");
const AppError = require("./utils/AppError");

const app = express();

app.use(express.json());

app.use("/api/notes", noteRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}
app.use(globalErrorHandler);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
module.exports = app;
