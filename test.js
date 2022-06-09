const fs = require("fs");
const path = require("path");

let prod = fs.readFileSync(path.join(__dirname, "/database/movements/" + "bo1.json"), "utf-8");
let prodJSON = JSON.parse(prod);
let total = totalizar(0, prodJSON);

console.log(total);

function totalizar(ini, lista) {
    let total = ini;
    let arr = [];
    for (let i in lista) {
        arr.push(lista[i])
    }
    for (let el of arr) {
        if (el.tipo === "INGRESO") {
            total += parseFloat(el.alto);
        } else if (el.tipo === "EGRESO") {
            total -= parseFloat(el.alto);
        }
    }
    return total;
}