import "./config/loadEnv"

import { app } from "./app.js";
import { connectDB } from "./db/index.js";

const port = process.env.PORT || 8000;

(async function startServer() {
  try {
    await connectDB();

    const server = app.listen(port, () => {
      console.log("Server started at port: ", port);
    });
    server.on("error", (error) => {
      console.error("Error occured while booting up the server: ", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Mongo DB connection error!! ", error);
    process.exit(1);
  }
})();
