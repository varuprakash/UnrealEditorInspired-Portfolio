import "./data.js";

const state = {
  selected: "hero",
  filter: "all",
  activeTab: "level",
  playing: false,
  tool: "select",
  gameView: false,
  statFps: true,
  logs: [],
  transforms: JSON.parse(JSON.stringify(defaultTransform)),
  visibility: {},
};

// 3D Viewport Camera State
const cam = {
  pitch: -20,
  yaw: 35,
  zoom: 1,
  isDragging: false,
  startX: 0,
  startY: 0,
};

const $ = (id) => document.getElementById(id);

function flattenTree(nodes, depth = 0, acc = []) {
  for (const n of nodes) {
    acc.push({ ...n, depth });
    if (n.children) flattenTree(n.children, depth + 1, acc);
  }
  return acc;
}

function iconBadge(node) {
  if (node.type === "Folder" || node.type === "World") return `<span class="ue5-icon folder">📁</span>`;
  if (node.icon === "bp" || node.type === "Character") return `<span class="ue5-icon bp">BP</span>`;
  if (node.type === "Component") return `<span class="ue5-icon comp"></span>`;
  return `<span class="ue5-icon actor"></span>`;
}

function typeLabel(node) {
  if (node.type === "World") return "World";
  if (node.type === "Folder") return "Folder";
  if (node.type === "Character") return "ACharacter";
  if (node.type === "Component") return "UActorComponent";
  return "AActor";
}

function renderOutliner(query = "") {
  const tree = $("outlinerTree");
  const q = query.trim().toLowerCase();
  const all = flattenTree(outliner);
  const rows = all.filter((n) => !q || n.label.toLowerCase().includes(q));
  const actors = all.filter((n) => n.type !== "Folder" && n.type !== "World").length;
  $("actorCount").textContent = `${actors} Actors`;

  tree.innerHTML = rows
    .map((n) => {
      const isVisible = state.visibility[n.id] !== false;
      return `
      <div class="tree-row ${n.id === state.selected ? "selected" : ""}" data-id="${n.id}">
        <button class="tree-eye ${isVisible ? "" : "hidden-item"}" data-eye="${n.id}" title="${isVisible ? "Hide item" : "Show item"}">
          ${isVisible ? "👁" : "—"}
        </button>
        <span class="tree-main" style="--d:${n.depth}">
          <span class="tree-caret">${n.children ? "▾" : ""}</span>
          ${iconBadge(n)}
          <span class="tree-label">${n.label}</span>
        </span>
        <span class="tree-type">${typeLabel(n)}</span>
      </div>`;
    })
    .join("");
}

function getDetail(id) {
  if (details[id]) return details[id];
  if (details.p && details.p[id]) return details.p[id];
  return details.hero;
}

function getTransform(id) {
  if (state.transforms[id]) return state.transforms[id];
  return defaultTransform.hero;
}

