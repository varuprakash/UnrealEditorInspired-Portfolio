const state = {
  selected: "hero",
  filter: "all",
  playing: false,
  tool: "select",
};

const $ = (id) => document.getElementById(id);

function flattenTree(nodes, depth = 0, acc = []) {
  for (const n of nodes) {
    acc.push({ ...n, depth });
    if (n.children) flattenTree(n.children, depth + 1, acc);
  }
  return acc;
}

function iconClass(node) {
  if (node.type === "Folder" || node.type === "World") return "folder";
  if (node.icon === "pawn") return "pawn";
  if (node.type === "Component") return "comp";
  return "";
}

function renderOutliner(query = "") {
  const tree = $("outlinerTree");
  const q = query.trim().toLowerCase();
  const rows = flattenTree(outliner).filter((n) => !q || n.label.toLowerCase().includes(q));
  tree.innerHTML = rows
    .map(
      (n) => `
      <button class="tree-row ${n.id === state.selected ? "selected" : ""}" data-id="${n.id}" style="--d:${n.depth}">
        <span class="caret">${n.children ? "▾" : ""}</span>
        <span class="tree-icon ${iconClass(n)}"></span>
        <span>${n.label}</span>
      </button>`
    )
    .join("");
}

function getDetail(id) {
  if (details[id]) return details[id];
  if (details.p[id]) return details.p[id];
  return details.hero;
}

function renderDetails(id) {
  const d = getDetail(id);
  const skillBlock =
    id === "skills" || id.startsWith("sk-")
      ? `<div class="skill-bars">${skills
          .map(
            (s) => `<div class="skill-row"><span>${s.name}</span><span>${s.level}</span>
            <div class="bar"><i style="width:${s.level}%"></i></div></div>`
          )
          .join("")}</div>`
      : "";

  $("detailsBody").innerHTML = `
    <div class="details-head">
      <div class="cls">${d.class}</div>
      <h2>${d.title}</h2>
    </div>
    <div class="cat-bar">▸ ${d.category}</div>
    ${d.properties
      .map(
        ([k, v]) => `<div class="prop-row"><span>${k}</span><span>${v}</span></div>`
      )
      .join("")}
    <div class="details-copy">${d.body}</div>
    ${skillBlock}
    ${
      d.cta
        ? `<div class="details-cta">${d.cta
            .map((c) => `<a class="ue-btn ${c.label.includes("Email") || c.label.includes("LinkedIn") ? "primary" : ""}" href="${c.href}" target="_blank" rel="noreferrer">${c.label}</a>`)
            .join("")}</div>`
        : ""
    }
  `;
}

