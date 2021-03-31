import { ProtoType } from "./ProtoType";

export abstract class ProtoBase {
    public type: ProtoType;
    public data: any = {};

    public getMsg(): string {
        let msg = {
            type: this.type,
            data: this.data,
        }
        return JSON.stringify(msg);
    }
}
