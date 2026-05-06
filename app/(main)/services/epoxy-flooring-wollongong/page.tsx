import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { epoxyFaqs } from "@/data/faqs";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteForm from "@/components/QuoteForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Epoxy Flooring Wollongong | Flash Flooring",
  description:
    "Professional epoxy flooring in Wollongong. Residential garages, commercial & industrial. Impact-resistant, moisture-proof. Free quotes - call 0423 353 481.",
  alternates: { canonical: "https://flashflooring.com.au/services/epoxy-flooring-wollongong" },
};

const benefits = [
  { title: "Impact Resistant", desc: "Handles heavy machinery, forklifts, and vehicle traffic without cracking or chipping." },
  { title: "Moisture Proof", desc: "Seamless surface - no joints for water or chemicals to penetrate." },
  { title: "Easy to Clean", desc: "Spills wipe up in seconds. No grout lines, no porous gaps." },
  { title: "Customisable", desc: "Range of colours and finishes - match your brand or aesthetic." },
  { title: "Quick Install", desc: "Most jobs completed in 1–2 days with light foot traffic in 24 hours." },
  { title: "Long Lasting", desc: "Applied correctly over properly prepared concrete, epoxy lasts years with no upkeep." },
];

export default function EpoxyFlooringPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Epoxy Flooring Wollongong",
    provider: { "@type": "LocalBusiness", name: "Flash Flooring" },
    areaServed: "Wollongong, NSW",
    description:
      "Professional epoxy flooring for residential garages, commercial and industrial spaces across Wollongong and Sydney.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <Image
          src="/images/gallery/epoxy-flake.jpg"
          alt="Epoxy flooring Wollongong"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/50 to-[#0f1117]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <nav className="flex items-center gap-2 text-xs text-[#8b95a9] mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">Epoxy Flooring</span>
          </nav>
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl">
            Epoxy Flooring Wollongong
          </h1>
          <p className="text-lg text-[#8b95a9] mt-4 max-w-xl">
            High-performance epoxy coatings for garages, warehouses, commercial and industrial floors across Wollongong and Sydney.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href={siteConfig.phoneHref} className="btn-glow inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              Call {siteConfig.phone}
            </a>
            <a href="#quote" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200">
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* What is Epoxy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">What We Do</p>
              <h2 className="text-3xl font-bold text-white mb-5">What is Epoxy Flooring?</h2>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Epoxy flooring is a high-performance resin coating applied directly onto properly prepared concrete. Once cured, it forms an exceptionally hard, seamless surface that bonds to the slab and resists moisture, chemicals, oil and heavy impact.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                The key to a lasting epoxy floor is preparation. We grind the concrete first to create a mechanically profiled surface - without this step, any epoxy coating will eventually delaminate. We never skip it.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-6">
                Ideal for garages, workshops, factories, warehouses, commercial kitchens, and any space that needs a durable, low-maintenance floor with a professional finish.
              </p>
              <div className="bg-[#161b27] border border-[#2a3347] rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-2">Important note on preparation</p>
                <p className="text-sm text-[#8b95a9]">
                  Cheap epoxy jobs fail because the concrete isn&rsquo;t properly ground first. We use industrial diamond grinders on every job - it&rsquo;s what makes the difference between a floor that peels in 12 months and one that lasts a decade.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image src="/images/gallery/epoxy-flake.jpg" alt="Epoxy flake flooring Wollongong" fill className="object-cover" />
                </div>
                <div className="relative h-56 rounded-xl overflow-hidden mt-8">
                  <Image src="/images/gallery/gallery-2.jpg" alt="Polished concrete Wollongong" fill className="object-cover" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Epoxy</p>
              <h2 className="text-3xl font-bold text-white">Benefits of Epoxy Flooring</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 80}>
                <div className="bg-[#1e2535] border border-[#2a3347] rounded-xl p-6 h-full">
                  <div className="w-8 h-8 rounded-lg bg-[#2563eb]/15 flex items-center justify-center mb-4">
                    <svg className="w-4 h-4 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-[#8b95a9] leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white">Epoxy Flooring FAQs</h2>
            </div>
          </ScrollReveal>
          <FAQAccordion faqs={epoxyFaqs} />
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Get Started</p>
              <h2 className="text-3xl font-bold text-white">Get a Free Epoxy Flooring Quote</h2>
              <p className="text-[#8b95a9] mt-3">Wollongong-based. Serving the full Illawarra and Sydney.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <QuoteForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
