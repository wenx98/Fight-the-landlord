const { Player } = require("./player");

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
    ClientHandelr = require("../global_define").ClientHandelr;
    Player = require("./player").Player;

    // -----------成员变量--------------
    isStart = false;

    /** @type {Player} */
    playerYaozai = null;
    /** @type {Player} */
    playerQianqian = null;
    /** @type {Player} */
    playerAI = null;


    // -----------成员函数--------------
    init() {
        console.log("GameManager inited");
        // this.playerEnterRoom(this.Player.AI);
    }

    createRomm() {
    }
}

exports.GameManager = GameManager;