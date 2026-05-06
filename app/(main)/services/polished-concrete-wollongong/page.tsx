import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { polishedConcreteFaqs } from "@/data/faqs";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteForm from "@/components/QuoteForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Polished Concrete Wollongong | Flash Flooring",
  description:
    "Expert polished concrete flooring in Wollongong. Residential & commercial, high-gloss to matte finishes. 20+ years experience. Free on-site quotes - call 0423 353 481.",
  alternates: { canonical: "https://flashflooring.com.au/services/polished-concrete-wollongong" },
};

const benefits = [
  { title: "Incredibly Durable", desc: "Properly polished concrete lasts decades with minimal maintenance." },
  { title: "Easy to Clean", desc: "Damp mop with a pH-neutral cleaner - no waxing, no sealing needed." },
  { title: "High-Gloss Finish", desc: "Mirror-quality reflective surface that transforms any space." },
  { title: "Cost Effective", desc: "Uses your existing slab - no need for new materials or adhesives." },
  { title: "Non-Slip Sealed", desc: "We apply slip-resistant sealer to every job for safety." },
  { title: "Residential & Commercial", desc: "Homes, warehouses, showrooms, offices - any concrete surface." },
];

const applications = [
  "Residential homes & living areas",
  "Garages & driveways",
  "Commercial offices & showrooms",
  "Retail spaces",
  "Warehouses & factories",
  "Restaurants & cafes",
  "Healthcare facilities",
  "Educational institutions",
];

export default function PolishedConcretePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Polished Concrete Wollongong",
    provider: { "@type": "LocalBusiness", name: "Flash Flooring" },
    areaServed: "Wollongong, NSW",
    description:
      "Professional polished concrete flooring for residential and commercial properties across Wollongong and Sydney.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <Image
          src="/images/gallery/gallery-1.jpg"
          alt="Polished concrete flooring Wollongong"
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
            <span className="text-white">Polished Concrete</span>
          </nav>
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl">
            Polished Concrete Wollongong
          </h1>
          <p className="text-lg text-[#8b95a9] mt-4 max-w-xl">
            High-gloss, durable polished concrete floors for homes and businesses across Wollongong and Sydney. Done right, first time.
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

      {/* What is Polished Concrete */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">What We Do</p>
              <h2 className="text-3xl font-bold text-white mb-5">What is Polished Concrete?</h2>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Polished concrete is a multi-step process where we grind your existing concrete slab using diamond-tipped tooling - removing imperfections, opening the surface and progressively refining it to your chosen finish level.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                The result is a smooth, dense, highly reflective floor that&rsquo;s bonded at a molecular level - no coatings to peel, no membranes to delaminate. Just the concrete itself, transformed.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-6">
                We offer four gloss levels - matte, satin, semi-gloss and high-gloss - and can expose the natural aggregate in your slab for a terrazzo-style look, or add colour during the polishing process.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {applications.slice(0, 6).map((app) => (
                  <div key={app} className="flex items-center gap-2 text-sm text-[#e8eaf0]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0" />
                    {app}
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image src="/images/gallery/gallery-3.jpg" alt="Polished concrete detail" fill className="object-cover" />
                </div>
                <div className="relative h-56 rounded-xl overflow-hidden mt-8">
                  <Image src="/images/gallery/gallery-4.jpg" alt="High gloss polished concrete" fill className="object-cover" />
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
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Why Choose It</p>
              <h2 className="text-3xl font-bold text-white">Benefits of Polished Concrete</h2>
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

      {/* Gallery */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8">Polished Concrete Projects</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["/images/gallery/gallery-1.jpg", "/images/gallery/gallery-2.jpg", "/images/gallery/gallery-5.jpg", "/images/gallery/gallery-6.jpg"].map((src, i) => (
              <ScrollReveal key={src} delay={i * 80}>
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={src} alt={`Polished concrete Wollongong project ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
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
      <section id="quote" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Get Started</p>
              <h2 className="text-3xl font-bold text-white">Get a Free Polished Concrete Quote</h2>
              <p className="text-[#8b95a9] mt-3">Based in Wollongong - serving the full Illawarra and Sydney.</p>
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
