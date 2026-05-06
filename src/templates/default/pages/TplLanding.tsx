import { TplHeader } from "../components/TplHeader";
import { TplFooter } from "../components/TplFooter";
import { TplThemeCustomizer } from "../components/TplThemeCustomizer";
import { TplHero } from "../components/TplHero";
import { TplCategories } from "../components/TplCategories";
import { TplFeaturedCourses, TplTestimonials, TplMarquee, TplCTA } from "../components/TplSections";
import "../template.css";

export default function TplLanding() {
  return (
    <div className="tpl-root min-h-screen">
      <TplHeader />
      <main>
        <TplHero />
        <TplMarquee />
        <TplCategories />
        <TplFeaturedCourses />
        <TplTestimonials />
        <TplCTA />
      </main>
      <TplFooter />
      <TplThemeCustomizer />
    </div>
  );
}
