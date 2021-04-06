import EventManager, { Events } from "../appContext/EventManager";
import AppContext from "../appContext/AppContext";
import PlayerSelf from "./PlayerSelf";
import PlayerOther from "./PlayerOther";
import { Client } from "../net/Client";
import { ProtoRequestPlayerInRoom } from "../net/protos/ProtosReady";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
    @property(PlayerSelf)
    private playerSelf: PlayerSelf = null;
    @property(PlayerOther)
    private player2: PlayerOther = null;
    @property(PlayerOther)
    private player3: PlayerOther = null;

    private isStart: boolean = false;

    public onLoad() {
        this.playerSelf.init(AppContext.INSTANCE.getMyPlayerId());

        Client.INSTANCE.send(new ProtoRequestPlayerInRoom());

        EventManager.on(Events.PROTO_ENTER_ROOM, this.onEnterRoomNotify, this);
    }

    public onDestroy() {
        EventManager.off(Events.PROTO_ENTER_ROOM, this.onEnterRoomNotify, this);
    }

    private onEnterRoomNotify(data) {
        this.playerEnterRoom(data.playerId);
    }

    private playerEnterRoom(id) {
        if (id === this.playerSelf.getId()) {
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
