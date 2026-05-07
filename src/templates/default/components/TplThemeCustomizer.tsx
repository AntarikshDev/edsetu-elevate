import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, RotateCcw, Check, Type, Sparkles } from "lucide-react";

type ThemeState = {
  preset: string;
  bg: string;          // hsl components
  surface: string;
  fg: string;
  primary: string;
  primaryGlow: string;
  accent: string;
  secondary: string;
  font: string;
};

type Preset = {
  name: string;
  desc: string;
  swatches: string[];
} & Omit<ThemeState, "preset" | "font"> & { font?: string };

const PRESETS: Preset[] = [
  {
    name: "Calm Linen",
    desc: "Soft light · stone & sage",
    bg: "40 25% 97%",
    surface: "40 18% 93%",
    fg: "30 20% 18%",
    primary: "165 35% 42%",
    primaryGlow: "175 38% 52%",
    accent: "25 45% 55%",
    secondary: "210 30% 50%",
    swatches: ["#f6f3ec", "#4a8a78", "#c08a5a"],
  },
  {
    name: "Slate Mist",
    desc: "Soft dark · slate & sky",
    bg: "215 22% 12%",
    surface: "215 18% 17%",
    fg: "210 18% 94%",
    primary: "205 55% 55%",
    primaryGlow: "195 50% 65%",
    accent: "175 40% 55%",
    secondary: "230 30% 60%",
    swatches: ["#1b2330", "#4a90c4", "#5cb8b2"],
  },
  {
    name: "Aurora Light",
    desc: "Clean light · indigo & teal",
    bg: "210 40% 98%",
    surface: "210 30% 94%",
    fg: "220 40% 12%",
    primary: "230 60% 55%",
    primaryGlow: "210 70% 65%",
    accent: "175 55% 45%",
    secondary: "260 40% 60%",
    swatches: ["#f5f7fb", "#3b5bdb", "#14b8a6"],
  },
  {
    name: "Ocean Deep",
    desc: "Corporate · navy & cyan",
    bg: "215 35% 11%",
    surface: "215 28% 16%",
    fg: "200 25% 96%",
    primary: "200 60% 50%",
    primaryGlow: "190 65% 60%",
    accent: "175 50% 50%",
    secondary: "220 50% 55%",
    swatches: ["#0f1d2c", "#3a93c0", "#3eb5b0"],
  },
  {
    name: "Sand Beige",
    desc: "Warm · cream & terracotta",
    bg: "30 30% 96%",
    surface: "30 22% 91%",
    fg: "25 25% 18%",
    primary: "20 55% 50%",
    primaryGlow: "30 60% 58%",
    accent: "200 30% 50%",
    secondary: "40 50% 50%",
    swatches: ["#f6efe6", "#c66a4a", "#5a8aa3"],
  },
  {
    name: "Forest Sage",
    desc: "Earthy · green & cream",
    bg: "80 22% 96%",
    surface: "80 18% 90%",
    fg: "150 25% 14%",
    primary: "150 35% 38%",
    primaryGlow: "140 38% 48%",
    accent: "30 50% 52%",
    secondary: "200 35% 45%",
    swatches: ["#f3f5ec", "#3d8b5a", "#c98a55"],
  },
  {
    name: "Pearl Mono",
    desc: "Minimal · ivory & graphite",
    bg: "0 0% 98%",
    surface: "0 0% 94%",
    fg: "0 0% 12%",
    primary: "0 0% 18%",
    primaryGlow: "0 0% 35%",
    accent: "215 30% 45%",
    secondary: "0 0% 55%",
    swatches: ["#fafafa", "#1f1f1f", "#4a6a8a"],
  },
  {
    name: "Midnight Violet",
    desc: "Premium dark · vibrant",
    bg: "260 40% 6%",
    surface: "260 35% 10%",
    fg: "270 30% 98%",
    primary: "270 95% 60%",
    primaryGlow: "290 100% 70%",
    accent: "330 95% 60%",
    secondary: "200 100% 60%",
    swatches: ["#1a0d2e", "#9333ea", "#ec4899"],
  },
];

