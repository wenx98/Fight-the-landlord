const { ProtoBase } = require("./proto_base");
const { ProtoType } = require("./proto_type");

class ProtoLogin extends ProtoBase {
    type = ProtoType.LOGIN;

    constructor(playerId, success) {
        super();
        this.data.playerId = playerId;
        this.data.success = success;
    }
}

class ProtoCreateRoom extends ProtoBase {
    type = ProtoType.CREATE_ROOM;

    constructor(roomId, success) {
        super();
        this.data.id = roomId;
        this.data.success = success;
    }
}

class ProtoEnterRoom extends ProtoBase {
    type = ProtoType.ENTER_ROOM;

    constructor(roomId, success) {
        super();
        this.data.id = roomId;
        this.data.success = success;
    }
}

class ProtoRequestRoomInfo extends ProtoBase {
    type = ProtoType.REQUEST_ROOM_INFO;

    /**
     * @param {Number} roomId
     * @param {[Number]} playersId
     * @param {boolean} isStart
     * @param {Number} curPlayer
     * @param {Number} leftTime
     */
    constructor(roomId, playersId, isStart, curPlayer, leftTime) {
        super();
        this.data.roomId = roomId;
        this.data.playersId = playersId;
        this.data.isStart = isStart;
        this.data.curPlayer = curPlayer;
        this.data.leftTime = leftTime;
    }
}

exports.ProtoLogin = ProtoLogin;
exports.ProtoCreateRoom = ProtoCreateRoom;
exports.ProtoEnterRoom = ProtoEnterRoom;
exports.ProtoRequestRoomInfo = ProtoRequestRoomInfo;