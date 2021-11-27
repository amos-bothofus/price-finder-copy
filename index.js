const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const db = require("./config/db");
const path = require('path')

app.use(express.static("uploads"));
// MongoDB();
//Middleware

app.use(express.json({ extended: false, limit: "10mb" }));
app.use(cors());

app.get("/", (req, res) => res.send("How Much"));

//Routes
app.use("/question", require("./routes/question"));
app.use("/auth", require("./routes/auth"));

app.use(express.static(path.join(__dirname,'/client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'/client/build','index.html'));
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => console.log("Server is running on port", PORT));
