const WebSocket = require("ws");
const { ProtoType } = require("./proto_type");

class ProtoHandler {
    /**
     * @param {WebSocket} ws 
     * @param {String} msg 
     */
    static handleMsg(ws, msg) {
        const GameManager = require("../global_reference").GameManager;

        msg = JSON.parse(msg);
        console.log(msg);
        if (msg.type == null || msg.data == null) {
            console.error("错误的消息数据");
            return;
        }

        switch (msg.type) {
            case ProtoType.CREATE_ROOM:
                GameManager.INSTANCE.createRoom(ws, msg.data);
                break;
            case ProtoType.ENTER_ROOM:
                GameManager.INSTANCE.playerEnterRoom(ws, msg.data)
                break;
        }
    }
}

exports.ProtoHandler = ProtoHandler;