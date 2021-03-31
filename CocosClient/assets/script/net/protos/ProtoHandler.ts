import { ProtoType } from "./ProtoType";
import EventManager from "../../appContext/EventManager";
import { Events } from "../../appContext/EventManager";

export class ProtoHandler {
    public static handleMsg(msg) {
        msg = JSON.parse(msg);
        if (msg.type == null || msg.data == null) {
            console.log("错误的消息数据");
            return;
        }

        switch (msg.type) {
            case ProtoType.ENTER_ROOM:
                EventManager.emit(Events.PROTO_NOTIFY_ENTER_ROOM, msg.data);
                break;
        }
    }
}
