import { motion } from "framer-motion";
import { courses, testimonials } from "../data";
import { TplCourseCard } from "./TplCourseCard";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";

export function TplFeaturedCourses() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="text-sm uppercase tracking-[0.3em] text-white/50 mb-3">Featured</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            Courses our students <span className="tpl-grad-text italic">can't shut up</span> about.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((c, i) => (
            <TplCourseCard key={c.id} course={c} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/template/store" className="tpl-btn-ghost">
            Explore all 850+ courses →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TplTestimonials() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="tpl-card p-8"
            >
              <Quote className="w-8 h-8 mb-4 opacity-40" />
              <p className="text-lg text-white/85 leading-relaxed mb-6">"{t.quote}"</p>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-white/50">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TplMarquee() {
  const items = ["Design", "Code", "AI", "Photography", "Marketing", "Leadership", "Product", "Growth"];
  return (
    <section className="relative py-12 overflow-hidden border-y" style={{ borderColor: "hsl(var(--tpl-border) / 0.5)" }}>
      <div className="flex tpl-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-12 px-6 text-5xl md:text-7xl font-black tracking-tight">
            {it}
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--tpl-grad-hero)" }} />
          </span>
        ))}
      </div>
    </section>
  );
}

export function TplCTA() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative tpl-card overflow-hidden p-12 md:p-20 text-center"
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{ background: "var(--tpl-grad-hero)" }}
          />
          <div className="tpl-noise" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Your future self <span className="italic">already enrolled</span>.
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Start a 7-day free trial. Cancel anytime. No credit card required.
            </p>
            <Link to="/template/store" className="tpl-btn-primary">
              Start Learning Free →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
