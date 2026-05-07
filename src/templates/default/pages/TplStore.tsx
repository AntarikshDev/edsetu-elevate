import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpNarrowWide, ArrowDownWideNarrow, Flame, Star, Layers } from "lucide-react";
import { TplHeader } from "../components/TplHeader";
import { TplFooter } from "../components/TplFooter";
import { TplThemeCustomizer } from "../components/TplThemeCustomizer";
import { TplCourseCard } from "../components/TplCourseCard";
import { TplPackageCard } from "../components/TplPackageCard";
import { categories, courses, packages } from "../data";
import "../template.css";

type SortKey = "popular" | "rating" | "price-asc" | "price-desc";

const SORT_OPTIONS: { key: SortKey; label: string; Icon: typeof Flame }[] = [
  { key: "popular", label: "Popular", Icon: Flame },
  { key: "rating", label: "Top rated", Icon: Star },
  { key: "price-asc", label: "Price ↑", Icon: ArrowUpNarrowWide },
  { key: "price-desc", label: "Price ↓", Icon: ArrowDownWideNarrow },
];

export default function TplStore() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    let list = courses.filter((c) =>
      (active === "all" || c.category === active) &&
      (query === "" || c.title.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else list = [...list].sort((a, b) => b.students - a.students);
    return list;
  }, [active, query, sort]);

  return (
    <div className="tpl-root min-h-screen">
      <TplHeader />

      {/* Hero */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="tpl-mesh" />
          <div className="tpl-grid-bg absolute inset-0 opacity-30" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{ background: "var(--tpl-grad-hero)" }}
        />

        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="text-sm uppercase tracking-[0.3em] text-white/50 mb-4">The Store</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95] mb-6">
              Every skill. <br />
              <span className="tpl-grad-text italic">One shelf.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl">
              Curated, project-based courses taught by people who actually do the work.
            </p>
          </motion.div>

          {/* Search + Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1 tpl-glass rounded-full px-5 py-3 flex items-center gap-3">
              <Search className="w-4 h-4 text-white/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, skills, instructors…"
                className="bg-transparent outline-none flex-1 text-sm placeholder:text-white/40"
              />
            </div>
            <div className="tpl-glass rounded-full px-2 py-2 flex items-center gap-1 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-white/50 ml-3 mr-2" />
              {SORT_OPTIONS.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => setSort(key)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                    sort === key ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                  style={sort === key ? { background: "var(--tpl-grad-hero)" } : {}}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Category pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[{ id: "all", name: "All" }, ...categories].map((c) => (
              <motion.button
                key={c.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActive(c.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition ${
                  active === c.id ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {active === c.id && (
                  <motion.div
                    layoutId="activeCat"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--tpl-grad-hero)" }}
                  />
                )}
                <span className="relative">{c.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-sm text-white/50 mb-6">{filtered.length} courses</div>
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c, i) => (
                <TplCourseCard key={c.id} course={c} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-32 text-white/50">No courses match your filters.</div>
          )}
        </div>
      </section>

      <TplFooter />
      <TplThemeCustomizer />
    </div>
  );
}
