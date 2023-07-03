package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Start")

	// 中间休息500秒
	time.Sleep(500 * time.Second)

	fmt.Println("End")
}
