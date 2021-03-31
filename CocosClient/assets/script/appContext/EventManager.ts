const { ccclass, property } = cc._decorator;

@ccclass
export default class EventManager extends cc.Component {
    private static Instance: EventManager = null;

    public onLoad() {
        EventManager.Instance = this;
    }

    public static on(event: Events, callback: Function, target?: any, useCapture?: boolean) {
        this.Instance.node.on(event, callback, target, useCapture);
    }

    public static off(event: Events, callback?: Function, target?: any, useCapture?: boolean) {
        this.Instance.node.off(event, callback, target, useCapture);
    }

    public static emit(event: Events, msg?: any) {
        this.Instance.node.emit(event, msg);
    }
}

export enum Events {
    // Socket
    SOCKET_CONNECTED = "SOCKET_CONNECTED",
    SOCKET_ERROR = "SOCKET_ERROR",
    SOCKET_CLOSE = "SOCKET_CLOSE",

    // Protocol
    PROTO_NOTIFY_ENTER_ROOM = "PROTO_NOTIFY_ENTER_ROOM",
    PROTO_NOTIFY_PLAYER_IN_ROOM = "PROTO_NOTIFY_PLAYER_IN_ROOM",


    // Game
    PLAYER_READY = "PLAYER_READY",
}
