import EventManager, { Events } from "../appContext/EventManager";
import { Client } from "../net/Client";
import { ProtoEnterRoom, ProtoCreateRoom, ProtoLogin } from "../net/protos/ProtosReady";
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
        EventManager.on(Events.PROTO_LOGIN, this.onLoginNotify, this);
        EventManager.on(Events.PROTO_CREATE_ROOM, this.onCreateRoomNotify, this);
        EventManager.on(Events.PROTO_ENTER_ROOM, this.onEnterRoomNotify, this);
    }

    public onDestroy() {
        EventManager.off(Events.SOCKET_CONNECTED, this.onServerConnected, this);
        EventManager.off(Events.PROTO_LOGIN, this.onLoginNotify, this);
        EventManager.off(Events.PROTO_CREATE_ROOM, this.onCreateRoomNotify, this);
        EventManager.off(Events.PROTO_ENTER_ROOM, this.onEnterRoomNotify, this);
    }

    public start() {
        Client.INSTANCE.connect(22744, true);
    }

    private onServerConnected() {
        this.connectInfo.string = "连接成功";

        // 登陆获取随机用户id
        Client.INSTANCE.send(new ProtoLogin());
    }

    private createRoom() {
        Client.INSTANCE.send(new ProtoCreateRoom());
    }

    private enterRoom() {
        Client.INSTANCE.send(new ProtoEnterRoom());
    }

    private onLoginNotify(data) {
        if (data.success) {
            this.connectInfo.string = "登陆成功";
            AppContext.INSTANCE.setPlayerId(data.playerId);
            this.nodEnter.active = true;
        } else {
            this.connectInfo.string = "网络连接异常，登陆失败";
        }
    }

    private onCreateRoomNotify(data) {
        if (data.success) {
            AppContext.INSTANCE.setRoomId(data.id);
            cc.director.loadScene("game");
        } else {
            this.connectInfo.string = "创建房间失败";
        }
    }

    private onEnterRoomNotify(data) {
        if (data.success) {
            AppContext.INSTANCE.setRoomId(data.id);
            cc.director.loadScene("game");
        } else {
            this.connectInfo.string = "进入房间失败";
        }
    }
}
