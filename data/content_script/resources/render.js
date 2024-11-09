config.render = {
  "grayscale": function (e) {
    const top = e.top;
    const left = e.left;
    const text = e.text;
    const width = e.width;
    const height = e.height;
    const center = e.center;
    const inrange = e.inrange;
    const metrics = e.metrics;
    const placement = e.placement;
    /*  */
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
    config.ruler.element.rect.style.display = "block";
  },
  "colorful": function (e) {
    const top = e.top;
    const left = e.left;
    const text = e.text;
    const width = e.width;
    const height = e.height;
    const center = e.center;
    const inrange = e.inrange;
    const metrics = e.metrics;
    const placement = e.placement;
    /*  */
    const cond_0 = width * height > 2 * text.width * text.height;
    const cond_1 = inrange.sx && inrange.sy && inrange.ex && inrange.ey;
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
    config.ruler.element.rect.style.display = "block";
    config.ruler.element.rect.setAttribute("visible", visible);
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
  },
  "circular": function (e) {
    const top = e.top;
    const left = e.left;
    const text = e.text;
    const width = e.width;
    const height = e.height;
    const center = e.center;
    const inrange = e.inrange;
    const metrics = e.metrics;
    const placement = e.placement;
    /*  */
    const svg = {};
    const cond_1 = width > 3 * text.width;
    const circle = {"top": {}, "bottom": {}};
    const cond_2 = height > 1.5 * text.height;
    const cond_3 = config.ruler.radius > text.width;
    const cond_4 = config.ruler.radius > text.height;
    const cond_5 = config.ruler.radius > Math.sqrt(text.width ** 2 +  text.height ** 2);
    const visible = cond_5 && (cond_1 || cond_2) && (cond_3 || cond_4);
    /*  */
    text.a.textContent = "(y) " + top + "px";
    text.b.textContent = "(x) " + left + "px";
    text.c.textContent = "(r) " + Math.round(config.ruler.radius) + "px";
    text.e.textContent = "(x) " + (left + width) + "px";
    text.f.textContent = "(y) " + (top + height) + "px";
    /*  */
    circle.top.left = config.ruler.current.x <= config.ruler.start.x && config.ruler.current.y <= config.ruler.start.y;
    circle.top.right = config.ruler.current.x >= config.ruler.start.x && config.ruler.current.y <= config.ruler.start.y;
    circle.bottom.left = config.ruler.current.x <= config.ruler.start.x && config.ruler.current.y >= config.ruler.start.y;
    circle.bottom.right = config.ruler.current.x >= config.ruler.start.x && config.ruler.current.y >= config.ruler.start.y;
    /*  */
    svg.x1 = circle.top.right ? 0 : (circle.bottom.right ? 0 : (circle.bottom.left ? width : (circle.top.left ? 0 : 0)));
    svg.y1 = circle.top.right ? height : (circle.bottom.right ? 0 : (circle.bottom.left ? 0 : (circle.top.left ? 0 : 0)));
    svg.x2 = circle.top.right ? width : (circle.bottom.right ? width : (circle.bottom.left ? 0 : (circle.top.left ? width : 0)));
    svg.y2 = circle.top.right ? 0 : (circle.bottom.right ? height : (circle.bottom.left ? height : (circle.top.left ? height : 0)));
    /*  */
    svg.element = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${Math.abs(svg.x2 - svg.x1)}" height="${Math.abs(svg.y2 - svg.y1)}">
        <line x1="${svg.x1}" y1="${svg.y1}" x2="${svg.x2}" y2="${svg.y2}" stroke="rgb(0 0 0 / 50%)" stroke-width="2"/>
      </svg>
    `;
    /*  */
    if (circle.top.right) {
      if (inrange.sx && inrange.ex && inrange.sy && inrange.ey) {
        text.a.style.left = (svg.x2 - text.width) + "px";
        text.a.style.top = (svg.y2 - 1 * text.height) + "px";
        /*  */
        text.b.style.left = (svg.x1 - text.width) + "px";
        text.b.style.top = (svg.y1) + "px";
        /*  */
        text.c.style.left = visible ? metrics.w : (svg.x1) + "px";
        text.c.style.top = visible ? metrics.y : (svg.y1 + text.height) + "px";
        /*  */
        text.e.style.left = (svg.x2 - text.width) + "px";
        text.e.style.top = (svg.y2 - 2 * text.height) + "px";
        /*  */
        text.f.style.left = (svg.x1 - text.width) + "px";
        text.f.style.top = (svg.y1 + text.height) + "px";
      } else {
        text.a.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.a.style.top = (center.placement.y) + "px";
        /*  */
        text.e.style.left = (center.placement.x) + "px";
        text.e.style.top = (center.placement.y) + "px";
        /*  */
        text.c.style.left = (center.placement.x) + "px";
        text.c.style.top = (center.placement.y + 1 * (text.height + text.spacing)) + "px";
        /*  */
        text.b.style.left = (center.placement.x) + "px";
        text.b.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        text.f.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.f.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        config.ruler.element.section.style.top = text.e.style.top;
        config.ruler.element.section.style.left = text.e.style.left;
        config.ruler.element.section.style.width = (text.width * 2 + text.spacing + text.adjustment + 1) + "px";
        config.ruler.element.section.style.height = (text.height * 3 + 2 * text.spacing + text.adjustment + 1) + "px";
      }
    }
    /*  */
    if (circle.bottom.right) {
      if (inrange.sx && inrange.ex && inrange.sy && inrange.ey) {
        text.a.style.left = (svg.x1 - text.width) + "px";
        text.a.style.top = (svg.y1 - text.height) + "px";
        /*  */
        text.b.style.left = (svg.x1 - text.width) + "px";
        text.b.style.top = (svg.y1 - 2 * text.height) + "px";
        /*  */
        text.c.style.left = visible ? metrics.w : (svg.x1) + "px";
        text.c.style.top = visible ? metrics.y : (svg.y1 - text.height) + "px";
        /*  */
        text.e.style.left = (svg.x2 - text.width) + "px";
        text.e.style.top = (svg.y2) + "px";
        /*  */
        text.f.style.left = (svg.x2 - text.width) + "px";
        text.f.style.top = (svg.y2 + text.height) + "px";
      } else {
        text.a.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.a.style.top = (center.placement.y) + "px";
        /*  */
        text.b.style.left = (center.placement.x) + "px";
        text.b.style.top = (center.placement.y) + "px";
        /*  */
        text.c.style.left = (center.placement.x) + "px";
        text.c.style.top = (center.placement.y + 1 * (text.height + text.spacing)) + "px";
        /*  */
        text.e.style.left = (center.placement.x) + "px";
        text.e.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        text.f.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.f.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        config.ruler.element.section.style.top = text.b.style.top;
        config.ruler.element.section.style.left = text.b.style.left;
        config.ruler.element.section.style.width = (text.width * 2 + text.spacing + text.adjustment + 1) + "px";
        config.ruler.element.section.style.height = (text.height * 3 + 2 * text.spacing + text.adjustment + 1) + "px";
      }
    }
    /*  */
    if (circle.bottom.left) {
      if (inrange.sx && inrange.ex && inrange.sy && inrange.ey) {
        text.a.style.left = (svg.x1 - text.width) + "px";
        text.a.style.top = (svg.y1 - text.height) + "px";
        /*  */
        text.b.style.left = (svg.x2) + "px";
        text.b.style.top = (svg.y2) + "px";
        /*  */
        text.c.style.left = visible ? metrics.w : (svg.x1) + "px";
        text.c.style.top = visible ? metrics.y : (svg.y1 - text.height) + "px";
        /*  */
        text.e.style.left = (svg.x1 - text.width) + "px";
        text.e.style.top = (svg.y1 - 2 * text.height) + "px";
        /*  */
        text.f.style.left = (svg.x2) + "px";
        text.f.style.top = (svg.y2 + text.height) + "px";
      } else {
        text.a.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.a.style.top = (center.placement.y) + "px";
        /*  */
        text.e.style.left = (center.placement.x) + "px";
        text.e.style.top = (center.placement.y) + "px";
        /*  */
        text.c.style.left = (center.placement.x) + "px";
        text.c.style.top = (center.placement.y + 1 * (text.height + text.spacing)) + "px";
        /*  */
        text.b.style.left = (center.placement.x) + "px";
        text.b.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        text.f.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.f.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        config.ruler.element.section.style.top = text.e.style.top;
        config.ruler.element.section.style.left = text.e.style.left;
        config.ruler.element.section.style.width = (text.width * 2 + text.spacing + text.adjustment + 1) + "px";
        config.ruler.element.section.style.height = (text.height * 3 + 2 * text.spacing + text.adjustment + 1) + "px";
      }
    }
    /*  */
    if (circle.top.left) {
      if (inrange.sx && inrange.ex && inrange.sy && inrange.ey) {
        text.a.style.left = (svg.x1) + "px";
        text.a.style.top = (svg.y1 - text.height) + "px";
        /*  */
        text.b.style.left = (svg.x1) + "px";
        text.b.style.top = (svg.y1 - 2 * text.height) + "px";
        /*  */
        text.c.style.left = visible ? metrics.w : (svg.x2) + "px";
        text.c.style.top = visible ? metrics.y : (svg.y2 + text.height) + "px";
        /*  */
        text.e.style.left = (svg.x2 - text.width) + "px";
        text.e.style.top = (svg.y2) + "px";
        /*  */
        text.f.style.left = (svg.x2 - text.width) + "px";
        text.f.style.top = (svg.y2 + text.height) + "px";
      } else {
        text.a.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.a.style.top = (center.placement.y) + "px";
        /*  */
        text.b.style.left = (center.placement.x) + "px";
        text.b.style.top = (center.placement.y) + "px";
        /*  */
        text.c.style.left = (center.placement.x) + "px";
        text.c.style.top = (center.placement.y + 1 * (text.height + text.spacing)) + "px";
        /*  */
        text.e.style.left = (center.placement.x) + "px";
        text.e.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        text.f.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.f.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        config.ruler.element.section.style.top = text.b.style.top;
        config.ruler.element.section.style.left = text.b.style.left;
        config.ruler.element.section.style.width = (text.width * 2 + text.spacing + text.adjustment + 1) + "px";
        config.ruler.element.section.style.height = (text.height * 3 + 2 * text.spacing + text.adjustment + 1) + "px";
      }
    }
    /*  */
    config.ruler.element.rect.textContent = '';
    config.ruler.element.section.textContent = '';
    config.ruler.element.rect.style.display = "block";
    config.ruler.element.circle.style.display = "block";
    config.ruler.element.rect.style.backgroundImage = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg.element)}')`;
    /*  */
    if (inrange.sx && inrange.ex && inrange.sy && inrange.ey) {
      config.ruler.element.rect.appendChild(text.a);
      config.ruler.element.rect.appendChild(text.b);
      config.ruler.element.rect.appendChild(text.c);
      config.ruler.element.rect.appendChild(text.e);
      config.ruler.element.rect.appendChild(text.f);
    } else {
      config.ruler.element.section.appendChild(text.a);
      config.ruler.element.section.appendChild(text.b);
      config.ruler.element.section.appendChild(text.c);
      config.ruler.element.section.appendChild(text.e);
      config.ruler.element.section.appendChild(text.f);
      /*  */
      config.ruler.element.rect.setAttribute("visible", false);
      config.ruler.element.rect.appendChild(config.ruler.element.section);
    }
  },
  "linear": function (e) {
    const top = e.top;
    const left = e.left;
    const text = e.text;
    const width = e.width;
    const height = e.height;
    const center = e.center;
    const inrange = e.inrange;
    const metrics = e.metrics;
    const placement = e.placement;
    /*  */
    const svg = {};
    const line = {};
    const stroke = {};
    const cond_1 = width > 3 * text.width;
    const circle = {"top": {}, "bottom": {}};
    const cond_2 = height > 1.5 * text.height;
    const cond_3 = config.ruler.radius > text.width;
    const cond_4 = config.ruler.radius > text.height;
    const marker = {"element": {"end": {}, "start": {}}};
    const cond_5 = config.ruler.radius > Math.sqrt(text.width ** 2 +  text.height ** 2);
    const visible = cond_5 && (cond_1 || cond_2) && (cond_3 || cond_4);
    /*  */
    svg.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    line.element = document.createElementNS("http://www.w3.org/2000/svg", "line");
    marker.element.end = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    marker.element.start = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    /*  */
    text.a.textContent = "(y) " + top + "px";
    text.b.textContent = "(x) " + left + "px";
    text.c.textContent = "(d) " + Math.round(config.ruler.radius) + "px";
    text.e.textContent = "(x) " + (left + width) + "px";
    text.f.textContent = "(y) " + (top + height) + "px";
    /*  */
    circle.top.left = config.ruler.current.x <= config.ruler.start.x && config.ruler.current.y <= config.ruler.start.y;
    circle.top.right = config.ruler.current.x > config.ruler.start.x && config.ruler.current.y <= config.ruler.start.y;
    circle.bottom.left = config.ruler.current.x <= config.ruler.start.x && config.ruler.current.y > config.ruler.start.y;
    circle.bottom.right = config.ruler.current.x > config.ruler.start.x && config.ruler.current.y > config.ruler.start.y;
    /*  */
    svg.x1 = circle.top.right ? 0 : (circle.bottom.right ? 0 : (circle.bottom.left ? width : (circle.top.left ? 0 : 0)));
    svg.y1 = circle.top.right ? height : (circle.bottom.right ? 0 : (circle.bottom.left ? 0 : (circle.top.left ? 0 : 0)));
    svg.x2 = circle.top.right ? width : (circle.bottom.right ? width : (circle.bottom.left ? 0 : (circle.top.left ? width : 0)));
    svg.y2 = circle.top.right ? 0 : (circle.bottom.right ? height : (circle.bottom.left ? height : (circle.top.left ? height : 0)));
    /*  */
    stroke.width = 4;
    marker.radius = 4;
    stroke.linecap = "round";
    stroke.color = "#f5c400";
    svg.element.style.top = 0;
    svg.element.style.left = 0;
    svg.width = Math.abs(svg.x2 - svg.x1);
    svg.height = Math.abs(svg.y2 - svg.y1);
    svg.element.style.position = "absolute";
    line.element.setAttribute("stroke", stroke.color);
    marker.element.end.setAttribute("r", marker.radius);
    marker.element.start.setAttribute("r", marker.radius);
    line.element.setAttribute("stroke-width", stroke.width);
    line.element.setAttribute("stroke-linecap", stroke.linecap);
    svg.element.setAttribute("width", svg.width < marker.radius * 2 ? marker.radius * 2 : svg.width);
    svg.element.setAttribute("height", svg.height < marker.radius * 2 ? marker.radius * 2 : svg.height);
    /*  */
    if (circle.top.right) {
      if (inrange.sx && inrange.ex && inrange.sy && inrange.ey) {
        text.a.style.left = (svg.x2 - text.width) + "px";
        text.a.style.top = (svg.y2 - text.height - text.adjustment) + "px";
        /*  */
        text.b.style.left = (svg.x1) + "px";
        text.b.style.top = (svg.y1 - text.adjustment) + "px";
        /*  */
        text.c.style.zIndex = 1;
        text.c.style.left = visible ? metrics.w : (svg.x1 - text.width - text.adjustment) + "px";
        text.c.style.top = visible ? metrics.y : (svg.y1 + text.height) + "px";
        /*  */
        text.e.style.left = (svg.x2 - text.width) + "px";
        text.e.style.top = (svg.y2 - 2 * text.height - 2 * text.adjustment) + "px";
        /*  */
        text.f.style.left = (svg.x1) + "px";
        text.f.style.top = (svg.y1 + text.height) + "px";
        /*  */
        marker.element.end.setAttribute("fill", "#f5c400");
        marker.element.start.setAttribute("fill", "#f5c400");
      } else {
        text.a.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.a.style.top = (center.placement.y) + "px";
        /*  */
        text.e.style.left = (center.placement.x) + "px";
        text.e.style.top = (center.placement.y) + "px";
        /*  */
        text.c.style.left = (center.placement.x) + "px";
        text.c.style.top = (center.placement.y + 1 * (text.height + text.spacing)) + "px";
        /*  */
        text.b.style.left = (center.placement.x) + "px";
        text.b.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        text.f.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.f.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        marker.element.end.setAttribute("fill", "#00cf1b");
        marker.element.start.setAttribute("fill", "#4da6ff");
        /*  */
        config.ruler.element.section.style.top = text.e.style.top;
        config.ruler.element.section.style.left = text.e.style.left;
        config.ruler.element.section.style.width = (text.width * 2 + text.spacing + text.adjustment + 1) + "px";
        config.ruler.element.section.style.height = (text.height * 3 + 2 * text.spacing + text.adjustment + 1) + "px";
      }
      /*  */
      text.c.setAttribute("box", '');
      text.e.setAttribute("end", '');
      text.a.setAttribute("end", '');
      text.f.setAttribute("start", '');
      text.b.setAttribute("start", '');
      /*  */
      line.element.setAttribute("x1", svg.x1 + marker.radius);
      line.element.setAttribute("y2", svg.y2 + marker.radius);
      line.element.setAttribute("x2", width < 2 * marker.radius ? marker.radius : svg.x2 - marker.radius);
      line.element.setAttribute("y1", height < 2 * marker.radius ? marker.radius : svg.y1 - marker.radius);
    }
    /*  */
    if (circle.bottom.right) {
      if (inrange.sx && inrange.ex && inrange.sy && inrange.ey) {
        text.a.style.left = (svg.x1) + "px";
        text.a.style.top = (svg.y1 - text.height - text.adjustment) + "px";
        /*  */
        text.b.style.left = (svg.x1) + "px";
        text.b.style.top = (svg.y1 - 2 * text.height - 2 * text.adjustment) + "px";
        /*  */
        text.c.style.zIndex = 1;
        text.c.style.left = visible ? metrics.w : (svg.x1 - text.width - text.adjustment) + "px";
        text.c.style.top = visible ? metrics.y : (svg.y1 - text.height) + "px";
        /*  */
        text.e.style.left = (svg.x2 - text.width) + "px";
        text.e.style.top = (svg.y2) + "px";
        /*  */
        text.f.style.left = (svg.x2 - text.width) + "px";
        text.f.style.top = (svg.y2 + text.height + text.adjustment) + "px";
        /*  */
        marker.element.end.setAttribute("fill", "#f5c400");
        marker.element.start.setAttribute("fill", "#f5c400");
      } else {
        text.a.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.a.style.top = (center.placement.y) + "px";
        /*  */
        text.b.style.left = (center.placement.x) + "px";
        text.b.style.top = (center.placement.y) + "px";
        /*  */
        text.c.style.left = (center.placement.x) + "px";
        text.c.style.top = (center.placement.y + 1 * (text.height + text.spacing)) + "px";
        /*  */
        text.e.style.left = (center.placement.x) + "px";
        text.e.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        text.f.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.f.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        marker.element.end.setAttribute("fill", "#00cf1b");
        marker.element.start.setAttribute("fill", "#4da6ff");
        /*  */
        config.ruler.element.section.style.top = text.b.style.top;
        config.ruler.element.section.style.left = text.b.style.left;
        config.ruler.element.section.style.width = (text.width * 2 + text.spacing + text.adjustment + 1) + "px";
        config.ruler.element.section.style.height = (text.height * 3 + 2 * text.spacing + text.adjustment + 1) + "px";
      }
      /*  */
      text.c.setAttribute("box", '');
      text.e.setAttribute("end", '');
      text.f.setAttribute("end", '');
      text.a.setAttribute("start", '');
      text.b.setAttribute("start", '');
      /*  */
      line.element.setAttribute("x1", svg.x1 + marker.radius);
      line.element.setAttribute("y1", svg.y1 + marker.radius);
      line.element.setAttribute("x2", width < 2 * marker.radius ? marker.radius : svg.x2 - marker.radius);
      line.element.setAttribute("y2", height < 2 * marker.radius ? marker.radius : svg.y2 - marker.radius);
    }
    /*  */
    if (circle.bottom.left) {
      if (inrange.sx && inrange.ex && inrange.sy && inrange.ey) {                    
        text.a.style.left = (svg.x1 - text.width - text.adjustment) + "px";
        text.a.style.top = (svg.y1 - text.height - text.adjustment) + "px";
        /*  */
        text.b.style.left = (svg.x2) + "px";
        text.b.style.top = (svg.y2 - text.adjustment) + "px";
        /*  */
        text.c.style.zIndex = 1;
        text.c.style.left = visible ? metrics.w : (svg.x1 + text.adjustment) + "px";
        text.c.style.top = visible ? metrics.y : (svg.y1 - text.height) + "px";
        /*  */
        text.e.style.left = (svg.x1 - text.width - text.adjustment) + "px";
        text.e.style.top = (svg.y1 - 2 * text.height - 2 * text.adjustment) + "px";
        /*  */
        text.f.style.left = (svg.x2) + "px";
        text.f.style.top = (svg.y2 + text.height) + "px";
        /*  */
        marker.element.end.setAttribute("fill", "#f5c400");
        marker.element.start.setAttribute("fill", "#f5c400");
      } else {
        text.a.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.a.style.top = (center.placement.y) + "px";
        /*  */
        text.e.style.left = (center.placement.x) + "px";
        text.e.style.top = (center.placement.y) + "px";
        /*  */
        text.c.style.left = (center.placement.x) + "px";
        text.c.style.top = (center.placement.y + 1 * (text.height + text.spacing)) + "px";
        /*  */
        text.b.style.left = (center.placement.x) + "px";
        text.b.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        text.f.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.f.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        marker.element.end.setAttribute("fill", "#00cf1b");
        marker.element.start.setAttribute("fill", "#4da6ff");
        /*  */
        config.ruler.element.section.style.top = text.e.style.top;
        config.ruler.element.section.style.left = text.e.style.left;
        config.ruler.element.section.style.width = (text.width * 2 + text.spacing + text.adjustment + 1) + "px";
        config.ruler.element.section.style.height = (text.height * 3 + 2 * text.spacing + text.adjustment + 1) + "px";
      }
      /*  */
      text.c.setAttribute("box", '');
      text.f.setAttribute("end", '');
      text.b.setAttribute("end", '');
      text.e.setAttribute("start", '');
      text.a.setAttribute("start", '');
      /*  */
      line.element.setAttribute("y1", svg.y1 + marker.radius);
      line.element.setAttribute("x2", svg.x2 + marker.radius);
      line.element.setAttribute("x1", width < 2 * marker.radius ? marker.radius : svg.x1 - marker.radius);
      line.element.setAttribute("y2", height < 2 * marker.radius ? marker.radius : svg.y2 - marker.radius);
    }
    /*  */
    if (circle.top.left) {
      if (inrange.sx && inrange.ex && inrange.sy && inrange.ey) {                    
        text.a.style.left = (svg.x1) + "px";
        text.a.style.top = (svg.y1 - text.height - text.adjustment) + "px";
        /*  */
        text.b.style.left = (svg.x1) + "px";
        text.b.style.top = (svg.y1 - 2 * text.height - 2 * text.adjustment) + "px";
        /*  */
        text.c.style.zIndex = 1;
        text.c.style.left = visible ? metrics.w : (svg.x2 + text.adjustment) + "px";
        text.c.style.top = visible ? metrics.y : (svg.y2 + text.height) + "px";
        /*  */
        text.e.style.left = (svg.x2 - text.width - text.adjustment) + "px";
        text.e.style.top = (svg.y2 - text.adjustment) + "px";
        /*  */
        text.f.style.left = (svg.x2 - text.width - text.adjustment) + "px";
        text.f.style.top = (svg.y2 + text.height) + "px";
        /*  */
        marker.element.end.setAttribute("fill", "#f5c400");
        marker.element.start.setAttribute("fill", "#f5c400");
      } else {
        text.a.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.a.style.top = (center.placement.y) + "px";
        /*  */
        text.b.style.left = (center.placement.x) + "px";
        text.b.style.top = (center.placement.y) + "px";
        /*  */
        text.c.style.left = (center.placement.x) + "px";
        text.c.style.top = (center.placement.y + 1 * (text.height + text.spacing)) + "px";
        /*  */
        text.e.style.left = (center.placement.x) + "px";
        text.e.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        text.f.style.left = (center.placement.x + text.width + text.spacing) + "px";
        text.f.style.top = (center.placement.y + 2 * (text.height + text.spacing)) + "px";
        /*  */
        marker.element.end.setAttribute("fill", "#00cf1b");
        marker.element.start.setAttribute("fill", "#4da6ff");
        /*  */
        config.ruler.element.section.style.top = text.b.style.top;
        config.ruler.element.section.style.left = text.b.style.left;
        config.ruler.element.section.style.width = (text.width * 2 + text.spacing + text.adjustment + 1) + "px";
        config.ruler.element.section.style.height = (text.height * 3 + 2 * text.spacing + text.adjustment + 1) + "px";
      }
      /*  */
      text.c.setAttribute("box", '');
      text.a.setAttribute("end", '');
      text.b.setAttribute("end", '');
      text.e.setAttribute("start", '');
      text.f.setAttribute("start", '');
      /*  */
      line.element.setAttribute("x2", svg.x1 + marker.radius);
      line.element.setAttribute("y2", svg.y1 + marker.radius);
      line.element.setAttribute("x1", width < 2 * marker.radius ? marker.radius : svg.x2 - marker.radius);
      line.element.setAttribute("y1", height < 2 * marker.radius ? marker.radius : svg.y2 - marker.radius);
    }
    /*  */
    config.ruler.element.rect.textContent = '';
    config.ruler.element.section.textContent = '';
    config.ruler.element.rect.style.display = "block";
    config.ruler.element.rect.style.width = (width < stroke.width ? stroke.width : width) + "px";
    config.ruler.element.rect.style.height = (height < stroke.width ? stroke.width : height) + "px";
    /*  */
    marker.element.end.setAttribute("cx", line.element.getAttribute("x2"));
    marker.element.end.setAttribute("cy", line.element.getAttribute("y2"));
    marker.element.start.setAttribute("cx", width < 2 * marker.radius ? marker.element.end.getAttribute("cx") : line.element.getAttribute("x1"));
    marker.element.start.setAttribute("cy", height < 2 * marker.radius ? marker.element.end.getAttribute("cy") : line.element.getAttribute("y1"));
    /*  */
    if (inrange.sx && inrange.ex && inrange.sy && inrange.ey) {
      config.ruler.element.rect.appendChild(text.a);
      config.ruler.element.rect.appendChild(text.b);
      config.ruler.element.rect.appendChild(text.c);
      config.ruler.element.rect.appendChild(text.e);
      config.ruler.element.rect.appendChild(text.f);
    } else {
      config.ruler.element.section.appendChild(text.a);
      config.ruler.element.section.appendChild(text.b);
      config.ruler.element.section.appendChild(text.c);
      config.ruler.element.section.appendChild(text.e);
      config.ruler.element.section.appendChild(text.f);
      /*  */
      config.ruler.element.rect.setAttribute("visible", false);
      config.ruler.element.rect.appendChild(config.ruler.element.section);
    }
    /*  */
    svg.element.appendChild(line.element);
    svg.element.appendChild(marker.element.end);
    svg.element.appendChild(marker.element.start);
    config.ruler.element.rect.appendChild(svg.element);
  }
};
