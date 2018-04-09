//
// vim: set sw=2 sts=2 ts=8 et syntax=javascript:

/*************************************************************************
 * I2P Launcher Logger JS Module
 *
 * Allows loglevel-based logging to different logging mechanisms.
 *************************************************************************/

let EXPORTED_SYMBOLS = [ "I2PLauncherLogger" ];

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Cu = Components.utils;

const kLogString = { 1:"VERB", 2:"DBUG", 3: "INFO", 4:"NOTE", 5:"WARN" };

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "LauncherUtil", "resource://i2pctrl/modules/I2PLogger.jsm");


let I2PLauncherLogger = // Public
{
  formatLog: function(str, level)
  {
    var d = new Date();
    var logLevelStr = kLogString[level];
    if (!logLevelStr)
      logLevelStr = "-";
    var now = I2PLLoggerInternal.padInt(d.getUTCMonth() + 1) + "-" +
              I2PLLoggerInternal.padInt(d.getUTCDate()) + " " +
              I2PLLoggerInternal.padInt(d.getUTCHours()) + ":" +
              I2PLLoggerInternal.padInt(d.getUTCMinutes()) + ":" +
              I2PLLoggerInternal.padInt(d.getUTCSeconds());
    return "[" + now + "] I2PLauncher " + logLevelStr + ": " + str;
  },

  // error console log
  eclog: function(level, str)
  {
    switch (I2PLLoggerInternal.mLogMethod)
    {
      case 0: // stderr
        if (I2PLLoggerInternal.mLogLevel <= level)
          dump(this.formatLog(str, level) + "\n");
        break;

      default: // errorconsole
        if (I2PLLoggerInternal.mLogLevel <= level)
          I2PLLoggerInternal.mConsole.logStringMessage(this.formatLog(str,level));
        break;
    }
  },

  safelog: function(level, str, scrub)
  {
    if (I2PLLoggerInternal.mLogLevel < 4)
      this.eclog(level, str + scrub);
    else
      this.eclog(level, str + " [scrubbed]");
  },

  log: function(level, str)
  {
    switch (I2PLLoggerInternal.mLogMethod)
    {
      case 2: // debuglogger
        if (I2PLLoggerInternal.mDebugLog)
        {
          I2PLLoggerInternal.mDebugLog.log((6-level), this.formatLog(str,level));
          break;
        }
        // fallthrough

      case 0: // stderr
        if (I2PLLoggerInternal.mLogLevel <= level) 
          dump(this.formatLog(str,level) + "\n");
        break;

      default:
        dump("Bad log method: " + I2PLLoggerInternal.mLogMethod);
        // fallthrough

      case 1: // errorconsole
        if (I2PLLoggerInternal.mLogLevel <= level)
          I2PLLoggerInternal.mConsole.logStringMessage(this.formatLog(str,level));
        break;
    }
  },
};

Object.freeze(I2PLauncherLogger);


let I2PLLoggerInternal = // Private
{
  mLogLevel : 0,
  mLogMethod : 1,
  mDebugLog : false,
  mConsole : null,

  _init: function()
  {
    // Register observer
    var prefs = Cc["@mozilla.org/preferences-service;1"]
                  .getService(Ci.nsIPrefBranchInternal)
                  .QueryInterface(Ci.nsIPrefBranchInternal);
    prefs.addObserver("extensions.i2pctrl", this, false);

    this.mLogLevel = LauncherUtil.getIntPref("extensions.i2pctrl.loglevel", 0);
    this.mLogMethod = LauncherUtil.getIntPref("extensions.i2pctrl.logmethod", 1);

    // Get loggers.
    try
    {
      var logMngr = Cc["@mozmonkey.com/debuglogger/manager;1"]
                      .getService(Ci.nsIDebugLoggerManager); 
      this.mDebugLog = logMngr.registerLogger("i2pctrl");
    }
    catch (e)
    {
      this.mDebugLog = false;
    }

    this.mConsole = Cc["@mozilla.org/consoleservice;1"].getService(Ci.nsIConsoleService);

    I2PLauncherLogger.log(3, "debug output ready");
  },

  padInt: function(i)
  {
    return (i < 10) ? '0' + i : i;
  },

  // Pref Observer Implementation ////////////////////////////////////////////
  // topic:   what event occurred
  // subject: what nsIPrefBranch we're observing
  // data:    which pref has been changed (relative to subject)
  observe: function(subject, topic, data)
  {
    if (topic != "nsPref:changed") return;
    switch (data) {
      case "extensions.i2pctrl.logmethod":
        this.mLogMethod = LauncherUtil.getIntPref("extensions.i2pctrl.logmethod");
        break;
      case "extensions.i2pctrl.loglevel":
        this.mLogLevel = LauncherUtil.getIntPref("extensions.i2pctrl.loglevel");
        break;
    }
  }
};


I2PLLoggerInternal._init();

