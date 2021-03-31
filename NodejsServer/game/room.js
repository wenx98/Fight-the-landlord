const { Player } = require("./player");

class Room {
    // -----------成员变量--------------
    isStart = false;

    /** @type {[Player]} */
    players = [];

    playerEnterRoom(ws, data) {
        const playerId = data.playerId;
        if (playerId === this.Player.QIAN_QIAN) {
            if (this.playerQianqian) {
                this.playerAllreadyInRoom(ws, playerId);
                return;
            }
            this.playerQianqian = new this.Player(ws, playerId);
        } else if (playerId === this.Player.YAO_ZAI) {
            if (this.playerYaozai) {
                this.playerAllreadyInRoom(ws, playerId);
                return;
            }
            this.playerYaozai = new this.Player(ws, playerId);
        } else if (playerId === this.Player.AI) {
            if (this.playerAI) {
                this.playerAllreadyInRoom(ws, playerId);
                return;
            }
            this.playerAI = new this.Player(ws, playerId);
        } else {
            console.log("playerId错误: " + playerId);
            return;
        }

        // 成功进入
        console.log("玩家" + playerId + "进入房间");
        if (playerId !== this.Player.AI) {
            this.ClientHandelr.send(ws, new ProtoEnterRoom(playerId, true));
        }
    }

    playerAllreadyInRoom(ws, id) {
        console.log("玩家" + id + "重复进入房间");
        if (id === this.Player.AI) {
            return;
        }
        this.ClientHandelr.send(ws, new ProtoEnterRoom(id, false));
    }
}

exports.Room = Room;