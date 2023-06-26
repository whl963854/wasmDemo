package main

import (
	"fmt"
	"io/ioutil"

	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

func main() {
	// 换成生成add.wasm的路径
	wasmBytes, _ := ioutil.ReadFile("./target/wasm32-unknown-unknown/release/add.wasm")

	// Create an Engine
	engine := wasmer.NewEngine()

	// Create a Store
	store := wasmer.NewStore(engine)

	// Let's compile the module.
	module, err := wasmer.NewModule(store, wasmBytes)

	if err != nil {
		fmt.Println("Failed to compile module:", err)
	}

	// Create an empty import object.
	importObject := wasmer.NewImportObject()

	// Let's instantiate the WebAssembly module.
	instance, err := wasmer.NewInstance(module, importObject)

	if err != nil {
		panic(fmt.Sprintln("Failed to instantiate the module:", err))
	}

	// Now let's execute the `sum` function.
	sum, err := instance.Exports.GetFunction("sum")

	if err != nil {
		panic(fmt.Sprintln("Failed to get the `add_one` function:", err))
	}

	result, err := sum(1, 2)

	if err != nil {
		panic(fmt.Sprintln("Failed to call the `add_one` function:", err))
	}

	fmt.Println("Results of `sum`:", result)
}
