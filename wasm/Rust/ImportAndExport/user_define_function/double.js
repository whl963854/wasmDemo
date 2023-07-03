const fs = require('fs');
const buf = fs.readFileSync('./target/wasm32-unknown-unknown/debug/double.wasm');
WebAssembly.instantiate(new Uint8Array(buf)).then(function(result) {
    const double = (i) => {
        return result.instance.exports.double(i);
    }
    for (let i = 0; i < 5; i++) {
        console.log(double(i));
    }
});