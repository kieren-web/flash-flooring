import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { testimonials } from "@/data/testimonials";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Flash Flooring | Wollongong Flooring Specialists",
  description:
    "Family-owned flooring business based in Wollongong. Gary and his team have over 20 years experience in polished concrete and epoxy flooring across the Illawarra and Sydney.",
  alternates: { canonical: "https://flashflooring.com.au/about" },
};

const values = [
  {
    title: "Do It Right",
    desc: "We don't skip preparation steps. Proper grinding before every coat. No shortcuts that come back to bite the customer.",
  },
  {
    title: "Straight Talking",
    desc: "Gary gives you a real price on-site. What we quote is what you pay - no surprises on the invoice.",
  },
  {
    title: "Show Up On Time",
    desc: "We respect your schedule. If we say we'll be there at 7am, we're there at 7am.",
  },
  {
    title: "Stand Behind Our Work",
    desc: "If something isn't right, we fix it. Our reputation is built one floor at a time and we take that seriously.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#2a3347]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Wollongong&rsquo;s Trusted Flooring Family
          </h1>
          <p className="text-xl text-[#8b95a9] max-w-2xl leading-relaxed">
            Over 20 years of concrete floors, done the right way. Family owned, locally based, personally quoted by Gary.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-white mb-5">The Flash Flooring Story</h2>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Flash Flooring is a family-owned, Wollongong-based flooring business run by Gary - a third-generation flooring tradesman with over 20 years of hands-on experience in polished concrete and epoxy flooring.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                We work on everything from single-car garages to large commercial warehouses across the Illawarra and into Sydney. Every project gets the same attention to detail, regardless of size.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Gary personally visits every job site, does the quote, and oversees the work. There&rsquo;s no layer of salespeople between you and the person actually doing your floor.
              </p>
              <p className="text-[#8b95a9] leading-relaxed">
                We&rsquo;re based in Unanderra and serve the full Illawarra - Wollongong, Shellharbour, Kiama, Thirroul - and travel to Sydney for the right commercial jobs.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image src="/images/gallery/gallery-2.jpg" alt="Flash Flooring work" fill className="object-cover" />
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden mt-6">
                  <Image src="/images/gallery/gallery-4.jpg" alt="Polished concrete Wollongong" fill className="object-cover" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">How We Work</p>
              <h2 className="text-3xl font-bold text-white">What We Stand For</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="bg-[#1e2535] border border-[#2a3347] rounded-xl p-6">
                  <h3 className="text-base font-semibold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-[#8b95a9] leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "20+", label: "Years Experience" },
              { value: "20+", label: "5-Star Reviews" },
              { value: "100%", label: "Free Quotes" },
            ].map((s) => (
              <ScrollReveal key={s.label}>
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-[#8b95a9] mt-1">{s.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Reviews</p>
              <h2 className="text-3xl font-bold text-white">What Our Customers Say</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className="bg-[#1e2535] border border-[#2a3347] rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#e8eaf0] text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-[#8b95a9]">{t.date}</p>
                    </div>
                    <span className="text-xs text-[#8b95a9] bg-[#2a3347] px-2.5 py-1 rounded-full">Google</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-[#8b95a9] mb-8">Call Gary directly or request a quote online - free, no obligation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={siteConfig.phoneHref} className="btn-glow inline-flex items-center gap-2 justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                Call {siteConfig.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 justify-center bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200">
                Get a Free Quote
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
