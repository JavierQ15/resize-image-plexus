const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const config = require("../config");
//Run server
server.listen(config.port, () => {
    console.log(`Escuchando por ${config.port}`);
});