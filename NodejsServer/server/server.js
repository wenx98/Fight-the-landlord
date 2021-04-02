const WebScoket = require("ws");

const WebSocketServer = WebScoket.Server;

function startServer() {
    const ClientHandelr = require("../global_reference").ClientHandelr;

    const wss = new WebSocketServer({
        port: 3000
    });

    wss.on("connection", function (ws, req) {
        ClientHandelr.handleNewClient(ws);
    })

    wss.on("close", function () {
        console.log("服务器关闭")
    })

    wss.on("error", function (err) {
        console.error(err.message);
    })

    console.log("WebSocket Server Started");
}
exports.startServer = startServer;