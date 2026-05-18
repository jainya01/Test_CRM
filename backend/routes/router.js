import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import ExcelJS from "exceljs";
import csvParser from "csv-parser";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import authenticate from "../middleware/auth.js";
import asyncHandler from "../config/asyncHandler.js";

dotenv.config();
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// router.post(
//   "/adminlogin",
//   asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       const error = new Error("Email and password are required");
//       error.statusCode = 400;
//       throw error;
//     }

//     const [rows] = await pool.execute(
//       "SELECT id, email, password, role FROM admin WHERE email = ?",
//       [email],
//     );

//     if (rows.length === 0) {
//       const error = new Error("Invalid email or password");
//       error.statusCode = 401;
//       throw error;
//     }

//     const admin = rows[0];

//     const isMatch = await bcrypt.compare(password, admin.password);

//     if (!isMatch) {
//       const error = new Error("Invalid email or password");
//       error.statusCode = 401;
//       throw error;
//     }

//     if (admin.role !== "admin") {
//       const error = new Error("You are not allowed to login as admin");
//       error.statusCode = 403;
//       throw error;
//     }

//     const token = jwt.sign(
//       {
//         id: admin.id,
//         email: admin.email,
//         role: admin.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "9h" },
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       role: admin.role,
//       id: admin.id,
//       email: admin.email,
//     });
//   }),
// );

// router.post(
//   "/adminpost",
//   asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       const error = new Error("All fields are required");
//       error.statusCode = 400;
//       throw error;
//     }

//     const [existingAdmin] = await pool.execute(
//       "SELECT id FROM admin WHERE email = ?",
//       [email],
//     );

//     if (existingAdmin.length > 0) {
//       const error = new Error("Email already exists");
//       error.statusCode = 409;
//       throw error;
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const [result] = await pool.execute(
//       "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)",
//       [name, email, hashedPassword],
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Admin added successfully",
//       insertedId: result.insertId,
//     });
//   }),
// );

// router.get(
//   "/alladmindata",
//   authenticate,
//   asyncHandler(async (req, res) => {
//     const SQL =
//       "SELECT id, name, email, role FROM admin ORDER BY id DESC LIMIT 50";

//     const [result] = await pool.execute(SQL);

//     if (!result || result.length === 0) {
//       const error = new Error("No admin data found");
//       error.statusCode = 404;
//       throw error;
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Data fetched successfully",
//       result,
//     });
//   }),
// );

// router.delete(
//   "/admindelete/:id",
//   authenticate,
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const SQL = "DELETE FROM admin WHERE id = ?";
//     const [result] = await pool.execute(SQL, [id]);

//     if (result.affectedRows <= 0) {
//       const error = new Error("Data delete failed or not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     return res.status(200).json({
//       success: true,
//       message: "data deleted successfully",
//       result,
//     });
//   }),
// );

// router.put(
//   "/adminupdate/:id",
//   authenticate,
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { email, password } = req.body;

//     const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

//     const SQL = password
//       ? "UPDATE admin SET email = ?, password = ? WHERE id = ?"
//       : "UPDATE admin SET email = ? WHERE id = ?";

//     const params = password ? [email, hashedPassword, id] : [email, id];

//     const [result] = await pool.execute(SQL, params);

//     if (result.affectedRows === 0) {
//       const error = new Error("Admin not found or not updated");
//       error.statusCode = 404;
//       throw error;
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Updated successfully",
//       result,
//     });
//   }),
// );

export default router;
