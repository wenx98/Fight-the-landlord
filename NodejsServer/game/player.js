const WebSocket = require("ws");

class Player {
    static QIAN_QIAN = 1;
    static YAO_ZAI = 2;
    static AI = 3;

    /** @type {WebSocket} */
    websocket = null;

    /**
     * @param {WebSocket} ws 
     * @param {Number} id 
     */
    constructor(ws, id) {

    }

    sendCard() {
        
    }
}

exports.Player = Player;