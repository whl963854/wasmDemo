package main

import (
    "github.com/tetratelabs/wazero/experimental/sock"
)

func main() {

    ...

    // 创建一个新的配置对象
    config := sock.NewConfig()

    // 使用配置对象设置 TCP 监听器 目前不支持localhost
    config = config.WithTCPListener("127.0.0.1", 8080)

    ctx = sock.WithConfig(ctx, sockCfg)

    ...

}