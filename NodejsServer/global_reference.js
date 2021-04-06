const GameManager = require("./game/game_manager");
const ProtoHandler = require("./net/proto_handler");
const ClientHandelr = require("./server/client_handler");
const PlayerManager = require("./game/player_manager");

exports.GameManager = GameManager.GameManager;
exports.ProtoHandler = ProtoHandler.ProtoHandler;
exports.ClientHandelr = ClientHandelr.ClientHandelr;
exports.PlayerManager = PlayerManager.PlayerManager;