function updateActorVisuals() {
  const t = getTransform(state.selected);
  const cube = $("actorCube");
  if (!cube) return;

  // Combine orbit camera and object transform
  const rx = cam.pitch + (t.rotation ? t.rotation[0] : 0);
  const ry = cam.yaw + (t.rotation ? t.rotation[2] : 0);
  const s = cam.zoom * (t.scale ? t.scale[0] : 1);
  cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${s}, ${s}, ${s})`;

  const rig = $("actorRig");
  if (rig) {
    const isVisible = state.visibility[state.selected] !== false;
    rig.style.opacity = isVisible ? "1" : "0.2";
  }
}

function renderComponentTree(id) {
  const compContainer = $("componentTree");
  if (!compContainer) return;
  const list = components[id] || [
    { name: `${getDetail(id).title} (Self)`, type: "AActor", icon: "bp", root: true },
    { name: "DefaultSceneRoot", type: "USceneComponent", icon: "comp", indent: 1 },
  ];

  compContainer.innerHTML = list
    .map(
      (c) => `
    <div class="comp-row ${c.root ? "active" : ""}" style="--indent:${c.indent || 0}">
      ${c.icon === "bp" ? '<span class="ue5-icon bp">BP</span>' : '<span class="ue5-icon comp"></span>'}
      <span class="c-name">${c.name}</span>
      <span class="c-type">${c.type}</span>
    </div>`
    )
    .join("");
}

function renderDetails(id) {
  const d = getDetail(id);
  const t = getTransform(id);
  renderComponentTree(id);

  const skillBlock =
    id === "skills" || id.startsWith("sk-")
      ? `<div class="det-section">
          <div class="det-sec-head" data-sec="skills"><span class="sec-arrow">▼</span><span>Skill Proficiency Gauges</span></div>
          <div class="det-sec-content">
            <div class="skill-bars">
              ${skills
                .map(
                  (s) => `
                <div class="skill-row">
                  <span>${s.name}</span>
                  <span style="font-family:var(--ue-mono); font-size:10px">${s.level}%</span>
                  <div class="bar"><i style="width:${s.level}%"></i></div>
                </div>`
                )
                .join("")}
            </div>
          </div>
        </div>`
      : "";

  $("detailsBody").innerHTML = `
    <div class="details-header">
      <div class="cls-name">${d.class}</div>
      <h2>${d.title}</h2>
    </div>

    <!-- Transform Section -->
    <div class="det-section">
      <div class="det-sec-head" data-sec="transform"><span class="sec-arrow">▼</span><span>Transform</span></div>
      <div class="det-sec-content">
        <div class="tf-row">
          <span class="tf-label">Location</span>
          <div class="tf-inputs">
            <div class="tf-box"><span class="tf-tag x">X</span><input type="number" id="locX" value="${t.location[0]}" /></div>
            <div class="tf-box"><span class="tf-tag y">Y</span><input type="number" id="locY" value="${t.location[1]}" /></div>
            <div class="tf-box"><span class="tf-tag z">Z</span><input type="number" id="locZ" value="${t.location[2]}" /></div>
          </div>
          <button class="tf-reset" id="resetLoc" title="Reset to Default Location">↺</button>
        </div>
        <div class="tf-row">
          <span class="tf-label">Rotation</span>
          <div class="tf-inputs">
            <div class="tf-box"><span class="tf-tag x">X</span><input type="number" id="rotX" value="${t.rotation[0]}" /></div>
            <div class="tf-box"><span class="tf-tag y">Y</span><input type="number" id="rotY" value="${t.rotation[1]}" /></div>
            <div class="tf-box"><span class="tf-tag z">Z</span><input type="number" id="rotZ" value="${t.rotation[2]}" /></div>
          </div>
          <button class="tf-reset" id="resetRot" title="Reset to Default Rotation">↺</button>
        </div>
        <div class="tf-row">
          <span class="tf-label">Scale</span>
          <div class="tf-inputs">
            <div class="tf-box"><span class="tf-tag x">X</span><input type="number" id="scaleX" value="${t.scale[0]}" step="0.1" /></div>
            <div class="tf-box"><span class="tf-tag y">Y</span><input type="number" id="scaleY" value="${t.scale[1]}" step="0.1" /></div>
            <div class="tf-box"><span class="tf-tag z">Z</span><input type="number" id="scaleZ" value="${t.scale[2]}" step="0.1" /></div>
          </div>
          <button class="tf-reset" id="resetScale" title="Reset to Default Scale">↺</button>
        </div>
      </div>
    </div>

    <!-- Properties Section -->
    <div class="det-section">
      <div class="det-sec-head" data-sec="props"><span class="sec-arrow">▼</span><span>${d.category || "General Properties"}</span></div>
      <div class="det-sec-content">
        ${d.properties.map(([k, v]) => `<div class="prop-row"><span>${k}</span><span>${v}</span></div>`).join("")}
        <div class="details-desc">${d.body}</div>
      </div>
    </div>

    ${skillBlock}

    ${
      d.cta
        ? `<div class="details-actions">
            ${d.cta
              .map((c) => {
                const isExt = c.href.startsWith("http") || c.href.startsWith("mailto") || c.href.startsWith("tel");
                return `<a class="ue-btn ${c.label.includes("Email") || c.label.includes("LinkedIn") || c.label.includes("Open") ? "primary" : ""}" href="${c.href}" ${isExt ? 'target="_blank" rel="noreferrer"' : ""}>${c.label}</a>`;
              })
              .join("")}
          </div>`
        : ""
    }
  `;

  // Internal hash links (e.g. #job-300 to select outliner actor)
  $("detailsBody").querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      if (targetId) select(targetId, "Details Link");
    });
  });

  // Attach Transform Input Listeners
  ["locX", "locY", "locZ"].forEach((key, idx) => {
    $(key)?.addEventListener("input", (e) => {
      t.location[idx] = parseFloat(e.target.value) || 0;
      updateActorVisuals();
    });
  });
  ["rotX", "rotY", "rotZ"].forEach((key, idx) => {
    $(key)?.addEventListener("input", (e) => {
      t.rotation[idx] = parseFloat(e.target.value) || 0;
      updateActorVisuals();
    });
  });
  ["scaleX", "scaleY", "scaleZ"].forEach((key, idx) => {
    $(key)?.addEventListener("input", (e) => {
      t.scale[idx] = parseFloat(e.target.value) || 1;
      updateActorVisuals();
    });
  });

  $("resetLoc")?.addEventListener("click", () => {
    const def = defaultTransform[id] || defaultTransform.hero;
    t.location = [...def.location];
    renderDetails(id);
    updateActorVisuals();
    log(`Reset location for ${d.title}`);
  });
  $("resetRot")?.addEventListener("click", () => {
    const def = defaultTransform[id] || defaultTransform.hero;
    t.rotation = [...def.rotation];
    renderDetails(id);
    updateActorVisuals();
    log(`Reset rotation for ${d.title}`);
  });
  $("resetScale")?.addEventListener("click", () => {
    const def = defaultTransform[id] || defaultTransform.hero;
    t.scale = [...def.scale];
    renderDetails(id);
    updateActorVisuals();
    log(`Reset scale for ${d.title}`);
  });

  // Attach Accordion Toggle Listeners
  document.querySelectorAll(".det-sec-head").forEach((head) => {
    head.addEventListener("click", () => {
      head.classList.toggle("collapsed");
      const content = head.nextElementSibling;
      if (content) content.classList.toggle("hidden");
    });
  });
}

function renderActor(id) {
  const d = getDetail(id);
  $("actorLabel").textContent = d.title.length > 28 ? d.title.slice(0, 26) + "…" : d.title;
  updateActorVisuals();

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
      <div class="asset ${state.selected === p.id ? "selected" : ""}" data-id="${p.id}">
        <div class="asset-thumb">
          <span class="asset-badge">${p.asset}</span>
          <div class="asset-band" style="background:${p.color}"></div>
        </div>
        <div class="asset-meta">
          <b>${p.title}</b>
          <small>${p.type}</small>
        </div>
      </div>`
    )
    .join("");
}

