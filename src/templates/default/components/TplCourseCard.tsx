import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock, BookOpen } from "lucide-react";
import { Course } from "../data";

interface Props {
  course: Course;
  index?: number;
  featured?: boolean;
}

export function TplCourseCard({ course, index = 0, featured = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className={featured ? "lg:col-span-2 lg:row-span-2" : ""}
    >
      <Link to={`/template/course/${course.slug}`} className="tpl-card block group h-full">
        <div className={`relative overflow-hidden ${featured ? "h-80" : "h-52"}`}>
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, hsl(var(--tpl-bg) / 0.95) 100%)",
            }}
          />
          {course.badges?.length ? (
            <div className="absolute top-4 left-4 flex gap-2">
              {course.badges.map((b) => (
                <span
                  key={b}
                  className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "var(--tpl-grad-hero)" }}
                >
                  {b}
                </span>
              ))}
            </div>
          ) : null}
          <div className="absolute top-4 right-4 tpl-glass rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider">
            {course.level}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-white/60 mb-3">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              {course.rating}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.hours}h</span>
            <span>·</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} lessons</span>
          </div>

          <h3 className={`font-bold leading-tight mb-2 group-hover:tpl-grad-text transition ${featured ? "text-3xl" : "text-xl"}`}>
            {course.title}
          </h3>
          <p className="text-sm text-white/60 mb-5 line-clamp-2">{course.subtitle}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={course.instructor.avatar} alt="" loading="lazy" className="w-8 h-8 rounded-full object-cover" />
              <div className="text-xs text-white/70">{course.instructor.name}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-white/40 line-through">${course.originalPrice}</div>
              <div className="font-extrabold text-lg tpl-grad-text">${course.price}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
