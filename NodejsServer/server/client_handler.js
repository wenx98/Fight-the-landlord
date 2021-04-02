const WebSocket = require("ws");
const { ProtoBase } = require("../net/proto_base");

class ClientHandelr {
    static clientUniqueId = 0;

    static clientMap = new Map();

    /**
     * @param {WebSocket} ws 
     */
    static handleNewClient(ws) {
        const self = this;
        self.clientMap.set(ws, ++self.clientUniqueId);
        console.log("新客户端" + self.clientUniqueId + "连接，当前连接数：" + this.clientMap.size);

        ws.onmessage = (msg) => {
            require("../global_reference").ProtoHandler.handleMsg(ws, msg.data);
        }

        ws.onerror = (err) => {
            console.log("error: " + err.message);
        }

        ws.onclose = () => {
            self.clientMap.delete(ws);
            console.log("客户端断开: " + self.clientMap.get(ws) + "，当前连接数：" + this.clientMap.size);
        }
    }

    // /**
    //  * @param {WebSocket} ws 
    //  * @param {WebSocket.MessageEvent} msg 
    //  */
    // static onmessage(ws, msg) {
    //     require("../global_reference").ProtoHandler.handleMsg(ws, msg.data);
    // }

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

