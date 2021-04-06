const WebSocket = require("ws");

class Player {
    /** @type {WebSocket} */
    websocket = null;

    /** @type {Number} */
    id = 0;

    /**
     * @param {WebSocket} ws 
     * @param {Number} id 
     */
    constructor(ws, id) {
        this.websocket = ws;
        this.id = id;
    }

    sendCard() {

    }
}

exports.Player = Player;