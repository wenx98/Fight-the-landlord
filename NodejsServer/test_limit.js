const WebSocket = require("ws");

const client = new WebSocket("ws://localhost:3000");

client.onopen = () => {
    console.log("θΏζ₯ζε");
}