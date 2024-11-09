if (!background) {
  var background = (function () {
    let tmp = {};
    /*  */
    chrome.runtime.onMessage.addListener(function (request) {
      for (let id in tmp) {
        if (tmp[id] && (typeof tmp[id] === "function")) {
          if (request.path === "background-to-page") {
            if (request.method === id) {
              tmp[id](request.data);
            }
          }
        }
      }
    });
    /*  */
    return {
      "receive": function (id, callback) {
        tmp[id] = callback;
      },
      "send": function (id, data) {
        chrome.runtime.sendMessage({
          "method": id, 
          "data": data,
          "path": "page-to-background"
        }, function () {
          return chrome.runtime.lastError;
        });
      }
    }
  })();

  var config = {
    "page": {
      "scroll": {
        "x": null, 
        "y": null
      }
    },
    "options": {
      "scroll": false,
      "linear": false,
      "colorful": false,
      "circular": false,
      "grayscale": true
    },
    "action": {
      "rulermode": function (e) {
        config.ruler[e.state === "ON" ? "show" : "hide"]();
      },
      "placement": function (e) {
        config.options.scroll = e.scroll;
        config.options.linear = e.linear;
        config.options.colorful = e.colorful;
        config.options.circular = e.circular;
        config.options.grayscale = e.grayscale;
      },
      "scroll": function () {
        if (config.options.scroll) {
          if (config.ruler.element.rect && config.ruler.element.circle) {
            config.ruler.element.circle.style.top = ((config.ruler.scroll.y + (config.ruler.start.y - config.ruler.radius)) + (config.page.scroll.y - window.scrollY)) + "px";
            config.ruler.element.circle.style.left = ((config.ruler.scroll.x + (config.ruler.start.x - config.ruler.radius)) + (config.page.scroll.x - window.scrollX)) + "px";
            /*  */
            config.ruler.element.rect.style.top = ((config.ruler.scroll.y + (config.ruler.current.y < config.ruler.start.y ? config.ruler.current.y : config.ruler.start.y)) + (config.page.scroll.y - window.scrollY)) + "px";
            config.ruler.element.rect.style.left = ((config.ruler.scroll.x + (config.ruler.current.x < config.ruler.start.x ? config.ruler.current.x : config.ruler.start.x)) + (config.page.scroll.x - window.scrollX)) + "px";
          }
        }
      }
    },
    "ruler": {
      "x": null,
      "y": null,
      "element": {},
      "width": null,
      "height": null,
      "radius": null,
      "action": true,
      "active": false,
      "status": false,
      "start": {
        "x": null, 
        "y": null
      },
      "scroll": {
        "x": null, 
        "y": null
      },
      "current": {
        "x": null, 
        "y": null
      },
      "keydown": function (e) {
        e.stopPropagation();
        if (e.cancelable) e.preventDefault();
        /*  */
        if (e.key === "Escape") background.send("escape", {"state": "OFF"});
        /*  */
        if (e.key === "ArrowUp") config.ruler.input.move({"stepX": 0, "stepY": -1, "type": "keydown"});
        if (e.key === "ArrowDown") config.ruler.input.move({"stepX": 0, "stepY": +1, "type": "keydown"});
        if (e.key === "ArrowLeft") config.ruler.input.move({"stepX": -1, "stepY": 0, "type": "keydown"});
        if (e.key === "ArrowRight") config.ruler.input.move({"stepX": +1, "stepY": 0, "type": "keydown"});
      },
      "build": function () {
        config.ruler.element.rect = document.createElement("div");
        config.ruler.element.circle = document.createElement("div");
        config.ruler.element.container = document.createElement("div");
        config.ruler.element.section = document.createElement("section");
        /*  */
        config.ruler.element.circle.className = "rulermode-circle";
        config.ruler.element.rect.className = "rulermode-rectangle";
        config.ruler.element.container.className = "rulermode-container";
        /*  */
        document.body.appendChild(config.ruler.element.container);
        document.body.appendChild(config.ruler.element.circle);
        document.body.appendChild(config.ruler.element.rect);
      },
      "info": {
        "remove": function () {
          background.send("button", {"icon": "OFF"});
          let target = document.querySelector(".rulermode-info");
          if (target) target.remove();
        },
        "add": function () {
          background.send("button", {"icon": "ON"});
          config.ruler.element.info = document.createElement("div");
          /*  */
          config.ruler.element.info.textContent = "Ruler mode...";
          config.ruler.element.info.className = "rulermode-info";
          /*  */
          document.body.appendChild(config.ruler.element.info);
        }
      },
      "hide": function () {
        config.ruler.info.remove();
        /*  */
        if (config.ruler.element.rect) config.ruler.element.rect.remove();
        if (config.ruler.element.circle) config.ruler.element.circle.remove();
        if (config.ruler.element.container) config.ruler.element.container.remove();
        /*  */
        document.removeEventListener("mouseup", config.ruler.input.end);
        document.removeEventListener("mousemove", config.ruler.input.move);
        document.removeEventListener("mousedown", config.ruler.input.init);
        /*  */
        document.removeEventListener("touchend", config.ruler.input.end);
        document.removeEventListener("touchmove", config.ruler.input.move);
        document.removeEventListener("touchstart", config.ruler.input.init);
        /*  */
        document.documentElement.removeAttribute("rulermode");
        window.removeEventListener("scroll", config.action.scroll);
        document.removeEventListener("keydown", config.ruler.keydown);
      },
      "show": function () {
        let target = document.querySelector(".rulermode-container");
        if (!target) {
          config.ruler.build();
          config.ruler.info.add();
          /*  */
          document.addEventListener("mouseup", config.ruler.input.end);
          document.addEventListener("mousemove", config.ruler.input.move);
          document.addEventListener("mousedown", config.ruler.input.init);
          /*  */
          document.addEventListener("touchend", config.ruler.input.end);
          document.addEventListener("touchmove", config.ruler.input.move);
          document.addEventListener("touchstart", config.ruler.input.init);
          /*  */
          document.documentElement.setAttribute("rulermode", '');
          window.addEventListener("scroll", config.action.scroll);
          document.addEventListener("keydown", config.ruler.keydown);
        }
      },
      "input": {
        "end": function (e) {
          if (e.cancelable) e.preventDefault();
          /*  */
          config.ruler.active = false;
        },
        "init": function (e) {
          if (e.cancelable) e.preventDefault();
          /*  */
          config.ruler.active = true;
          /*  */
          config.ruler.element.rect.style.width = 0;
          config.ruler.element.rect.style.height = 0;
          config.ruler.element.rect.textContent = '';
          config.ruler.element.rect.style.borderWidth = 0;
          /*  */
          config.ruler.element.circle.style.width = 0;
          config.ruler.element.circle.style.height = 0;
          config.ruler.element.circle.textContent = '';
          config.ruler.element.circle.style.borderWidth = 0;
          /*  */
          config.page.scroll.x = window.scrollX;
          config.page.scroll.y = window.scrollY;
          config.ruler.scroll.y = document.body.scrollTop;
          config.ruler.scroll.x = document.body.scrollLeft;
          config.ruler.start.x = (e.type === "touchstart" || e.type === "mousedown") ? (e.type.startsWith("mouse") ? e.clientX : (e.type.startsWith("touch") ? e.touches[0].clientX : 0)) : config.ruler.current.x + e.stepX;
          config.ruler.start.y = (e.type === "touchstart" || e.type === "mousedown") ? (e.type.startsWith("mouse") ? e.clientY : (e.type.startsWith("touch") ? e.touches[0].clientY : 0)) : config.ruler.current.y + e.stepY;
        },
        "move": function (e) {
          if (e.cancelable) e.preventDefault();
          /*  */
          const action = e.type === "keydown" || (config.ruler.active && (e.type === "touchmove" || e.type === "mousemove"));
          if (action) {
            if (config.ruler.element.rect && config.ruler.element.circle) {
              const args = {
                "top": 0,
                "left": 0,
                "text": {},
                "width": 0,
                "height": 0,
                "center": {},
                "metrics": {},
                "inrange": {},
                "placement": ''
              };
              /*  */
              args.text.width = 110;
              args.text.height = 32;
              args.text.spacing = 3;
              args.text.adjustment = 1;
              /*  */
              args.center.condition = {};
              args.center.container = {};
              args.center.placement = {};
              /*  */
              args.text.a = document.createElement("div");
              args.text.b = document.createElement("div");
              args.text.c = document.createElement("div");
              args.text.d = document.createElement("div");
              args.text.e = document.createElement("div");
              args.text.f = document.createElement("div");
              /*  */
              config.ruler.element.rect.style.display = "none";
              config.ruler.element.circle.style.display = "none";
              config.ruler.element.rect.removeAttribute("visible");
              config.ruler.element.rect.removeAttribute("position");
              config.ruler.element.rect.removeAttribute("placement");
              config.ruler.element.circle.removeAttribute("visible");
              config.ruler.element.circle.removeAttribute("placement");
              config.ruler.element.rect.style.backgroundImage = "unset";
              config.ruler.element.circle.style.backgroundImage = "unset";
              /*  */
              config.ruler.current.x = (e.type === "touchmove" || e.type === "mousemove") ? (e.type.startsWith("mouse") ? e.clientX : (e.type.startsWith("touch") ? e.touches[0].clientX : 0)) : config.ruler.current.x + e.stepX;
              config.ruler.current.y = (e.type === "touchmove" || e.type === "mousemove") ? (e.type.startsWith("mouse") ? e.clientY : (e.type.startsWith("touch") ? e.touches[0].clientY : 0)) : config.ruler.current.y + e.stepY;
              config.ruler.width = Math.abs(config.ruler.start.x - config.ruler.current.x);
              config.ruler.height = Math.abs(config.ruler.start.y - config.ruler.current.y);
              config.ruler.radius = Math.sqrt(config.ruler.width ** 2 + config.ruler.height ** 2);
              /*  */
              args.inrange.sx = (config.ruler.start.x > (args.text.width + args.text.spacing)) && (config.ruler.current.x > (args.text.width + args.text.spacing));
              args.inrange.sy = (config.ruler.start.y > (args.text.height * 2 + args.text.spacing)) && (config.ruler.current.y > (args.text.height * 2 + args.text.spacing));
              args.inrange.ex = (config.ruler.start.x < (window.innerWidth - (args.text.width + args.text.spacing))) && (config.ruler.current.x < (window.innerWidth - (args.text.width + args.text.spacing)));
              args.inrange.ey = (config.ruler.start.y < (window.innerHeight - (args.text.height * 2 + args.text.spacing))) && (config.ruler.current.y < (window.innerHeight - (args.text.height * 2 + args.text.spacing)));
              /*  */
              args.width = config.ruler.width;
              args.height = config.ruler.height;
              args.top = config.ruler.scroll.y + (config.ruler.current.y < config.ruler.start.y ? config.ruler.current.y : config.ruler.start.y);
              args.left = config.ruler.scroll.x + (config.ruler.current.x < config.ruler.start.x ? config.ruler.current.x : config.ruler.start.x);
              args.placement = config.options.colorful ? "colorful" : (config.options.grayscale ? "grayscale" : (config.options.circular ? "circular" : (config.options.linear ? "linear" : "default")));
              /*  */
              args.center.container.x = (config.ruler.start.x + config.ruler.current.x) / 2;
              args.center.container.y = (config.ruler.start.y + config.ruler.current.y) / 2;
              args.center.condition.w = args.width > (args.text.width * 2 + 2 * args.text.adjustment);
              args.center.condition.h = args.height > (args.text.height * 3 + 4 * args.text.adjustment);
              args.center.placement.x = args.center.condition.w && args.center.condition.h ? args.center.container.x - args.text.width - args.text.spacing : (args.center.container.x + (window.innerWidth / 2 - args.text.width - args.text.spacing)) / 2;
              args.center.placement.y = args.center.condition.w && args.center.condition.h ? args.center.container.y - (args.text.height * 3) / 2 - args.text.spacing : (args.center.container.y + (window.innerHeight / 2 - (args.text.height * 3) / 2 - args.text.spacing)) / 2;
              /*  */
              args.metrics.a = (args.width + args.text.width) + "px";
              args.metrics.b = (args.height + args.text.height) + "px";
              args.metrics.c = (args.width - args.text.adjustment) + "px";
              args.metrics.d = (args.height - args.text.adjustment) + "px";
              args.metrics.e = (args.text.width + args.text.adjustment) + "px";
              args.metrics.f = (args.text.height + args.text.adjustment) + "px";
              args.metrics.g = -1 * (args.text.width + args.text.spacing) + "px";
              args.metrics.h = -1 * (args.text.height + args.text.spacing) + "px";
              args.metrics.i = (args.width - args.text.spacing - args.text.width) + "px";
              args.metrics.j = -1 * (args.text.height + args.text.adjustment) + "px";
              args.metrics.k = (args.width + args.text.width + args.text.adjustment) + "px";
              args.metrics.l = (args.height + args.text.height - args.text.adjustment) + "px";
              args.metrics.m = (args.height - args.text.height * 1 - args.text.spacing) + "px";
              args.metrics.n = (args.height - args.text.height * 2 - args.text.spacing) + "px";
              args.metrics.o = (args.height - args.text.height * 3 - args.text.spacing) + "px";
              args.metrics.p = (args.height - args.text.height * 4 - args.text.spacing) + "px";
              args.metrics.q = (args.height + args.text.height * 2 - args.text.adjustment) + "px";
              args.metrics.r = (args.height + args.text.height * 2 + args.text.adjustment) + "px";
              args.metrics.s = (args.height - args.text.height * 3 - args.text.adjustment) + "px";
              args.metrics.t = (args.height + args.text.height * 3 - args.text.adjustment) + "px";
              args.metrics.u = (args.height - args.text.height * 1 - args.text.adjustment) + "px";
              args.metrics.v = (args.height - args.text.height * 2 - args.text.adjustment) + "px";
              args.metrics.w = (args.width / 2 - (args.text.width / 2) - args.text.adjustment) + "px";
              args.metrics.x = (args.width - args.text.width - args.text.spacing - args.text.adjustment) + "px";
              args.metrics.y = (args.height / 2 - (args.text.height / 2) - 2 * args.text.adjustment) + "px";
              args.metrics.z = (args.height - args.text.height - args.text.spacing - args.text.adjustment) + "px";
              args.metrics.aa = (args.height - args.text.height * 1 - args.text.spacing - args.text.adjustment) + "px";
              args.metrics.bb = (args.height - args.text.height * 2 - args.text.spacing - args.text.adjustment) + "px";
              /*  */
              config.ruler.element.circle.style.borderWidth = "1px";
              config.ruler.element.circle.setAttribute("placement", args.placement);
              config.ruler.element.circle.style.width = (2 * config.ruler.radius) + "px";
              config.ruler.element.circle.style.height = (2 * config.ruler.radius) + "px";
              config.ruler.element.circle.style.top = (config.ruler.scroll.y + (config.ruler.start.y - config.ruler.radius)) + "px";
              config.ruler.element.circle.style.left = (config.ruler.scroll.x + (config.ruler.start.x - config.ruler.radius)) + "px";
              /*  */
              config.ruler.element.rect.style.borderWidth = "1px";
              config.ruler.element.rect.style.width = args.width + "px";
              config.ruler.element.rect.style.height = args.height + "px";
              config.ruler.element.rect.setAttribute("placement", args.placement);
              config.ruler.element.rect.style.top = (config.ruler.scroll.y + (config.ruler.current.y < config.ruler.start.y ? config.ruler.current.y : config.ruler.start.y)) + "px";
              config.ruler.element.rect.style.left = (config.ruler.scroll.x + (config.ruler.current.x < config.ruler.start.x ? config.ruler.current.x : config.ruler.start.x)) + "px";
              /*  */
              if (config.options.grayscale) {
                config.render.grayscale(args);
              } else if (config.options.colorful) {
                config.render.colorful(args);
              } else if (config.options.circular) {
                config.render.circular(args);
              } else if (config.options.linear) {
                config.render.linear(args);
              } else {
                /*  */
              }
            }
          }
        }
      }
    }
  };
  /*  */
  background.receive("rulermode", config.action.rulermode);
  background.receive("placement", config.action.placement);
}
