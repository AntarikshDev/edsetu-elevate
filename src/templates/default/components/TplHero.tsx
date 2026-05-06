import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { templateTheme } from "../theme";
import heroBanner from "@/assets/template/hero-banner.jpg";

export function TplHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-32 pb-24">
      {/* Layered background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--tpl-bg) / 0.5) 0%, hsl(var(--tpl-bg)) 100%)",
          }}
        />
        <div className="tpl-mesh" />
        <div className="tpl-noise" />
      </div>

      {/* Floating shapes */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[10%] w-32 h-32 rounded-3xl blur-2xl opacity-70"
        style={{ background: "var(--tpl-grad-hero)" }}
      />
      <motion.div
        animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-[8%] w-40 h-40 rounded-full blur-2xl opacity-60"
        style={{ background: "hsl(var(--tpl-secondary))" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-30"
        style={{ background: "var(--tpl-grad-hero)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 tpl-glass rounded-full px-4 py-2 text-xs mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: "hsl(var(--tpl-primary-glow))" }} />
          <span>{templateTheme.hero.eyebrow}</span>
        </motion.div>

        <h1 className="font-black tracking-tight text-5xl sm:text-7xl lg:text-[8rem] leading-[0.9] mb-8">
          {templateTheme.hero.title.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`block ${i === 1 ? "tpl-grad-text italic" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mb-10"
        >
          {templateTheme.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <Link to="/template/store" className="tpl-btn-primary group">
            {templateTheme.hero.primaryCta}
            <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
          </Link>
          <button className="tpl-btn-ghost group">
            <span className="grid place-items-center w-7 h-7 rounded-full" style={{ background: "var(--tpl-grad-hero)" }}>
              <Play className="w-3 h-3 fill-white" />
            </span>
            {templateTheme.hero.secondaryCta}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {templateTheme.hero.stats.map((s) => (
            <div key={s.label} className="tpl-glass rounded-2xl p-5">
              <div className="text-3xl md:text-4xl font-extrabold tpl-grad-text">{s.value}</div>
              <div className="text-xs text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
