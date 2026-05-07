import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Sparkles, Layers } from "lucide-react";
import { Package, courses } from "../data";

interface Props {
  pkg: Package;
  index?: number;
}

export function TplPackageCard({ pkg, index = 0 }: Props) {
  const included = courses.filter((c) => pkg.courseIds.includes(c.id));
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className="relative tpl-card p-7 flex flex-col h-full"
      style={{
        background: `linear-gradient(160deg, hsl(${pkg.accent} / 0.18), hsl(var(--tpl-surface)) 60%)`,
      }}
    >
      <div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-50 pointer-events-none"
        style={{ background: `hsl(${pkg.accent} / 0.5)` }}
      />

      {pkg.badge && (
        <div className="self-start text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full mb-5 flex items-center gap-1.5"
          style={{ background: "var(--tpl-grad-hero)" }}>
          <Sparkles className="w-3 h-3" /> {pkg.badge}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
        <Layers className="w-3.5 h-3.5" /> Bundle · {included.length} courses
      </div>
      <h3 className="text-2xl font-black leading-tight mb-2">{pkg.name}</h3>
      <p className="text-sm text-white/60 mb-6">{pkg.tagline}</p>

      <div className="flex items-baseline gap-3 mb-6">
        <div className="text-4xl font-black tpl-grad-text">${pkg.price}</div>
        <div className="text-sm text-white/40 line-through">${pkg.originalPrice}</div>
      </div>

      <ul className="flex flex-col gap-2.5 mb-6">
        {pkg.perks.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-white/80">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: `hsl(${pkg.accent})` }} />
            {p}
          </li>
        ))}
      </ul>

      <div className="border-t pt-4 mb-6" style={{ borderColor: "hsl(var(--tpl-border) / 0.5)" }}>
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">Includes · click to view curriculum</div>
        <div className="flex flex-col gap-2">
          {included.map((c) => (
            <Link
              key={c.id}
              to={`/template/course/${c.slug}`}
              className="flex items-center gap-3 text-sm rounded-lg p-1.5 -m-1.5 hover:bg-white/5 transition group/row"
            >
              <img src={c.image} alt="" loading="lazy" className="w-9 h-9 rounded-lg object-cover" />
              <div className="flex-1 line-clamp-1 group-hover/row:tpl-grad-text transition">{c.title}</div>
              <span className="text-xs text-white/40 line-through">${c.price}</span>
            </Link>
          ))}
        </div>
      </div>

      <Link to="/template/cart" className="tpl-btn-primary mt-auto w-full">
        Get the bundle
      </Link>
    </motion.div>
  );
}