function log(msg, category = "LogTemp") {
  const t = new Date().toLocaleTimeString();
  const prefix = `${category}: [${t}]`;
  const fullLine = `${prefix} ${msg}`;
  state.logs.push({ category, time: t, msg });

  $("outputLog").textContent = fullLine;

  const fullLog = $("fullLog");
  if (fullLog) {
    fullLog.innerHTML = state.logs
      .slice(-100)
      .map((l) => {
        let catClass = "cat-temp";
        if (l.category.includes("Live")) catClass = "cat-live";
        else if (l.category.includes("Blueprint")) catClass = "cat-bp";
        else if (l.category.includes("Warn")) catClass = "cat-warn";
        return `<div class="log-line"><span class="t">[${l.time}]</span> <span class="${catClass}">${l.category}:</span> ${l.msg}</div>`;
      })
      .join("");
    fullLog.scrollTop = fullLog.scrollHeight;
  }
}

function select(id, source = "outliner") {
  state.selected = id;
  renderOutliner($("outlinerFilter").value);
  renderDetails(id);
  renderActor(id);
  renderAssets();
  document.querySelectorAll(".bp-node").forEach((n) => {
    n.classList.toggle("selected", n.dataset.asset === id);
  });
  log(`Selected ${getDetail(id).title} (${source})`, "LogTemp");
}

function setToolMode(mode) {
  state.tool = mode;
  document.querySelectorAll(".tool-btn").forEach((b) => {
    const isCur = b.dataset.mode === mode;
    b.classList.toggle("active", isCur);
    b.setAttribute("aria-pressed", isCur);
  });

  $("gizmoTranslate")?.classList.toggle("hidden", mode !== "move");
  $("gizmoRotate")?.classList.toggle("hidden", mode !== "rotate");
  $("gizmoScale")?.classList.toggle("hidden", mode !== "scale");
  log(`Active Gizmo: ${mode.toUpperCase()}`, "LogTemp");
}

function toggleGameView(force) {
  state.gameView = typeof force === "boolean" ? force : !state.gameView;
  $("viewport").classList.toggle("game-view", state.gameView);
  $("vpGameViewBtn").classList.toggle("active", state.gameView);
  log(`Game View: ${state.gameView ? "ON (Cinematic)" : "OFF"}`, "LogTemp");
}

function setPlaying(on) {
  state.playing = on;
  $("playBtn").classList.toggle("playing", on);
  $("pauseBtn").disabled = !on;
  $("stopBtn").disabled = !on;
  $("pieBanner").classList.toggle("hidden", !on);
  $("viewport").classList.toggle("playing", on);
  log(on ? "Play In Editor started (PIE - 120 FPS Target)" : "PIE session ended", "LogBlueprintUserMessages");
}

function toggleContentDrawer(open) {
  const dock = $("bottomDock");
  const isMin = dock.classList.contains("drawer-minimized");
  const shouldMin = typeof open === "boolean" ? !open : !isMin;
  dock.classList.toggle("drawer-minimized", shouldMin);
  log(`Content Drawer: ${shouldMin ? "Minimized" : "Expanded"}`, "LogTemp");
}

