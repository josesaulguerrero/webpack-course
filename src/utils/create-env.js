const fs = require('fs');
const API = process.env.API;
fs.writeFileSync('./.env', `API=${API}\n`)