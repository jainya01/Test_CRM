import express from "express";
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
import LoginLimiter from "../config/rateLimiter.js";
import redisClient from "../config/redisClient.js";

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

router.post(
  "/adminlogin",
  LoginLimiter,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const [rows] = await pool.execute(
      "SELECT id, email, password, role FROM admin WHERE email = ?",
      [email],
    );

    if (rows.length === 0) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const admin = rows[0];

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    if (admin.role !== "admin") {
      const error = new Error("You are not allowed to login as admin");
      error.statusCode = 403;
      throw error;
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "9h" },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      id: admin.id,
      role: admin.role,
      email: admin.email,
    });
  }),
);

router.post(
  "/agentlogin",
  LoginLimiter,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const [rows] = await pool.execute(
      "SELECT id, email, password, role FROM agents WHERE email = ?",
      [email],
    );

    if (rows.length === 0) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const agent = rows[0];
    const isMatch = await bcrypt.compare(password, agent.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    if (agent.role !== "agent") {
      const error = new Error("You are not allowed to login as agent");
      error.statusCode = 403;
      throw error;
    }

    const token = jwt.sign(
      {
        id: agent.id,
        email: agent.email,
        role: agent.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "9h" },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      id: agent.id,
      role: agent.role,
      email: agent.email,
    });
  }),
);

router.post(
  "/stafflogin",
  LoginLimiter,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const [rows] = await pool.execute(
      "SELECT id, email, password, role FROM staff WHERE email = ?",
      [email],
    );

    if (rows.length === 0) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const staff = rows[0];
    const isMatch = await bcrypt.compare(password, staff.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    if (staff.role !== "staff") {
      const error = new Error("You are not allowed to login as staff");
      error.statusCode = 403;
      throw error;
    }

    const token = jwt.sign(
      {
        id: staff.id,
        email: staff.email,
        role: staff.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "9h" },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      id: staff.id,
      role: staff.role,
      email: staff.email,
    });
  }),
);

// admin

router.post(
  "/adminpost",
  asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const [existingAdmin] = await pool.execute(
      "SELECT id FROM admin WHERE email = ?",
      [email],
    );

    if (existingAdmin.length > 0) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      "INSERT INTO admin (fullname, email, password) VALUES (?, ?, ?)",
      [fullname, email, hashedPassword],
    );

    await redisClient.del("crm2:alladmindata:all");

    return res.status(201).json({
      success: true,
      message: "Admin added successfully",
      insertedId: result.insertId,
    });
  }),
);

router.get(
  "/alladmindata",
  authenticate,
  asyncHandler(async (req, res) => {
    const cacheKey = `crm2:alladmindata:all`;
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const SQL = "SELECT id, fullname, email, role FROM admin LIMIT 50";

    const [result] = await pool.execute(SQL);

    if (result.length === 0) {
      const error = new Error("No admin data found");
      error.statusCode = 404;
      throw error;
    }

    const response = {
      success: true,
      message: "Data fetched successfully",
      count: result.length,
      result,
    };

    await redisClient.set(cacheKey, JSON.stringify(response));
    return res.status(200).json(response);
  }),
);

router.delete(
  "/admindelete/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const SQL = "DELETE FROM admin WHERE id = ?";
    const [result] = await pool.execute(SQL, [id]);

    if (result.affectedRows <= 0) {
      const error = new Error("Data delete failed or not found");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del("crm2:alladmindata:all");

    return res.status(200).json({
      success: true,
      message: "data deleted successfully",
      result,
    });
  }),
);

router.put(
  "/adminupdate/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const SQL = password
      ? "UPDATE admin SET email = ?, password = ? WHERE id = ?"
      : "UPDATE admin SET email = ? WHERE id = ?";

    const params = password ? [email, hashedPassword, id] : [email, id];
    const [result] = await pool.execute(SQL, params);

    if (result.affectedRows <= 0) {
      const error = new Error("Admin not found or not updated");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del("crm2:alladmindata:all");

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      result,
    });
  }),
);

