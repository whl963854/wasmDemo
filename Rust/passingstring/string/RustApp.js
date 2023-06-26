class RustApp {
    constructor() {
        this._inst = null;
    }
    async Run(instance = null) {
        if (instance != null) { this._inst = instance; }
        this._inst.exports.main();
    }
    GetString(addr, len) {
        return new TextDecoder("utf-8 ").decode(this.MemView(addr, len));
    }
    MemView(addr, len) {
        return new DataView(this._inst.exports.memory.buffer,
            addr, len);
    }
    Init(instance) {
        this._inst = instance;
    }
    Exports() {
        return this._inst.exports;
    }
    Mem() {
        return this._inst.exports.memory;
    }
    MemUint8Array(addr, len) {
        return new Uint8Array(this.Mem().buffer, addr, len);
    }
}



module.exports = RustApp;
