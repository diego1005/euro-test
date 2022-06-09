const fs = require("fs");
const path = require("path");

const productsController = {
    detail: (req, res) => {
        let datos = req.body.cloth.split(",");
        let prod = fs.readFileSync(path.join(__dirname, "../../database/movements/" + datos[0] + ".json"), "utf-8");
        let prodJSON = JSON.parse(prod);
        let prodArr = arrayer(prodJSON);
        let total = totalizar(prodArr);
        res.render("detail", {title: datos[1], prod: prodJSON, total: total, id: datos[0]});
    },
    add: (req, res) => {
        let datos = req.body;
        let id = datos.id;
        let title = datos.title;
        delete datos.id;
        delete datos.title
        let prod = fs.readFileSync(path.join(__dirname, "../../database/movements/" + id + ".json"), "utf-8");
        let prodJSON = JSON.parse(prod);
        let prodArr = arrayer(prodJSON);
        prodArr.push(datos);
        let total = totalizar(prodArr);
        prod = JSON.stringify(prodArr);
        fs.writeFileSync(path.join(__dirname, `../../database/movements/prueba.json`), prod);
        res.render("detail", {title: title, prod: prodArr, total: total, id: id});
    }
}

function arrayer(json) {
    let arr = [];
    for (let i in json) {
        arr.push(json[i])
    }
    return arr;
}

function totalizar(arr) {
    let acum = 0;
    for (let el of arr) {
        if (el.tipo === "INGRESO") {
            acum += parseFloat(el.alto);
            el.total = acum.toFixed(2);
        } else if (el.tipo === "EGRESO") {
            acum -= parseFloat(el.alto);
            el.total = acum.toFixed(2);
        }
    }
    return acum.toFixed(2);
}

module.exports = productsController;