var config = {};

config.timeout = null;
config.addon = {"state": {}};

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.options = {
  set colorful (val) {app.storage.write("colorful", val)},
  get colorful () {return app.storage.read("colorful") !== undefined ? app.storage.read("colorful") : false}
};
