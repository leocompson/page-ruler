var background = (function () {
  let tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (let id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-options") {
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
        "path": "options-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "render": function (e) {
    const scroll = document.getElementById("scroll");
    const linear = document.getElementById("linear");
    const colorful = document.getElementById("colorful");
    const circular = document.getElementById("circular");
    const grayscale = document.getElementById("grayscale");
    const placement = e.colorful ? "colorful" : (e.grayscale ? "grayscale" : (e.circular ? "circular" : (e.linear ? "linear" : "default")));
    /*  */
    scroll.checked = e.scroll;
    linear.checked = e.linear;
    colorful.checked = e.colorful;
    circular.checked = e.circular;
    grayscale.checked = e.grayscale;
    /*  */
    document.documentElement.setAttribute("placement", placement);
  },
  "load": function () {
    const scroll = document.getElementById("scroll");
    const linear = document.getElementById("linear");
    const colorful = document.getElementById("colorful");
    const circular = document.getElementById("circular");
    const grayscale = document.getElementById("grayscale");
    /*  */
    scroll.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": e.target.checked,
        "linear": linear.checked,
        "colorful": colorful.checked,
        "circular": circular.checked,
        "grayscale": grayscale.checked
      });
    });
    /*  */
    colorful.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": scroll.checked,
        "linear": !e.target.checked,
        "colorful": e.target.checked,
        "circular": !e.target.checked,
        "grayscale": !e.target.checked
      });
    });
    /*  */
    grayscale.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": scroll.checked,
        "linear": !e.target.checked,
        "colorful": !e.target.checked,
        "circular": !e.target.checked,
        "grayscale": e.target.checked
      });
    });
    /*  */
    circular.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": scroll.checked,
        "linear": !e.target.checked,
        "circular": e.target.checked,
        "colorful": !e.target.checked,
        "grayscale": !e.target.checked
      });
    });
    /*  */
    linear.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": scroll.checked,
        "linear": e.target.checked,
        "circular": !e.target.checked,
        "colorful": !e.target.checked,
        "grayscale": !e.target.checked
      });
    });
    /*  */
    background.send("load");
  }
};

background.receive("storage", config.render);

window.addEventListener("load", config.load, false);
