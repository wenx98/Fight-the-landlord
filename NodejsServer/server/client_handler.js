const WebSocket = require("ws");
const { ProtoBase } = require("../net/proto_base");

class ClientHandelr {
    static clientUnitId = 0;

    static clientMap = new Map();

    /**
     * @param {WebSocket} ws 
     */
    static handleNewClient(ws) {
        const self = this;
        self.clientMap.set(ws, ++self.clientUnitId);
        console.log("新客户端" + self.clientUnitId + "连接，当前连接数：" + this.clientMap.size);

        ws.onmessage = (msg) => {
            self.onmessage(ws, msg);
        }

        ws.onerror = (err) => {
            console.log("error: " + err.message);
        }

        ws.onclose = () => {
            console.log("客户端断开: " + self.clientMap.get(ws));
            self.clientMap.delete(ws);
        }
    }

    /**
     * @param {WebSocket} ws 
     * @param {WebSocket.MessageEvent} msg 
     */
    static onmessage(ws, msg) {
        require("../global_define").ProtoHandler.handleMsg(ws, msg.data);
    }

    /**
     * @param {WebSocket} ws 
     * @param {ProtoBase} proto 
     */
    static send(ws, proto) {
        if (!this.clientMap.has(ws)) {
            console.error("不合法的客户端");
            return;
        }
        ws.send(proto.getMsg());
    }

    /**
     * @param {ProtoBase} proto
     */
    static broadcast(proto) {
        const msg = proto.getMsg();
    }
};

exports.ClientHandelr = ClientHandelr;

