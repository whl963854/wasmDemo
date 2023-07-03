const fs = require('fs');
const buf = fs.readFileSync('./target/wasm32-unknown-unknown/debug/string.wasm');

const RustApp = require('./RustApp.js');


function RustString_new(rustApp, jsString) {
    const bytes = new TextEncoder("utf-8").encode(jsString);
    let rustString = rustApp.Exports().string_new(bytes.length);
    let addr = rustApp.Exports().string_data_ptr(rustString);
    rustApp.MemUint8Array(addr, bytes.length).set(bytes);
    return rustString;
}

function RustString_delete(rustApp, rustString) {
    rustApp.Exports().string_delete(rustString);
}


const theRustApp = new RustApp();
WebAssembly.instantiate(new Uint8Array(buf), {
    env: {
        env_print_str: (s, len) => {
            console.log(theRustApp.GetString(s, len));
        }
    }
}).then((result) => {
    theRustApp.Init(result.instance);
    let rustString = RustString_new(theRustApp, "你好, Rust字符串 ");
    theRustApp.Exports().string_print(rustString);
})