function executeConsoleCommand(rawCmd) {
  const cmd = rawCmd.trim().toLowerCase();
  if (!cmd) return;
  log(rawCmd, "LogConsoleInput");

  if (cmd === "help") {
    log("Available commands: stat fps, viewmode wireframe, viewmode unlit, viewmode lit, g, cls, compile, exit", "LogTemp");
  } else if (cmd === "stat fps") {
    state.statFps = !state.statFps;
    $("viewportStats").classList.toggle("hidden", !state.statFps);
    log(`Stat FPS: ${state.statFps ? "Enabled" : "Disabled"}`, "LogTemp");
  } else if (cmd === "viewmode wireframe") {
    $("vpWireDd").click();
  } else if (cmd === "viewmode unlit") {
    $("viewport").classList.add("unlit");
    $("viewport").classList.remove("wireframe");
    log("ViewMode: Unlit", "LogTemp");
  } else if (cmd === "viewmode lit") {
    $("vpLitDd").click();
  } else if (cmd === "g" || cmd === "viewmode game") {
    toggleGameView();
  } else if (cmd === "compile" || cmd === "livecoding") {
    log("Live Coding compile succeeded: 0 errors, 0 warnings (0.24s)", "LogLiveCoding");
  } else if (cmd === "cls" || cmd === "clear") {
    state.logs = [];
    log("Log cleared", "LogTemp");
  } else if (cmd === "exit" || cmd === "quit") {
    log("Editor shutdown request received (Simulation Only)", "Warning");
  } else {
    log(`Command not recognized: '${rawCmd}'. Type 'help' for commands.`, "Warning");
  }
}

function renderMenu(key, anchor) {
  const dropdown = $("menuDropdown");
  const items = menus[key] || [];
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

function tickClock() {
  $("clock").textContent = new Date().toLocaleTimeString();
}

function tickStats() {
  const base = state.playing ? 92 : 120;
  const fps = base + (Math.random() * 3 - 1.5);
  $("fpsVal").textContent = fps.toFixed(1);
  $("msVal").textContent = (1000 / fps).toFixed(2);
}

function initViewportOrbit() {
  const vp = $("viewport");

  vp.addEventListener("mousedown", (e) => {
    // Don't orbit if clicking on top toolbar or buttons
    if (e.target.closest(".vp-toolbar, .ue-btn, .pie-banner")) return;
    cam.isDragging = true;
    cam.startX = e.clientX;
    cam.startY = e.clientY;
  });

  window.addEventListener("mousemove", (e) => {
    if (!cam.isDragging) return;
    const dx = e.clientX - cam.startX;
    const dy = e.clientY - cam.startY;
    cam.startX = e.clientX;
    cam.startY = e.clientY;

    cam.yaw += dx * 0.4;
    cam.pitch = Math.max(-85, Math.min(85, cam.pitch - dy * 0.4));
    updateActorVisuals();
  });

  window.addEventListener("mouseup", () => {
    cam.isDragging = false;
  });

  vp.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      cam.zoom = Math.max(0.4, Math.min(2.5, cam.zoom - e.deltaY * 0.0015));
      updateActorVisuals();
    },
    { passive: false }
  );

  vp.addEventListener("dblclick", () => {
    cam.pitch = -20;
    cam.yaw = 35;
    cam.zoom = 1;
    updateActorVisuals();
    log("Camera: Orbit Reset", "LogTemp");
  });
}