router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const [rows] = await pool.execute(
      "SELECT id, fullname, email, role, profile_image FROM agents WHERE id = ?",
      [decoded.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.json({
      success: true,
      result: rows[0],
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
});

// customers bulk uploaded

router.post(
  "/upload-stock",
  authenticate,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded",
        });
      }

      const uploadsDir = path.resolve("uploads");
      fs.readdirSync(uploadsDir).forEach((file) => {
        const fileExt = path.extname(file).toLowerCase();
        if (file !== req.file.filename && [".xlsx", ".csv"].includes(fileExt)) {
          fs.unlinkSync(path.join(uploadsDir, file));
        }
      });

      const filePath = path.join(uploadsDir, req.file.filename);

      const ext = path.extname(req.file.originalname).toLowerCase();

      let values = [];

      if (ext === ".xlsx") {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        workbook.worksheets[0].eachRow(
          { includeEmpty: false },
          (row, rowNumber) => {
            if (rowNumber === 1) return;

            const name = row.getCell(2).value;
            const phone = String(row.getCell(3).value || "")
              .replace(/\D/g, "")
              .trim();

            if (!name || !phone) return;

            values.push([
              String(name).trim(),
              phone,
              row.getCell(4).value ? String(row.getCell(4).value).trim() : null,
              row.getCell(5).value ? String(row.getCell(5).value).trim() : null,
            ]);
          },
        );
      } else if (ext === ".csv") {
        const rows = await new Promise((resolve, reject) => {
          const data = [];
          fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => data.push(row))
            .on("end", () => resolve(data))
            .on("error", reject);
        });

        rows.forEach((row) => {
          const name = row.Name || row.name;
          const phone = String(row.Phone || row.phone || "")
            .replace(/\D/g, "")
            .trim();

          const city = row.City || row.city;
          const service = row.Service || row.service;
          if (!name || !phone) return;
          values.push([
            String(name).trim(),
            phone,
            city ? String(city).trim() : null,
            service ? String(service).trim() : null,
          ]);
        });
      } else {
        return res.status(400).json({
          error: "Only .xlsx and .csv files are allowed",
        });
      }

      if (!values.length) {
        return res.status(400).json({
          error: "No valid rows found",
        });
      }

      const uniqueMap = new Map();
      values.forEach((row) => {
        const phone = row[1];
        if (!uniqueMap.has(phone)) {
          uniqueMap.set(phone, row);
        }
      });

      const uniqueValues = [...uniqueMap.values()];
      const [result] = await pool.query(
        `
        INSERT IGNORE INTO customers
        (name, phone, city, service)
        VALUES ?
        `,
        [uniqueValues],
      );

      await redisClient.del("crm2:allcustomersdata:all");

      const insertedCount = result.affectedRows;
      const skippedCount = uniqueValues.length - insertedCount;
      return res.json({
        success: true,
        message: "Bulk upload completed",
        inserted: insertedCount,
        skippedDuplicates: skippedCount,
        totalProcessed: uniqueValues.length,
        file: req.file.filename,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Upload failed",
        details: err.message,
      });
    }
  },
);

router.get(
  "/allcustomersdata",
  authenticate,
  asyncHandler(async (req, res) => {
    const cacheKey = `crm2:allcustomersdata:all`;
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const SQL =
      "SELECT name, phone, city, service, status, caller FROM customers ORDER BY id DESC";
    const [result] = await pool.execute(SQL);

    const response = {
      success: true,
      message: "data fetch successfully",
      count: result.length,
      result,
    };

    await redisClient.set(cacheKey, JSON.stringify(response));
    return res.status(200).json(response);
  }),
);

// callers or staff

router.get(
  "/allstaffs",
  authenticate,
  asyncHandler(async (req, res) => {
    const SQL = "SELECT id, fullname, email, role FROM staff";
    const [result] = await pool.execute(SQL);

    if (result.length === 0) {
      const error = new Error("data not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: "data fetched successfully",
      count: result.length,
      result,
    });
  }),
);

router.post(
  "/callerspost",
  authenticate,
  asyncHandler(async (req, res) => {
    const { fullname, email, password, status, notes } = req.body;

    if (!fullname || !email || !password || !status) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const [existing] = await pool.execute(
      "SELECT id FROM staff WHERE email = ?",
      [email],
    );

    if (existing.length > 0) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      "INSERT INTO staff (fullname, email, password, status, notes) VALUES (?, ?, ?, ?, ?)",
      [fullname, email, hashedPassword, status, notes],
    );

    await redisClient.del("crm2:allstaffs:all");

    return res.status(201).json({
      success: true,
      message: "Caller created successfully",
      callerId: result.insertId,
    });
  }),
);

