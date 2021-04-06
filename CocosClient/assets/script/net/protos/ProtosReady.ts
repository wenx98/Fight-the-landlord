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

export class ProtoRequestRoomInfo extends ProtoBase {
    public type = ProtoType.REQUEST_ROOM_INFO;

    constructor(id: number) {
        super();
        this.data.roomId = id;
    }
}