const blueprintGraphs = {
  experience: {
    title: "BP_Experience",
    crumb: "BP_Experience",
    nodes: [
      {
        id: "node-exp-begin",
        type: "event",
        icon: "⚡",
        title: "Event BeginPlay",
        sub: "Career Lifecycle",
        x: 50,
        y: 120,
        inPins: [],
        outPins: [{ name: "Exec", type: "exec" }],
        desc: "Execution begins upon initializing professional game development career.",
      },
      {
        id: "node-exp-300",
        assetId: "exp-300",
        type: "function",
        icon: "f",
        title: "300Minds : Unreal Developer",
        sub: "Digital Twins & Plugins (2025 — 2026)",
        x: 370,
        y: 80,
        inPins: [
          { name: "Exec", type: "exec" },
          { name: "Parquet Data", type: "string" },
          { name: "Minimap Subsystem", type: "obj" },
        ],
        outPins: [
          { name: "Exec", type: "exec" },
          { name: "Digital Twin Delivered", type: "bool" },
        ],
        desc: "Engineered client digital twin systems, Parquet data integration, and marketplace plugins.",
        link: profile.links.linkedin,
        linkText: "LinkedIn Profile ↗",
      },
      {
        id: "node-exp-wrks",
        assetId: "exp-wrks",
        type: "function",
        icon: "f",
        title: "WRKS Games : Gameplay Programmer",
        sub: "City Builder Gameplay (2024 — 2025)",
        x: 860,
        y: 80,
        inPins: [
          { name: "Exec", type: "exec" },
          { name: "Building Placement", type: "vector" },
          { name: "Resource Economy", type: "obj" },
        ],
        outPins: [
          { name: "Exec", type: "exec" },
          { name: "Playable Prototype", type: "bool" },
        ],
        desc: "Core developer on City Builder: building placement grids, resource economy, and progression mechanics.",
        link: profile.links.linkedin,
        linkText: "LinkedIn Profile ↗",
      },
      {
        id: "node-exp-viitor",
        assetId: "exp-viitor",
        type: "function",
        icon: "f",
        title: "ViitorCloud : Software Engineer",
        sub: "VR Gaming & Simulation (2023 — 2024)",
        x: 1350,
        y: 80,
        inPins: [
          { name: "Exec", type: "exec" },
          { name: "VR Cricket Physics", type: "vector" },
          { name: "Twin City PoC", type: "obj" },
        ],
        outPins: [
          { name: "Exec", type: "exec" },
          { name: "Milestone Releases", type: "bool" },
        ],
        desc: "Developed VR cricket physics bat dynamics, Twin City proof-of-concept, and production optimizations.",
        link: profile.links.linkedin,
        linkText: "LinkedIn Profile ↗",
      },
      {
        id: "node-exp-edu",
        assetId: "edu-gtu",
        type: "output",
        icon: "🎓",
        title: "GTU Computer Science",
        sub: "Academic Foundation (8.74 CGPA)",
        x: 860,
        y: 470,
        inPins: [
          { name: "B.E. Computer Science", type: "string" },
          { name: "Algorithms & C++", type: "obj" },
        ],
        outPins: [{ name: "First Class Distinction", type: "bool" }],
        desc: "Bachelor of Engineering in Computer Science with distinction. Applied mathematics, memory management, and engine systems.",
        link: profile.links.linkedin,
        linkText: "Verify Education ↗",
      },
    ],
    wires: [
      { from: "node-exp-begin", to: "node-exp-300" },
      { from: "node-exp-300", to: "node-exp-wrks" },
      { from: "node-exp-wrks", to: "node-exp-viitor" },
    ],
  },
  itchio: {
    title: "BP_ItchIo",
    crumb: "BP_ItchIo",
    nodes: [
      {
        id: "node-itch-begin",
        type: "event",
        icon: "⚡",
        title: "Event BeginPlay",
        sub: "Initialize Storefront",
        x: 50,
        y: 130,
        inPins: [],
        outPins: [{ name: "Exec", type: "exec" }],
        desc: "Loads published games and interactive prototypes.",
      },
      {
        id: "node-itch-profile",
        assetId: "itch-profile",
        type: "store",
        icon: "🎮",
        title: "Prakash Itch.io",
        sub: "Developer Profile & Storefront",
        x: 370,
        y: 90,
        inPins: [
          { name: "Exec", type: "exec" },
          { name: "Publisher", type: "string" },
        ],
        outPins: [
          { name: "Exec", type: "exec" },
          { name: "Published Titles", type: "bool" },
        ],
        desc: "Official itch.io developer profile and storefront by Prakash Varu featuring playable prototypes and demos.",
        link: profile.links.itch,
        linkText: "Open Itch.io Storefront ↗",
      },
      {
        id: "node-itch-pacific",
        assetId: "itch-pacific",
        type: "game",
        icon: "⚓",
        title: "PacificSail",
        sub: "Radiation-Wave Ocean Survival Game",
        x: 860,
        y: 90,
        inPins: [
          { name: "Exec", type: "exec" },
          { name: "Boat Navigation", type: "vector" },
          { name: "Resource Scavenging", type: "obj" },
        ],
        outPins: [
          { name: "Exec", type: "exec" },
          { name: "Published Status", type: "bool" },
        ],
        desc: "Radiation-wave survival at sea: helm boat, fish, scavenge, and manage water and food resources.",
        link: "https://madmonkgames.itch.io/pacificsail",
        linkText: "Play PacificSail ↗",
      },
      {
        id: "node-itch-drive",
        assetId: "itch-drive",
        type: "game",
        icon: "🚗",
        title: "Don'tDrive",
        sub: "Physics Rage Platformer Demo",
        x: 1350,
        y: 90,
        inPins: [
          { name: "Exec", type: "exec" },
          { name: "Chaotic Physics", type: "vector" },
          { name: "Retry Loop", type: "bool" },
        ],
        outPins: [
          { name: "Exec", type: "exec" },
          { name: "Demo Active", type: "bool" },
        ],
        desc: "Physics-driven rage climbing game: navigate chaotic ramps and procedural obstacles to reach new heights.",
        link: "https://madmonkgames.itch.io/dontdrive",
        linkText: "Play Don'tDrive Demo ↗",
      },
    ],
    wires: [
      { from: "node-itch-begin", to: "node-itch-profile" },
      { from: "node-itch-profile", to: "node-itch-pacific" },
      { from: "node-itch-pacific", to: "node-itch-drive" },
    ],
  },
  youtube: {
    title: "BP_YouTube",
    crumb: "BP_YouTube",
    nodes: [
      {
        id: "node-yt-begin",
        type: "event",
        icon: "⚡",
        title: "Event OnChannelSelect",
        sub: "Stream Channel Media",
        x: 60,
        y: 140,
        inPins: [],
        outPins: [{ name: "Exec", type: "exec" }],
        desc: "Fires media player trigger for Prakash YouTube channel.",
      },
      {
        id: "node-yt-channel",
        assetId: "yt-madmonk",
        type: "media",
        icon: "▶",
        title: "Prakash YouTube",
        sub: "@madmonk4games (Devlogs & Mechanics)",
        x: 390,
        y: 100,
        inPins: [
          { name: "Exec", type: "exec" },
          { name: "Channel Handle", type: "string" },
          { name: "Creator: Prakash Varu", type: "obj" },
        ],
        outPins: [
          { name: "Exec", type: "exec" },
          { name: "Devlog Stream Active", type: "bool" },
        ],
        desc: "Official YouTube channel by Prakash Varu featuring Unreal Engine 5 devlogs, gameplay mechanics prototyping breakdowns, and technical showcases.",
        link: profile.links.youtube,
        linkText: "Watch on YouTube ↗",
      },
    ],
    wires: [{ from: "node-yt-begin", to: "node-yt-channel" }],
  },
};

