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
    "options": {
      "load": function () {
        app.options.send("storage", {
          "scroll": config.options.scroll,
          "linear": config.options.linear,
          "colorful": config.options.colorful,
          "circular": config.options.circular,
          "grayscale": config.options.grayscale
        });
      },
      "store": function (e) {
        config.options.scroll = e.scroll;
        config.options.linear = e.linear;
        config.options.colorful = e.colorful;
        config.options.circular = e.circular;
        config.options.grayscale = e.grayscale;
        /*  */
        app.options.send("storage", {
          "scroll": config.options.scroll,
          "linear": config.options.linear,
          "colorful": config.options.colorful,
          "circular": config.options.circular,
          "grayscale": config.options.grayscale
        });
        /*  */
        app.page.send("placement", {
          "scroll": config.options.scroll,
          "linear": config.options.linear,
          "colorful": config.options.colorful,
          "circular": config.options.circular,
          "grayscale": config.options.grayscale
        }, null, null);
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
              app.tab.inject.js({
                "target": {
                  "tabId": tab.id
                }, 
                "files": [
                  "/data/content_script/inject.js",
                  "/data/content_script/resources/render.js"
                ]
              }, function () {
                app.tab.inject.css({
                  "target": {
                    "tabId": tab.id
                  }, "files": [
                    "/data/content_script/inject.css"
                  ]
                }, function () {
                  if (config.timeout) clearTimeout(config.timeout);
                  config.timeout = setTimeout(function () {
                    app.page.send("rulermode", {
                      "state": config.addon.state[tab.id] !== undefined ? config.addon.state[tab.id] : "OFF"
                    }, tab.id, null);
                    /*  */
                    app.page.send("placement", {
                      "scroll": config.options.scroll,
                      "linear": config.options.linear,
                      "colorful": config.options.colorful,
                      "circular": config.options.circular,
                      "grayscale": config.options.grayscale
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

app.button.on.clicked(core.action.button);

app.tab.on.updated(core.action.tab.updated);
app.tab.on.removed(core.action.tab.removed);

app.page.receive("button", core.action.page.button);
app.page.receive("escape", core.action.page.escape);

app.options.receive("load", core.action.options.load);
app.options.receive("store", core.action.options.store);

app.on.startup(core.start);
app.on.installed(core.install);
app.on.storage(core.action.storage);
