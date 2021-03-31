const { ProtoBase } = require("./proto_base");
const { ProtoType } = require("./proto_type");

class ProtoEnterRoom extends ProtoBase {
    type = ProtoType.ENTER_ROOM;

    constructor(playerId, success) {
        super();
        const Player = require("../game/player").Player;
        if (playerId === Player.QIAN_QIAN || playerId === Player.YAO_ZAI || playerId === Player.AI) {
            this.data.playerId = playerId;
            this.data.success = success;
        }
    }
}

exports.ProtoEnterRoom = ProtoEnterRoom;