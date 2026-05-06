import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Flooring Services Wollongong | Flash Flooring",
  description:
    "Polished concrete and epoxy flooring services in Wollongong. Residential & commercial. Free on-site quotes from Gary - call 0423 353 481.",
  alternates: { canonical: "https://flashflooring.com.au/services" },
};

const services: { title: string; href: string; image: string | null; desc: string; features: string[] }[] = [
  {
    title: "Polished Concrete",
    href: "/services/polished-concrete-wollongong",
    image: "/images/gallery/gallery-1.jpg",
    desc: "Transform your existing concrete slab into a high-gloss, durable floor. Available in matte through to mirror-finish gloss. Perfect for homes, showrooms, and commercial spaces.",
    features: ["Multiple gloss levels", "Aggregate exposure option", "Colour dyes available", "Residential & commercial"],
  },
  {
    title: "Epoxy Flooring",
    href: "/services/epoxy-flooring-wollongong",
    image: "/images/gallery/epoxy-flake.jpg",
    desc: "High-performance epoxy coatings applied over diamond-ground concrete. Moisture-proof, impact-resistant and seamless. Ideal for garages, warehouses and factories.",
    features: ["Industrial grade resins", "Full surface preparation included", "Garages to warehouses", "Quick turnaround"],
  },
  {
    title: "Concrete Grinding",
    href: "/contact",
    image: null,
    desc: "The critical first step in any great floor. We use diamond-tipped grinders to level, profile and prepare your concrete - the right foundation for polishing or epoxy.",
    features: ["Industrial diamond grinders", "Levels uneven surfaces", "Removes old coatings", "Part of every job"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#161b27] border-b border-[#2a3347]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">What We Offer</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Flooring Services in Wollongong
          </h1>
          <p className="text-lg text-[#8b95a9] max-w-2xl mx-auto">
            From residential homes to large commercial warehouses. All work done by Gary and his team - 20+ years experience, every job treated like it&rsquo;s our own floor.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 100}>
              <div className="bg-[#161b27] border border-[#2a3347] rounded-2xl overflow-hidden hover:border-[#2563eb]/40 transition-colors duration-300">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className="relative h-64 lg:h-auto">
                    {svc.image ? (
                      <Image src={svc.image} alt={svc.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#2a3347] flex flex-col items-center justify-center gap-3 min-h-64">
                        <svg className="w-10 h-10 text-[#4a5568]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs text-[#4a5568] font-medium uppercase tracking-widest">Photo needed</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-white mb-3">{svc.title}</h2>
                    <p className="text-[#8b95a9] leading-relaxed mb-5">{svc.desc}</p>
                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-[#e8eaf0]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={svc.href} className="inline-flex items-center gap-2 text-[#2563eb] hover:text-[#3b82f6] font-semibold text-sm transition-colors">
                      Learn more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Not sure which service you need?</h2>
            <p className="text-[#8b95a9] mb-8">Call Gary and describe your floor - he&rsquo;ll tell you exactly what will work best and give you a straight price.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={siteConfig.phoneHref} className="btn-glow inline-flex items-center gap-2 justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                Call {siteConfig.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 justify-center bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200">
                Request a Quote
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
