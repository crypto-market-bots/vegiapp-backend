const app = require("./app.js");
const dotenv = require("dotenv");
const connectDatabase = require("./Config/database");

//handling uncaught error --like as console
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Uncaught error`);
  process.exit(1);
});

//console.log(youtube);
//config
dotenv.config({ path: "./Config/config.env" });

//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is port on the ${process.env.PORT}`);
});

//Unhandling Rejection Promise Error
process.on("unhandledRejection", (err) => {
  console.log(`Errror: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled rejection`);

  server.close(() => {
    process.exit(1);
  });
});