import { ProtoType } from "./ProtoType";
import EventManager from "../../appContext/EventManager";
import { Events } from "../../appContext/EventManager";

export class ProtoHandler {
    public static handleMsg(msg) {
        msg = JSON.parse(msg);
        console.log(msg);
        if (msg.type == null || msg.data == null) {
            console.log("错误的消息数据");
            return;
        }

        switch (msg.type) {
            case ProtoType.LOGIN:
                EventManager.emit(Events.PROTO_LOGIN, msg.data);
                break;
            case ProtoType.CREATE_ROOM:
                EventManager.emit(Events.PROTO_CREATE_ROOM, msg.data);
                break;
            case ProtoType.ENTER_ROOM:
                EventManager.emit(Events.PROTO_ENTER_ROOM, msg.data);
                break;
            case ProtoType.REQUEST_ROOM_INFO:
                EventManager.emit(Events.PROTO_ROOM_INFO, msg.data);
                break;
        }
    }
}
