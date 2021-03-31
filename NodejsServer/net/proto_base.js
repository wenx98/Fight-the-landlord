class ProtoBase {
    type;
    data = {};

    getMsg() {
        const msg = {
            type: this.type,
            data: this.data,
        }
        return JSON.stringify(msg);
    }
}

exports.ProtoBase = ProtoBase;