import AppContext from "../appContext/AppContext";
import EventManager, { Events } from "../appContext/EventManager";
import { Client } from "../net/Client";
import { ProtoRequestRoomInfo } from "../net/protos/ProtosReady";
import PlayerOther from "./PlayerOther";
import PlayerSelf from "./PlayerSelf";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Room extends cc.Component {
    @property(PlayerSelf)
    private player1: PlayerSelf = null;
    @property(PlayerOther)
    private player2: PlayerOther = null;
    @property(PlayerOther)
    private player3: PlayerOther = null;

    private roomId: number = 0;
    private isStart: boolean = false;

    // public onLoad() {
    //     this.player1.init(AppContext.INSTANCE.getMyPlayerId());

    //     Client.INSTANCE.send(new ProtoRequestPlayerInRoom());

    //     EventManager.on(Events.PROTO_ENTER_ROOM, this.onEnterRoomNotify, this);
    // }

    // public onDestroy() {
    //     EventManager.off(Events.PROTO_ENTER_ROOM, this.onEnterRoomNotify, this);
    // }

    public init(id: number) {

        this.roomId = id;
        Client.INSTANCE.send(new ProtoRequestRoomInfo(id));
    }

    private registerEvent() {
        EventManager.on(Events.PROTO_ROOM_INFO, this.onRoomInfoNotify, this);
    }

    private onRoomInfoNotify(data) {

    }

    private onEnterRoomNotify(data) {
        this.playerEnterRoom(data.playerId);
    }

    private playerEnterRoom(id) {
        if (id === this.player1.getId()) {
            console.error("id: " + id + "与本玩家id相同");
            return;
        }

        if (!this.player2.isInit()) {
            this.player2.init(id);
        } else if (!this.player3.isInit()) {
            this.player3.init(id);
        } else {
            console.log("房间已满");
        }
    }
}
