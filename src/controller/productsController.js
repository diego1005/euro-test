const fs = require("fs");
const path = require("path");

const productsController = {
    detail: (req, res) => {
        let datos = req.body.cloth.split(",");
        let prod = fs.readFileSync(path.join(__dirname, "../../database/movements/" + datos[0] + ".json"), "utf-8");
        let prodJSON = JSON.parse(prod);
        res.render("detail", {title: datos[1], prod: prodJSON});
    }
}

module.exports = productsController;