function renderBlueprintGraph(tabKey) {
  const graph = blueprintGraphs[tabKey];
  if (!graph) return;

  const container = $("bpNodesContainer");
  const svg = $("bpWiresSvg");
  if (!container || !svg) return;

  container.innerHTML = graph.nodes
    .map((n) => {
      const isSelected = state.selected === n.assetId;
      return `
      <div class="bp-node ${n.type === "event" ? "event-node" : ""} ${isSelected ? "selected" : ""}" id="${n.id}" data-asset="${n.assetId || ""}" style="left:${n.x}px; top:${n.y}px;">
        <div class="bp-node-header ${n.type}">
          <span class="bp-node-icon">${n.icon || "f"}</span>
          <div class="bp-node-titles">
            <span class="bp-node-title">${n.title}</span>
            <span class="bp-node-sub">${n.sub}</span>
          </div>
        </div>
        <div class="bp-node-body">
          <div class="bp-pins-row">
            ${n.inPins.map((p) => `<div class="bp-pin in"><span class="pin-shape ${p.type}">▶</span><span>${p.name || "Exec"}</span></div>`).join("")}
            ${n.outPins.map((p) => `<div class="bp-pin out"><span>${p.name || "Exec"}</span><span class="pin-shape ${p.type}">▶</span></div>`).join("")}
          </div>
          <div class="bp-node-desc">${n.desc}</div>
          ${
            n.assetId
              ? `<div class="bp-node-actions">
                  <button class="bp-node-btn select-btn" data-asset="${n.assetId}">Inspect Details</button>
                  ${n.link ? `<a class="bp-node-btn primary" href="${n.link}" target="_blank" rel="noreferrer">${n.linkText || "Open Link"}</a>` : ""}
                </div>`
              : ""
          }
        </div>
      </div>
    `;
    })
    .join("");

  container.querySelectorAll(".bp-node").forEach((nodeEl) => {
    nodeEl.addEventListener("click", (e) => {
      if (e.target.tagName === "A") return;
      const assetId = nodeEl.dataset.asset;
      if (assetId) {
        select(assetId, "Blueprint Graph");
        container.querySelectorAll(".bp-node").forEach((n) => n.classList.remove("selected"));
        nodeEl.classList.add("selected");
      }
    });
  });

  const wiresHtml = (graph.wires || [])
    .map((w) => {
      const n1 = graph.nodes.find((n) => n.id === w.from);
      const n2 = graph.nodes.find((n) => n.id === w.to);
      if (!n1 || !n2) return "";
      const nodeWidth = n1.type === "event" ? 260 : 410;
      const x1 = n1.x + nodeWidth;
      const y1 = n1.y + 44;
      const x2 = n2.x;
      const y2 = n2.y + 44;
      const dx = Math.max(50, (x2 - x1) * 0.5);
      return `<path class="bp-wire pulse" d="M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}" />`;
    })
    .join("");
  svg.innerHTML = wiresHtml;
}

function switchDocumentTab(tabId) {
  state.activeTab = tabId;
  const isLevel = tabId === "level";

  document.querySelectorAll("#mainDocTabs .level-tab").forEach((tab) => {
    const active = tab.dataset.tab === tabId;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active);
  });

  $("viewport")?.classList.toggle("hidden", !isLevel);
  $("blueprintEditor")?.classList.toggle("hidden", isLevel);

  if (isLevel) {
    log("Switched to PersistentLevel Viewport", "LogTemp");
    updateActorVisuals();
  } else {
    renderBlueprintGraph(tabId);
    const tabNames = {
      experience: "BP_Experience",
      itchio: "BP_ItchIo",
      youtube: "BP_YouTube",
    };
    if ($("bpCrumbRoot")) $("bpCrumbRoot").textContent = tabNames[tabId] || "BP_Blueprint";
    log(`Opened ${tabNames[tabId]} EventGraph`, "LogBlueprint");

    const tabFirstAsset = {
      experience: "exp-300",
      itchio: "itch-profile",
      youtube: "yt-madmonk",
    }[tabId];
    if (tabFirstAsset) {
      select(tabFirstAsset, "Tab Select");
    }
  }
}

