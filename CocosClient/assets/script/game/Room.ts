import EventManager, { Events } from "../appContext/EventManager";
import { Client } from "../net/Client";
import { ProtoRequestRoomInfo } from "../net/protos/ProtosReady";
import PlayerOther from "./PlayerOther";
import PlayerSelf from "./PlayerSelf";
import AppContext from "../appContext/AppContext";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Room extends cc.Component {
    @property(PlayerSelf)
    private playerSelf: PlayerSelf = null;
    @property(PlayerOther)
    private playerLeft: PlayerOther = null;
    @property(PlayerOther)
    private playerRight: PlayerOther = null;

    private roomId: number = 0;
    private isStart: boolean = false;

    // 玩家id数组下标
    private leftIdx: number = -1;
    private rightIdx: number = -1;

    public onLoad() {
        this.playerSelf.node.active = false;
        this.playerLeft.node.active = false;
        this.playerRight.node.active = false;
    }

    public onDestroy() {
        this.unregisterEvent();
    }

    public init(id: number) {
        this.registerEvent();

        this.roomId = id;
        Client.INSTANCE.send(new ProtoRequestRoomInfo(id));
    }

    private registerEvent() {
        EventManager.on(Events.PROTO_ROOM_INFO, this.onRoomInfoNotify, this);
    }

    private unregisterEvent() {
        EventManager.off(Events.PROTO_ROOM_INFO, this.onRoomInfoNotify, this);
    }

    private onRoomInfoNotify(data) {
        if (data.roomId !== this.roomId) {
            return;
        }

        this.isStart = data.isStart;

        // 玩家初始化
        const playersId: [number] = data.playersId;
        for (let i = 0; i < playersId.length; i++) {
            if (playersId[i] === AppContext.INSTANCE.getMyPlayerId()) {
                this.leftIdx = i - 1 >= 0 ? i - 1 : 2;
                this.rightIdx = i + 1 <= 2 ? i + 1 : 0;
            }
        }
        this.playerSelf.init(AppContext.INSTANCE.getMyPlayerId());
        if (playersId[this.leftIdx] != null) {
            this.playerLeft.init(playersId[this.leftIdx]);
        }
        if (playersId[this.rightIdx] != null) {
            this.playerLeft.init(playersId[this.rightIdx]);
        }

        // if (this.isStart) {
        //     // 先不考虑断线重连
        // } else {

        // }
    }

    private onEnterRoomNotify(data) {
        this.playerEnterRoom(data.playerId);
    }

    private playerEnterRoom(id) {
        if (id === this.playerSelf.getId()) {
            console.error("id: " + id + "与本玩家id相同");
            return;
        }

        if (!this.playerLeft.isInit()) {
            this.playerLeft.init(id);
        } else if (!this.playerRight.isInit()) {
            this.playerRight.init(id);
        } else {
            console.log("房间已满");
        }
    }
}
