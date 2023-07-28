import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// import db from "./config/db.js";
import router from "./router/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import socketCookieParser from "socket.io-cookie-parser";
import bodyParser from "body-parser";
import { handleSocket } from "./socket.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { credentials: true, origin: process.env.CLIENT_BASE_URL },
  cookie: true,
});
const PORT = process.env.PORT || 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(__dirname, "/public");
io.use(socketCookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/view"));
app.use(router);
handleSocket(io);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// db.end();
