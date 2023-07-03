use std::thread;
use std::time::Duration;


fn main(){
    println!("开始阻塞");
    thread::sleep(Duration::from_secs(20));
    println!("阻塞结束");
}
