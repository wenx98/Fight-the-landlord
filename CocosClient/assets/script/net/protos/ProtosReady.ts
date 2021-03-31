import { ProtoBase } from "./ProtoBase";
import { ProtoType } from "./ProtoType";
import Player from "../../game/Player";

export class ProtoEnterRoom extends ProtoBase {
    public type = ProtoType.ENTER_ROOM;

    constructor(playerId: number) {
        super();
        if (playerId === Player.QIAN_QIAN || playerId === Player.YAO_ZAI) {
            this.data.playerId = playerId;
        }
    }
}

export class ProtoRequestPlayerInRoom extends ProtoBase {
    public type = ProtoType.REQUEST_PLAYER_IN_ROOM;
}