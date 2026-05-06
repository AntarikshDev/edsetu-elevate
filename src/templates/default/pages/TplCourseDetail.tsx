import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, BookOpen, CheckCircle2, Play, Heart, Share2, ShoppingCart, Award, Users, Zap } from "lucide-react";
import { TplHeader } from "../components/TplHeader";
import { TplFooter } from "../components/TplFooter";
import { TplThemeCustomizer } from "../components/TplThemeCustomizer";
import { courses } from "../data";
import "../template.css";

export default function TplCourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.slug === slug) || courses[0];
  const [openLesson, setOpenLesson] = useState<number | null>(0);

  return (
    <div className="tpl-root min-h-screen">
      <TplHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={course.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 scale-110 blur-3xl" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(var(--tpl-bg) / 0.6), hsl(var(--tpl-bg)))" }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_420px] gap-10 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4"
            >
              <Link to="/template/store" className="hover:text-white">Store</Link> / {course.level}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5"
            >
              {course.title}
            </motion.h1>
            <p className="text-lg text-white/70 mb-6 max-w-2xl">{course.description}</p>

            <div className="flex flex-wrap items-center gap-5 mb-8 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> <strong className="text-white">{course.rating}</strong> ({course.students.toLocaleString()} students)</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.hours} hours</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{course.lessons} lessons</span>
            </div>

            <div className="flex items-center gap-3 tpl-glass rounded-2xl p-4 max-w-md">
              <img src={course.instructor.avatar} alt="" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{course.instructor.name}</div>
                <div className="text-sm text-white/60">{course.instructor.title}</div>
              </div>
            </div>
          </div>

          {/* Sticky Buy Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-32"
          >
            <div className="tpl-card overflow-hidden">
              <div className="relative h-56 group cursor-pointer">
                <img src={course.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 grid place-items-center bg-black/30 group-hover:bg-black/10 transition">
                  <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 rounded-full grid place-items-center tpl-pulse-glow" style={{ background: "var(--tpl-grad-hero)" }}>
                    <Play className="w-6 h-6 fill-white" />
                  </motion.div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-4xl font-black tpl-grad-text">${course.price}</span>
                  <span className="text-white/40 line-through">${course.originalPrice}</span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "hsl(var(--tpl-accent) / 0.2)", color: "hsl(var(--tpl-accent))" }}>
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <div className="text-xs text-white/50 mb-5">⏰ Sale ends in 2 days</div>

                <button onClick={() => navigate("/template/cart")} className="tpl-btn-primary w-full mb-3">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
                <button onClick={() => navigate("/template/cart")} className="tpl-btn-ghost w-full">
                  <Zap className="w-4 h-4" /> Buy Now
                </button>

                <div className="flex justify-center gap-2 mt-4">
                  <button className="tpl-btn-ghost !p-3 !rounded-full"><Heart className="w-4 h-4" /></button>
                  <button className="tpl-btn-ghost !p-3 !rounded-full"><Share2 className="w-4 h-4" /></button>
                </div>

                <div className="mt-6 pt-6 border-t space-y-3 text-sm" style={{ borderColor: "hsl(var(--tpl-border) / 0.5)" }}>
                  {[
                    { icon: Award, label: "Certificate of completion" },
                    { icon: Users, label: "Lifetime community access" },
                    { icon: Clock, label: "Lifetime updates" },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center gap-3 text-white/70">
                      <f.icon className="w-4 h-4" style={{ color: "hsl(var(--tpl-primary-glow))" }} />
                      {f.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-8">What you'll <span className="tpl-grad-text italic">walk away with</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {course.outcomes.map((o, i) => (
              <motion.div
                key={o}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="tpl-glass rounded-2xl p-5 flex gap-3"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(var(--tpl-primary-glow))" }} />
                <span className="text-white/85">{o}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-8">Curriculum</h2>
          <div className="space-y-3">
            {course.curriculum.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="tpl-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenLesson(openLesson === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl grid place-items-center font-bold" style={{ background: "var(--tpl-grad-hero)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="font-semibold">{mod.title}</div>
                      <div className="text-xs text-white/50">{mod.lessons} lessons · {mod.duration}</div>
                    </div>
                  </div>
                  <motion.span animate={{ rotate: openLesson === i ? 45 : 0 }} className="text-2xl text-white/50">+</motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openLesson === i ? "auto" : 0, opacity: openLesson === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-2 text-sm text-white/70">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <Play className="w-3.5 h-3.5" />
                        Lesson {j + 1} · Sample preview available
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TplFooter />
      <TplThemeCustomizer />
    </div>
  );
}
