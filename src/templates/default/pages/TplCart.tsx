import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Lock, Tag, ArrowRight } from "lucide-react";
import { TplHeader } from "../components/TplHeader";
import { TplFooter } from "../components/TplFooter";
import { courses } from "../data";
import "../template.css";

export default function TplCart() {
  const [items, setItems] = useState(courses.slice(0, 2).map((c) => ({ ...c, qty: 1 })));
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const original = items.reduce((s, i) => s + i.originalPrice, 0);
  const savings = original - subtotal;

  return (
    <div className="tpl-root min-h-screen">
      <TplHeader />

      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight"
          >
            Your <span className="tpl-grad-text italic">cart</span>.
          </motion.h1>
          <p className="text-white/60 mt-3">{items.length} items ready to change your life.</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ delay: i * 0.06 }}
                  className="tpl-card p-4 flex gap-4 items-center"
                >
                  <img src={item.image} alt="" className="w-32 h-24 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/template/course/${item.slug}`} className="font-bold text-lg hover:tpl-grad-text">
                      {item.title}
                    </Link>
                    <div className="text-xs text-white/50 mt-1">By {item.instructor.name} · {item.level}</div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-extrabold tpl-grad-text">${item.price}</span>
                      <span className="text-xs text-white/40 line-through">${item.originalPrice}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setItems(items.filter((x) => x.id !== item.id))}
                    className="w-10 h-10 grid place-items-center rounded-full hover:bg-white/10 text-white/60 hover:text-white transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {items.length === 0 && (
              <div className="tpl-card p-16 text-center">
                <div className="text-2xl font-bold mb-2">Your cart is empty</div>
                <p className="text-white/60 mb-6">Find something you can't live without.</p>
                <Link to="/template/store" className="tpl-btn-primary">Browse the Store</Link>
              </div>
            )}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-32 self-start"
          >
            <div className="tpl-card p-6">
              <div className="font-bold text-lg mb-5">Order summary</div>

              <div className="space-y-3 text-sm pb-5 border-b" style={{ borderColor: "hsl(var(--tpl-border) / 0.5)" }}>
                <div className="flex justify-between text-white/70">
                  <span>Original price</span>
                  <span className="line-through">${original}</span>
                </div>
                <div className="flex justify-between" style={{ color: "hsl(var(--tpl-accent))" }}>
                  <span>Savings</span>
                  <span>-${savings}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
              </div>

              <div className="flex justify-between font-extrabold text-2xl py-5">
                <span>Total</span>
                <span className="tpl-grad-text">${subtotal}</span>
              </div>

              <div className="tpl-glass rounded-xl p-3 flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-white/50" />
                <input placeholder="Promo code" className="bg-transparent outline-none flex-1 text-sm placeholder:text-white/40" />
                <button className="text-xs font-bold tpl-grad-text">APPLY</button>
              </div>

              <button disabled={items.length === 0} className="tpl-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/50">
                <Lock className="w-3 h-3" /> Secure checkout · 30-day money-back guarantee
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <TplFooter />
    </div>
  );
}
