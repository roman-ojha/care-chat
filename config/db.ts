import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "express_example_message_app",
});
// db.connect((err) => {
//   if (err) {
//     console.error("Database connection error: " + err.stack);
//     return;
//   }
//   // console.log("Database connected as id " + db.threadId);
//   console.log("Database connected");
// });

export default db;
