// vim: set sw=2 sts=2 ts=8 et syntax=javascript:

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Cu = Components.utils;

// ctypes can be disabled at build time
try { Cu.import("resource://gre/modules/ctypes.jsm"); } catch(e) {}
Cu.import("resource://gre/modules/XPCOMUtils.jsm");



XPCOMUtils.defineLazyModuleGetter(this, "I2PLogger", "resource://i2pctrl/modules/I2PLogger.jsm");

function I2PProcessService()
{
  this.wrappedJSObject = this;
  //this.mProtocolSvc = Cc["@i2bb.net/i2pctrl-protocol-service;1"].getService(Ci.nsISupports).wrappedJSObject;
}


I2PProcessService.prototype =
{
  kContractID : "@i2bb.net/i2pctrl-process-service;1",
  kServiceName : "I2P Process Service",
  kClassID: Components.ID("{FE7B4CAF-CAFE-DEAD-BABE-EFA66C9AFDA1}"),
  kI2PLauncherExtPath: "i2pctrl@i2bb.net", // This could vary.

  kPrefPromptAtStartup: "extensions.i2pctrl.prompt_at_startup",
  kPrefDefaultBridgeType: "extensions.i2pctrl.default_bridge_type",

  kWizardProgressPageID: "progress",

  kInitialControlConnDelayMS: 25,
  kMaxControlConnRetryMS: 500,
  kControlConnTimeoutMS: 30000, // Wait at most 30 seconds for I2P to start.

  kStatusUnknown: 0, // I2P process status.
  kStatusStarting: 1,
  kStatusRunning: 2,
  kStatusExited: 3,  // Exited or failed to start.


  kI2PProcessDidNotStartTopic: "I2PProcessDidNotStart",
  kI2PBootstrapErrorTopic: "I2PBootstrapError",

  // nsISupports implementation.
  QueryInterface: function(aIID)
  {
    if (!aIID.equals(Ci.nsISupports) &&
        !aIID.equals(Ci.nsIFactory) &&
        !aIID.equals(Ci.nsIObserver) &&
        !aIID.equals(Ci.nsIClassInfo))
    {
      throw Cr.NS_ERROR_NO_INTERFACE;
    }

    return this;
  },

  // nsIFactory implementation.
  createInstance: function(aOuter, aIID)
  {
    if (null != aOuter)
      throw Cr.NS_ERROR_NO_AGGREGATION;

    return this.QueryInterface(aIID);
  },

  lockFactory: function(aDoLock) {},

  // nsIObserver implementation.
  observe: function(aSubject, aTopic, aParam) {},


  canUnload: function(aCompMgr) { return true; },

  // nsIClassInfo implementation.
  getInterfaces: function(aCount)
  {
    var iList = [ Ci.nsISupports,
                  Ci.nsIFactory,
                  Ci.nsIObserver,
                  Ci.nsIClassInfo ];
    aCount.value = iList.length;
    return iList;
  },

  getHelperForLanguage: function (aLanguage) { return null; },

  contractID: this.kContractID,
  classDescription: this.kServiceName,
  classID: this.kClassID,
  implementationLanguage: Ci.nsIProgrammingLanguage.JAVASCRIPT,
  flags: Ci.nsIClassInfo.DOM_OBJECT,

  // nsIFactory implementation.
  createInstance: function (aOuter, aIID)
  {
    if (null != aOuter)
      throw Cr.NS_ERROR_NO_AGGREGATION;

    return this.QueryInterface(aIID);
  },

  lockFactory: function (aDoLock) {},

  _startI2P: function()
  {
    //
    //var p = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
  },

  _quitApp: function()
  {
    try
    {
      this.mQuitSoon = false;

      var asSvc = Cc["@mozilla.org/toolkit/app-startup;1"]
                    .getService(Ci.nsIAppStartup);
      var flags = asSvc.eAttemptQuit;
      asSvc.quit(flags);
    }
    catch (e)
    {
      I2PLogger.safelog(4, "unable to quit", e);
    }
  },

}


var gI2PProcessService = new I2PProcessService;


// TODO: Mark wants to research use of XPCOMUtils.generateNSGetFactory
// Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
function NSGetFactory(aClassID)
{
  if (!aClassID.equals(gI2PProcessService.kClassID))
    throw Cr.NS_ERROR_FACTORY_NOT_REGISTERED;

  return gI2PProcessService;
}

