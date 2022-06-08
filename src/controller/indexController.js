const fs = require("fs");
const path = require("path");

const indexController = {
    home: (req, res) => {
        let titles = ["Black Out", "Sunscreen", "Traslucida", "Black Out Text", "Zebra"];
        let bo = fs.readFileSync(path.join(__dirname, "../../database/black-out.json"), "utf-8");
        let boJSON = JSON.parse(bo);
        let bot = fs.readFileSync(path.join(__dirname, "../../database/black-out-text.json"), "utf-8");
        let botJSON = JSON.parse(bot);
        let scr = fs.readFileSync(path.join(__dirname, "../../database/sunscreen.json"), "utf-8");
        let scrJSON = JSON.parse(scr);
        let tra = fs.readFileSync(path.join(__dirname, "../../database/traslucida.json"), "utf-8");
        let traJSON = JSON.parse(tra);
        let zbr = fs.readFileSync(path.join(__dirname, "../../database/zebra.json"), "utf-8");
        let zbrJSON = JSON.parse(zbr);
        let title_arrays = [boJSON, scrJSON, traJSON, botJSON, zbrJSON];
        res.render("home", {"titles": titles, "bo": boJSON, "bot": botJSON, "scr": scrJSON, "tra": traJSON, "zbr": zbrJSON, "title_arrays": title_arrays});
    }
}

module.exports = indexController;