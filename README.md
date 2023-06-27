# wasmDemo
## Go
```bash
├─compile_test              将Go编译为wasm
│  ├─go_wasi                Go编译wasi（实验）
│  ├─go_wasm                Go编译
│  └─tinygo_wasm            TinyGo编译
├─example                   Go示例
├─linearMemory              线性内存
└─WASM_and_GO_interact      wasm和go交互
    ├─Callback_functions    回调函数
    ├─Go_calls_JS           Go调用js代码
    ├─Go_DOM                Go实现DOM元素操作
    └─JS_calls_Go           js调用go函数
```
## Rust
```bash
├─hello                     将Rust编译为wasm
├─ImportAndExport           导入和导出函数
|  ├─main                   main函数
│  ├─print                  打印函数
│  └─user_define_function   用户自定义函数
├─no_std                    no_std
└─passingstring             字符串处理
    ├─command_line_arguments命令行参数封装与传递
    └─string                传递字符串参数

```

## Go_Rust
Go和Rust调用实例