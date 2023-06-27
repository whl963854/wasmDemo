// 在 wasm_exec_tiny.js 中定义。别忘了在 index.html 中添加这个脚本。
const go = new Go(); 

async function wasmBrowserInstantiate(wasmURL, importObject) {
    const response = await fetch(wasmURL);
    const wasmArrayBuffer = await response.arrayBuffer();
    const wasmModule = await WebAssembly.instantiate(wasmArrayBuffer, importObject);
    return wasmModule;
}
  
const runWasm = async () => {
    const importObject = go.importObject;

    // 实例化 wasm 模块
    const wasmModule = await wasmBrowserInstantiate("./main.wasm", importObject);

    // 在进行任何其他操作之前，必须先运行 go 实例，否则 println 等操作将不起作用
    go.run(wasmModule.instance);

    /**
    * 第一部分：在 Wasm 中写入，在 JS 中读取
    */
    console.log("在 Wasm 中写入，在 JS 中读取，索引为 0：");
    // 首先，让 wasm 写入我们的缓冲区
    wasmModule.instance.exports.storeValueInWasmMemoryBufferIndexZero(24);

    // 接下来，让我们创建一个指向我们的 wasm 内存的 Uint8Array
    let wasmMemory = new Uint8Array(wasmModule.instance.exports.memory.buffer);

    // 然后，让我们获取指向在 wasmMemory 中的缓冲区的指针
    let bufferPointer = wasmModule.instance.exports.getWasmMemoryBufferPointer();

    // 接着，让我们通过访问 wasmMemory[bufferPointer + bufferIndex] 的索引来读取缓冲区中索引为 0 的已写入的值
    // 应该输出 "24"
    console.log(wasmMemory[bufferPointer + 0]); 

    /**
    * 第二部分：在 JS 中写入，在 Wasm 中读取
    */
    console.log("在 JS 中写入，在 Wasm 中读取，索引为 1：");
    // 首先在缓冲区的索引 1 上写入值
    wasmMemory[bufferPointer + 1] = 15;

    // 然后，让 wasm 读取缓冲区中的索引 1，并返回结果
    // 应该输出 "15"
    console.log(
        wasmModule.instance.exports.readWasmMemoryBufferAndReturnIndexOne()
    ); 

};

runWasm();