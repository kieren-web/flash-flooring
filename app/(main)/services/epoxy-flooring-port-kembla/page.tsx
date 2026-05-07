import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { epoxyFaqs } from "@/data/faqs";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteForm from "@/components/QuoteForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Epoxy Flooring Port Kembla | Flash Flooring",
  description:
    "Industrial & commercial epoxy flooring in Port Kembla. Warehouses, factories, workshops & garages. Heavy-duty resins, full surface prep. Free quotes - call 0423 353 481.",
  alternates: { canonical: "https://flashflooring.com.au/services/epoxy-flooring-port-kembla" },
};

export default function EpoxyFlooringPortKemblaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Epoxy Flooring Port Kembla",
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
    areaServed: { "@type": "City", name: "Port Kembla, NSW" },
    description: "Heavy-duty epoxy flooring for industrial, commercial and residential properties in Port Kembla, Coniston and surrounding Wollongong areas.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <Image src="/images/gallery/epoxy-flake.jpg" alt="Epoxy flooring Port Kembla" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/50 to-[#0f1117]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <nav className="flex items-center gap-2 text-xs text-[#8b95a9] mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">Epoxy Flooring Port Kembla</span>
          </nav>
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Port Kembla & Industrial Wollongong</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl">Epoxy Flooring Port Kembla</h1>
          <p className="text-lg text-[#8b95a9] mt-4 max-w-xl">
            Heavy-duty epoxy coatings for Port Kembla warehouses, factories, workshops and commercial spaces. Industrial-grade products built to handle real working environments.
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
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Industrial & Commercial</p>
              <h2 className="text-3xl font-bold text-white mb-5">Heavy-Duty Epoxy for Port Kembla</h2>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Port Kembla is one of the Illawarra&rsquo;s main industrial precincts - warehouses, workshops, manufacturing facilities and commercial units that need flooring that can genuinely handle the work environment. Standard coatings don&rsquo;t cut it here.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                We use high-build industrial epoxy systems designed for heavy forklift traffic, chemical exposure, and the day-to-day punishment of a working facility. Every floor starts with diamond grinding to ensure the epoxy bonds to the concrete - not just sitting on top of it.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-6">
                We also cover residential properties and garages in the Port Kembla area. Whether it&rsquo;s a factory floor or a home garage - the standard of prep and product is the same.
              </p>
              <div className="bg-[#161b27] border border-[#2a3347] rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-2">Commercial & industrial quoting</p>
                <p className="text-sm text-[#8b95a9]">For larger commercial and industrial floors, call Gary directly on <a href={siteConfig.phoneHref} className="text-[#2563eb] hover:text-[#3b82f6]">{siteConfig.phone}</a> to discuss your requirements and arrange a site inspection.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image src="/images/gallery/epoxy-flake.jpg" alt="Industrial epoxy floor Port Kembla" fill className="object-cover" />
                </div>
                <div className="relative h-56 rounded-xl overflow-hidden mt-8">
                  <Image src="/images/gallery/gallery-5.jpg" alt="Commercial floor coating Port Kembla" fill className="object-cover" />
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
            <h2 className="text-2xl font-bold text-white mb-5">Port Kembla & Surrounding Areas</h2>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Port Kembla", "Coniston", "Unanderra", "Figtree", "Wollongong CBD", "Steeltown", "Berkeley", "Warrawong", "Windang", "Lake Illawarra"].map((area) => (
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
              <h2 className="text-3xl font-bold text-white">Get a Free Quote in Port Kembla</h2>
              <p className="text-[#8b95a9] mt-3">Residential, commercial and industrial. Local Wollongong team. Free on-site quotes.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}><QuoteForm /></ScrollReveal>
        </div>
      </section>
    </>
  );
}
