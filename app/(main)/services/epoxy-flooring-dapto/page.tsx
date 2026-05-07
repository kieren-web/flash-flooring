import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { epoxyFaqs } from "@/data/faqs";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteForm from "@/components/QuoteForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Epoxy Flooring Dapto | Flash Flooring",
  description:
    "Epoxy flooring in Dapto and surrounding suburbs. Garages, workshops & commercial floors. Industrial-grade resins. Local Wollongong team - free quotes. Call 0423 353 481.",
  alternates: { canonical: "https://flashflooring.com.au/services/epoxy-flooring-dapto" },
};

const benefits = [
  { title: "Built for Dapto Garages", desc: "Handles the demands of a working garage - cars, tools, oil spills. Applied properly over ground concrete, it lasts 10+ years." },
  { title: "Full Surface Prep Included", desc: "We diamond grind every slab before coating. No shortcuts. That's why our floors don't peel." },
  { title: "Industrial Grade Products", desc: "Two-part epoxy resins - not the single-part paint sold at hardware stores. The difference in durability is enormous." },
  { title: "1-2 Day Turnaround", desc: "Most residential garage jobs done in a day. Back in your garage within 24-48 hours." },
  { title: "Seamless & Moisture Resistant", desc: "No joints, no grout lines. Liquid-proof surface that handles anything you throw at it." },
  { title: "Colours & Flake Options", desc: "Plain colours, decorative flake, metallic - dozens of options to suit your style." },
];

export default function EpoxyFlooringDaptoPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Epoxy Flooring Dapto",
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
    areaServed: { "@type": "City", name: "Dapto, NSW" },
    description:
      "Professional epoxy flooring for garages, workshops and commercial properties in Dapto, Kembla Grange, Horsley and surrounding Wollongong suburbs.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <Image
          src="/images/gallery/epoxy-flake.jpg"
          alt="Epoxy flooring Dapto"
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
            <span className="text-white">Epoxy Flooring Dapto</span>
          </nav>
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Dapto & West Wollongong</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl">
            Epoxy Flooring Dapto
          </h1>
          <p className="text-lg text-[#8b95a9] mt-4 max-w-xl">
            Epoxy floor coatings for Dapto garages, workshops and commercial spaces. Industrial-grade products, proper concrete prep, local team based 10 minutes away in Unanderra.
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
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Your Local Dapto Team</p>
              <h2 className="text-3xl font-bold text-white mb-5">Epoxy Flooring That Actually Lasts</h2>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Dapto has grown fast over the last decade - new estates, bigger garages, more working families who want a floor that can handle real life. Epoxy is the answer: seamless, tough, easy to clean and genuinely durable when installed correctly.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Flash Flooring is based in Unanderra - we&rsquo;re 10 minutes from Dapto and work in the area regularly. Every job starts with diamond grinding the concrete to create a proper mechanical bond. That&rsquo;s what separates a floor that lasts 10+ years from one that peels in 18 months.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-6">
                We work across residential garages, home workshops, commercial units and small industrial spaces throughout Dapto, Kembla Grange, Horsley and surrounds.
              </p>
              <div className="bg-[#161b27] border border-[#2a3347] rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-2">Not sure what you need?</p>
                <p className="text-sm text-[#8b95a9]">
                  Call Gary on <a href={siteConfig.phoneHref} className="text-[#2563eb] hover:text-[#3b82f6]">{siteConfig.phone}</a> and describe your floor. He&rsquo;ll tell you exactly what will work and give you a straight price - no fluff.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image src="/images/gallery/epoxy-flake.jpg" alt="Epoxy garage floor Dapto" fill className="object-cover" />
                </div>
                <div className="relative h-56 rounded-xl overflow-hidden mt-8">
                  <Image src="/images/gallery/gallery-8.jpg" alt="Concrete floor coating Dapto" fill className="object-cover" />
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
              <h2 className="text-3xl font-bold text-white">Why Dapto Homeowners Choose Epoxy</h2>
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
            <h2 className="text-3xl font-bold text-white mb-5">Dapto & Surrounds We Cover</h2>
            <p className="text-[#8b95a9] mb-8">Based in Unanderra, we cover Dapto and all surrounding western Wollongong suburbs.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Dapto", "Kembla Grange", "Horsley", "Wongawilli", "Marshall Mount", "Brownsville", "Avondale", "Unanderra", "Yallah", "Huntley"].map((area) => (
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
              <h2 className="text-3xl font-bold text-white">Epoxy Flooring FAQs - Dapto</h2>
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
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Get Started</p>
              <h2 className="text-3xl font-bold text-white">Get a Free Epoxy Quote in Dapto</h2>
              <p className="text-[#8b95a9] mt-3">Local Wollongong team. 10 minutes from Dapto. Gary calls you back personally.</p>
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
