process.on("uncaughtException", (err) => {
  console.log("Unhandled Exception! 🔥 Shutting down...");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});
require("dotenv").config();

require("./db/mongoose");
const app = require("./app");

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! 🔥 Shutting down...");
  console.log(err.name, err.message, err.stack, "haha");
  server.close(() => {
    process.exit(1);
  });
});
