const WebSocket = require("ws");
const { ProtoLogin } = require("../net/protos_ready");
const { Player } = require("./player");

class PlayerManager {
    static get INSTANCE() {
        if (this.instance == null) {
            this.instance = new PlayerManager();
        }
        return this.instance;
    }
    /** @type {PlayerManager} */
    static instance = null;

    // -----------成员变量--------------
    playerIdMap = new Map();
    playerSocketMap = new Map();


    // -----------成员函数--------------
    /**
     * @param {WebSocket} ws 
     */
    handlePlayerLogin(ws) {
        const ClientHandelr = require("../global_reference").ClientHandelr;
        const id = ClientHandelr.getClientId(ws);
        if (id == null) {
            ClientHandelr.send(ws, new ProtoLogin(-1, false));
            return;
        }
        const player = new Player(ws, id);
        this.playerIdMap.set(id, player);
        this.playerSocketMap.set(ws, player);
        ClientHandelr.send(ws, new ProtoLogin(id, true));
    }

    /**
     * @param {WebSocket} ws 
     */
    getPlayerBySocket(ws) {
        return this.playerSocketMap.get(ws);
    }

    isPlayerLogin() {

    }
}

exports.PlayerManager = PlayerManager;