const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const app = express();
const { check, validationResult } = require('express-validator');
//path.resolve()
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = 5000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post("/add_user", (req, res) => {
  const sql =
    "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student added successfully" });
  });
});

app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});

app.post('/signup', (req, res) => {
  const sql = "INSERT INTO login (name, email, password) VALUES (?)";
  const values = [
      req.body.name,
      req.body.email,
      req.body.password
  ];

  db.query(sql, [values], (err, data) => {
      if (err) {
          return res.status(500).json({ message: "Error inserting user", error: err });
      }
      return res.status(201).json({ message: "User created successfully", data });
  });
});

// Login Route
app.post('/login', [
  check('email', "Invalid email").isEmail().isLength({ min: 10}),
  check('password', "Password must be between 8 and 10 characters").isLength({ min: 8})
], (req, res) => {

  console.log("Login route hit");
  console.log("Querying database with:", req.body.email, req.body.password);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
  }
  
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Error querying user", error: err });
      }

      if (data.length > 0) {
          if (req.body.password === data[0].password) {
              return res.status(200).json({ message: "Success", user: data[0] });
          } else {
              console.log("Incorrect password");
              return res.status(401).json({ message: "Failed", error: "Invalid credentials" });
          }
      } else {
          console.log("No user found");
          return res.status(401).json({ message: "Failed", error: "User not found" });
      }
  });
});

// Route to upload an image
app.post('/upload_picture/:id', upload.single('picture'), (req, res) => {
  const id = req.params.id;
  const picturePath = req.file.path;
  const sql = "UPDATE student_details SET image = ? WHERE id = ?";
  db.query(sql, [picturePath, id], (err, result) => {
    if (err) {
      console.error("Error uploading picture:", err);
      return res.status(500).json({ message: "Error uploading picture", error: err });
    }
    return res.status(200).json({ message: "Picture uploaded successfully" });
  });
});



app.listen(port, () => {
  console.log(`listening on port ${port} `);
});