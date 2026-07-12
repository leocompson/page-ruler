var config = {};

config.timeout = null;
config.addon = {"state": {}};

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.options = {
  set theme (val) {app.storage.write("theme", val)},
  set adjust (val) {app.storage.write("adjust", val)},
  set scroll (val) {app.storage.write("scroll", val)},
  set linear (val) {app.storage.write("linear", val)},
  set angular (val) {app.storage.write("angular", val)},
  set colorful (val) {app.storage.write("colorful", val)},
  set circular (val) {app.storage.write("circular", val)},
  set grayscale (val) {app.storage.write("grayscale", val)},
  //
  get theme () {return app.storage.read("theme") !== undefined ? app.storage.read("theme") : "light"},
  get adjust () {return app.storage.read("adjust") !== undefined ? app.storage.read("adjust") : true},
  get scroll () {return app.storage.read("scroll") !== undefined ? app.storage.read("scroll") : false},
  get linear () {return app.storage.read("linear") !== undefined ? app.storage.read("linear") : false},
  get angular () {return app.storage.read("angular") !== undefined ? app.storage.read("angular") : false},
  get colorful () {return app.storage.read("colorful") !== undefined ? app.storage.read("colorful") : false},
  get circular () {return app.storage.read("circular") !== undefined ? app.storage.read("circular") : false},
  get grayscale () {return app.storage.read("grayscale") !== undefined ? app.storage.read("grayscale") : true}
};
