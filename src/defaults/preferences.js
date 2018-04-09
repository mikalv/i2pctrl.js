
// debug prefs
pref("extensions.i2pctrl.loglevel",4);  // 1=verbose, 2=debug, 3=info, 4=note, 5=warn
pref("extensions.i2pctrl.logmethod",1); // 0=stdout, 1=errorconsole, 2=debuglog

pref("extensions.i2pctrl.start_i2p", true);
pref("extensions.i2pctrl.prompt_at_startup", true);
pref("extensions.i2pctrl.max_i2p_log_entries", 1000);


// The i2p_path is relative to the application directory. On Linux and
// Windows this is the Browser/ directory that contains the firefox
// executables, and on Mac OS it is the I2PBrowser.app directory.
pref("extensions.i2pctrl.i2p_path", "");

