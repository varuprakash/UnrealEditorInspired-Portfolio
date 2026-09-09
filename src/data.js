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
    youtube: "https://www.youtube.com/@madmonk4games",
    email: "mailto:varuprakash5739@gmail.com",
  },
};

const outliner = [
  {
    id: "world",
    label: "PersistentLevel",
    type: "World",
    visible: true,
    children: [
      {
        id: "hero",
        label: "BP_PrakashVaru",
        type: "Character",
        icon: "bp",
        visible: true,
      },
      {
        id: "exp",
        label: "Experience",
        type: "Folder",
        visible: true,
        children: [
          { id: "job-300", label: "BP_300Minds", type: "Actor", icon: "bp", visible: true },
          { id: "job-wrks", label: "BP_WRKSGames", type: "Actor", icon: "bp", visible: true },
          { id: "job-viitor", label: "BP_ViitorCloud", type: "Actor", icon: "bp", visible: true },
        ],
      },
      {
        id: "edu",
        label: "Education",
        type: "Folder",
        visible: true,
        children: [{ id: "edu-gtu", label: "BP_GTU_ComputerScience", type: "Actor", icon: "bp", visible: true }],
      },
      {
        id: "skills",
        label: "SkillComponents",
        type: "Folder",
        visible: true,
        children: [
          { id: "sk-ue", label: "UC_UnrealEngine", type: "Component", icon: "comp", visible: true },
          { id: "sk-cpp", label: "UC_CppGameplay", type: "Component", icon: "comp", visible: true },
          { id: "sk-bp", label: "UC_Blueprints", type: "Component", icon: "comp", visible: true },
          { id: "sk-sys", label: "UC_SystemsDesign", type: "Component", icon: "comp", visible: true },
        ],
      },
      { id: "contact", label: "BP_ContactBridge", type: "Actor", icon: "bp", visible: true },
    ],
  },
];

