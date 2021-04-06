const { Player } = require("./player");

class Room {
    static roomUniqueId = 0;
    // -----------成员变量--------------
    id = 0;
    isStart = false;

    /** @type {[Player]} */
    players = [];

    /**
     * @param {Websocket} ws 
     */
    constructor(ws) {
        Room.roomUniqueId++;
        this.id = Room.roomUniqueId;
        if (ws) {
            this.addPlayer(ws);
        }
    }

    /**
    * @param {Websocket} ws 
    */
    addPlayer(ws) {
        if (this.players.length >= 3) {
            return false;
        }

        const player = require("./player_manager").PlayerManager.INSTANCE.getPlayerBySocket(ws);
        if (!player) {
            console.error("房间添加玩家失败");
            return false;
        }
        this.players.push(player);
        return true;
    }
}

exports.Room = Room;