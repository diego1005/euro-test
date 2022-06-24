const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");

const indexRouter = require("./routes/index.routes");
const productsRouter = require("./routes/products.routes");

// SETTINGS
const port = process.env.PORT | 3000;
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

// MIDDLEWARES
//-STATIC
app.use(express.static(path.join(__dirname, "../public")));
//-METHOD
app.use(methodOverride('_method'));

// ROUTER
app.use("/", indexRouter);
app.use("/products", productsRouter);

// SERVER
app.listen(port, () => {
    console.log(`running on port ${port}`);
})