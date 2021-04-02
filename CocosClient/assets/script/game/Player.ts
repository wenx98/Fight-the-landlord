const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    protected id: number = 0;

    public init(id: number) {
        this.id = id;
    }

    public getId() {
        return this.id;
    }

    public isInit() {
        return this.id !== 0;
    }
}
