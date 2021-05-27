if (!background) {
  var background = (function () {
    var tmp = {};
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      for (var id in tmp) {
        if (tmp[id] && (typeof tmp[id] === "function")) {
          if (request.path == "background-to-page") {
            if (request.method === id) tmp[id](request.data);
          }
        }
      }
    });
    /*  */
    return {
      "receive": function (id, callback) {tmp[id] = callback},
      "send": function (id, data) {chrome.runtime.sendMessage({"path": "page-to-background", "method": id, "data": data})}
    }
  })();

  var config = {
    "ruler": {
      "x": null,
      "y": null,
      "element": {},
      "width": null,
      "height": null,
      "action": true,
      "active": false,
      "status": false,
      "start": {"x": null, "y": null},
      "scroll": {"x": null, "y": null},
      "current": {"x": null, "y": null},
      "build": function () {
        config.ruler.element.rect = document.createElement("div");
        config.ruler.element.container = document.createElement("div");
        /*  */
        config.ruler.element.rect.className = "ruler-mode-rectangle";
        config.ruler.element.container.className = "ruler-mode-container";
        /*  */
        document.body.appendChild(config.ruler.element.container);
        document.body.appendChild(config.ruler.element.rect);
      },
      "info": {
        "remove": function () {
          var target = document.querySelector(".ruler-mode-info");
          if (target) target.remove();
        },
        "add": function () {
          config.ruler.element.info = document.createElement("div");
          /*  */
          config.ruler.element.info.textContent = "Ruler mode...";
          config.ruler.element.info.className = "ruler-mode-info";
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
        document.documentElement.removeAttribute("ruler-mode");
        document.removeEventListener("keydown", config.ruler.keydown);
      },
      "show": function () {
        var target = document.querySelector(".ruler-mode-container");
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
          document.documentElement.setAttribute("ruler-mode", '');
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
          var action = e.type === "keydown" || (config.ruler.active && (e.type === "touchmove" || e.type === "mousemove"));
          if (action) {
            if (config.ruler.element.rect) {
              config.ruler.current.x = (e.type === "touchmove" || e.type === "mousemove") ? (e.type.startsWith("mouse") ? e.clientX : (e.type.startsWith("touch") ? e.touches[0].clientX : 0)) : config.ruler.current.x + e.stepX;
              config.ruler.current.y = (e.type === "touchmove" || e.type === "mousemove") ? (e.type.startsWith("mouse") ? e.clientY : (e.type.startsWith("touch") ? e.touches[0].clientY : 0)) : config.ruler.current.y + e.stepY;
              /*  */
              config.ruler.width = Math.abs(config.ruler.start.x - config.ruler.current.x);
              config.ruler.height = Math.abs(config.ruler.start.y - config.ruler.current.y);
              /*  */
              var text = {};
              var width = config.ruler.width;
              var height = config.ruler.height;
              var top = config.ruler.scroll.y + (config.ruler.current.y < config.ruler.start.y ? config.ruler.current.y : config.ruler.start.y);
              var left = config.ruler.scroll.x + (config.ruler.current.x < config.ruler.start.x ? config.ruler.current.x : config.ruler.start.x);
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
              text.a.textContent = top + "px";
              text.b.textContent = left + "px";
              text.c.textContent = width + "px";
              text.d.textContent = height + "px";
              text.e.textContent = (top + height) + "px";
              text.f.textContent = (left + width) + "px";
              /*  */
              text.a.style.left = -2 + "px";
              text.a.style.top = -32 + "px";
              /*  */
              text.b.style.top = -30 + "px";
              text.b.style.left = -76 + "px";
              text.b.style.textAlign = "right";
              /*  */
              text.c.style.top = -57 + "px";
              text.c.style.textAlign = "center";
              text.c.style.left = (width / 2 - 38) + "px";
              text.c.style.visibility = (width > 150 || height > 150) ? "visible" : "hidden";
              /*  */
              text.d.style.left = 1 + "px";
              text.d.style.top = (height / 2 - 103) + "px";
              text.d.style.visibility = (width > 150 || height > 150) ? "visible" : "hidden";
              /*  */
              text.e.style.left = (width + 0) + "px";
              text.e.style.top = (height - 147) + "px";
              /*  */
              text.f.style.left = (width - 74) + "px";
              text.f.style.top = (height - 145) + "px";
              text.f.style.textAlign = "right";
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
  };
  //
  background.receive("ruler-mode", function (e) {
    config.ruler[e.state === "ON" ? "show" : "hide"]();
  });
}