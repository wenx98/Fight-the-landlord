import EventManager, { Events } from "../appContext/EventManager";
import { Client } from "../net/Client";
import { ProtoEnterRoom } from "../net/protos/ProtosReady";
import Player from "../game/Player";
import AppContext from "../appContext/AppContext";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends cc.Component {
    @property(cc.Label)
    private connectInfo: cc.Label = null;
    @property(cc.Node)
    private nodEnter: cc.Node = null;

    public onLoad() {
        this.connectInfo.string = "正在连接服务器";
        this.nodEnter.active = false;

        EventManager.on(Events.SOCKET_CONNECTED, this.onServerConnected, this);
        EventManager.on(Events.PROTO_NOTIFY_ENTER_ROOM, this.onEnterRoomNotify, this);
    }

    public onDestroy() {
        EventManager.off(Events.SOCKET_CONNECTED, this.onServerConnected, this);
        EventManager.off(Events.PROTO_NOTIFY_ENTER_ROOM, this.onEnterRoomNotify, this);
    }

    public start() {
        Client.INSTANCE.connect(22744, true);
    }

    private onServerConnected() {
        this.connectInfo.string = "连接成功";
        this.nodEnter.active = true;
    }

    private enterRoom() {
        Client.INSTANCE.send(new ProtoEnterRoom(Player.YAO_ZAI));
    }

    private onEnterRoomNotify(data) {
        if (data.playerId === AppContext.INSTANCE.getMyPlayerId()) {
            cc.director.loadScene("game");
        }
    }
}