const FONTS = [
  { name: "Inter", stack: "'Inter', system-ui, sans-serif", url: "Inter:wght@400;500;600;700;800;900" },
  { name: "Manrope", stack: "'Manrope', system-ui, sans-serif", url: "Manrope:wght@400;500;600;700;800" },
  { name: "Poppins", stack: "'Poppins', system-ui, sans-serif", url: "Poppins:wght@400;500;600;700;800;900" },
  { name: "Space Grotesk", stack: "'Space Grotesk', system-ui, sans-serif", url: "Space+Grotesk:wght@400;500;600;700" },
  { name: "DM Sans", stack: "'DM Sans', system-ui, sans-serif", url: "DM+Sans:wght@400;500;700;900" },
  { name: "Playfair Display", stack: "'Playfair Display', Georgia, serif", url: "Playfair+Display:wght@400;500;700;900" },
  { name: "Outfit", stack: "'Outfit', system-ui, sans-serif", url: "Outfit:wght@400;500;600;700;800;900" },
];

const STORAGE_KEY = "tpl-theme-customizer";

const DEFAULT_STATE: ThemeState = {
  preset: PRESETS[0].name,
  bg: PRESETS[0].bg,
  surface: PRESETS[0].surface,
  fg: PRESETS[0].fg,
  primary: PRESETS[0].primary,
  primaryGlow: PRESETS[0].primaryGlow,
  accent: PRESETS[0].accent,
  secondary: PRESETS[0].secondary,
  font: FONTS[0].stack,
};

