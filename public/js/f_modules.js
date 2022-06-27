const fs = require("fs");
const path = require("path");

const movPath = path.join(__dirname, "../../database/mov/");

let f_modules = {
    show: (cod_tela, movList) => {
        let prodList = movList.filter(el => el.cod_tela == cod_tela);
        let title = prodList[0].descripcion;
        let total = f_modules.total(prodList);
        return [title, prodList, total];
    },
    add: (new_product, movList) => {
        let len = movList.length;
        new_product.id = movList[len-1].id + 1;
        movList.push(new_product);
        movList = movList.sort((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha));
        f_modules.write(movList);
        return movList;
    },
    write: (movList) => {
        let write_movList = JSON.stringify(movList);
        fs.writeFileSync(movPath, write_movList);
    },
    total: (arr) => {
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
}

module.exports = f_modules;