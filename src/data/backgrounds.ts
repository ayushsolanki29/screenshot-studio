export interface BackgroundOption {
  name: string;
  gradient: string;
}

export interface BackgroundCategory {
  category: string;
  options: BackgroundOption[];
}

export const backgrounds: BackgroundCategory[] = [
  {
    category: "Soft Light",
    options: [
      { name: "Peach Dream", gradient: "linear-gradient(135deg, #FFE29F 0%, #FFA99F 100%)" },
      { name: "Cotton Candy", gradient: "linear-gradient(135deg, #FBC2EB 0%, #A6C1EE 100%)" },
      { name: "Soft Lavender", gradient: "linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)" },
      { name: "Morning Sky", gradient: "linear-gradient(135deg, #DCEEFF 0%, #F7F9FC 100%)" },
      { name: "Cream Sunset", gradient: "linear-gradient(135deg, #FFF4D6 0%, #FFD6A5 100%)" }
    ]
  },
  {
    category: "Premium Mesh",
    options: [
      { name: "Aurora", gradient: "linear-gradient(135deg,#b8f2e6,#aed9ff,#d8b4fe)" },
      { name: "Framer Purple", gradient: "linear-gradient(135deg,#D9AFD9,#97D9E1)" },
      { name: "Linear Mesh", gradient: "linear-gradient(135deg,#FFDEE9,#B5FFFC)" },
      { name: "Ocean Mesh", gradient: "linear-gradient(135deg,#89F7FE,#66A6FF)" },
      { name: "Neon Aurora", gradient: "linear-gradient(135deg,#A8FF78,#78FFD6,#84FAB0)" }
    ]
  },
  {
    category: "Dark Premium",
    options: [
      { name: "Midnight", gradient: "linear-gradient(135deg,#111827,#1F2937)" },
      { name: "Graphite", gradient: "linear-gradient(135deg,#202124,#3A3A3A)" },
      { name: "Obsidian", gradient: "linear-gradient(135deg,#0F172A,#334155)" },
      { name: "Space", gradient: "linear-gradient(135deg,#1A1A2E,#16213E)" },
      { name: "Carbon", gradient: "linear-gradient(135deg,#2B2D42,#111827)" }
    ]
  },
  {
    category: "Blue Collection",
    options: [
      { name: "Ocean", gradient: "linear-gradient(135deg,#4FACFE,#00F2FE)" },
      { name: "Sky", gradient: "linear-gradient(135deg,#74EBD5,#9FACE6)" },
      { name: "Blueberry", gradient: "linear-gradient(135deg,#667EEA,#764BA2)" },
      { name: "Azure", gradient: "linear-gradient(135deg,#6DD5FA,#2980B9)" },
      { name: "Frozen", gradient: "linear-gradient(135deg,#E0EAFC,#CFDEF3)" }
    ]
  },
  {
    category: "Pink & Purple",
    options: [
      { name: "Candy", gradient: "linear-gradient(135deg,#FF9A9E,#FAD0C4)" },
      { name: "Purple Rain", gradient: "linear-gradient(135deg,#A18CD1,#FBC2EB)" },
      { name: "Rose", gradient: "linear-gradient(135deg,#F6D365,#FDA085)" },
      { name: "Bubblegum", gradient: "linear-gradient(135deg,#FDCB82,#F76B8A)" },
      { name: "Dream", gradient: "linear-gradient(135deg,#C471ED,#F64F59)" }
    ]
  },
  {
    category: "Green",
    options: [
      { name: "Mint", gradient: "linear-gradient(135deg,#A8E063,#56AB2F)" },
      { name: "Forest", gradient: "linear-gradient(135deg,#5A3F37,#2C7744)" },
      { name: "Emerald", gradient: "linear-gradient(135deg,#43E97B,#38F9D7)" },
      { name: "Nature", gradient: "linear-gradient(135deg,#76B852,#8DC26F)" }
    ]
  },
  {
    category: "Warm",
    options: [
      { name: "Sunset", gradient: "linear-gradient(135deg,#FA709A,#FEE140)" },
      { name: "Fire", gradient: "linear-gradient(135deg,#F83600,#F9D423)" },
      { name: "Orange Glow", gradient: "linear-gradient(135deg,#FFB347,#FFCC33)" },
      { name: "Coral", gradient: "linear-gradient(135deg,#FF9966,#FF5E62)" }
    ]
  },
  {
    category: "Minimal",
    options: [
      { name: "Transparent", gradient: "transparent" },
      { name: "Pure White", gradient: "#ffffff" },
      { name: "Warm White", gradient: "#faf8f5" },
      { name: "Cool Gray", gradient: "#f5f7fa" },
      { name: "Stone", gradient: "#ececec" },
      { name: "Light Beige", gradient: "#fdf6ec" }
    ]
  },
  {
    category: "Dark Minimal",
    options: [
      { name: "Black", gradient: "#000000" },
      { name: "Slate", gradient: "#1E293B" },
      { name: "Graphite", gradient: "#2D3748" },
      { name: "Charcoal", gradient: "#202124" },
      { name: "Dark Navy", gradient: "#0F172A" }
    ]
  }
];

export const topDefaults: BackgroundOption[] = [
  { name: "Transparent", gradient: "transparent" },
  { name: "Peach Dream", gradient: "linear-gradient(135deg, #FFE29F 0%, #FFA99F 100%)" },
  { name: "Aurora", gradient: "linear-gradient(135deg,#b8f2e6,#aed9ff,#d8b4fe)" },
  { name: "Framer Purple", gradient: "linear-gradient(135deg,#D9AFD9,#97D9E1)" },
  { name: "Ocean", gradient: "linear-gradient(135deg,#4FACFE,#00F2FE)" },
  { name: "Cotton Candy", gradient: "linear-gradient(135deg, #FBC2EB 0%, #A6C1EE 100%)" },
  { name: "Warm White", gradient: "#faf8f5" },
  { name: "Midnight", gradient: "linear-gradient(135deg,#111827,#1F2937)" },
  { name: "Emerald", gradient: "linear-gradient(135deg,#43E97B,#38F9D7)" },
  { name: "Sunset", gradient: "linear-gradient(135deg,#FA709A,#FEE140)" },
  { name: "Blueberry", gradient: "linear-gradient(135deg,#667EEA,#764BA2)" }
];
