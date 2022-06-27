const fs = require("fs");
const path = require("path");

const f_modules = require("../../public/js/f_modules");

const filePath = path.join(__dirname, '../../database/mov/mov_list.json');
let movList = require(filePath);

const productsController = {
    detail: (req, res) => {
        let cod_tela = req.body.cloth;
        let { title, prodList, total } = f_modules.show(cod_tela, movList);
        res.render("detail", { title: title, prod: prodList, total: total, edit: false });
    },
    create: (req, res) => {
        let new_prod = req.body;
        movList = f_modules.add(new_prod, movList);
        let { title, prodList, total} = f_modules.show(new_prod.cod_tela, movList);
        res.render("detail", { title: title, prod: prodList, total: total, edit: false });
    },
    edit: (req, res) => {
        let prodEdit = movList.find(el => el.id == req.params.id);
        let title = prodEdit.descripcion;
        let prodList = movList.filter(el => el.cod_tela == prodEdit.cod_tela);
        let total = totalizar(prodList);
        res.render("detail", { title: title, prod: prodList, prodE: prodEdit, total: total, edit: true });
    },
    update: (req, res) => {
        let prodEdit = req.body;
        movList = movList.filter(el => el.id != prodEdit.id);
        movList.push(prodEdit);
        let title = prodEdit.descripcion;
        movList = movList.sort((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha));
        let prodList = movList.filter(el => el.cod_tela == prodEdit.cod_tela);
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
        let prodList = movList.filter(el => el.cod_tela == prodDel.cod_tela);
        let total = totalizar(prodList);
        let write_movList = JSON.stringify(movList);
        fs.writeFileSync(filePath, write_movList);
        res.render("detail", { title: title, prod: prodList, total: total, edit: false });
    }
}

module.exports = productsController;