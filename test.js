const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, '/database/mov/mov_list.json');
const dir = path.join(__dirname, "/database/cuts/");
let prod = require(filePath)


let recs = prod.map(el =>  {
    el.ancho = (el.tipo === "EGRESO") ? (parseFloat(el.ancho) - parseFloat(el.rollo)).toFixed(2) : el.ancho;
    delete el.tipo;
    delete el.prov_cli;
    delete el.tela;
    delete el.rollo;
    delete el.color

    return el;
})

recs = JSON.stringify(recs);

fs.writeFileSync(`${dir}cut_list.json`, recs);

// prod= prod.map((el, idx) => el = {id: idx+1, ...el});
// prod = JSON.stringify(prod);
// fs.writeFileSync(path.join(__dirname, '/database/mov3_list.json'), prod);




