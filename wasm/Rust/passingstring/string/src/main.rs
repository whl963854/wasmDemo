extern "C" {
    fn env_print_str(s: *const u8, len: usize);
}
#[no_mangle]
pub fn string_new(size: usize) -> *mut String {
    Box::into_raw(Box::new(String::from("\0").repeat(size)))
}

#[no_mangle]
pub fn string_delete(ptr: *mut String) {
    if ptr.is_null() {
        return;
    }
    unsafe {
        Box::from_raw(ptr);
    }
}
#[no_mangle]
pub fn string_data_ptr(ptr: *mut String) -> *mut u8 {
    let me = unsafe {
        assert!(!ptr.is_null());
        &mut *ptr
    };
    return me.as_mut_ptr();
}

#[no_mangle]
pub fn string_print(ptr: *mut String) {
    let me = unsafe {
        assert!(!ptr.is_null());
        &mut *ptr
    };
    unsafe {
        env_print_str(me.as_ptr(), me.len());
    }
}

fn main() {
    let s = "你好, WebAssembly!";
    unsafe {
        env_print_str(s.as_ptr(), s.len());
    }
}