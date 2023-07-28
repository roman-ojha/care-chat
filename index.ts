import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// import db from "./config/db.js";
import router from "./router/index.js";

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(__dirname, "/public");

(() => {
  try {
    app.use(express.static(staticPath));
    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "/view"));
    app.use(router);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    // db.end();
  } catch (err) {
    console.log(err);
  }
})();
