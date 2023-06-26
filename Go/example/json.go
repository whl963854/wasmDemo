package main

import (
	"encoding/json"
	"fmt"
	"syscall/js"
	"time"
)

func main() {
	fmt.Println("Hello WebAssembly!")
	//注册为全局变量
	js.Global().Set("prettyJSON", jsonWrapper())
	<-make(chan bool)
}

func prettyJson(input string) (string, error) {
	start := time.Now()
	var raw interface{}
	if err := json.Unmarshal([]byte(input), &raw); err != nil {
		return "", err
	}
	pretty, err := json.MarshalIndent(raw, "", " ")
	if err != nil {
		return "", err
	}
	cost := time.Since(start)
	fmt.Println("wasm json耗时: ", cost)
	return string(pretty), nil
}

// 将Go函数封装并返回js.Func对象，才可以被js所调用
func jsonWrapper() js.Func {
	jsonFunc := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) != 1 {
			return "Invalid no of arguments passed"
		}
		inputJSON := args[0].String()
		// fmt.Printf("input %s\n", inputJSON)
		pretty, err := prettyJson(inputJSON)
		if err != nil {
			fmt.Printf("unable to convert to json %s\n", err)
			return err.Error()
		}
		return pretty
	})
	return jsonFunc
}
