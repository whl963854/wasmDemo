const fs = require('fs');
//readFileSync文件读取会阻塞代码的执行，直到读取完成
const buf = fs.readFileSync('./target/wasm32-unknown-unknown/debug/main.wasm');
WebAssembly.instantiate(new Uint8Array(buf)).then(function(result) {
    console.dir(result.instance.exports);
});