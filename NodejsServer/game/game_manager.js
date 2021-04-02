const WebSocket = require("ws");
const { ProtoCreateRoom } = require("../net/protos_ready");
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
            this.uniqueRoom = new Room();
            this.ClientHandelr.send(new ProtoCreateRoom(this.uniqueRoom.id, true))
        } else {

        }
    }
}

exports.GameManager = GameManager;