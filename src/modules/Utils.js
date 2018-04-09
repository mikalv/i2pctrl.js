// vim: set sw=2 sts=2 ts=8 et syntax=javascript:

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Cu = Components.utils;

let EXPORTED_SYMBOLS = [ "I2PLauncherUtil" ];

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "I2PLauncherLogger", "resource://i2pctrl/modules/I2PLogger.jsm");

const COMMONJS_URI = 'resource://gre/modules/commonjs';
const { require } = Cu.import(COMMONJS_URI + '/toolkit/require.js', {});

var child_process = require('sdk/system/child_process');

function triggerJavaCli(java_home) {
  const jExec = java_home+'/bin/java'
  console.log(`jExec = ${jExec}`);
  let jProcess = child_process.spawn(jExec, ['-version']);
  jProcess.stdout.on('data', function (sdata) {
    console.log('java stdout: ' + sdata);
  });
  jProcess.stderr.on('data', function (sdata) {
    console.log('java stderr: ' + sdata);
  });
  jProcess.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
}

function detectJavaOnMacOSX() {
  var osxFindJRE = child_process.spawn('/usr/libexec/java_home');

  osxFindJRE.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
    triggerJavaCli(data.replace('\n',''));
  });

  osxFindJRE.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  osxFindJRE.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
}

function isMacOSX() {
  const xr = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULRuntime);
  return (xr.OS==='Darwin');
}

function isWindows() {
  const xr = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULRuntime);
  return (xr.OS==='Windows');
}

