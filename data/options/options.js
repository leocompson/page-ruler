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
    const adjust = document.getElementById("adjust");
    const scroll = document.getElementById("scroll");
    const linear = document.getElementById("linear");
    const angular = document.getElementById("angular");
    const colorful = document.getElementById("colorful");
    const circular = document.getElementById("circular");
    const grayscale = document.getElementById("grayscale");
    const theme = e.theme !== undefined ? e.theme : "light";
    const placement = e.colorful ? "colorful" : (e.grayscale ? "grayscale" : (e.circular ? "circular" : (e.linear ? "linear" : (e.angular ? "angular" : "default"))));
    /*  */
    adjust.checked = e.adjust;
    scroll.checked = e.scroll;
    linear.checked = e.linear;
    angular.checked = e.angular;
    colorful.checked = e.colorful;
    circular.checked = e.circular;
    grayscale.checked = e.grayscale;
    /*  */
    document.documentElement.setAttribute("theme", theme);
    document.documentElement.setAttribute("placement", placement);
  },
  "load": function () {
    const theme = document.getElementById("theme");
    const adjust = document.getElementById("adjust");
    const scroll = document.getElementById("scroll");
    const linear = document.getElementById("linear");
    const reload = document.getElementById("reload");
    const support = document.getElementById("support");
    const angular = document.getElementById("angular");
    const donation = document.getElementById("donation");
    const colorful = document.getElementById("colorful");
    const circular = document.getElementById("circular");
    const grayscale = document.getElementById("grayscale");
    /*  */
    reload.addEventListener("click", function () {document.location.reload()});
    support.addEventListener("click", function () {background.send("support")});
    donation.addEventListener("click", function () {background.send("donation")});
    /*  */
    theme.addEventListener("click", function () {
      let attribute = document.documentElement.getAttribute("theme");
      attribute = attribute === "dark" ? "light" : "dark";
      /*  */
      document.documentElement.setAttribute("theme", attribute);
      background.send("theme", attribute);
    });
    /*  */
    adjust.addEventListener("change", function (e) {
      background.send("store", {
        "adjust": e.target.checked,
        "scroll": scroll.checked,
        "linear": linear.checked,
        "angular": angular.checked,
        "colorful": colorful.checked,
        "circular": circular.checked,
        "grayscale": grayscale.checked
      });
    });
    /*  */
    scroll.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": e.target.checked,
        "adjust": adjust.checked,
        "linear": linear.checked,
        "angular": angular.checked,
        "colorful": colorful.checked,
        "circular": circular.checked,
        "grayscale": grayscale.checked
      });
    });
    /*  */
    colorful.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": scroll.checked,
        "adjust": adjust.checked,
        "linear": !e.target.checked,
        "colorful": e.target.checked,
        "angular": !e.target.checked,
        "circular": !e.target.checked,
        "grayscale": !e.target.checked
      });
    });
    /*  */
    grayscale.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": scroll.checked,
        "adjust": adjust.checked,
        "linear": !e.target.checked,
        "angular": !e.target.checked,
        "colorful": !e.target.checked,
        "circular": !e.target.checked,
        "grayscale": e.target.checked
      });
    });
    /*  */
    angular.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": scroll.checked,
        "adjust": adjust.checked,
        "linear": !e.target.checked,
        "angular": e.target.checked,
        "circular": !e.target.checked,
        "colorful": !e.target.checked,
        "grayscale": !e.target.checked
      });
    });
    /*  */
    circular.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": scroll.checked,
        "adjust": adjust.checked,
        "linear": !e.target.checked,
        "angular": !e.target.checked,
        "circular": e.target.checked,
        "colorful": !e.target.checked,
        "grayscale": !e.target.checked
      });
    });
    /*  */
    linear.addEventListener("change", function (e) {
      background.send("store", {
        "scroll": scroll.checked,
        "adjust": adjust.checked,
        "linear": e.target.checked,
        "angular": !e.target.checked,
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