router.put(
  "/callerupdate/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fullname, email, status, password, notes } = req.body;

    if (!fullname || !email || !status) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    let query =
      "UPDATE staff SET fullname = ?, email = ?, status = ?, notes = ?";
    let values = [fullname, email, status, notes];

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ", password = ?";
      values.push(hashedPassword);
    }

    query += " WHERE id = ?";
    values.push(id);

    const [result] = await pool.execute(query, values);

    if (result.affectedRows <= 0) {
      const error = new Error("Staff not found or not updated");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del(`crm2:somecallers:${id}`);
    await redisClient.del("crm2:allstaffs:all");

    return res.status(200).json({
      success: true,
      message: "Staff updated successfully",
      result,
    });
  }),
);

router.delete(
  "/callerdelete/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [result] = await pool.execute("DELETE FROM staff WHERE id = ?", [id]);

    if (result.affectedRows <= 0) {
      const error = new Error("Staff not found");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del(`crm2:somecallers:${id}`);
    await redisClient.del("crm2:allstaffs:all");

    return res.status(200).json({
      success: true,
      message: "Staff deleted successfully",
      result,
    });
  }),
);

router.get(
  "/allcallers",
  asyncHandler(async (req, res) => {
    const cacheKey = `crm2:allstaffs:all`;
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const SQL =
      "SELECT id, fullname, email, role, status, role, notes, created_at FROM staff ORDER BY id DESC LIMIT 20";

    const [result] = await pool.execute(SQL);

    if (result.length === 0) {
      const error = new Error("Staff not found");
      error.statusCode = 404;
      throw error;
    }

    const response = {
      success: true,
      message: "Data fetched successfully",
      count: result.length,
      data: result,
    };

    await redisClient.set(cacheKey, JSON.stringify(response));
    return res.status(200).json(response);
  }),
);

router.get(
  "/somecallers/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const cacheKey = `crm2:somecallers:${id}`;
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const SQL =
      "SELECT id, fullname, email, role, status, notes FROM staff WHERE id = ?";

    const [result] = await pool.execute(SQL, [id]);

    if (result.length === 0) {
      const error = new Error("Staff not found");
      error.statusCode = 404;
      throw error;
    }

    const response = {
      success: true,
      message: "Data fetched successfully",
      data: result[0],
    };

    await redisClient.set(cacheKey, JSON.stringify(response));
    return res.status(200).json(response);
  }),
);

// agent section

