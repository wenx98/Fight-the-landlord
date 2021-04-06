import { ProtoBase } from "./ProtoBase";
import { ProtoType } from "./ProtoType";

export class ProtoLogin extends ProtoBase {
    public type = ProtoType.LOGIN;
}

export class ProtoCreateRoom extends ProtoBase {
    public type = ProtoType.CREATE_ROOM;
}

export class ProtoEnterRoom extends ProtoBase {
    public type = ProtoType.ENTER_ROOM;
}

export class ProtoRequestPlayerInRoom extends ProtoBase {
    public type = ProtoType.REQUEST_PLAYER_IN_ROOM;
}