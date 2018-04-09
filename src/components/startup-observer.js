const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "FileUtils", "resource://gre/modules/FileUtils.jsm");


// Module specific constants
const kMODULE_NAME = "Startup";
const kMODULE_CONTRACTID = "@i2bb.net/startup-observer;1";
const kMODULE_CID = Components.ID("06322def-dead-babe-aef6-47ae8e799629");

function StartupObserver() {
  var env = Cc["@mozilla.org/process/environment;1"].getService(Ci.nsIEnvironment);

  let ppmm = Cc["@mozilla.org/parentprocessmessagemanager;1"].getService(Ci.nsIProcessScriptLoader);
    ppmm.loadProcessScript("resource://i2pctrl/components/content-policy.js", true);
    ppmm.loadProcessScript("resource://i2pctrl/components/aboutI2P.js", true);

}

StartupObserver.prototype = {

  observe: function(subject, topic, data) {
    if(topic == "profile-after-change") {
      // Bootstrap
      console.log('WOHO!!! BOOOTSTRAPPPING')
    }
  },
  QueryInterface: function(iid) {
    if (iid.equals(Ci.nsISupports)) {
        return this;
    }
    if(iid.equals(Ci.nsIClassInfo)) {
      return this;
    }
    return this;
  },

  // method of nsIClassInfo
  classDescription: "I2PCtrl Startup Observer",
  classID: kMODULE_CID,
  contractID: kMODULE_CONTRACTID,

  // Hack to get us registered early to observe recovery
  _xpcom_categories: [{category:"profile-after-change"}],

  getInterfaces: function(count) {
    var interfaceList = [nsIClassInfo];
    count.value = interfaceList.length;
    return interfaceList;
  },
  getHelperForLanguage: function(count) { return null; }
};

let NSGetFactory = XPCOMUtils.generateNSGetFactory([StartupObserver]);
