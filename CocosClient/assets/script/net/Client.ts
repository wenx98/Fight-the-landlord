import EventManager, { Events } from "../appContext/EventManager";
import { ProtoBase } from "./protos/ProtoBase";
import { ProtoHandler } from "./protos/ProtoHandler";

export class Client {
    public static get INSTANCE() {
        if (!this.instance) {
            this.instance = new Client();
        }
        return this.instance;
    }
    private static instance: Client = null;

    private constructor() { }

    public connect(port: number, isLAN: boolean = false) {
        let url = "ws://103.46.128.21:" + port;
        if (isLAN) {
            url = "ws://localhost:3000";
        }

        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            EventManager.emit(Events.SOCKET_CONNECTED);
        }

        this.socket.onerror = (err: Event) => {
            EventManager.emit(Events.SOCKET_ERROR);
        }

        this.socket.onclose = () => {
            EventManager.emit(Events.SOCKET_CLOSE);
        }

        this.socket.onmessage = (msg: MessageEvent) => {
            ProtoHandler.handleMsg(msg.data)
        }
    }

    public send(proto: ProtoBase) {
        this.socket.send(proto.getMsg());
    }

    private socket: WebSocket = null;
}