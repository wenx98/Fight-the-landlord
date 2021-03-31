import Player from "../game/Player";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AppContext extends cc.Component {
    public static get INSTANCE() {
        return this.instance;
    }
    private static instance: AppContext = null;

    private myPlayerId: number = 0;

    public onLoad() {
        AppContext.instance = this;
        cc.game.addPersistRootNode(this.node);

        this.myPlayerId = Player.YAO_ZAI;
    }

    public start() {
        cc.director.loadScene("login");
    }

    public getMyPlayerId() {
        return this.myPlayerId;
    }
}
