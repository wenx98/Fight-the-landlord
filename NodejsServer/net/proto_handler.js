const WebSocket = require("ws");
const { ProtoType } = require("./proto_type");

class ProtoHandler {
    /**
     * @param {WebSocket} ws 
     * @param {String} msg 
     */
    static handleMsg(ws, msg) {
        const GameManager = require("../global_reference").GameManager;
        const PlayerManager = require("../global_reference").PlayerManager;

        msg = JSON.parse(msg);
        console.log(msg);
        if (msg.type == null || msg.data == null) {
            console.error("错误的消息数据");
            return;
        }

        switch (msg.type) {
            case ProtoType.LOGIN:
                PlayerManager.INSTANCE.handlePlayerLogin(ws);
                break;
            case ProtoType.CREATE_ROOM:
                GameManager.INSTANCE.createRoom(ws);
                break;
            case ProtoType.ENTER_ROOM:
                GameManager.INSTANCE.playerEnterRoom(ws)
                break;
            case ProtoType.REQUEST_ROOM_INFO:
                GameManager.INSTANCE.requestRoomInfo(ws, msg.data);
                break;
        }
    }
}

exports.ProtoHandler = ProtoHandler;