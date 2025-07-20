// Importing the essentials to run our Backend server
const express = require("express");
const bodyParser = require("body-parser");
const {
  dbinitialize,
  readTeachers,
  readTeacherInfo,
  addTeacher,
  deleteTeacher,
  updateTeacher
} = require("./database.js");

// Initialize express app
const app = express();
// Middlewares for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API for initializing the database
app.get("/dbinitialize", async function (req, res) {
  console.log("DB is getting initialized");
  let data = await dbinitialize();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

// ============== Teacher Related endpoints ==============

// 1. API for retrieving teachers
app.get("/listTeachers", async function (req, res) {
  console.log("Request received to list teachers");
  let data = await readTeachers();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

// 2. API for retrieving a single teacher
app.post("/getTeacherInfo", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to get Teacher Info");
  let data = await readTeacherInfo(reqBody.id);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

// 3. API for adding/creating a teacher
app.post("/addTeacher", async function (req, res) {
  let reqBody = req.body;
  console.log(
    "Request received to add teacher. Req body: " + JSON.stringify(reqBody)
  );
  let data = await addTeacher(reqBody.id, reqBody.name, reqBody.age);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

// 4. API for deleting a teacher
app.post("/deleteTeacher", async function (req, res) {
  let reqBody = req.body;
  console.log(
    "Request received to delete teacher. Req body: " + JSON.stringify(reqBody)
  );
  let data = await deleteTeacher(reqBody.id);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

// 5. API for updating a teacher
app.post("/editTeacher", async function (req, res) {
  let reqBody = req.body;
  let data = await updateTeacher(reqBody.name, reqBody.age, reqBody.id);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

// Export the express app
module.exports = app;