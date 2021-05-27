var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
  },
  "load": function () {
    app.tab.query.active(function (tab) {
      app.button.icon(tab.id, config.addon.state[tab.id] !== undefined ? config.addon.state[tab.id] : "OFF");
    });
  },
  "action": function () {
    app.tab.query.active(function (tab) {      
      if (tab) {
        app.button.icon(tab.id, config.addon.state[tab.id] !== undefined ? config.addon.state[tab.id] : "OFF");
        /*  */
        app.tab.inject.js(tab.id, {"file": "/data/content_script/inject.js"}, function () {
          app.tab.inject.css(tab.id, {"file": "/data/content_script/inject.css"}, function () {
            if (config.timeout) window.clearTimeout(config.timeout);
            config.timeout = window.setTimeout(function () {
              app.page.send("ruler-mode", {
                "state": config.addon.state[tab.id] !== undefined ? config.addon.state[tab.id] : "OFF"
              }, tab.id, null);
            }, 100);
          });
        });
      }
    });
  }
};

app.tab.on.removed(function (tabId) {
  delete config.addon.state[tabId];
});

app.tab.on.updated(function (info, tab) {
  config.addon.state[tab.id] = "OFF";
  app.button.icon(tab.id, config.addon.state[tab.id]);
});

app.button.on.clicked(function () {
  app.tab.query.active(function (tab) {
    config.addon.state[tab.id] = config.addon.state[tab.id] === "ON" ? "OFF" : "ON";
    /*  */
    core.action();
  });
});

app.page.receive("escape", function (e) {
  app.tab.query.active(function (tab) {
    config.addon.state[tab.id] = e.state;
    /*  */
    core.action();
  });
});

app.on.startup(core.start);
app.on.installed(core.install);
app.tab.on.activated(core.action);