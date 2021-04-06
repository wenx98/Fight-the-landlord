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

exports.ProtoLogin = ProtoLogin;
exports.ProtoCreateRoom = ProtoCreateRoom;
exports.ProtoEnterRoom = ProtoEnterRoom;