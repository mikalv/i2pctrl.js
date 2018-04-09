/**
 * Loader for the extension
 */
const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;
const Cr = Components.results;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/Console.jsm");

let EXPORTED_SYMBOLS = [ "I2GlueLoader" ];


const kLogString = { 1:"VERB", 2:"DBUG", 3: "INFO", 4:"NOTE", 5:"WARN" };

let I2GlueLoader = Loader({
  globals: {
    console: {
      log: dump.bind(dump, 'log: '),
      info: dump.bind(dump, 'info: '),
      warn: dump.bind(dump, 'warn: '),
      error: dump.bind(dump, 'error: ')
    }
  }
});
