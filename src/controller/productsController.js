const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, '../../database/mov_list.json');
let movList = fs.readFileSync(filePath, "utf-8");
movList = JSON.parse(movList);

const productsController = {
    detail: (req, res) => {
        let tela = req.body.cloth;
        let prodList = movList.filter(el => el.tela == tela);
        let title = prodList[0].descripcion;
        let total = totalizar(prodList);
        res.render("detail", { title: title, prod: prodList, total: total, edit: false });
    },
    add: (req, res) => {
        let new_prod = req.body;
        let title = new_prod.descripcion;
        let len = movList.length;
        new_prod.id = movList[len-1].id + 1;
        movList.push(new_prod);
        movList = movList.sort((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha));
        let prodList = movList.filter(el => el.tela == new_prod.tela);
        let total = totalizar(prodList);
        let write_movList = JSON.stringify(movList);
        fs.writeFileSync(filePath, write_movList);
        res.render("detail", { title: title, prod: prodList, total: total, edit: false });
    },
    edit: (req, res) => {
        let prodEdit = movList.find(el => el.id == req.params.id);
        let title = prodEdit.descripcion;
        let prodList = movList.filter(el => el.tela == prodEdit.tela);
        let total = totalizar(prodList);
        res.render("detail", { title: title, prod: prodList, prodE: prodEdit, total: total, edit: true });
    },
    update: (req, res) => {
        let prodEdit = req.body;
        movList = movList.filter(el => el.id != prodEdit.id);
        movList.push(prodEdit);
        let title = prodEdit.descripcion;
        movList = movList.sort((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha));
        let prodList = movList.filter(el => el.tela == prodEdit.tela);
        let total = totalizar(prodList);
        let write_movList = JSON.stringify(movList);
        fs.writeFileSync(filePath, write_movList);
        res.render("detail", { title: title, prod: prodList, total: total, edit: false });
    },
    delete: (req, res) => {
        let prodDel = movList.find(el => el.id == req.params.id);
        let title = prodDel.descripcion;
        movList = movList.filter(e => e.id != req.params.id);
        movList = movList.sort((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha));
        let prodList = movList.filter(el => el.tela == prodDel.tela);
        let total = totalizar(prodList);
        let write_movList = JSON.stringify(movList);
        fs.writeFileSync(filePath, write_movList);
        res.render("detail", { title: title, prod: prodList, total: total, edit: false });
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