const defaultTransform = {
  hero: { location: [0, 0, 92], rotation: [0, 0, 45], scale: [1, 1, 1] },
  "job-300": { location: [140, 260, 0], rotation: [0, 0, 15], scale: [1, 1, 1] },
  "job-wrks": { location: [-180, 220, 0], rotation: [0, 0, -30], scale: [1, 1, 1] },
  "job-viitor": { location: [280, -120, 0], rotation: [0, 0, 60], scale: [1, 1, 1] },
  "edu-gtu": { location: [-220, -180, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  contact: { location: [0, -320, 0], rotation: [0, 0, 180], scale: [1, 1, 1] },
  world: { location: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
};

const components = {
  hero: [
    { name: "BP_PrakashVaru (Self)", type: "ACharacter", icon: "bp", root: true },
    { name: "CapsuleComponent", type: "UCapsuleComponent", icon: "comp", indent: 1 },
    { name: "ArrowComponent", type: "UArrowComponent", icon: "comp", indent: 2 },
    { name: "Mesh (SkeletalMeshComponent)", type: "USkeletalMeshComponent", icon: "mesh", indent: 2 },
    { name: "CharacterMovement", type: "UCharacterMovementComponent", icon: "comp", indent: 2 },
    { name: "CameraBoom (SpringArm)", type: "USpringArmComponent", icon: "comp", indent: 2 },
    { name: "FollowCamera", type: "UCameraComponent", icon: "camera", indent: 3 },
    { name: "GameplaySystems", type: "UGameplayComponent", icon: "comp", indent: 2 },
  ],
  "job-300": [
    { name: "BP_300Minds (Self)", type: "AActor", icon: "bp", root: true },
    { name: "DefaultSceneRoot", type: "USceneComponent", icon: "comp", indent: 1 },
    { name: "DigitalTwinPipeline", type: "UDataComponent", icon: "comp", indent: 2 },
    { name: "ParquetDecoder", type: "UActorComponent", icon: "comp", indent: 2 },
    { name: "MinimapSubsystem", type: "UPluginSubsystem", icon: "comp", indent: 2 },
  ],
  "job-wrks": [
    { name: "BP_WRKSGames (Self)", type: "AActor", icon: "bp", root: true },
    { name: "DefaultSceneRoot", type: "USceneComponent", icon: "comp", indent: 1 },
    { name: "BuildingPlacementGrid", type: "USystemsComponent", icon: "comp", indent: 2 },
    { name: "ResourceEconomyLoop", type: "UGameplayAbilityComponent", icon: "comp", indent: 2 },
    { name: "ProgressionManager", type: "UActorComponent", icon: "comp", indent: 2 },
  ],
  "job-viitor": [
    { name: "BP_ViitorCloud (Self)", type: "AActor", icon: "bp", root: true },
    { name: "DefaultSceneRoot", type: "USceneComponent", icon: "comp", indent: 1 },
    { name: "VROrigin", type: "UXRSceneComponent", icon: "comp", indent: 2 },
    { name: "CricketPhysicsBat", type: "UMotionControllerComponent", icon: "comp", indent: 3 },
    { name: "TwinCitySimulation", type: "UActorComponent", icon: "comp", indent: 2 },
  ],
  "edu-gtu": [
    { name: "BP_GTU_ComputerScience (Self)", type: "AActor", icon: "bp", root: true },
    { name: "DefaultSceneRoot", type: "USceneComponent", icon: "comp", indent: 1 },
    { name: "ComputerScienceCore", type: "UActorComponent", icon: "comp", indent: 2 },
    { name: "SoftwareArchitecture", type: "UActorComponent", icon: "comp", indent: 2 },
  ],
  contact: [
    { name: "BP_ContactBridge (Self)", type: "AActor", icon: "bp", root: true },
    { name: "DefaultSceneRoot", type: "USceneComponent", icon: "comp", indent: 1 },
    { name: "NetworkRPCBridge", type: "UActorComponent", icon: "comp", indent: 2 },
    { name: "LinkedInConnector", type: "UExternalSubsystem", icon: "comp", indent: 2 },
  ],
};

const details = {
  hero: {
    title: "BP_PrakashVaru",
    class: "ACharacter / Gameplay Programmer",
    category: "Identity & Profile",
    transform: defaultTransform.hero,
    properties: [
      ["Display Name", "Prakash Varu"],
      ["Class Hierarchy", "ACharacter > APawn > AActor > UObject"],
      ["Primary Specialty", "Unreal Engine C++ & Systems"],
      ["Engine Version", "Unreal Engine 5.4 / 5.5"],
      ["Location", "Gujarat, India (Remote Ready)"],
      ["Contact Phone", "+91 9664829695"],
      ["Direct Email", "varuprakash5739@gmail.com"],
      ["Scripting", "Blueprints & Gameplay Architecture"],
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
    transform: defaultTransform["job-300"],
    properties: [
      ["Studio", "300Minds"],
      ["Location", "Ahmedabad, India"],
      ["Role", "Unreal Developer"],
      ["Timeline", "2025 — 2026"],
      ["Focus Areas", "Digital Twins, Marketplace Plugins, Content Packs"],
      ["Core Systems", "Parquet Data Integration, Minimap Subsystem"],
    ],
    body: "Contributed to client projects utilizing Unreal Engine Digital Twin solutions, as well as developing Unreal Engine Marketplace plugins and content packs. Developed, integrated, and optimized systems such as Parquet Data and Minimap, delivering production-ready Unreal Engine solutions.",
  },
  "job-wrks": {
    title: "Unreal Gameplay Programmer — WRKS Games",
    class: "AActor / Professional Experience",
    category: "Experience",
    transform: defaultTransform["job-wrks"],
    properties: [
      ["Studio", "WRKS Games"],
      ["Location", "Singapore (Remote)"],
      ["Role", "Unreal Gameplay Programmer"],
      ["Timeline", "2024 — 2025"],
      ["Genre", "City Builder Prototype"],
      ["Key Modules", "Building Placement, Resource Flow, Progression"],
    ],
    body: "Served as a Core Game Developer for a City Builder Game Prototype, engineering core gameplay systems including building placement, resource management, and progression mechanics. Architected scalable, modular, and performance-optimized systems to ensure a seamless player experience. Collaborated on gameplay design, prototyped new features, and integrated them into the broader architecture while maintaining system stability and performance.",
  },
  "job-viitor": {
    title: "Unreal Software Engineer — ViitorCloud",
    class: "AActor / Professional Experience",
    category: "Experience",
    transform: defaultTransform["job-viitor"],
    properties: [
      ["Studio", "ViitorCloud"],
      ["Location", "Ahmedabad, India"],
      ["Role", "Unreal Software Engineer"],
      ["Timeline", "2023 — 2024"],
      ["Domains", "VR Gaming & Twin City PoC"],
      ["Deliverables", "VR Cricket Game, Dynamic Mechanics, Milestone Releases"],
    ],
    body: "Engineered core mechanics, dynamic systems, and performance optimizations for multiple projects, including a Twin City proof-of-concept and a VR Cricket game. Collaborated across cross-functional teams, conducted user testing, and consistently delivered key milestones on schedule.",
  },
  "edu-gtu": {
    title: "Gujarat Technological University",
    class: "UObject / Education",
    category: "Education",
    transform: defaultTransform["edu-gtu"],
    properties: [
      ["Institution", "Gujarat Technological University (GTU)"],
      ["Degree", "Bachelor of Engineering in Computer Science"],
      ["Period", "2020 — 2024"],
      ["Graduation CGPA", "8.74 / 10.0"],
      ["Specialization", "Software Engineering, Algorithms, C++ Systems"],
    ],
    body: "Computer Science graduate with an 8.74 CGPA. Rigorous foundation in software engineering, data structures, and computer graphics directly applied to gameplay architecture, C++ systems, and Unreal Engine production workflows.",
  },
  "sk-ue": skillDetail("Unreal Engine", "Engine", "Production Unreal development across digital twins, city builders, VR, plugins, and content packs."),
  "sk-cpp": skillDetail("C++ Programming", "Language", "Gameplay programming in C++: modular systems, memory management, performance, and engine integration."),
  "sk-bp": skillDetail("Blueprints", "Visual Scripting", "Rapid prototyping, event graphs, function libraries, and designer-facing gameplay wiring without sacrificing architecture."),
  "sk-sys": skillDetail("Gameplay Programming", "Systems", "Building placement, resource loops, progression mechanics, minimap, parquet data, and VR mechanics."),
  contact: {
    title: "BP_ContactBridge",
    class: "AActor / Communication",
    category: "Contact & Network",
    transform: defaultTransform.contact,
    properties: [
      ["Phone", "+91 9664829695"],
      ["Email", "varuprakash5739@gmail.com"],
      ["LinkedIn", "linkedin.com/in/prakash-v-6406b2255"],
      ["GitHub", "github.com/varuprakash"],
      ["Itch.io", "madmonkgames.itch.io"],
      ["Location", "Jamjodhpur, Gujarat 360530, India"],
    ],
    body: "Open to Unreal Engine gameplay, systems, plugin, and digital-twin roles worldwide (Remote / On-site / Hybrid). Reach out for opportunities, collaborations, or engineering discussions.",
    cta: [
      { label: "Call Phone", href: "tel:+919664829695" },
      { label: "Send Email", href: profile.links.email },
      { label: "LinkedIn Profile", href: profile.links.linkedin },
      { label: "GitHub Profile", href: profile.links.github },
    ],
  },
};

function skillDetail(name, kind, body) {
  return {
    title: name,
    class: `UActorComponent / ${kind}`,
    category: "Skill Component",
    transform: { location: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    properties: [
      ["Component Type", name],
      ["Subsystem Category", kind],
      ["Version Control", "Git / PlasticSCM / Perforce"],
      ["Production Status", "Verified & Battle-Tested"],
    ],
    body,
  };
}

const skills = [
  { id: "sk-ue", name: "Unreal Engine 5", level: 94, category: "Core" },
  { id: "sk-cpp", name: "C++ (Modern / UE Native)", level: 90, category: "Core" },
  { id: "sk-bp", name: "Blueprints & Visual Scripting", level: 92, category: "Core" },
  { id: "gameplay", name: "Gameplay Architecture", level: 90, category: "Engineering" },
  { id: "design", name: "Mechanics Prototyping", level: 86, category: "Design" },
  { id: "gdd", name: "Design Documentation & GDD", level: 82, category: "Design" },
  { id: "vcs", name: "Source Control (Git)", level: 88, category: "Engineering" },
  { id: "ps", name: "Performance & Profiling", level: 86, category: "Engineering" },
];

details.skills = {
  title: "SkillComponents",
  class: "UFolder / Ability Subsystem",
  category: "Skills Overview",
  transform: { location: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  properties: skills.map((s) => [s.name, `${s.level}% Mastery`]),
  body: "Production-tested skill suite across Unreal Engine 5, C++, Blueprint systems, simulation data pipelines, and scalable gameplay architectures.",
};

details.exp = {
  title: "Experience",
  class: "UFolder / Career Timeline",
  category: "Experience Overview",
  transform: { location: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  properties: [
    ["Commercial Roles", "3 Industry Positions"],
    ["Studios", "300Minds · WRKS Games · ViitorCloud"],
    ["Active Timeline", "2023 — Present"],
    ["Domains", "Digital Twins, City Builder Gameplay, VR Simulation"],
  ],
  body: "Progressive career path in Unreal Engine: from VR and software engineering to complex city-builder simulation mechanics, and enterprise digital-twin & marketplace plugin engineering.",
};

details.edu = {
  title: "Education",
  class: "UFolder / Academic Records",
  category: "Academic",
  transform: { location: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  properties: [
    ["University", "Gujarat Technological University (GTU)"],
    ["Degree", "B.E. Computer Science"],
    ["Final CGPA", "8.74 / 10.0"],
  ],
  body: "Bachelor of Engineering in Computer Science with distinction (8.74 CGPA). Comprehensive foundation in software engineering, algorithms, graphics math, and C++.",
};

details.world = {
  title: "PersistentLevel",
  class: "UWorld",
  category: "World Settings",
  transform: { location: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  properties: [
    ["Level Asset", "/Game/Portfolio/PersistentLevel.umap"],
    ["Game Mode", "GM_PrakashPortfolio"],
    ["Default Pawn Class", "BP_PrakashVaru"],
    ["Player Controller", "PC_PortfolioController"],
    ["World Partition", "Enabled (Hierarchical LOD)"],
  ],
  body: profile.summary,
};

const projects = [
  // --- EXPERIENCE (3 past industry roles) ---
  {
    id: "exp-300",
    title: "300Minds — Unreal Developer",
    type: "Digital Twins & Plugins",
    filter: "experience",
    asset: "BP",
    assetClass: "Blueprint Class",
    color: "#0070e0",
    href: profile.links.linkedin,
    outlinerId: "job-300",
    properties: [
      ["Studio", "300Minds"],
      ["Location", "Ahmedabad, India"],
      ["Role", "Unreal Developer"],
      ["Timeline", "2025 — 2026"],
      ["Domain", "Digital Twin Solutions & Marketplace Plugins"],
      ["Key Systems", "Parquet Data Integration, Minimap Subsystem"],
    ],
    blurb:
      "Contributed to client projects utilizing Unreal Engine Digital Twin solutions, as well as developing Unreal Engine Marketplace plugins and content packs. Developed, integrated, and optimized systems such as Parquet Data and Minimap, delivering production-ready Unreal Engine solutions.",
  },
  {
    id: "exp-wrks",
    title: "WRKS Games — Gameplay Programmer",
    type: "City Builder Gameplay",
    filter: "experience",
    asset: "BP",
    assetClass: "Blueprint Class",
    color: "#e89c2d",
    href: profile.links.linkedin,
    outlinerId: "job-wrks",
    properties: [
      ["Studio", "WRKS Games"],
      ["Location", "Singapore (Remote)"],
      ["Role", "Unreal Gameplay Programmer"],
      ["Timeline", "2024 — 2025"],
      ["Genre", "City Builder Prototype"],
      ["Core Mechanics", "Building Placement, Resource Economy, Progression"],
    ],
    blurb:
      "Served as a Core Game Developer for a City Builder Game Prototype, engineering core gameplay systems including building placement, resource management, and progression mechanics. Architected scalable, modular, and performance-optimized systems to ensure a seamless player experience. Collaborated on gameplay design, prototyped new features, and integrated them into the broader architecture while maintaining system stability and performance.",
  },
  {
    id: "exp-viitor",
    title: "ViitorCloud — Unreal Software Engineer",
    type: "VR Gaming & Simulation",
    filter: "experience",
    asset: "BP",
    assetClass: "Blueprint Class",
    color: "#10b981",
    href: profile.links.linkedin,
    outlinerId: "job-viitor",
    properties: [
      ["Studio", "ViitorCloud"],
      ["Location", "Ahmedabad, India"],
      ["Role", "Unreal Software Engineer"],
      ["Timeline", "2023 — 2024"],
      ["Focus", "VR Cricket Game & Twin City Proof-of-Concept"],
      ["Deliverables", "Physics Mechanics, Optimization, Cross-Functional Delivery"],
    ],
    blurb:
      "Engineered core mechanics, dynamic systems, and performance optimizations for multiple projects, including a Twin City proof-of-concept and a VR Cricket game. Collaborated across cross-functional teams, conducted user testing, and consistently delivered key milestones on schedule.",
  },

  // --- ITCH.IO (3 assets: Storefront, PacificSail, Don'tDrive) ---
  {
    id: "itch-profile",
    title: "Prakash Itch.io",
    type: "Developer Storefront",
    filter: "itchio",
    asset: "DATA",
    assetClass: "Data Asset",
    color: "#fa5c5c",
    href: profile.links.itch,
    properties: [
      ["Platform", "Itch.io Developer Page"],
      ["Studio / Label", "MADMONK"],
      ["Developer", "Prakash Varu"],
      ["Published Titles", "PacificSail, Don'tDrive (Demo)"],
      ["Engine", "Unreal Engine"],
    ],
    blurb:
      "Official itch.io developer profile and storefront by Prakash Varu. Showcases playable prototypes, physics mechanics demos, and game jam titles designed and built in Unreal Engine.",
  },
  {
    id: "itch-pacific",
    title: "PacificSail",
    type: "Simulation / Survival",
    filter: "itchio",
    asset: "MAP",
    assetClass: "Shipped Game",
    color: "#06b6d4",
    href: "https://madmonkgames.itch.io/pacificsail",
    properties: [
      ["Game Title", "PacificSail"],
      ["Genre", "Radiation-Wave Ocean Survival"],
      ["Platform", "Windows PC (itch.io)"],
      ["Core Mechanics", "Boat Navigation, Fishing, Scavenging, Resource Economy"],
      ["Release Status", "Finished & Published on itch.io"],
    ],
    blurb:
      "Radiation-wave survival at sea: helm the boat, fish and scavenge, and manage fuel, food, and water. Finished and published on itch.io under MADMONK after a missed jam deadline.",
  },
  {
    id: "itch-drive",
    title: "Don'tDrive",
    type: "Physics / Platformer",
    filter: "itchio",
    asset: "MAP",
    assetClass: "In-Development Game",
    color: "#f97316",
    href: "https://madmonkgames.itch.io/dontdrive",
    properties: [
      ["Game Title", "Don'tDrive"],
      ["Genre", "Physics Rage Platformer"],
      ["Platform", "Windows PC (itch.io)"],
      ["Mechanics", "Chaotic Physics Driving, Procedural Obstacles, Retry Loops"],
      ["Release Status", "In Active Development under MADMONK"],
    ],
    blurb:
      "Rage-driving demo in development: climb chaotic physics terrain, fall, retry, and push higher. Currently working on Don'tDrive under MADMONK.",
  },

  // --- YOUTUBE (Devlogs & Technical Showcase) ---
  {
    id: "yt-madmonk",
    title: "Prakash YouTube",
    type: "Devlogs & Gameplay",
    filter: "youtube",
    asset: "MEDIA",
    assetClass: "Media Stream",
    color: "#ff0000",
    href: profile.links.youtube,
    properties: [
      ["Channel", "@madmonk4games"],
      ["Platform", "YouTube"],
      ["Content", "Unreal Gameplay Demonstrations, Devlogs, Mechanics Showcase"],
      ["Creator", "Prakash Varu"],
    ],
    blurb:
      "Official YouTube channel (@madmonk4games) by Prakash Varu featuring Unreal Engine gameplay showcases, gameplay mechanics breakdowns, devlogs, and prototype video demonstrations.",
  },
];

details.p = Object.fromEntries(
  projects.map((p) => [
    p.id,
    {
      title: p.title,
      class: `UAsset / ${p.assetClass}`,
      category: `${p.filter.charAt(0).toUpperCase() + p.filter.slice(1)} Asset`,
      transform: defaultTransform[p.outlinerId] || { location: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
      properties: p.properties || [
        ["Asset Name", p.title],
        ["Asset Class", p.assetClass],
        ["Genre / Category", p.type],
        ["Package Path", `/Game/${p.filter}/${p.id}`],
      ],
      body: p.blurb,
      cta: [
        { label: "Open Link", href: p.href },
        ...(p.outlinerId ? [{ label: "View in Outliner", href: `#${p.outlinerId}` }] : []),
      ],
    },
  ])
);

const menus = {
  file: [
    { label: "Open Persistent Level", action: "hero" },
    { label: "Open Content Drawer", action: "drawer" },
    { label: "Download Resume / GitHub", href: "https://github.com/varuprakash" },
    { divider: true },
    { label: "Save Current Level (Ctrl+S)", action: "save" },
    { label: "Exit Editor", action: "noop" },
  ],
  edit: [
    { label: "Select BP_PrakashVaru", action: "hero" },
    { label: "Select Experience Group", action: "exp" },
    { label: "Select Contact Bridge", action: "contact" },
    { divider: true },
    { label: "Editor Preferences...", action: "prefs" },
    { label: "Project Settings...", action: "settings" },
  ],
  window: [
    { label: "World Outliner", action: "focus-outliner" },
    { label: "Details Panel", action: "focus-details" },
    { label: "Content Drawer (Ctrl+Space)", action: "drawer" },
    { label: "Output Log", action: "log" },
  ],
  tools: [
    { label: "Play In Editor (Alt+P)", action: "play" },
    { label: "Stop PIE (Esc)", action: "stop" },
    { divider: true },
    { label: "Trigger Live Coding Compile (Ctrl+Alt+F11)", action: "compile" },
  ],
  build: [
    { label: "Compile Blueprint", action: "compile" },
    { label: "Build Lighting (Lumen Realtime)", action: "compile" },
    { label: "Build All Levels", action: "compile" },
  ],
  help: [
    { label: "About Prakash Varu", action: "hero" },
    { label: "LinkedIn Profile", href: profile.links.linkedin },
    { label: "GitHub Code Repository", href: profile.links.github },
    { label: "Prakash Itch.io Games", href: profile.links.itch },
    { label: "Prakash YouTube (@madmonk4games)", href: profile.links.youtube },
  ],
};

