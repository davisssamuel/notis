# Installing Rust on the VM
* curl --proto '=https' --tlsv1.3 https://sh.rustup.rs -sSf | sh
* select 1 to proceed with the installation
* source $HOME/.cargo/env
* rustc --version (verify installation)
* sudo apt update
* sudo apt upgrade
* sudo apt install build-essential
* mkdir rustprojects (temporary folder for testing)
* cd rustprojects
* mkdir testdir
* cd testdir
* nano test.rs
* insert into the file:
```
fn main() {
    println!("Hello World");
}
```
* save the file and exit
* compile using rustc test.rs
* run by using ./test
# Useful Commands
* rustup update