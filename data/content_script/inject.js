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
    "options": {
      "colorful": false
    },
    "ruler": {
      "x": null,
      "y": null,
      "element": {},
      "width": null,
      "height": null,
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
      "build": function () {
        config.ruler.element.rect = document.createElement("div");
        config.ruler.element.container = document.createElement("div");
        config.ruler.element.section = document.createElement("section");
        /*  */
        config.ruler.element.rect.className = "rulermode-rectangle";
        config.ruler.element.container.className = "rulermode-container";
        /*  */
        document.body.appendChild(config.ruler.element.container);
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
          document.body.appendChild(config.ruler.element.info);
        }
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
      "hide": function () {
        config.ruler.info.remove();
        /*  */
        if (config.ruler.element.rect) config.ruler.element.rect.remove();
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
          config.ruler.scroll.y = document.body.scrollTop;
          config.ruler.scroll.x = document.body.scrollLeft;
          config.ruler.start.x = (e.type === "touchstart" || e.type === "mousedown") ? (e.type.startsWith("mouse") ? e.clientX : (e.type.startsWith("touch") ? e.touches[0].clientX : 0)) : config.ruler.current.x + e.stepX;
          config.ruler.start.y = (e.type === "touchstart" || e.type === "mousedown") ? (e.type.startsWith("mouse") ? e.clientY : (e.type.startsWith("touch") ? e.touches[0].clientY : 0)) : config.ruler.current.y + e.stepY;
        },
        "move": function (e) {
          if (e.cancelable) e.preventDefault();
          /*  */
          let action = e.type === "keydown" || (config.ruler.active && (e.type === "touchmove" || e.type === "mousemove"));
          if (action) {
            if (config.ruler.element.rect) {
              config.ruler.element.rect.removeAttribute("visible");
              config.ruler.element.rect.removeAttribute("colorful");
              /*  */
              config.ruler.current.x = (e.type === "touchmove" || e.type === "mousemove") ? (e.type.startsWith("mouse") ? e.clientX : (e.type.startsWith("touch") ? e.touches[0].clientX : 0)) : config.ruler.current.x + e.stepX;
              config.ruler.current.y = (e.type === "touchmove" || e.type === "mousemove") ? (e.type.startsWith("mouse") ? e.clientY : (e.type.startsWith("touch") ? e.touches[0].clientY : 0)) : config.ruler.current.y + e.stepY;
              /*  */
              config.ruler.width = Math.abs(config.ruler.start.x - config.ruler.current.x);
              config.ruler.height = Math.abs(config.ruler.start.y - config.ruler.current.y);
              /*  */
              let text = {};
              let inrange = {};
              let width = config.ruler.width;
              let height = config.ruler.height;
              let top = config.ruler.scroll.y + (config.ruler.current.y < config.ruler.start.y ? config.ruler.current.y : config.ruler.start.y);
              let left = config.ruler.scroll.x + (config.ruler.current.x < config.ruler.start.x ? config.ruler.current.x : config.ruler.start.x);
              /*  */
              text.width = 110;
              text.height = 32;
              text.spacing = 3;
              text.adjustment = 1;
              /*  */
              config.ruler.element.rect.style.top = top + "px";
              config.ruler.element.rect.style.left = left + "px";
              config.ruler.element.rect.style.width = width + "px";
              config.ruler.element.rect.style.height = height + "px";
              config.ruler.element.rect.style.borderWidth = "1px";
              /*  */
              text.a = document.createElement("div");
              text.b = document.createElement("div");
              text.c = document.createElement("div");
              text.d = document.createElement("div");
              text.e = document.createElement("div");
              text.f = document.createElement("div");
              /*  */
              config.ruler.element.rect.setAttribute("colorful", config.options.colorful);
              /*  */
              if (config.options.colorful) {
                let center = {};
                /*  */
                center.condition = {};
                center.container = {};
                center.placement = {};
                /*  */
                inrange.sx = config.ruler.start.x > (text.width + text.spacing);
                inrange.sy = config.ruler.start.y > (text.height + text.spacing);
                inrange.ex = (config.ruler.current.x < (window.innerWidth - (text.width * 1)));
                inrange.ey = (config.ruler.current.y < (window.innerHeight - (text.height * 1)));
                /*  */
                center.condition.w = width > (text.width * 2 + 2 * text.adjustment);
                center.condition.h = height > (text.height * 3 + 4 * text.adjustment);
                center.container.x = (config.ruler.start.x + config.ruler.current.x) / 2;
                center.container.y = (config.ruler.start.y + config.ruler.current.y) / 2;
                center.placement.x = center.condition.w && center.condition.h ? center.container.x - text.width - text.spacing : (center.container.x + (window.innerWidth / 2 - text.width - text.spacing)) / 2;
                center.placement.y = center.condition.w && center.condition.h ? center.container.y - (text.height * 3) / 2 - text.spacing : (center.container.y + (window.innerHeight / 2 - (text.height * 3) / 2 - text.spacing)) / 2;
                /*  */
                const cond_0 = inrange.sx && inrange.sy && inrange.ex && inrange.ey;
                const cond_1 = width * height > 2 * text.width * text.height;
                const cond_2 = width > (2 * text.width) && (height > (text.height + 2 * text.adjustment));
                const cond_3 = height > (2 * text.height) && (width > (text.width + 2 * text.adjustment));
                const visible = cond_0 && cond_1 && (cond_2 || cond_3);
                /*  */
                text.c.setAttribute("box", '');
                text.d.setAttribute("box", '');
                text.e.setAttribute("end", '');
                text.f.setAttribute("end", '');
                text.a.setAttribute("start", '');
                text.b.setAttribute("start", '');
                config.ruler.element.rect.setAttribute("visible", visible);
                /*  */
                text.a.textContent = "(y) " + top + "px";
                text.b.textContent = "(x) " + left + "px";
                text.c.textContent = "(w) " + width + "px";
                text.d.textContent = "(h) " + height + "px";
                text.e.textContent = "(x) " + (left + width) + "px";
                text.f.textContent = "(y) " + (top + height) + "px";
                /*  */
                text.a.style.left = visible ? 0 : (center.placement.x + text.width + text.spacing) + "px";
                text.a.style.top = visible ? -1 * (text.height + text.spacing) + "px" : (center.placement.y) + "px";
                /*  */
                text.b.style.left = visible ? -1 * (text.width + text.spacing) + "px" : (center.placement.x) + "px";
                text.b.style.top = visible ? 0 : (center.placement.y) + "px";
                /*  */
                text.c.style.left = visible ? (width / 2 - (text.width / 2) - 2 * text.adjustment) + "px" : (center.placement.x) + "px";
                text.c.style.top = visible ? 0 : (center.placement.y + 1 * (text.height + text.spacing)) + "px";
                /*  */
                text.d.style.left = visible ? 0 : (center.placement.x + text.width + text.spacing) + "px";
                text.d.style.top = visible ? (height / 2 - (text.height / 2) - 2 * text.adjustment) + "px" : (center.placement.y + 1 * (text.height + text.spacing)) + "px";
                /*  */
                text.e.style.left = visible ? (width - text.adjustment) + "px" : (center.placement.x) + "px";
                text.e.style.top = visible ? (height - (text.height + text.spacing + text.adjustment)) + "px" : (center.placement.y + 2 * (text.height + text.spacing)) + "px";
                /*  */
                text.f.style.left = visible ? (width - (text.width + text.spacing + text.adjustment)) + "px" : (center.placement.x + text.width + text.spacing) + "px";
                text.f.style.top = visible ? (height - text.adjustment) + "px" : (center.placement.y + 2 * (text.height + text.spacing)) + "px";
                /*  */
                config.ruler.element.rect.textContent = '';
                config.ruler.element.section.textContent = '';
                /*  */
                if (visible) {
                  config.ruler.element.rect.appendChild(text.a);
                  config.ruler.element.rect.appendChild(text.b);
                  config.ruler.element.rect.appendChild(text.c);
                  config.ruler.element.rect.appendChild(text.d);
                  config.ruler.element.rect.appendChild(text.e);
                  config.ruler.element.rect.appendChild(text.f);
                } else {
                  config.ruler.element.section.appendChild(text.a);
                  config.ruler.element.section.appendChild(text.b);
                  config.ruler.element.section.appendChild(text.c);
                  config.ruler.element.section.appendChild(text.d);
                  config.ruler.element.section.appendChild(text.e);
                  config.ruler.element.section.appendChild(text.f);
                  /*  */
                  config.ruler.element.section.style.top = text.b.style.top;
                  config.ruler.element.section.style.left = text.b.style.left;
                  config.ruler.element.section.style.width = (text.width * 2 + text.spacing + text.adjustment + 1) + "px";
                  config.ruler.element.section.style.height = (text.height * 3 + 2 * text.spacing + text.adjustment + 1) + "px";
                  /*  */
                  config.ruler.element.rect.appendChild(config.ruler.element.section);
                }
              } else {
                const metrics = {};
                const cond_1 = width * height > 2 * text.width * text.height;
                const cond_2 = width > (2 * text.width) && (height > (text.height + 2 * text.adjustment));
                const cond_3 = height > (2 * text.height) && (width > (text.width + 2 * text.adjustment));
                const visible = cond_1 && (cond_2 || cond_3);
                /*  */
                text.a.textContent = "(y) " + top + "px";
                text.b.textContent = "(x) " + left + "px";
                text.c.textContent = "(w) " + width + "px";
                text.d.textContent = "(h) " + height + "px";
                text.e.textContent = "(x) " + (left + width) + "px";
                text.f.textContent = "(y) " + (top + height) + "px";
                /*  */
                inrange.sx = config.ruler.start.x > (text.width + text.spacing);
                inrange.sy = config.ruler.start.y > (text.height + text.spacing);
                inrange.ex = (config.ruler.current.x < (window.innerWidth - (text.width * 2)));
                inrange.ey = (config.ruler.current.y < (window.innerHeight - (text.height * 4)));
                /*  */
                metrics.a = (width + text.width) + "px";
                metrics.b = (height + text.height) + "px";
                metrics.c = (width - text.adjustment) + "px";
                metrics.d = (height - text.adjustment) + "px";
                metrics.e = (text.width + text.adjustment) + "px";
                metrics.f = (text.height + text.adjustment) + "px";
                metrics.g = -1 * (text.width + text.spacing) + "px";
                metrics.h = -1 * (text.height + text.spacing) + "px";
                metrics.i = (width - text.spacing - text.width) + "px";
                metrics.j = -1 * (text.height + text.adjustment) + "px";
                metrics.k = (width + text.width + text.adjustment) + "px";
                metrics.l = (height + text.height - text.adjustment) + "px";
                metrics.m = (height - text.height * 1 - text.spacing) + "px";
                metrics.n = (height - text.height * 2 - text.spacing) + "px";
                metrics.o = (height - text.height * 3 - text.spacing) + "px";
                metrics.p = (height - text.height * 4 - text.spacing) + "px";
                metrics.q = (height + text.height * 2 - text.adjustment) + "px";
                metrics.r = (height + text.height * 2 + text.adjustment) + "px";
                metrics.s = (height - text.height * 3 - text.adjustment) + "px";
                metrics.t = (height + text.height * 3 - text.adjustment) + "px";
                metrics.u = (height - text.height * 1 - text.adjustment) + "px";
                metrics.v = (height - text.height * 2 - text.adjustment) + "px";
                metrics.w = (width / 2 - (text.width / 2) - text.adjustment) + "px";
                metrics.x = (width - text.width - text.spacing - text.adjustment) + "px";
                metrics.y = (height / 2 - (text.height / 2) - 2 * text.adjustment) + "px";
                metrics.z = (height - text.height - text.spacing - text.adjustment) + "px";
                metrics.aa = (height - text.height * 1 - text.spacing - text.adjustment) + "px";
                metrics.bb = (height - text.height * 2 - text.spacing - text.adjustment) + "px";
                /*  */
                text.a.style.left = inrange.ex ? (inrange.sy ? (inrange.sx ? 0 : metrics.e) : (inrange.sx ? metrics.g : (visible ? 0 : metrics.a))) : (inrange.sx ? metrics.g : metrics.e);
                text.a.style.top = inrange.ex ? (inrange.sy ? metrics.h : (inrange.sx ? metrics.f : (visible ? (inrange.ey ? metrics.r : metrics.aa) : (inrange.ey ? metrics.u : metrics.s)))) : (inrange.sx ? (inrange.sy ? 0 : metrics.f) : (inrange.sy ? metrics.h : 0));
                /*  */
                text.b.style.left = inrange.sx ? metrics.g : (inrange.sy ? 0 : (inrange.ex ? (visible ? 0 : metrics.c) : 0));
                text.b.style.top = inrange.ex ? (inrange.sx ? 0 : (inrange.sy ? metrics.h : (visible ? (inrange.ey ? metrics.b : metrics.bb) : (inrange.ey ? metrics.u : metrics.s)))) : (inrange.sx ? (inrange.sy ? metrics.j : 0) : (inrange.sy ? metrics.h : 0));
                /*  */
                text.c.style.left = inrange.ex ? (visible ? metrics.w : metrics.c) : metrics.i;
                text.c.style.top = inrange.ex ? (visible ? 0 : (inrange.ey ? metrics.b : metrics.v)) : (inrange.ey ? metrics.q : metrics.p);
                /*  */
                text.d.style.left = inrange.ex ? (visible ? 0 : metrics.a) : metrics.i;
                text.d.style.top = inrange.ex ? (visible ? metrics.y : (inrange.ey ? metrics.b : metrics.v)) : (inrange.ey ? metrics.t : metrics.o);
                /*  */
                text.e.style.left = inrange.ex ? (visible ? metrics.c : metrics.c) : metrics.i;
                text.e.style.top = inrange.ex ? (visible ? metrics.z : (inrange.ey ? metrics.d : metrics.u)) : (inrange.ey ? metrics.d : metrics.n);
                /*  */
                text.f.style.left = inrange.ex ? (visible ? (inrange.ey ? metrics.x : metrics.k) : metrics.a) : metrics.i;
                text.f.style.top = inrange.ex ? (visible ? (inrange.ey ? metrics.d : metrics.z) : (inrange.ey ? metrics.d : metrics.u)) : (inrange.ey ? metrics.l : metrics.m);
                /*  */
                config.ruler.element.rect.textContent = '';
                config.ruler.element.rect.appendChild(text.a);
                config.ruler.element.rect.appendChild(text.b);
                config.ruler.element.rect.appendChild(text.c);
                config.ruler.element.rect.appendChild(text.d);
                config.ruler.element.rect.appendChild(text.e);
                config.ruler.element.rect.appendChild(text.f);
              }
            }
          }
        }
      }
    }
  };
  /*  */
  background.receive("colorful", function (e) {
    config.options.colorful = e.colorful;
  });
  /*  */
  background.receive("rulermode", function (e) {
    config.ruler[e.state === "ON" ? "show" : "hide"]();
  });
}
