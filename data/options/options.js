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
    const colorful = document.getElementById("colorful");
    const grayscale = document.getElementById("grayscale");
    /*  */
    document.documentElement.setAttribute("colorful", e.colorful);
    grayscale.checked = !e.colorful;
    colorful.checked = e.colorful;
  },
  "load": function () {
    const colorful = document.getElementById("colorful");
    const grayscale = document.getElementById("grayscale");
    /*  */
    colorful.addEventListener("change", function (e) {
      background.send("colorful", e.target.checked);
    });
    /*  */
    grayscale.addEventListener("change", function (e) {
      background.send("colorful", !e.target.checked);
    });
    /*  */
    background.send("load");
  }
};

background.receive("storage", config.render);
window.addEventListener("load", config.load, false);