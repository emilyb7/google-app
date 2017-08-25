const fs = require("fs");
const path = require("path");

const dir = "scripts";

const varsPath = path.join(__dirname, dir, "vars.js");
const scriptPath = path.join(__dirname, dir, "index.js");
const vars = fs.readFileSync(varsPath);
const script = fs.readFileSync(scriptPath);

let output = `
${vars}

${script}
`;

fs.writeFileSync("./src/Code.js", output);
