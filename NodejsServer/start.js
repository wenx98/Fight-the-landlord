const { GameManager } = require("./global_define");
const { startServer } = require("./server/server")

GameManager.INSTANCE.init();
startServer();