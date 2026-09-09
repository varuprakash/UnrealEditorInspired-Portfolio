const profile = {
  name: "Prakash Varu",
  role: "Game Programmer / Unreal Engine",
  location: "Hothiji Khadba, Jamjodhpur, Gujarat 360530",
  phone: "+91 9664829695",
  email: "varuprakash5739@gmail.com",
  summary:
    "Game Developer with strong expertise in Unreal Engine, experienced in developing projects from initial prototypes to fully polished titles. Skilled in designing engaging gameplay mechanics, prototyping innovative concepts, and delivering refined player experiences. Passionate about continuous learning and advancing in game development.",
  links: {
    linkedin: "https://www.linkedin.com/in/prakash-v-6406b2255",
    github: "https://github.com/varuprakash",
    itch: "https://madmonkgames.itch.io/",
    email: "mailto:varuprakash5739@gmail.com",
  },
};

const outliner = [
  {
    id: "world",
    label: "Persistent Level",
    type: "World",
    children: [
      { id: "hero", label: "BP_PrakashVaru", type: "Character", icon: "pawn" },
      {
        id: "exp",
        label: "Experience",
        type: "Folder",
        children: [
          { id: "job-300", label: "BP_300Minds", type: "Actor", icon: "actor" },
          { id: "job-wrks", label: "BP_WRKSGames", type: "Actor", icon: "actor" },
          { id: "job-viitor", label: "BP_ViitorCloud", type: "Actor", icon: "actor" },
        ],
      },
      {
        id: "edu",
        label: "Education",
        type: "Folder",
        children: [{ id: "edu-gtu", label: "BP_GTU_ComputerScience", type: "Actor", icon: "actor" }],
      },
      {
        id: "skills",
        label: "SkillComponents",
        type: "Folder",
        children: [
          { id: "sk-ue", label: "UC_UnrealEngine", type: "Component" },
          { id: "sk-cpp", label: "UC_CppGameplay", type: "Component" },
          { id: "sk-bp", label: "UC_Blueprints", type: "Component" },
          { id: "sk-sys", label: "UC_SystemsDesign", type: "Component" },
        ],
      },
      { id: "contact", label: "BP_ContactBridge", type: "Actor", icon: "actor" },
    ],
  },
];