function init() {
  renderOutliner();
  renderAssets();
  select("hero", "Startup");
  initViewportOrbit();
  tickClock();
  setInterval(tickClock, 1000);
  setInterval(tickStats, 600);

  log("Unreal Engine 5.4.4-release loaded [DirectX 12 / SM6]", "LogStarted");
  log("Level loaded: /Game/Portfolio/PersistentLevel.umap (0.042s)", "LogWorld");
  log("Live Coding initialized: 0 compile units active", "LogLiveCoding");

  // Outliner Tree row click
  $("outlinerTree").addEventListener("click", (e) => {
    const eyeBtn = e.target.closest("[data-eye]");
    if (eyeBtn) {
      const id = eyeBtn.dataset.eye;
      state.visibility[id] = state.visibility[id] === false ? true : false;
      eyeBtn.textContent = state.visibility[id] ? "👁" : "—";
      eyeBtn.classList.toggle("hidden-item", !state.visibility[id]);
      updateActorVisuals();
      log(`Visibility ${state.visibility[id] ? "Shown" : "Hidden"}: ${id}`);
      return;
    }

    const row = e.target.closest("[data-id]");
    if (row) select(row.dataset.id, "World Outliner");
  });

  // Outliner Search
  $("outlinerFilter").addEventListener("input", (e) => renderOutliner(e.target.value));

  // Document Tabs (PersistentLevel / BP_Experience / BP_ItchIo / BP_YouTube)
  $("mainDocTabs")?.addEventListener("click", (e) => {
    const tabEl = e.target.closest(".level-tab[data-tab]");
    if (tabEl) {
      switchDocumentTab(tabEl.dataset.tab);
    }
  });

  // Blueprint Toolbar Buttons
  $("bpCompileBtn")?.addEventListener("click", () => {
    const crumb = $("bpCrumbRoot")?.textContent || "BP_Blueprint";
    log(`Compiling ${crumb}...`, "LogBlueprint");
    $("liveCodingBadge")?.classList.add("pulse");
    setTimeout(() => {
      log(`[Success] ${crumb} compiled: 0 Errors, 0 Warnings.`, "LogBlueprint");
      log(`Live Coding patch applied for ${crumb}.`, "LogLiveCoding");
      $("liveCodingBadge")?.classList.remove("pulse");
    }, 350);
  });

  $("bpSaveBtn")?.addEventListener("click", () => {
    const crumb = $("bpCrumbRoot")?.textContent || "BP_Blueprint";
    log(`Saved asset /Game/Blueprints/${crumb}.uasset`, "LogTemp");
  });

  $("bpBrowseBtn")?.addEventListener("click", () => {
    toggleContentDrawer(true);
    if (state.activeTab && state.activeTab !== "level") {
      state.filter = state.activeTab;
      document.querySelectorAll(".folder").forEach((f) => f.classList.toggle("active", f.dataset.filter === state.filter));
      document.querySelectorAll(".filter-pill").forEach((p) => p.classList.toggle("active", p.dataset.filter === state.filter));
      renderAssets();
    }
  });

  $("bpDefaultsBtn")?.addEventListener("click", () => {
    log(`Opened Class Defaults for ${$("bpCrumbRoot")?.textContent || "Blueprint"}`, "LogBlueprint");
  });

  $("bpSettingsBtn")?.addEventListener("click", () => {
    log(`Opened Class Settings for ${$("bpCrumbRoot")?.textContent || "Blueprint"}`, "LogBlueprint");
  });

  // Asset Grid Selection & Tab Activation
  $("assetGrid").addEventListener("click", (e) => {
    const card = e.target.closest("[data-id]");
    if (card) {
      const id = card.dataset.id;
      select(id, "Content Browser");
      const proj = projects.find((p) => p.id === id);
      if (proj && ["experience", "itchio", "youtube"].includes(proj.filter)) {
        switchDocumentTab(proj.filter);
      }
    }
  });

  // Content Browser Folder & Filter Pills
  document.querySelectorAll(".folder, .filter-pill").forEach((el) => {
    el.addEventListener("click", () => {
      state.filter = el.dataset.filter || "all";
      document.querySelectorAll(".folder").forEach((f) => f.classList.toggle("active", f.dataset.filter === state.filter));
      document.querySelectorAll(".filter-pill").forEach((p) => p.classList.toggle("active", p.dataset.filter === state.filter));
      const pathMap = {
        all: "All / Game",
        experience: "All / Game / Experience",
        itchio: "All / Game / Itch.io",
        youtube: "All / Game / YouTube",
      };
      $("crumbPath").textContent = pathMap[state.filter] || "All / Game";
      renderAssets();
      log(`Browser: ${$("crumbPath").textContent}`);
    });
  });

  // Transform Gizmo Mode Buttons
  document.querySelectorAll(".tool-btn").forEach((btn) => {
    btn.addEventListener("click", () => setToolMode(btn.dataset.mode));
  });

  // Coordinate System Toggle
  $("coordBtn").addEventListener("click", () => {
    $("coordBtn").textContent = $("coordBtn").textContent === "World" ? "Local" : "World";
    log(`Coordinate System: ${$("coordBtn").textContent}`);
  });

  // Dock Tabs (Content Browser / Output Log)
  document.querySelectorAll(".dock-tabs .tab[data-dock]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".dock-tabs .tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const isContent = tab.dataset.dock === "content";
      $("dockContent").classList.toggle("hidden", !isContent);
      $("fullLogWrap").classList.toggle("hidden", isContent);
    });
  });

  // Dock Minimize & Drawer Toggle Button
  $("dockCloseBtn").addEventListener("click", () => toggleContentDrawer(false));
  $("contentDrawerBtn").addEventListener("click", () => toggleContentDrawer());

  // PIE Controls
  $("playBtn").addEventListener("click", () => setPlaying(true));
  $("pauseBtn").addEventListener("click", () => {
    $("viewport").classList.toggle("playing");
    log("PIE Paused", "LogBlueprintUserMessages");
  });
  $("stopBtn").addEventListener("click", () => setPlaying(false));

  // Viewport Render Mode Buttons
  document.querySelectorAll(".vp-dd[data-view]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const view = tab.dataset.view;
      if (view === "show") {
        log("Show Flags: Grid, Bounds, Static Meshes, Lumen Reflections", "LogTemp");
        return;
      }
      $("viewport").classList.remove("unlit", "wireframe");
      if (view === "unlit") $("viewport").classList.add("unlit");
      if (view === "wireframe") $("viewport").classList.add("wireframe");
      document.querySelectorAll(".vp-dd[data-view]").forEach((t) => t.classList.toggle("active-mode", t === tab));
      log(`Viewport Render Mode: ${tab.textContent.replace("▾", "").trim()}`);
    });
  });

  // Game View Button
  $("vpGameViewBtn").addEventListener("click", () => toggleGameView());

  // Console Command Input
  $("consoleInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      executeConsoleCommand(e.target.value);
      e.target.value = "";
    }
  });

  // Clear Log Button
  $("clearLogBtn")?.addEventListener("click", () => {
    state.logs = [];
    log("Output log cleared", "LogTemp");
  });

  // Live Coding Badge Click
  $("liveCodingBadge").addEventListener("click", () => {
    log("Live Coding compile started...", "LogLiveCoding");
    setTimeout(() => {
      log("Live Coding compile succeeded: 0 errors, 0 warnings (0.19s)", "LogLiveCoding");
    }, 400);
  });

  // Save Level Button
  $("saveLevelBtn")?.addEventListener("click", () => {
    log("Saved /Game/Portfolio/PersistentLevel.umap", "LogTemp");
  });

  // Quick Open Asset (Ctrl+P)
  $("quickOpen").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const q = e.target.value.toLowerCase();
    const all = [...flattenTree(outliner), ...projects.map((p) => ({ id: p.id, label: p.title }))];
    const hit = all.find((n) => n.label.toLowerCase().includes(q));
    if (hit) {
      select(hit.id, "Quick Open");
      e.target.value = "";
    }
  });

  // Menubar Click Handlers
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
    else if (action === "stop") setPlaying(false);
    else if (action === "compile") $("liveCodingBadge").click();
    else if (action === "drawer") toggleContentDrawer();
    else if (action === "log") document.querySelector('[data-dock="log"]').click();
    else if (action === "focus-outliner") $("outlinerFilter").focus();
    else if (action === "focus-details") $("details").scrollIntoView({ behavior: "smooth" });
    else if (action === "save") $("saveLevelBtn").click();
    else if (action === "noop") log("Exit ignored (Simulation Mode)", "LogTemp");
    else select(action, "Menu");
    closeMenu();
  });

  document.addEventListener("click", () => closeMenu());

  // Global Keyboard Shortcuts (Unreal Editor Native)
  document.addEventListener("keydown", (e) => {
    const isInput = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
    if (e.key === "Escape") {
      if (state.playing) setPlaying(false);
      closeMenu();
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
      e.preventDefault();
      $("quickOpen").focus();
    }
    if ((e.ctrlKey || e.metaKey) && e.code === "Space") {
      e.preventDefault();
      toggleContentDrawer();
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      $("saveLevelBtn")?.click();
    }

    if (isInput) return;

    if (e.key.toLowerCase() === "q") setToolMode("select");
    if (e.key.toLowerCase() === "w") setToolMode("move");
    if (e.key.toLowerCase() === "e") setToolMode("rotate");
    if (e.key.toLowerCase() === "r") setToolMode("scale");
    if (e.key.toLowerCase() === "g") toggleGameView();
    if (e.key.toLowerCase() === "f") {
      cam.pitch = -20;
      cam.yaw = 35;
      cam.zoom = 1;
      updateActorVisuals();
      log(`Camera: Focused on ${getDetail(state.selected).title}`, "LogTemp");
    }
    if (e.altKey && e.key.toLowerCase() === "p") {
      e.preventDefault();
      setPlaying(!state.playing);
    }
    if (e.key === "~" || e.key === "`") {
      e.preventDefault();
      $("consoleInput").focus();
    }
  });

  $("worldSettingsTab")?.addEventListener("click", () => select("world", "World Settings"));
}

init();

