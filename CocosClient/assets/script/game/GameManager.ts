import Room from "./Room";
import AppContext from "../appContext/AppContext";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
    @property(Room)
    private room: Room = null;

    public start() {
        this.room.init(AppContext.INSTANCE.getRoomId());
    }
}
