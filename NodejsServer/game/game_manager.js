const WebSocket = require("ws");
const { ProtoCreateRoom, ProtoEnterRoom } = require("../net/protos_ready");
const { Room } = require("./room");

class GameManager {
    static get INSTANCE() {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
    /** @type {GameManager} */
    static instance = null;

    // 依赖引用
    ClientHandelr = require("../global_reference").ClientHandelr;

    // -----------成员变量--------------
    /** @type {Room} */
    uniqueRoom = null;

    // -----------成员函数--------------
    init() {
        console.log("GameManager inited");
    }

    /**
     * @param {WebSocket} ws 
     */
    createRoom(ws) {
        if (!this.uniqueRoom) {
            this.uniqueRoom = new Room(ws);
            this.ClientHandelr.send(ws, new ProtoCreateRoom(this.uniqueRoom.id, true))
        } else {
            this.ClientHandelr.send(ws, new ProtoCreateRoom(-1, false));
        }
    }

    /**
     * @param {WebSocket} ws 
     */
    playerEnterRoom(ws) {
        if (!this.uniqueRoom) {
            this.createRoom(ws);
            return;
        }
        
        if (this.uniqueRoom.addPlayer(ws)) {
            this.ClientHandelr.send(ws, new ProtoEnterRoom(this.uniqueRoom.id, true));
        } else {
            this.ClientHandelr.send(ws, new ProtoEnterRoom(-1, false))
        }
    }
}

exports.GameManager = GameManager;