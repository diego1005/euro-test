const express = require("express");
const path = require("path");
const app = express();

const mainRouter = require("./routes/main.routes.js");

// SETTINGS
const port = process.env.PORT | 3000;
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

// STATIC
app.use(express.static(path.join(__dirname, "../public")));

// SERVER
app.listen(port, () => {
    console.log(`running on port ${port}`);
})

// ROUTER
app.use(mainRouter);