package main

// 创建一个字节（uint8，而不是Go字节）缓冲区，该缓冲区将在Wasm Memory中可用。
// 然后我们可以与JS和Wasm共享这个缓冲区。
const BUFFER_SIZE int = 2

var buffer [BUFFER_SIZE]uint8

func main() {}

// 函数返回指向我们在wasm内存中的缓冲区的指针（索引）
// export getWasmMemoryBufferPointer
func getWasmMemoryBufferPointer() *[BUFFER_SIZE]uint8 {
	return &buffer
}

// 函数将传递的值存储在索引0处，
// 在我们的缓冲区中
// go:export storeValueInWasmMemoryBufferIndexZero
func storeValueInWasmMemoryBufferIndexZero(value uint8) {
	buffer[0] = value
}

// 函数从我们的缓冲区的索引1处读取
// 并返回该索引处的值
// go:export readWasmMemoryBufferAndReturnIndexOne
func readWasmMemoryBufferAndReturnIndexOne() uint8 {
	return buffer[1]
}