// Convert hex/rgb -> "h s% l%" string used by the template
function hexToHsl(hex: string): string {
  const m = hex.replace("#", "");
  const bigint = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function hslToHex(hsl: string): string {
  const [hStr, sStr, lStr] = hsl.split(" ");
  const h = parseFloat(hStr);
  const s = parseFloat(sStr) / 100;
  const l = parseFloat(lStr) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const to = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function loadFont(url: string) {
  const id = `tpl-font-${url}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${url}&display=swap`;
  document.head.appendChild(link);
}

function applyTheme(state: ThemeState) {
  const roots = document.querySelectorAll<HTMLElement>(".tpl-root");
  roots.forEach((root) => {
    root.style.setProperty("--tpl-bg", state.bg);
    root.style.setProperty("--tpl-surface", state.surface);
    // derive surface-2 a touch lighter
    const [h, s, l] = state.surface.split(" ");
    const lNum = parseFloat(l);
    root.style.setProperty("--tpl-surface-2", `${h} ${s} ${Math.min(lNum + 4, 95)}%`);
    root.style.setProperty("--tpl-fg", state.fg);
    root.style.setProperty("--tpl-primary", state.primary);
    root.style.setProperty("--tpl-primary-glow", state.primaryGlow);
    root.style.setProperty("--tpl-accent", state.accent);
    root.style.setProperty("--tpl-secondary", state.secondary);
    root.style.fontFamily = state.font;
  });
}

export function TplThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ThemeState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
    } catch {}
    return DEFAULT_STATE;
  });

  useEffect(() => {
    FONTS.forEach((f) => loadFont(f.url));
  }, []);

  useEffect(() => {
    applyTheme(state);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  // Re-apply when DOM swaps (route change re-mounts .tpl-root)
  useEffect(() => {
    const obs = new MutationObserver(() => applyTheme(state));
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [state]);

  const applyPreset = useCallback((p: Preset) => {
    setState((prev) => ({
      ...prev,
      preset: p.name,
      bg: p.bg,
      surface: p.surface,
      fg: p.fg,
      primary: p.primary,
      primaryGlow: p.primaryGlow,
      accent: p.accent,
      secondary: p.secondary,
    }));
  }, []);

  const reset = () => setState(DEFAULT_STATE);

  const ColorRow = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <label className="flex items-center justify-between gap-3 py-2">
      <span className="text-xs uppercase tracking-wider text-white/60">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={hslToHex(value)}
          onChange={(e) => onChange(hexToHsl(e.target.value))}
          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-white/20"
          style={{ padding: 0 }}
        />
        <span className="text-[10px] font-mono text-white/40 w-24 truncate">{value}</span>
      </div>
    </label>
  );

  return (
    <>
      {/* Floating button — fixed to viewport, outside .tpl-root so its own colors stay stable */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full grid place-items-center text-white shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #9333ea, #ec4899, #f59e0b)",
          backgroundSize: "200% 200%",
          boxShadow: "0 10px 40px rgba(147, 51, 234, 0.5)",
        }}
        aria-label="Customize theme"
      >
        <Palette className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full animate-ping bg-fuchsia-500/30" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[101] bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 z-[102] w-full sm:w-[420px] overflow-y-auto"
              style={{
                background: "linear-gradient(180deg, #1a0b2e 0%, #0f0a1f 100%)",
                color: "#fff",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-white/10 backdrop-blur-xl"
                   style={{ background: "rgba(15, 10, 31, 0.8)" }}>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-lg">Theme Studio</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={reset} className="p-2 rounded-lg hover:bg-white/10" title="Reset">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-white/10">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-6 space-y-8">
                {/* Presets */}
                <section>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">Curated Palettes</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESETS.map((p) => {
                      const active = state.preset === p.name;
                      return (
                        <button
                          key={p.name}
                          onClick={() => applyPreset(p)}
                          className={`relative text-left p-3 rounded-xl border transition ${
                            active ? "border-fuchsia-400 bg-white/10" : "border-white/10 hover:border-white/30 bg-white/5"
                          }`}
                        >
                          <div className="flex gap-1 mb-2">
                            {p.swatches.map((c) => (
                              <span key={c} className="w-5 h-5 rounded-full border border-white/20" style={{ background: c }} />
                            ))}
                          </div>
                          <div className="text-sm font-semibold">{p.name}</div>
                          <div className="text-[10px] text-white/50">{p.desc}</div>
                          {active && (
                            <Check className="absolute top-2 right-2 w-3.5 h-3.5 text-fuchsia-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Font */}
                <section>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3 flex items-center gap-2">
                    <Type className="w-3 h-3" /> Typography
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {FONTS.map((f) => {
                      const active = state.font === f.stack;
                      return (
                        <button
                          key={f.name}
                          onClick={() => setState({ ...state, font: f.stack })}
                          className={`p-3 rounded-xl border transition text-left ${
                            active ? "border-fuchsia-400 bg-white/10" : "border-white/10 hover:border-white/30 bg-white/5"
                          }`}
                          style={{ fontFamily: f.stack }}
                        >
                          <div className="text-base font-bold">{f.name}</div>
                          <div className="text-[10px] text-white/50 mt-0.5">Aa Bb · 1234</div>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Custom colors */}
                <section>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Fine Tune</h4>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 divide-y divide-white/10">
                    <ColorRow label="Hero / Page BG" value={state.bg} onChange={(v) => setState({ ...state, bg: v })} />
                    <ColorRow label="Surface" value={state.surface} onChange={(v) => setState({ ...state, surface: v })} />
                    <ColorRow label="Text Color" value={state.fg} onChange={(v) => setState({ ...state, fg: v })} />
                    <ColorRow label="Primary (Btn 1)" value={state.primary} onChange={(v) => setState({ ...state, primary: v })} />
                    <ColorRow label="Primary Glow" value={state.primaryGlow} onChange={(v) => setState({ ...state, primaryGlow: v })} />
                    <ColorRow label="Accent (Btn 2)" value={state.accent} onChange={(v) => setState({ ...state, accent: v })} />
                    <ColorRow label="Secondary" value={state.secondary} onChange={(v) => setState({ ...state, secondary: v })} />
                  </div>
                </section>

                <div className="text-[10px] text-white/40 text-center pt-2">
                  Changes save automatically · apply across the entire template
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
