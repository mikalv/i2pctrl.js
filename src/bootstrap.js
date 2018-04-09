const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;
const Cr = Components.results;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/Extension.jsm");
Cu.import("resource://gre/modules/Console.jsm");

const chromeModulesPath = 'chrome://i2pctrl/content/';

const { Loader, Require, unload } = Components.utils.import('resource://gre/modules/commonjs/toolkit/loader.js');

let observerService = Cc['@mozilla.org/observer-service;1'].getService(Ci.nsIObserverService);

let EXPORTED_SYMBOLS = ['startup','shutdown','install','uninstall'];


function startup(data,reason) {
  const resProt = Services.io.getProtocolHandler("resource").QueryInterface(Components.interfaces.nsIResProtocolHandler);

}
function shutdown(data,reason) {
  /*
  if (reason == APP_SHUTDOWN)
        return;
  */
}
function install(data,reason) { }
function uninstall(data,reason) { }