const details = {
  hero: {
    title: "BP_PrakashVaru",
    class: "ACharacter / Gameplay Programmer",
    category: "Identity",
    properties: [
      ["Display Name", "Prakash Varu"],
      ["Class", "Game Programmer / Unreal Engine"],
      ["Location", "Jamjodhpur, Gujarat"],
      ["Phone", "+91 9664829695"],
      ["Email", "varuprakash5739@gmail.com"],
      ["Engine", "Unreal Engine 5"],
      ["Primary Language", "C++"],
      ["Scripting", "Blueprints"],
    ],
    body: profile.summary,
    cta: [
      { label: "Open LinkedIn", href: profile.links.linkedin },
      { label: "Open GitHub", href: profile.links.github },
      { label: "Open Itch.io", href: profile.links.itch },
      { label: "Send Email", href: profile.links.email },
    ],
  },
  "job-300": {
    title: "Unreal Developer — 300Minds",
    class: "AActor / Professional Experience",
    category: "Experience",
    properties: [
      ["Studio", "300Minds"],
      ["Location", "Ahmedabad"],
      ["Role", "Unreal Developer"],
      ["Period", "2025 — 2026"],
      ["Domain", "Digital Twin / Marketplace"],
    ],
    body: "Contributed to client projects utilizing Unreal Engine Digital Twin solutions, as well as developing Unreal Engine Marketplace plugins and content packs. Developed, integrated, and optimized systems such as Parquet Data and Minimap, delivering production-ready Unreal Engine solutions.",
  },
  "job-wrks": {
    title: "Unreal Gameplay Programmer — WRKS Games",
    class: "AActor / Professional Experience",
    category: "Experience",
    properties: [
      ["Studio", "WRKS Games"],
      ["Location", "Singapore"],
      ["Role", "Unreal Gameplay Programmer"],
      ["Period", "2024 — 2025"],
      ["Genre", "City Builder"],
    ],
    body: "Served as a Core Game Developer for a City Builder Game Prototype, engineering core gameplay systems including building placement, resource management, and progression mechanics. Architected scalable, modular, and performance-optimized systems to ensure a seamless player experience. Collaborated on gameplay design, prototyped new features, and integrated them into the broader architecture while maintaining system stability and performance.",
  },
  "job-viitor": {
    title: "Unreal Software Engineer — ViitorCloud",
    class: "AActor / Professional Experience",
    category: "Experience",
    properties: [
      ["Studio", "ViitorCloud"],
      ["Location", "Ahmedabad"],
      ["Role", "Unreal Software Engineer"],
      ["Period", "2023 — 2024"],
      ["Focus", "Gameplay / VR / Digital Twin"],
    ],
    body: "Engineered core mechanics, dynamic systems, and performance optimizations for multiple projects, including a Twin City proof-of-concept and a VR Cricket game. Collaborated across cross-functional teams, conducted user testing, and consistently delivered key milestones on schedule.",
  },
  "edu-gtu": {
    title: "Gujarat Technological University",
    class: "UObject / Education",
    category: "Education",
    properties: [
      ["Institution", "Gujarat Technological University"],
      ["Degree", "Bachelor in Computer Science"],
      ["Period", "2020 — 2024"],
      ["CGPA", "8.74"],
    ],
    body: "Computer Science graduate with a 8.74 CGPA. Foundation in software engineering applied to gameplay architecture, C++ systems, and Unreal Engine production work.",
  },
  "sk-ue": skillDetail("Unreal Engine", "Engine", "Production Unreal development across digital twins, city builders, VR, plugins, and content packs."),
  "sk-cpp": skillDetail("C++ Programming", "Language", "Gameplay programming in C++: modular systems, performance, and production integration."),
  "sk-bp": skillDetail("Blueprints", "Visual Scripting", "Rapid prototyping and designer-facing gameplay wiring without sacrificing architecture."),
  "sk-sys": skillDetail("Gameplay Programming", "Systems", "Building placement, resource loops, progression, minimap, parquet data, and VR mechanics."),
  contact: {
    title: "BP_ContactBridge",
    class: "AActor / Communication",
    category: "Contact",
    properties: [
      ["Phone", "+91 9664829695"],
      ["Email", "varuprakash5739@gmail.com"],
      ["LinkedIn", "prakash-v-6406b2255"],
      ["GitHub", "varuprakash"],
      ["Itch.io", "madmonkgames"],
      ["Address", "Hothiji Khadba, Jamjodhpur, Gujarat 360530"],
    ],
    body: "Open to Unreal Engine gameplay, systems, plugin, and digital-twin work. Reach out for roles, collaborations, or marketplace / simulation projects.",
    cta: [
      { label: "Call", href: "tel:+919664829695" },
      { label: "Email", href: profile.links.email },
      { label: "LinkedIn", href: profile.links.linkedin },
      { label: "GitHub", href: profile.links.github },
    ],
  },
};

function skillDetail(name, kind, body) {
  return {
    title: name,
    class: `UActorComponent / ${kind}`,
    category: "Skills",
    properties: [
      ["Component", name],
      ["Category", kind],
      ["Source Control", "Git"],
      ["Status", "Production"],
    ],
    body,
  };
}

const skills = [
  { id: "sk-ue", name: "Unreal Engine", level: 92 },
  { id: "sk-cpp", name: "C++ Programming", level: 88 },
  { id: "sk-bp", name: "Blueprints", level: 90 },
  { id: "gameplay", name: "Gameplay Programming", level: 90 },
  { id: "design", name: "Design Development", level: 82 },
  { id: "gdd", name: "Design Documentation", level: 80 },
  { id: "vcs", name: "Source Control", level: 85 },
  { id: "ps", name: "Problem Solving", level: 90 },
];

details.skills = {
  title: "SkillComponents",
  class: "UFolder / Abilities",
  category: "Skills",
  properties: skills.map((s) => [s.name, `${s.level}%`]),
  body: "Core stack from professional Unreal work: engine, C++, Blueprints, gameplay systems, documentation, and source control.",
};

details.exp = {
  title: "Experience",
  class: "UFolder / Career",
  category: "Experience",
  properties: [
    ["Roles", "3"],
    ["Studios", "300Minds · WRKS Games · ViitorCloud"],
    ["Range", "2023 — 2026"],
  ],
  body: "Professional Unreal path from software engineering and VR into city-builder gameplay, then digital twin and marketplace plugin work.",
};

details.edu = {
  title: "Education",
  class: "UFolder / Academic",
  category: "Education",
  properties: [["University", "GTU"], ["CGPA", "8.74"]],
  body: "Bachelor in Computer Science, Gujarat Technological University, 2020–2024.",
};

