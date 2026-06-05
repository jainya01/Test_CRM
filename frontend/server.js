// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: Number(process.env.DB_PORT),
//   waitForConnections: true,
//   connectionsLimit: 20,
//   queueLimit: 0,
// })

// (async () => {
//   try {
//     const connection = await pool.getConnection();
//     console.log("db connected");
//     connection.release();
//   } catch (error) {
//     console.error("db connection failed", error);
//   }
// });

// export default pool;

// import jwt from "jsonwebtoken";

// const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "invalid token" });
//   }
// };

// export default authenticate;

// callback hell

// function getCall(id, callback) {
//   settime(() => {
//     console.log("callback hell done");
//     if (callback) {
//       callback();
//     }
//   }, 1000);
// }

// console.log("fetching data1...");

// getCall(1, () => {
//   console.log("fetching data2...");

//   getCall(2, () => {
//     console.log("fetching data3...");

//     getCall(3, () => {
//       console.log("fetching data4...");
//     });
//   });
// });

// promise chaining

// function getData(id) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Promise chaining done");
//       resolve("Success");
//     }, 1000);
//   });
// }

// console.log("fetching data1...");
// getData(1).then((res) => {
//   console.log(res);
//   console.log("fetching data2...");

//   getData(2).then((res) => {
//     console.log(res);
//     console.log("fetching data3...");

//     getData(3).then((res) => {
//       console.log(res);
//       console.log("fetching data4...");

//       getData(4).then((res) => {
//         console.log(res);
//       });
//     });
//   });
// });

// async & await

// function getData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("done successfully");
//       resolve("Success");
//     }, 1000);
//   });
// }

// async function getApi() {
//   for (let i = 1; i <= 10; i++) {
//     console.log(`fetching data${i}...`);
//     const response = await getData();
//     console.log(response);
//   }
// }

// getApi();

// call, apply, bind

// let user = {
//   name: "abc",
//   email: "abc@gmail.com",
// };

// function getCall(phone, city) {
//   console.log(
//     `User is ${this.name} and ${this.email} phone is: ${phone} city is: ${city}`,
//   );
// }

// getCall.call(user, 9999999991, "Lucknow");

// let user = {
//   name: "abc",
//   email: "abc@gmail.com",
//   getCall: function (phone, city) {
//     console.log(`User is ${this.name} and ${this.email} ${phone} ${city}`);
//   },
// };

// user.getCall.call(user, 1717171717, "Lko");

// let user = {
//   name: "abc",
//   email: "abc@gmail.com",
// };

// function getCall(phone, address) {
//   console.log(`User is: ${this.name} ${this.email} ${phone} ${address}`);
// }

// getCall.apply(user, [1818181818, "Kolkata"]);

// let user = {
//   name: "abc",
//   email: "abc@gmail.com",
//   getApply: function (phone, city) {
//     console.log(`User is: ${this.name} ${this.email} ${phone} ${city}`);
//   },
// };

// user.getApply.apply(user, [1717171717, "Kolkata"]);

// let user = {
//   name: "abcd",
//   email: "abcd@gmail.com",
//   getCall: function () {
//     return `User is: ${this.name} ${this.email}`;
//   },
// };

// console.log(user.getCall.call(user));

// let user = {
//   name: "abc",
//   email: "abc@gmail.com",
// };

// function getdata(phone, address) {
//   return `User is: ${this.name} ${this.email} ${phone} ${address}`;
// }

// const result = getdata.bind(user, 1716161616, "LKO");
// console.log(result());

// let user = {
//   name: "abc",
//   email: "abc@gmail.com",
//   getCall: function (phone, address) {
//     return `User is: ${this.name} ${this.email} ${phone} ${address}`;
//   },
// };

// const result = user.getCall.bind(user, 1881818181818, "LKO");
// console.log(result());

// SMTP_HOST=smtp@gmail.com
// SMTP_USER=user@gmail.com
// SMTP_PORT=465
// SMTP_PASS=*******

// transporter.js

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: false,
//   user: process.env.SMTP_USER,
//   password: process.env.SMTP_PASSWORD,
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("error", error);
//   } else {
//     console.log("SMTP is ready", success);
//   }
// });

// export default transporter;

// router.post("/send-mail", async (req, res) => {
//   try {
//     const { emails, subject, message } = req.body;

//     if (!emails || !emails.length === 0) {
//       return res.status(400).json({ message: "no emails selected" });
//     }

//     for (let email of emails) {
//       transporter.sendMail({
//         from: process.env.SMTP_HOST,
//         to: email,
//         subject: subject,
//         text: message,
//       });
//     }

//     return res.status(200).json({ message: "email sent successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "email sent failed" });
//   }
// });

// Server side (Node.js)

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server);

// io.on("connection", (socket) => {
// console.log("User connected:", socket.id);

//  listen to event from client
//     socket.on("message", (data) => {
//         console.log("Message received:", data);

//         send to all clients
//         io.emit("message", data);
//     });

//     when disconnect
//     socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//     });
// });

// app.get("/", (req, res) => {
//     res.send("Server is running");
// });

// server.listen(3000, () => {
//     console.log("Server running on port 3000");
// });

// 3. Client side (Browser)

// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// socket.on("connect", () => {
//     console.log("Connected:", socket.id);
// });

// socket.emit("message", "Hello Server");

// socket.on("message", (data) => {
//     console.log("From server:", data);
// });

// I haven’t worked deeply on Socket.IO in production, but I understand the concept of real-time communication using WebSockets and the event-based model like connection, emit, and disconnect.

// router.get(
//   "/allcustomers",
//   authenticate,
//   asyncHandler(async (req, res) => {
//     const SQL = `
//       SELECT
//         customers.id,
//         customers.name,
//         customers.phone,
//         customers.city,
//         customers.service,
//         customers.status,
//         customers.current_status,
//         customers.caller_id,
//         customers.created_at,
//         customers.updated_at,
//         caller.fullname,
//         customers.notes
//       FROM customers
//       LEFT JOIN caller
//       ON customers.caller_id = caller.id
//       ORDER BY customers.id DESC
//     `;

//     const [result] = await pool.execute(SQL);

//     if (result.length <= 0) {
//       const error = new Error("data not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     return res.status(200).json({
//       success: true,
//       message: "data fetched successfully",
//       result,
//     });
//   }),
// );

// router.get(
//   "/allcalllogs",
//   asyncHandler(async (req, res) => {
//     const SQL = `
//     SELECT
//       c.id AS customer_id,
//       c.status AS customer_status,
//       c.caller_id AS caller_id,
//       c.current_status,
//       c.service,
//       c.notes,
//       c.assigned_at,

//       cl.id AS call_log_id,
//       cl.customer_id AS call_log_customer_id,
//       cl.caller_id AS call_log_caller_id,
//       cl.call_status,
//       cl.call_duration,
//       cl.status AS call_log_status,
//       cl.created_at

//       FROM customers c
//       LEFT JOIN call_logs cl
//         ON cl.customer_id = c.id
//       WHERE c.assigned_at IS NOT NULL
//       ORDER BY c.id DESC
//   `;

//     const [result] = await pool.execute(SQL);

//     if (!result || result.length === 0) {
//       const error = new Error("data not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     return res.status(200).json({
//       success: true,
//       message: "data fetched successfully",
//       result,
//     });
//   }),
// );

// const SQL=`SELECT c.id, c.fullname, c.email, c.address, u.id FROM customers AS c LEFT JOIN users AS u on u.customer_id= c.id`
