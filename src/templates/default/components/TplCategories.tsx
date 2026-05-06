import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../data";

export function TplCategories() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.3em] text-white/50 mb-3"
            >
              Explore
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight"
            >
              Categories worth <span className="tpl-grad-text italic">obsessing</span> over.
            </motion.h2>
          </div>
          <Link to="/template/store" className="tpl-btn-ghost text-sm !py-3 !px-5">
            View all <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
            >
              <Link to="/template/store" className="tpl-card block group">
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, hsl(${cat.color} / 0.6), hsl(var(--tpl-bg)))`,
                    }}
                  />
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 mix-blend-luminosity opacity-90 group-hover:opacity-100"
                  />
                  <div
                    className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-60"
                    style={{ background: `hsl(${cat.color})` }}
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-lg">{cat.name}</div>
                    <div className="text-xs text-white/50 mt-1">{cat.count} courses</div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 transition group-hover:rotate-45" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
