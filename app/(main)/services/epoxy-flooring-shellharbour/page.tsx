import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { epoxyFaqs } from "@/data/faqs";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteForm from "@/components/QuoteForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Epoxy Flooring Shellharbour | Flash Flooring",
  description:
    "Professional epoxy flooring in Shellharbour. Garages, warehouses & commercial. Impact-resistant, moisture-proof. Local Illawarra team - free quotes. Call 0423 353 481.",
  alternates: { canonical: "https://flashflooring.com.au/services/epoxy-flooring-shellharbour" },
};

const benefits = [
  { title: "Tough Enough for Garages", desc: "Handles cars, tools and heavy gear without chipping or peeling. The go-to finish for Shellharbour home garages." },
  { title: "Moisture Proof", desc: "Seamless surface with no joints - ideal for Shellharbour's coastal humidity and concrete slabs prone to moisture." },
  { title: "Quick Turnaround", desc: "Most garage jobs completed in 1-2 days. Light foot traffic in 24 hours so your life isn't disrupted." },
  { title: "Industrial Grade", desc: "Same resins used in commercial warehouses and factories - not hardware store paint products." },
  { title: "Easy to Clean", desc: "Spills, oil and grease wipe up in seconds. No grout lines, no staining." },
  { title: "Customisable Finish", desc: "Full range of colours and flake options - match your home or brand aesthetic exactly." },
];

export default function EpoxyFlooringShellharbourPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Epoxy Flooring Shellharbour",
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
    areaServed: { "@type": "City", name: "Shellharbour, NSW" },
    description:
      "Professional epoxy flooring for garages, warehouses and commercial properties in Shellharbour, Albion Park and surrounding Illawarra areas.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <Image
          src="/images/gallery/epoxy-flake.jpg"
          alt="Epoxy flooring Shellharbour"
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
            <span className="text-white">Epoxy Flooring Shellharbour</span>
          </nav>
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Shellharbour & Illawarra</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl">
            Epoxy Flooring Shellharbour
          </h1>
          <p className="text-lg text-[#8b95a9] mt-4 max-w-xl">
            High-performance epoxy coatings for Shellharbour garages, warehouses and commercial floors. Local team, industrial-grade products, free on-site quotes.
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

      {/* Intro */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Local Shellharbour Specialists</p>
              <h2 className="text-3xl font-bold text-white mb-5">Epoxy Flooring Built to Last in Shellharbour</h2>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Flash Flooring installs epoxy flooring across the Shellharbour LGA every week - from residential garages in Shell Cove and Oak Flats to commercial warehouses in the Albion Park Rail industrial precinct.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                The key to a long-lasting epoxy floor is concrete preparation. We use industrial diamond grinders on every job to mechanically profile the surface before any coating goes down. Without this step, epoxy peels. With it, it lasts a decade or more.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-6">
                We use industrial-grade two-part epoxy resins - not the single-part paint products you find at hardware stores. The difference in durability is significant and the price difference is worth every cent.
              </p>
              <div className="bg-[#161b27] border border-[#2a3347] rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-2">Why cheap epoxy fails</p>
                <p className="text-sm text-[#8b95a9]">
                  Most failed epoxy jobs come down to skipped prep or cheap products. We never cut corners on either - and we back our work because of it.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image src="/images/gallery/epoxy-flake.jpg" alt="Epoxy flake flooring Shellharbour garage" fill className="object-cover" />
                </div>
                <div className="relative h-56 rounded-xl overflow-hidden mt-8">
                  <Image src="/images/gallery/gallery-7.jpg" alt="Commercial epoxy floor Shellharbour" fill className="object-cover" />
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
              <h2 className="text-3xl font-bold text-white">Benefits of Epoxy Flooring in Shellharbour</h2>
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

      {/* Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Where We Work</p>
            <h2 className="text-3xl font-bold text-white mb-5">Shellharbour Suburbs We Cover</h2>
            <p className="text-[#8b95a9] mb-8">We cover the full Shellharbour LGA for epoxy flooring - residential garages, commercial units and industrial warehouses.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Shell Cove", "Shellharbour Village", "Calderwood", "Albion Park", "Albion Park Rail", "Oak Flats", "Barrack Heights", "Mount Warrigal", "Warilla", "Dunmore", "Flinders", "Lake Illawarra"].map((area) => (
                <span key={area} className="bg-[#1e2535] border border-[#2a3347] text-[#e8eaf0] text-sm px-4 py-1.5 rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white">Epoxy Flooring FAQs - Shellharbour</h2>
            </div>
          </ScrollReveal>
          <FAQAccordion faqs={epoxyFaqs} />
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#2563eb] text-sm font-semibond uppercase tracking-widest mb-3">Get Started</p>
              <h2 className="text-3xl font-bold text-white">Get a Free Epoxy Quote in Shellharbour</h2>
              <p className="text-[#8b95a9] mt-3">Local team. Fast turnaround. Gary calls you back personally.</p>
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
