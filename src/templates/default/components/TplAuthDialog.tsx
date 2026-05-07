import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Sparkles } from "lucide-react";

type Mode = "signin" | "signup";

interface Props {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  onSwitchMode: (mode: Mode) => void;
}

export function TplAuthDialog({ open, mode, onClose, onSwitchMode }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Template demo: no real auth wired. Hook to your LMS auth here.
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] grid place-items-center p-4"
          style={{ background: "hsl(var(--tpl-bg) / 0.7)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="tpl-glass relative w-full max-w-md rounded-3xl p-8 overflow-hidden"
          >
            <div
              className="absolute -top-32 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{ background: "var(--tpl-grad-hero)" }}
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-full hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {mode === "signin" ? "Welcome back" : "Join the club"}
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-2">
                {mode === "signin" ? "Sign in" : "Create account"}
              </h2>
              <p className="text-sm text-white/60 mb-6">
                {mode === "signin"
                  ? "Pick up right where you left off."
                  : "Start learning in under a minute."}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {mode === "signup" && (
                  <Field icon={<User className="w-4 h-4" />} placeholder="Full name" value={name} onChange={setName} />
                )}
                <Field icon={<Mail className="w-4 h-4" />} placeholder="Email" type="email" value={email} onChange={setEmail} />
                <Field icon={<Lock className="w-4 h-4" />} placeholder="Password" type="password" value={password} onChange={setPassword} />

                <button type="submit" className="tpl-btn-primary mt-3 w-full">
                  {mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>

              <div className="text-sm text-white/60 mt-6 text-center">
                {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
                <button
                  onClick={() => onSwitchMode(mode === "signin" ? "signup" : "signin")}
                  className="font-semibold tpl-grad-text"
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-3 px-4 py-3 rounded-2xl border transition focus-within:border-white/40"
      style={{ background: "hsl(var(--tpl-surface-2) / 0.6)", borderColor: "hsl(var(--tpl-border))" }}
    >
      <span className="text-white/50">{icon}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none flex-1 text-sm placeholder:text-white/40"
      />
    </label>
  );
}
