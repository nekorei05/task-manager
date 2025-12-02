const express = require("express");
const app = express();

let tasks = [];
app.use(express.json());

// -------------------------------------
// BASIC ROUTES
// -------------------------------------

app.get("/", (req, res) => {
    res.json({ msg: "hi" });
});

app.get("/hello", (req, res) => {
    res.json({ message: "Hello rei" });
});

// -------------------------------------
// START SERVER
// -------------------------------------

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
