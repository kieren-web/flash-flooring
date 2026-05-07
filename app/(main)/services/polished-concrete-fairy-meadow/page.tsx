import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { polishedConcreteFaqs } from "@/data/faqs";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteForm from "@/components/QuoteForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Polished Concrete Fairy Meadow | Flash Flooring",
  description:
    "Polished concrete floors in Fairy Meadow. Residential & commercial specialists. High-gloss to matte finishes, free on-site quotes. Local Wollongong team - call 0423 353 481.",
  alternates: { canonical: "https://flashflooring.com.au/services/polished-concrete-fairy-meadow" },
};

export default function PolishedConcreteFairyMeadowPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Polished Concrete Fairy Meadow",
    provider: {
      "@type": "LocalBusiness",
      name: "Flash Flooring",
      telephone: "0423353481",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3/2 Lady Penrhyn Drive",
        addressLocality: "Unanderra",
        addressRegion: "NSW",
        postalCode: "2526",
      },
    },
    areaServed: { "@type": "City", name: "Fairy Meadow, NSW" },
    description: "Professional polished concrete flooring for homes and businesses in Fairy Meadow and North Wollongong.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <Image src="/images/gallery/gallery-1.jpg" alt="Polished concrete flooring Fairy Meadow" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/50 to-[#0f1117]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <nav className="flex items-center gap-2 text-xs text-[#8b95a9] mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">Polished Concrete Fairy Meadow</span>
          </nav>
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Fairy Meadow & North Wollongong</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl">Polished Concrete Fairy Meadow</h1>
          <p className="text-lg text-[#8b95a9] mt-4 max-w-xl">
            Local polished concrete specialists serving Fairy Meadow, Towradgi, Corrimal and the North Wollongong corridor. Based in Unanderra - minutes away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href={siteConfig.phoneHref} className="btn-glow inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              Call {siteConfig.phone}
            </a>
            <a href="#quote" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200">Get a Free Quote</a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Your Local Team</p>
              <h2 className="text-3xl font-bold text-white mb-5">Polished Concrete for Fairy Meadow Homes</h2>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Fairy Meadow has seen a wave of renovations over the last decade - older homes updated for modern living, open-plan layouts opening up to the ocean breeze. Polished concrete fits perfectly into that style. It handles the coastal environment, looks incredible in open living spaces, and genuinely adds value to your home.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                We work throughout the Fairy Meadow, Towradgi, Corrimal and Thirroul corridor regularly. Flash Flooring is a local Illawarra business - not a Sydney contractor driving down. Gary personally oversees every job and has done so for 20+ years.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-6">
                Whether it&rsquo;s a full home polish, a single living area, or a commercial fit-out near the beach strip - we&rsquo;ll give you an honest assessment and a straight price.
              </p>
              <div className="bg-[#161b27] border border-[#2a3347] rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-2">Free on-site quotes in Fairy Meadow</p>
                <p className="text-sm text-[#8b95a9]">Call <a href={siteConfig.phoneHref} className="text-[#2563eb] hover:text-[#3b82f6]">{siteConfig.phone}</a> - Gary comes to you, measures up and gives you a fixed price on the spot.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image src="/images/gallery/gallery-3.jpg" alt="Polished concrete Fairy Meadow home" fill className="object-cover" />
                </div>
                <div className="relative h-56 rounded-xl overflow-hidden mt-8">
                  <Image src="/images/gallery/gallery-6.jpg" alt="High gloss concrete Fairy Meadow" fill className="object-cover" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Where We Work</p>
            <h2 className="text-2xl font-bold text-white mb-5">Fairy Meadow & Surrounding Areas</h2>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Fairy Meadow", "Towradgi", "Corrimal", "Thirroul", "Bulli", "Woonona", "Bellambi", "Russell Vale", "North Wollongong", "Wollongong CBD"].map((area) => (
                <span key={area} className="bg-[#1e2535] border border-[#2a3347] text-[#e8eaf0] text-sm px-4 py-1.5 rounded-full">{area}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white">Polished Concrete FAQs</h2>
            </div>
          </ScrollReveal>
          <FAQAccordion faqs={polishedConcreteFaqs} />
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Get Started</p>
              <h2 className="text-3xl font-bold text-white">Get a Free Quote in Fairy Meadow</h2>
              <p className="text-[#8b95a9] mt-3">Local Wollongong team. No call centres. Gary calls you back personally.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}><QuoteForm /></ScrollReveal>
        </div>
      </section>
    </>
  );
}
