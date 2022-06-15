const fs = require("fs");
const path = require("path");

const productsController = {
    detail: (req, res) => {
        let data = req.body.cloth.split(",");
        let prod = fs.readFileSync(path.join(__dirname, `../../database/movements/${data[0]}.json`), "utf-8");
        let prodJSON = JSON.parse(prod);
        let total = totalizar(prodJSON);
        res.render("detail", { title: data[1], prod: prodJSON, total: total, cloth_id: data[0], edit: false });
    },
    add: (req, res) => {
        let data = req.body;
        let cloth_id = data.id;
        let title = data.title;
        delete data.title
        let prod = fs.readFileSync(path.join(__dirname, `../../database/movements/${cloth_id}.json`), "utf-8");
        let prodJSON = JSON.parse(prod);
        let ultimo = prodJSON.length + 1;
        data.id = `${cloth_id}-${ultimo}`;
        prodJSON.push(data);
        let sortProdJSON = prodJSON.sort((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha));
        let total = totalizar(prodJSON);
        prod = JSON.stringify(sortProdJSON);
        fs.writeFileSync(path.join(__dirname, `../../database/movements/${cloth_id}.json`), prod);
        res.render("detail", { title: title, prod: sortProdJSON, total: total, cloth_id: cloth_id, edit: false });
    },
    edit: (req, res) => {
        let data = req.params.id.split("-");
        let movId = req.params.id;
        let title = req.params.title;
        let prod = fs.readFileSync(path.join(__dirname, `../../database/movements/${data[0]}.json`), "utf-8");
        let prodJSON = JSON.parse(prod);
        let prodEdit = prodJSON.find(el => el.id == movId);
        let total = totalizar(prodJSON);
        res.render("detail", { title: title, prod: prodJSON, prodE: prodEdit, cloth_id: movId, total: total, edit: true });
    },
    update: (req, res) => {
        let data = req.body;
        let cloth_id = data.id.split("-");
        let title = data.title;
        delete data.title;
        let prod = fs.readFileSync(path.join(__dirname, `../../database/movements/${cloth_id[0]}.json`), "utf-8");
        let prodJSON = JSON.parse(prod);
        prodJSON = prodJSON.filter(el => el.id != data.id);
        prodJSON.push(data);
        let sortProdJSON = prodJSON.sort((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha));
        let total = totalizar(prodJSON);
        prod = JSON.stringify(sortProdJSON);
        fs.writeFileSync(path.join(__dirname, `../../database/movements/${cloth_id[0]}.json`), prod);
        res.render("detail", { title: title, prod: sortProdJSON, total: total, cloth_id: cloth_id, edit: false });
    },
    delete: (req, res) => {
        let title = req.params.title;
        let data = req.params.id.split("-");
        let prod = fs.readFileSync(path.join(__dirname, `../../database/movements/${data[0]}.json`), "utf-8");
        let prodJSON = JSON.parse(prod);
        prodJSON = prodJSON.filter(e => e.id != req.params.id);
        let sortProdJSON = prodJSON.sort((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha));
        let total = totalizar(prodJSON);
        prod = JSON.stringify(sortProdJSON);
        fs.writeFileSync(path.join(__dirname, `../../database/movements/${data[0]}.json`), prod);
        res.render("detail", { title: title, prod: sortProdJSON, total: total, cloth_id: data[0], edit: false });
    }
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