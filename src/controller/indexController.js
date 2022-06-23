const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../database/lists/cloths_list.json");
let clothList = fs.readFileSync(filePath, "utf-8");
clothList = JSON.parse(clothList);

const indexController = {
    home: (req, res) => {
        let titles = ["Black Out", "Sunscreen", "Traslucida", "Black Out Text", "Zebra"];
        let bo = clothList.filter(el => el.tela.includes("bo") && !el.tela.includes("bot"));
        let bot = clothList.filter(el => el.tela.includes("bot"));
        let scr = clothList.filter(el => el.tela.includes("scr"));
        let tra = clothList.filter(el => el.tela.includes("tra"));
        let zbr = clothList.filter(el => el.tela.includes("zbr"));
        let subtitles = [bo, scr, tra, bot, zbr];
        res.render("home", {titles: titles, subtitles: subtitles});
    }
}

module.exports = indexController;