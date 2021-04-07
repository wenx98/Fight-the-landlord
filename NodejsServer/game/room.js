const { Player } = require("./player");

class Room {
    static roomUniqueId = 1;
    // -----------成员变量--------------
    id = 0;
    isStart = false;

    /** @type {[Player]} */
    players = [];

    curPlayerId = 0;
    leftTime = 0

    /**
     * @param {Websocket} ws 
     */
    constructor(ws) {
        this.id = Room.roomUniqueId;
        if (ws) {
            this.addPlayer(ws);
        }
        Room.roomUniqueId++;
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

    getRoomInfo() {
        const info = {};
        info.roomId = this.id;
        info.isStart = this.isStart;
        info.curPlayer = this.curPlayerId;
        info.leftTime = this.leftTime;
        info.playersId = [];
        for (let i = 0; i < this.players.length; i++) {
            info.playersId.push(this.players[i].id);
        }
        return info;
    }
}

exports.Room = Room;