router.put(
  "/editprofile/:id",
  upload.single("profile_image"),
  authenticate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { fullname, email, password } = req.body;
      const [agentData] = await pool.execute(
        "SELECT * FROM agents WHERE id = ?",
        [id],
      );

      if (agentData.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Agent not found",
        });
      }

      const oldAgent = agentData[0];
      let updatedPassword = oldAgent.password;
      if (password && password.trim() !== "") {
        updatedPassword = await bcrypt.hash(password, 10);
      }

      let updatedImage = oldAgent.profile_image;
      if (req.file) {
        updatedImage = req.file.filename;
      }

      await pool.execute(
        `UPDATE agents 
         SET fullname = ?, 
             email = ?, 
             password = ?, 
             profile_image = ?
         WHERE id = ?`,
        [fullname, email, updatedPassword, updatedImage, id],
      );

      await redisClient.del("crm2:allagents:all");

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });
    } catch (error) {
      console.error("error", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
);

router.post(
  "/agentpost",
  authenticate,
  asyncHandler(async (req, res) => {
    const { fullname, phone, email, password, status, notes = null } = req.body;

    if (!fullname || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (fullname.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Fullname at least 3 characters",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password at least 6 characters",
      });
    }

    const [existingEmail] = await pool.execute(
      "SELECT id FROM agents WHERE email = ?",
      [email],
    );

    if (existingEmail.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const [existingPhone] = await pool.execute(
      "SELECT id FROM agents WHERE phone = ?",
      [phone],
    );

    if (existingPhone.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Phone number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const SQL = `
      INSERT INTO agents
      (fullname, phone, email, password, status, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(SQL, [
      fullname,
      phone,
      email,
      hashedPassword,
      status || "Active",
      notes,
    ]);

    await redisClient.del("crm2:allagents:all");

    return res.status(201).json({
      success: true,
      message: "Agent created successfully",
      result,
    });
  }),
);

router.put(
  "/agentsedit/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fullname, phone, email, password, status, notes } = req.body;

    const [emailRows] = await pool.execute(
      "SELECT id FROM agents WHERE email = ? AND id != ?",
      [email, id],
    );

    if (emailRows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    let result;

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);

      const SQL = `
        UPDATE agents
        SET fullname=?, phone=?, email=?, password=?, status=?, notes=?
        WHERE id=?
      `;

      [result] = await pool.execute(SQL, [
        fullname,
        phone,
        email,
        hashedPassword,
        status,
        notes,
        id,
      ]);
    } else {
      const SQL = `
        UPDATE agents
        SET fullname=?, phone=?, email=?, status=?, notes=?
        WHERE id=?
      `;

      [result] = await pool.execute(SQL, [
        fullname,
        phone,
        email,
        status,
        notes,
        id,
      ]);
    }

    if (result.affectedRows <= 0) {
      const error = new Error("Agent update failed");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del(`crm2:someagents:${id}`);
    await redisClient.del("crm2:allagents:all");

    return res.status(200).json({
      success: true,
      message: "Agent updated successfully",
      result,
    });
  }),
);

router.get(
  "/someagents/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cacheKey = `crm2:someagents:${id}`;
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const SQL =
      "SELECT id, fullname, phone, email, status, notes FROM agents WHERE id = ?";
    const [result] = await pool.execute(SQL, [id]);

    if (result.length === 0) {
      const error = new Error("data load failed");
      error.statusCode = 404;
      throw error;
    }

    const response = {
      success: true,
      message: "data fetch successfully",
      result,
    };

    await redisClient.set(cacheKey, JSON.stringify(response));
    return res.status(200).json(response);
  }),
);

router.get(
  "/allagents",
  authenticate,
  asyncHandler(async (req, res) => {
    const cacheKey = `crm2:allagents:all`;
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const SQL =
      "SELECT id, fullname, phone, email, status, profile_image FROM agents ORDER BY id DESC";
    const [result] = await pool.execute(SQL);

    if (result.length === 0) {
      const error = new Error("data fetched failed");
      error.statusCode = 404;
      throw error;
    }

    const response = {
      success: true,
      message: "data fetch successfully",
      count: result.length,
      result,
    };

    await redisClient.set(cacheKey, JSON.stringify(response));
    return res.status(200).json(response);
  }),
);

router.delete(
  "/agentsdelete/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const SQL = "DELETE FROM agents WHERE id = ?";
    const [result] = await pool.execute(SQL, [id]);

    if (result.affectedRows <= 0) {
      const error = new Error("data deleted failed");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del(`crm2:someagents:${id}`);
    await redisClient.del("crm2:allagents:all");

    return res.status(200).json({
      success: true,
      message: "agent deleted successfully",
      result,
    });
  }),
);

// agents bulk

router.post(
  "/agents-uploads",
  authenticate,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No file uploaded",
        });
      }

      const uploadsDir = path.resolve("uploads");

      fs.readdirSync(uploadsDir).forEach((file) => {
        const fileExt = path.extname(file).toLowerCase();
        if (file !== req.file.filename && [".xlsx", ".csv"].includes(fileExt)) {
          fs.unlinkSync(path.join(uploadsDir, file));
        }
      });

      const filePath = path.join(uploadsDir, req.file.filename);
      const ext = path.extname(req.file.originalname).toLowerCase();
      let rows = [];

      if (ext === ".xlsx") {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.worksheets[0];
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber === 1) return;

          const fullname = row.getCell(1).value
            ? String(row.getCell(1).value).trim()
            : "";

          const phone = row.getCell(2).value
            ? String(row.getCell(2).value).replace(/\D/g, "").trim()
            : "";

          const email = row.getCell(3).value
            ? String(row.getCell(3).value).trim()
            : "";

          const password = row.getCell(4).value
            ? String(row.getCell(4).value).trim()
            : "";

          const status = row.getCell(5).value
            ? String(row.getCell(5).value).trim()
            : "Active";

          if (!fullname || !phone || !email || !password) return;

          rows.push({
            fullname,
            phone,
            email,
            password,
            status,
          });
        });
      } else if (ext === ".csv") {
        const csvRows = await new Promise((resolve, reject) => {
          const data = [];

          fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => data.push(row))
            .on("end", () => resolve(data))
            .on("error", reject);
        });

        csvRows.forEach((row) => {
          const fullname = row.fullname ? String(row.fullname).trim() : "";

          const phone = row.phone
            ? String(row.phone).replace(/\D/g, "").trim()
            : "";

          const email = row.email ? String(row.email).trim() : "";
          const password = row.password ? String(row.password).trim() : "";
          const status = row.status ? String(row.status).trim() : "Active";
          if (!fullname || !phone || !email || !password) return;
          rows.push({
            fullname,
            phone,
            email,
            password,
            status,
          });
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "Only .xlsx and .csv files are allowed",
        });
      }

      if (!rows.length) {
        return res.status(400).json({
          success: false,
          error: "No valid rows found",
        });
      }

      const uniqueMap = new Map();
      rows.forEach((row) => {
        if (!uniqueMap.has(row.phone)) {
          uniqueMap.set(row.phone, row);
        }
      });

      const uniqueRows = [...uniqueMap.values()];
      const insertValues = [];

      for (const item of uniqueRows) {
        const hashedPassword = await bcrypt.hash(item.password, 10);
        insertValues.push([
          item.fullname,
          item.phone,
          item.email,
          hashedPassword,
          item.status,
        ]);
      }

      const [result] = await pool.query(
        `
        INSERT IGNORE INTO agents
        (
          fullname,
          phone,
          email,
          password,
          status
        )
        VALUES ?
        `,
        [insertValues],
      );

      const insertedCount = result.affectedRows;
      const skippedCount = uniqueRows.length - insertedCount;

      await redisClient.del("crm2:allagents:all");

      return res.status(200).json({
        success: true,
        message: "Agents bulk upload completed",
        inserted: insertedCount,
        skippedDuplicates: skippedCount,
        totalProcessed: uniqueRows.length,
        file: req.file.filename,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: "Upload failed",
        details: err.message,
      });
    }
  },
);

// Reschedule leads

router.patch(
  "/reschedule-leads",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;

    const SQL = "UPDATE customers SET date = ? WHERE id = ?";
    const [result] = await pool.execute(SQL, [date, id]);

    if (result.affectedRows <= 0) {
      const error = new Error("data update failed");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: "data successfully updated",
      result,
    });
  }),
);

// services

router.post(
  "/servicepost",
  authenticate,
  asyncHandler(async (req, res) => {
    const { service_name, sub_category, status, notes } = req.body;

    const service_key = service_name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const SQL =
      "INSERT INTO services(service_name, service_key, sub_category, status, notes) VALUES(?, ?, ?, ?, ?)";

    const [result] = await pool.execute(SQL, [
      service_name,
      service_key,
      sub_category,
      status,
      notes,
    ]);

    if (result.affectedRows <= 0) {
      const error = new Error("data post failed");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del("crm2:services:all");

    res.status(200).json({
      success: true,
      message: "data post successfully",
      result,
    });
  }),
);

router.get(
  "/allservices",
  authenticate,
  asyncHandler(async (req, res) => {
    const cacheKey = `crm2:services:all`;
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const SQL =
      "SELECT id, service_name, service_key, sub_category, status, notes FROM services ORDER BY id DESC";
    const [result] = await pool.execute(SQL);

    if (result.length === 0) {
      const error = new Error("services not available");
      error.statusCode = 404;
      throw error;
    }

    const response = {
      success: true,
      message: "data fetched successfully",
      count: result.length,
      result: result,
    };

    await redisClient.set(cacheKey, JSON.stringify(response));
    return res.status(200).json(response);
  }),
);

router.delete(
  "/servicedelete/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const SQL = "DELETE FROM services WHERE id = ?";
    const [result] = await pool.execute(SQL, [id]);

    if (result.affectedRows <= 0) {
      const error = new Error("data deleted failed");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del(`crm2:someservices:${id}`);
    await redisClient.del("crm2:services:all");

    return res.status(200).json({
      success: true,
      message: "data deleted failed",
      result,
    });
  }),
);

router.get(
  "/someservices/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cacheKey = `crm2:someservices:${id}`;
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const SQL =
      "SELECT id, service_name, service_key, sub_category, status, notes FROM services WHERE id = ?";
    const [result] = await pool.execute(SQL, [id]);

    if (result.length === 0) {
      const error = new Error("data not found");
      error.statusCode = 404;
      throw error;
    }

    const response = {
      success: true,
      message: "data fetched successfully",
      count: result.length,
      result,
    };

    await redisClient.set(cacheKey, JSON.stringify(response));
    return res.status(200).json(response);
  }),
);

router.put(
  "/servicesedit/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { service_name, sub_category, status, notes } = req.body;

    const SQL =
      "UPDATE services SET service_name = ?, sub_category = ?, status = ?, notes = ? WHERE id=?";
    const [result] = await pool.execute(SQL, [
      service_name,
      sub_category,
      status,
      notes,
      id,
    ]);

    if (result.affectedRows <= 0) {
      const error = new Error("data update failed");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del(`crm2:someservices:${id}`);
    await redisClient.del("crm2:services:all");

    return res.status(200).json({
      success: true,
      message: "data updated successfully",
      result,
    });
  }),
);

// packages

router.post(
  "/packagespost",
  authenticate,
  upload.single("package_flyer"),
  asyncHandler(async (req, res) => {
    const {
      service,
      package_name,
      flight_pnr,
      flight_number,
      trip_way,
      package_price,
      package_type,
      package_duration,
      category,
      zone,
      departure_city,
      room_sharing,
      number_of_seats,
      start_date,
      end_date,
      departure_date,
      departure_time,
      dept_am,
      arrival_date,
      arrival_time,
      arrival_am,
      number_of_days,
      makkah_hotel,
      makkah_rating,
      madinah_hotel,
      madinah_rating,
      azizia_rating,
      package_include,
      package_excludes,
      flights,
      flights_no,
      flight_date,
      luggage_type,
      luggage_details,
    } = req.body;

    const package_flyer = req.file ? req.file.filename : null;

    const SQL = `
      INSERT INTO packages (
        service,
        package_name,
        flight_pnr,
        flight_number,
        trip_way,
        package_price,
        package_type,
        package_duration,
        category,
        zone,
        departure_city,
        room_sharing,
        number_of_seats,
        start_date,
        end_date,
        departure_date,
        departure_time,
        dept_am,
        arrival_date,
        arrival_time,
        arrival_am,
        number_of_days,
        makkah_hotel,
        makkah_rating,
        madinah_hotel,
        madinah_rating,
        azizia_rating,
        package_include,
        package_excludes,
        flights,
        flights_no,
        flight_date,
        package_flyer,
        luggage_type,
        luggage_details
      )
      VALUES (
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?
      )
    `;

    const values = [
      service,
      package_name,
      flight_pnr,
      flight_number,
      trip_way,
      package_price,
      package_type,
      package_duration,
      category,
      zone,
      departure_city,
      room_sharing,
      number_of_seats,
      start_date,
      end_date,
      departure_date,
      departure_time,
      dept_am,
      arrival_date,
      arrival_time,
      arrival_am,
      number_of_days,
      makkah_hotel,
      makkah_rating,
      madinah_hotel,
      madinah_rating,
      azizia_rating,
      package_include,
      package_excludes,
      flights,
      flights_no,
      flight_date,
      package_flyer,
      luggage_type,
      luggage_details,
    ];

    const [result] = await pool.execute(SQL, values);

    if (result.affectedRows === 0) {
      const error = new Error("Package creation failed");
      error.statusCode = 400;
      throw error;
    }

    await redisClient.del("crm2:allpackages:all");

    return res.status(201).json({
      success: true,
      message: "Package created successfully",
      packageId: result.insertId,
      package_flyer,
    });
  }),
);

router.get(
  "/allpackages",
  authenticate,
  asyncHandler(async (req, res) => {
    const cacheKey = "crm2:allpackages:all";

    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const SQL = `
      SELECT
        id,
        service,
        package_name,
        package_price,
        number_of_seats,
        start_date,
        end_date,
        departure_date,
        package_flyer,
        status
      FROM packages
      ORDER BY id DESC
      LIMIT 50
    `;

    const [result] = await pool.execute(SQL);

    const response = {
      success: true,
      message: "Packages fetched successfully",
      count: result.length,
      result,
    };

    await redisClient.setEx(cacheKey, 600, JSON.stringify(response));

    return res.status(200).json(response);
  }),
);

router.put(
  "/packagesupdate/:id",
  authenticate,
  upload.single("package_flyer"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const {
      service,
      package_name,
      flight_pnr,
      flight_number,
      trip_way,
      package_price,
      package_type,
      package_duration,
      category,
      zone,
      departure_city,
      room_sharing,
      number_of_seats,
      start_date,
      end_date,
      departure_date,
      departure_time,
      dept_am,
      arrival_date,
      arrival_time,
      arrival_am,
      number_of_days,
      makkah_hotel,
      makkah_rating,
      madinah_hotel,
      madinah_rating,
      azizia_rating,
      package_include,
      package_excludes,
      flights,
      flights_no,
      flight_date,
      luggage_type,
      luggage_details,
    } = req.body;

    let package_flyer = req.body.package_flyer || null;

    if (req.file) {
      package_flyer = req.file.filename;
    }

    const SQL = `
      UPDATE packages SET
        service = ?,
        package_name = ?,
        flight_pnr = ?,
        flight_number = ?,
        trip_way = ?,
        package_price = ?,
        package_type = ?,
        package_duration = ?,
        category = ?,
        zone = ?,
        departure_city = ?,
        room_sharing = ?,
        number_of_seats = ?,
        start_date = ?,
        end_date = ?,
        departure_date = ?,
        departure_time = ?,
        dept_am = ?,
        arrival_date = ?,
        arrival_time = ?,
        arrival_am = ?,
        number_of_days = ?,
        makkah_hotel = ?,
        makkah_rating = ?,
        madinah_hotel = ?,
        madinah_rating = ?,
        azizia_rating = ?,
        package_include = ?,
        package_excludes = ?,
        flights = ?,
        flights_no = ?,
        flight_date = ?,
        package_flyer = ?,
        luggage_type = ?,
        luggage_details = ?
      WHERE id = ?
    `;

    const values = [
      service,
      package_name,
      flight_pnr,
      flight_number,
      trip_way,
      package_price,
      package_type,
      package_duration,
      category,
      zone,
      departure_city,
      room_sharing,
      number_of_seats,
      start_date,
      end_date,
      departure_date,
      departure_time,
      dept_am,
      arrival_date,
      arrival_time,
      arrival_am,
      number_of_days,
      makkah_hotel,
      makkah_rating,
      madinah_hotel,
      madinah_rating,
      azizia_rating,
      package_include,
      package_excludes,
      flights,
      flights_no,
      flight_date,
      package_flyer,
      luggage_type,
      luggage_details,
      id,
    ];

    const [result] = await pool.execute(SQL, values);

    if (result.affectedRows === 0) {
      const error = new Error("Package update failed");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del(`crm2:somepackages:${id}`);
    await redisClient.del("crm2:allpackages:all");

    return res.status(200).json({
      success: true,
      message: "Package updated successfully",
    });
  }),
);

router.delete(
  "/packagesdelete/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const SQL = "DELETE FROM packages WHERE id = ?";
    const [result] = await pool.execute(SQL, [id]);

    if (result.affectedRows <= 0) {
      const error = new Error("packages deleted failed");
      error.statusCode = 404;
      throw error;
    }

    await redisClient.del(`crm2:somepackages:${id}`);
    await redisClient.del("crm2:allpackages:all");
    return res.status(200).json(result);
  }),
);

router.get(
  "/somepackages/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const cacheKey = `crm2:somepackages:${id}`;

    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const SQL = `
      SELECT
        id,
        service,
        package_name,
        flight_pnr,
        flight_number,
        trip_way,
        package_price,
        package_type,
        package_duration,
        category,
        zone,
        departure_city,
        room_sharing,
        number_of_seats,
        start_date,
        end_date,
        departure_date,
        departure_time,
        dept_am,
        arrival_date,
        arrival_time,
        arrival_am,
        number_of_days,
        makkah_hotel,
        makkah_rating,
        madinah_hotel,
        madinah_rating,
        azizia_rating,
        package_include,
        package_excludes,
        flights,
        flights_no,
        flight_date,
        package_flyer,
        luggage_type,
        luggage_details,
        status,
        created_at,
        updated_at
      FROM packages
      WHERE id = ?
      LIMIT 1
    `;

    const [result] = await pool.execute(SQL, [id]);

    if (result.length === 0) {
      const error = new Error("Package not found");
      error.statusCode = 404;
      throw error;
    }

    const response = {
      success: true,
      message: "Package fetched successfully",
      result: result[0],
    };

    // Cache for 10 minutes
    await redisClient.setEx(cacheKey, 600, JSON.stringify(response));

    return res.status(200).json(response);
  }),
);

export default router;
