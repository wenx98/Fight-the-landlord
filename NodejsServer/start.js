const { GameManager } = require("./global_reference");
const { startServer } = require("./server/server")

GameManager.INSTANCE.init();
startServer();