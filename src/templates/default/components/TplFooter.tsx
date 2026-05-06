import { Link } from "react-router-dom";
import { templateTheme } from "../theme";

export function TplFooter() {
  return (
    <footer className="relative border-t mt-32" style={{ borderColor: "hsl(var(--tpl-border) / 0.5)" }}>
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl" style={{ background: "var(--tpl-grad-hero)" }} />
            <span className="font-extrabold text-lg">{templateTheme.brand.logoText}</span>
          </div>
          <p className="text-white/60 max-w-md">{templateTheme.brand.tagline}</p>
        </div>
        {[
          { title: "Learn", links: ["Courses", "Categories", "Bundles", "Free Lessons"] },
          { title: "Company", links: ["About", "Instructors", "Careers", "Press"] },
        ].map((col) => (
          <div key={col.title}>
            <div className="font-semibold mb-4">{col.title}</div>
            <ul className="space-y-2 text-white/60 text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <Link to="/template/store" className="hover:text-white transition">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t" style={{ borderColor: "hsl(var(--tpl-border) / 0.4)" }}>
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/40">
          <span>© 2026 {templateTheme.brand.name}. All rights reserved.</span>
          <span>Default LMS Template · v1</span>
        </div>
      </div>
    </footer>
  );
}
