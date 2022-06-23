const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, '/database/lists/cloth_list.json');
let prod = fs.readFileSync(filePath, "utf-8");
prod = JSON.parse(prod);


prod= prod.map((el, idx) => el = {id: idx+1, ...el});
prod = JSON.stringify(prod);
fs.writeFileSync(path.join(__dirname, '/database/lists/cloths_list.json'), prod);




