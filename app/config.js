const fs = require('fs');
const { spawnSync } = require('child_process');
const onServer = !!process.env["DYNO"];
const homeDir = process.env["HOME"];

let wasmBindgenRoot;
if (!onServer) {
  wasmBindgenRoot = __dirname + '/../target';
  let opts = {stdio: 'inherit'};
  let ret = spawnSync('cargo', ['build', '--target=wasm32-unknown-unknown', '--release'], opts);
  if (ret.error)
    throw ret.error;
  if (ret.status !== 0)
    throw new Error('cargo failed')
} else {
  wasmBindgenRoot = homeDir + '/wasm-bindgen';
}
const deps = wasmBindgenRoot + '/wasm32-unknown-unknown/release/deps';
exports.wasmBindgenDeps = [deps, wasmBindgenRoot + '/release/deps'];
exports.cargoCmd = homeDir + '/.cargo/bin/cargo';
exports.rustcCmd = homeDir + '/.cargo/bin/rustc';
exports.wasmGCCmd = homeDir + '/.cargo/bin/wasm-gc';
exports.wasmBindgenCmd = homeDir + '/.cargo/bin/wasm-bindgen';
exports.rustfmtCmd = homeDir + '/.cargo/bin/rustfmt';
exports.rootDir = __dirname;
exports.tempDir = "/tmp";
