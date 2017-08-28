const fs = require("fs");
const path = require("path");

const dir = "scripts";

const configPath = path.join(__dirname, "..", dir, "config.js");
const indexPath = path.join(__dirname, "..", dir, "index.js");
const config = fs.readFileSync(configPath);
const index = fs.readFileSync(indexPath);

let output = `
${config}

${index}
`;

fs.writeFileSync("./src/Code.js", output);
