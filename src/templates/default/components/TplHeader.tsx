import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { useState } from "react";
import { templateTheme } from "./theme";

export function TplHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/template", label: "Home" },
    { to: "/template/store", label: "Store" },
    { to: "/template/store", label: "Categories" },
    { to: "/template/store", label: "Pricing" },
  ];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 mt-4">
        <div className="tpl-glass rounded-2xl flex items-center justify-between px-5 py-3">
          <Link to="/template" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-9 h-9 rounded-xl tpl-pulse-glow"
              style={{ background: "var(--tpl-grad-hero)" }}
            />
            <span className="font-extrabold tracking-tight text-lg">
              {templateTheme.brand.logoText}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `relative transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-white/70"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden sm:grid place-items-center w-10 h-10 rounded-full hover:bg-white/10 transition">
              <Search className="w-4 h-4" />
            </button>
            <Link
              to="/template/cart"
              className="relative grid place-items-center w-10 h-10 rounded-full hover:bg-white/10 transition"
            >
              <ShoppingCart className="w-4 h-4" />
              <span
                className="absolute -top-1 -right-1 w-5 h-5 grid place-items-center text-[10px] font-bold rounded-full"
                style={{ background: "var(--tpl-grad-hero)" }}
              >
                2
              </span>
            </Link>
            <Link to="/template/store" className="tpl-btn-primary !px-5 !py-2 text-sm">
              Enroll
            </Link>
            <button
              className="md:hidden grid place-items-center w-10 h-10 rounded-full hover:bg-white/10"
              onClick={() => setOpen(!open)}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden tpl-glass rounded-2xl mt-2 p-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="text-white/80">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.header>
  );
}
