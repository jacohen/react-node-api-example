//import libraries
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

//initialize firebase inorder to access its services
admin.initializeApp();

//initialize the database and the collection
const db = admin.firestore();

//initialize express server
const app = express();

//add the path to receive request and set json as bodyParser to process the body

app.use(express.json());

app.use( (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTION");
  res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  next()
});

app.get("/", async (req, res) => {
  const snapshot = await db.collection("students").get();
  console.log("each student");
  let data = [];
  snapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  res.json(data);
});

app.post("/", async (req, res) => {
  try {
    const dbres = await db.collection("students").add(req.body);
  } catch (err) {
    console.error(err);
  }
  res.status(200).end();
});

//define google cloud function name
exports.schoolApi = functions.https.onRequest(app);
