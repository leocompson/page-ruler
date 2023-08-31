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
  "action": {
    "storage": function (changes, namespace) {
      /*  */
    },
    "button": function () {
      app.tab.query.active(function (tab) {
        config.addon.state[tab.id] = config.addon.state[tab.id] === "ON" ? "OFF" : "ON";
        /*  */
        core.action.page.ruler(tab);
      });
    },
    "tab": {
      "removed": function (tabId) {
        delete config.addon.state[tabId];
      },
      "updated": function (tab) {
        config.addon.state[tab.id] = "OFF";
        app.button.icon(tab.id, config.addon.state[tab.id]);
      }
    },
    "page": {
      "button": function (e) {
        app.tab.query.active(function (tab) {
          app.button.icon(tab.id, e.icon);
        });
      },
      "escape": function (e) {
        app.tab.query.active(function (tab) {
          config.addon.state[tab.id] = e.state;
          /*  */
          core.action.page.ruler(tab);
        });
      },
      "ruler": function (tab) {
        if (tab) {
          if (tab.url) {
            const cond_1 = tab.url.indexOf("http") === 0;
            const cond_2 = tab.url.indexOf("file") === 0;
            /*  */
            if (cond_1 || cond_2) {
              app.button.icon(tab.id, config.addon.state[tab.id] !== undefined ? config.addon.state[tab.id] : "OFF");
              /*  */
              app.tab.inject.js({"target": {"tabId": tab.id}, "files": ["/data/content_script/inject.js"]}, function () {
                app.tab.inject.css({"target": {"tabId": tab.id}, "files": ["/data/content_script/inject.css"]}, function () {
                  if (config.timeout) clearTimeout(config.timeout);
                  config.timeout = setTimeout(function () {
                    app.page.send("colorful", {
                      "colorful": config.options.colorful
                    }, tab.id, null);
                    /*  */
                    app.page.send("rulermode", {
                      "colorful": config.options.colorful,
                      "state": config.addon.state[tab.id] !== undefined ? config.addon.state[tab.id] : "OFF"
                    }, tab.id, null);
                  }, 100);
                });
              });
            }
          }
        }
      }
    }
  }
};

app.options.receive("load", function () {
  app.options.send("storage", {
    "colorful": config.options.colorful
  });
});

app.options.receive("colorful", function (e) {
  config.options.colorful = e;
  /*  */
  app.page.send("colorful", {
    "colorful": config.options.colorful
  }, null, null);
  /*  */
  app.options.send("storage", {
    "colorful": config.options.colorful
  });
});

app.button.on.clicked(core.action.button);
app.tab.on.updated(core.action.tab.updated);
app.tab.on.removed(core.action.tab.removed);
app.page.receive("button", core.action.page.button);
app.page.receive("escape", core.action.page.escape);

app.on.startup(core.start);
app.on.installed(core.install);
app.on.storage(core.action.storage);