details.world = {
  title: "Persistent Level",
  class: "UWorld",
  category: "World",
  properties: [
    ["Map", "/Game/Portfolio/Persistent"],
    ["Game Mode", "GM_HirePrakash"],
    ["Default Pawn", "BP_PrakashVaru"],
  ],
  body: profile.summary,
};

const projects = [
  {
    id: "p-twin",
    title: "Digital Twin Systems",
    type: "Unreal / Simulation",
    filter: "professional",
    asset: "BP",
    color: "#3aa0ff",
    href: profile.links.linkedin,
    blurb:
      "Client digital-twin work at 300Minds: Parquet data pipelines and minimap systems shipped as production Unreal solutions.",
  },
  {
    id: "p-market",
    title: "Marketplace Plugins",
    type: "Plugin / Content Pack",
    filter: "system",
    asset: "UASSET",
    color: "#c084fc",
    href: profile.links.linkedin,
    blurb:
      "Unreal Engine Marketplace plugins and content packs — packaged, integrated, and optimized for other developers.",
  },
  {
    id: "p-city",
    title: "City Builder Prototype",
    type: "Gameplay / Systems",
    filter: "professional",
    asset: "BP",
    color: "#f0a020",
    href: profile.links.linkedin,
    blurb:
      "Core developer at WRKS Games: building placement, resource management, and modular progression for a city-builder prototype.",
  },
  {
    id: "p-vr",
    title: "VR Cricket",
    type: "VR / Gameplay",
    filter: "professional",
    asset: "MAP",
    color: "#34d399",
    href: profile.links.linkedin,
    blurb:
      "ViitorCloud: core mechanics, dynamic systems, and performance work on a VR cricket title with user testing and milestone delivery.",
  },
  {
    id: "p-twincity",
    title: "Twin City PoC",
    type: "Digital Twin",
    filter: "professional",
    asset: "MAP",
    color: "#60a5fa",
    href: profile.links.linkedin,
    blurb: "Proof-of-concept twin-city simulation — mechanics, dynamic systems, and optimization for a cross-functional team.",
  },
  {
    id: "p-pacific",
    title: "PacificSail",
    type: "Simulation / Survival",
    filter: "prototype",
    asset: "MAP",
    color: "#38bdf8",
    href: "https://madmonkgames.itch.io/pacificsail",
    blurb:
      "Radiation-wave survival at sea: helm the boat, fish and scavenge, and manage fuel, food, and water. Finished and published on itch after a missed jam deadline.",
  },
  {
    id: "p-drive",
    title: "Don'tDrive",
    type: "Physics / Platformer",
    filter: "prototype",
    asset: "MAP",
    color: "#fb923c",
    href: "https://madmonkgames.itch.io/dontdrive",
    blurb:
      "Rage-driving demo in development: climb chaotic physics terrain, fall, retry, and push higher. Currently working on Don'tDrive under MADMONK.",
  },
];

details.p = Object.fromEntries(
  projects.map((p) => [
    p.id,
    {
      title: p.title,
      class: `UAsset / ${p.type}`,
      category: "Content",
      properties: [
        ["Asset Type", p.asset],
        ["Genre", p.type],
        ["Folder", p.filter],
      ],
      body: p.blurb,
      cta: [{ label: "Open Asset", href: p.href }],
    },
  ])
);

const menus = {
  file: [
    { label: "Open Persistent Level", action: "hero" },
    { label: "Open Content Browser", action: "browser" },
    { label: "Download Resume (PDF)", href: "https://github.com/varuprakash" },
    { divider: true },
    { label: "Exit Editor", action: "noop" },
  ],
  edit: [
    { label: "Select Prakash", action: "hero" },
    { label: "Select Experience", action: "exp" },
    { label: "Select Contact", action: "contact" },
  ],
  window: [
    { label: "World Outliner", action: "focus-outliner" },
    { label: "Details", action: "focus-details" },
    { label: "Content Browser", action: "browser" },
  ],
  tools: [
    { label: "Play In Editor", action: "play" },
    { label: "Live Coding Compile", action: "compile" },
  ],
  build: [
    { label: "Compile Blueprint", action: "compile" },
    { label: "Build Lighting", action: "compile" },
  ],
  help: [
    { label: "About This Editor", action: "hero" },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "GitHub", href: profile.links.github },
    { label: "Itch.io", href: profile.links.itch },
  ],
};