function renderHud(id) {
  const d = getDetail(id);
  const isHero = id === "hero" || id === "world";
  $("viewportHud").innerHTML = `
    <div class="hero-card">
      <div class="role">${isHero ? profile.role : d.category + "  ·  Selected"}</div>
      <h1>${isHero ? profile.name : d.title}</h1>
      <p>${d.body}</p>
      <div class="hud-actions">
        ${(d.cta || [{ label: "Inspect Details", href: "#details" }])
          .slice(0, 3)
          .map(
            (c, i) =>
              `<a class="ue-btn ${i === 0 ? "primary" : ""}" href="${c.href}" ${c.href.startsWith("http") || c.href.startsWith("mailto") || c.href.startsWith("tel") ? 'target="_blank" rel="noreferrer"' : ""}>${c.label}</a>`
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderAssets() {
  const grid = $("assetGrid");
  const list = projects.filter((p) => state.filter === "all" || p.filter === state.filter);
  grid.innerHTML = list
    .map(
      (p) => `
      <button class="asset ${state.selected === p.id ? "selected" : ""}" data-id="${p.id}">
        <div class="asset-thumb" style="background-color:${p.color}22;border-bottom:3px solid ${p.color}">
          <span>${p.asset}</span>
        </div>
        <div class="asset-meta">
          <b>${p.title}</b>
          <small>${p.type}</small>
        </div>
      </button>`
    )
    .join("");
}

function log(msg) {
  const t = new Date().toLocaleTimeString();
  $("outputLog").textContent = `Log: ${t}  LogTemp: ${msg}`;
}

function select(id, source = "outliner") {
  state.selected = id;
  renderOutliner($("outlinerFilter").value);
  renderDetails(id);
  renderHud(id);
  renderAssets();
  const d = getDetail(id);
  log(`Selected ${d.title} via ${source}`);
}

function renderMenu(key, anchor) {
  const dropdown = $("menuDropdown");
  const items = menus[key];
  dropdown.innerHTML = items
    .map((item) => {
      if (item.divider) return `<div class="sep"></div>`;
      if (item.href) return `<a href="${item.href}" target="_blank" rel="noreferrer">${item.label}</a>`;
      return `<button type="button" data-action="${item.action}">${item.label}</button>`;
    })
    .join("");
  const r = anchor.getBoundingClientRect();
  dropdown.style.left = `${r.left}px`;
  dropdown.style.top = `${r.bottom}px`;
  dropdown.hidden = false;
  document.querySelectorAll(".menubar button").forEach((b) => b.classList.toggle("open", b === anchor));
}

function closeMenu() {
  $("menuDropdown").hidden = true;
  document.querySelectorAll(".menubar button").forEach((b) => b.classList.remove("open"));
}

function setPlaying(on) {
  state.playing = on;
  $("playBtn").classList.toggle("playing", on);
  $("pauseBtn").disabled = !on;
  $("stopBtn").disabled = !on;
  $("pieBanner").classList.toggle("hidden", !on);
  $("viewport").classList.toggle("playing", on);
  log(on ? "Play In Editor started" : "PIE session ended");
}

function tickClock() {
  $("clock").textContent = new Date().toLocaleTimeString();
}

function tickStats() {
  const base = state.playing ? 90 : 118;
  const fps = base + Math.round(Math.random() * 8);
  $("fpsVal").textContent = String(fps);
  $("msVal").textContent = (1000 / fps).toFixed(1);
}

function init() {
  renderOutliner();
  renderAssets();
  select("hero", "startup");
  tickClock();
  setInterval(tickClock, 1000);
  setInterval(tickStats, 700);
  log("Editor initialized. Persistent Level loaded.");

  $("outlinerTree").addEventListener("click", (e) => {
    const row = e.target.closest("[data-id]");
    if (row) select(row.dataset.id);
  });

  $("outlinerFilter").addEventListener("input", (e) => renderOutliner(e.target.value));

  $("assetGrid").addEventListener("click", (e) => {
    const card = e.target.closest("[data-id]");
    if (card) select(card.dataset.id, "content browser");
  });

  document.querySelectorAll(".folder, .content-browser .tab[data-filter]").forEach((el) => {
    el.addEventListener("click", () => {
      state.filter = el.dataset.filter || "all";
      document.querySelectorAll(".folder").forEach((f) => f.classList.toggle("active", f.dataset.filter === state.filter));
      document.querySelectorAll(".content-browser .tab[data-filter]").forEach((t) =>
        t.classList.toggle("active", t.dataset.filter === state.filter)
      );
      renderAssets();
      log(`Content Browser filter: ${state.filter}`);
    });
  });

  document.querySelectorAll(".tool-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.tool = btn.dataset.mode;
      document.querySelectorAll(".tool-btn").forEach((b) => b.classList.toggle("active", b === btn));
      log(`Transform mode: ${state.tool}`);
    });
  });
  document.querySelector('.tool-btn[data-mode="select"]').classList.add("active");

  document.querySelectorAll(".viewport-tabs .tab[data-view]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".viewport-tabs .tab[data-view]").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      $("viewport").classList.remove("unlit", "wireframe");
      if (tab.dataset.view === "unlit") $("viewport").classList.add("unlit");
      if (tab.dataset.view === "wireframe") $("viewport").classList.add("wireframe");
      $("viewMeta").textContent = `Persp. 90°  |  ${tab.textContent}  |  Real-Time`;
      log(`Viewport mode: ${tab.dataset.view}`);
    });
  });

  $("playBtn").addEventListener("click", () => setPlaying(true));
  $("pauseBtn").addEventListener("click", () => {
    $("viewport").classList.toggle("playing");
    log("PIE paused");
  });
  $("stopBtn").addEventListener("click", () => setPlaying(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.playing) setPlaying(false);
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
      e.preventDefault();
      $("quickOpen").focus();
    }
  });

  $("quickOpen").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const q = e.target.value.toLowerCase();
    const all = [
      ...flattenTree(outliner),
      ...projects.map((p) => ({ id: p.id, label: p.title })),
    ];
    const hit = all.find((n) => n.label.toLowerCase().includes(q));
    if (hit) {
      select(hit.id, "quick open");
      e.target.value = "";
    }
  });

  document.querySelectorAll(".menubar button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (btn.classList.contains("open")) closeMenu();
      else renderMenu(btn.dataset.menu, btn);
    });
  });

  $("menuDropdown").addEventListener("click", (e) => {
    const action = e.target.dataset?.action;
    if (!action) return;
    if (action === "play") setPlaying(true);
    else if (action === "compile") log("Live Coding: compile succeeded (0 errors, 0 warnings)");
    else if (action === "browser") document.querySelector(".content-browser").scrollIntoView({ behavior: "smooth" });
    else if (action === "focus-outliner") $("outlinerFilter").focus();
    else if (action === "focus-details") $("details").scrollIntoView({ behavior: "smooth" });
    else if (action === "noop") log("Exit ignored — this session stays in editor");
    else select(action, "menu");
    closeMenu();
  });

  document.addEventListener("click", () => closeMenu());

  $("worldSettingsTab").addEventListener("click", () => select("world", "world settings"));
  document.querySelector('[data-goto="contact"]')?.addEventListener("click", () => select("contact"));
}

init();
