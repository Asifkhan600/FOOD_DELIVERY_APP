"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section className="section-gap">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Testimonials</p>
          <h2 className="text-2xl font-bold text-foreground">Loved by Thousands</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
            Don't take our word for it — here's what our customers say.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="card-base p-5 flex flex-col gap-4">
              <Quote className="h-6 w-6 text-brand-400 opacity-60" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.comment}</p>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx}
                    className={`h-3.5 w-3.5 ${idx < t.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold dark:bg-brand-950 dark:text-brand-400">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
