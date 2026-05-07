import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { polishedConcreteFaqs } from "@/data/faqs";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteForm from "@/components/QuoteForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Polished Concrete Kiama | Flash Flooring",
  description:
    "Polished concrete flooring in Kiama and surrounding areas. Residential renovations, new builds & commercial. Local Illawarra team - free quotes. Call 0423 353 481.",
  alternates: { canonical: "https://flashflooring.com.au/services/polished-concrete-kiama" },
};

const benefits = [
  { title: "Perfect for Coastal Homes", desc: "Polished concrete handles humidity and salt air far better than timber or carpet - ideal for Kiama's coastal environment." },
  { title: "Zero Ongoing Maintenance", desc: "No waxing, polishing or resealing. A damp mop and pH-neutral cleaner is all you need." },
  { title: "Stunning in Open-Plan Homes", desc: "The reflective finish opens up space and brings in natural light - a favourite in Kiama's renovated weatherboards and new builds." },
  { title: "Uses Your Existing Slab", desc: "No need to rip up or replace your floor. We transform what's already there." },
  { title: "Adds Real Value", desc: "Polished concrete is a premium finish that genuinely adds to your home's resale value." },
  { title: "Residential & Holiday Homes", desc: "Whether it's your permanent home in Kiama or a holiday property in Gerringong - we deliver the same quality finish." },
];

const applications = [
  "Kiama & Kiama Downs homes",
  "Gerringong & Gerroa properties",
  "Holiday homes & beach houses",
  "Open-plan living & dining areas",
  "Garages & outdoor entertaining",
  "Coastal commercial spaces",
  "Cafes & hospitality venues",
  "Boutique retail & showrooms",
];

export default function PolishedConcreteKiamaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Polished Concrete Kiama",
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
    areaServed: { "@type": "City", name: "Kiama, NSW" },
    description:
      "Professional polished concrete flooring for homes and commercial properties in Kiama, Gerringong, Gerroa and surrounding South Coast areas.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <Image
          src="/images/gallery/gallery-2.jpg"
          alt="Polished concrete flooring Kiama"
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
            <span className="text-white">Polished Concrete Kiama</span>
          </nav>
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Kiama & South Coast</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl">
            Polished Concrete Kiama
          </h1>
          <p className="text-lg text-[#8b95a9] mt-4 max-w-xl">
            Polished concrete floors for Kiama homes, holiday properties and businesses. Covering Kiama, Gerringong, Gerroa, Jamberoo and the surrounding South Coast.
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
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Serving Kiama & South Coast</p>
              <h2 className="text-3xl font-bold text-white mb-5">The Go-To Choice for Kiama Homes</h2>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Kiama&rsquo;s coastal lifestyle deserves flooring that can keep up with it. Polished concrete has become the preferred choice for Kiama homeowners who want a floor that looks incredible, handles the coastal environment and never needs replacing.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                We travel to Kiama regularly and cover all surrounding areas including Gerringong, Gerroa, Jamberoo and Kiama Downs. As a local Illawarra business - not a Sydney company sending crews down the highway - we treat every Kiama job with the same care as a job next door.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-6">
                Whether you&rsquo;re renovating an older Kiama weatherboard, building new in Kiama Downs, or fitting out a cafe on Collins Street - we&rsquo;ll give you a straight price and a finish that turns heads.
              </p>
              <div className="bg-[#161b27] border border-[#2a3347] rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-2">We travel to Kiama at no extra charge</p>
                <p className="text-sm text-[#8b95a9]">
                  Based in Unanderra, we&rsquo;re 30 minutes from Kiama and make the run regularly. Call <a href={siteConfig.phoneHref} className="text-[#2563eb] hover:text-[#3b82f6]">{siteConfig.phone}</a> to book your free on-site quote.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image src="/images/gallery/gallery-5.jpg" alt="Polished concrete Kiama home" fill className="object-cover" />
                </div>
                <div className="relative h-56 rounded-xl overflow-hidden mt-8">
                  <Image src="/images/gallery/gallery-6.jpg" alt="Concrete floor finish Kiama" fill className="object-cover" />
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
              <h2 className="text-3xl font-bold text-white">Why Kiama Homeowners Choose Polished Concrete</h2>
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
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Where We Work</p>
                <h2 className="text-3xl font-bold text-white mb-5">Kiama Areas We Cover</h2>
                <p className="text-[#8b95a9] leading-relaxed mb-6">
                  We cover Kiama and all surrounding South Coast communities. If you&rsquo;re not sure if we come to you - just call and ask. We most likely do.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {["Kiama", "Kiama Downs", "Gerringong", "Gerroa", "Jamberoo", "Minnamurra", "Bombo", "Saddleback Mountain", "Berry (on request)", "Nowra (on request)"].map((area) => (
                    <div key={area} className="flex items-center gap-2 text-sm text-[#e8eaf0]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Applications</p>
                <h2 className="text-3xl font-bold text-white mb-5">Where We Install It</h2>
                <div className="grid grid-cols-1 gap-2">
                  {applications.map((app) => (
                    <div key={app} className="flex items-center gap-2 text-sm text-[#e8eaf0]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0" />
                      {app}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white">Polished Concrete FAQs - Kiama</h2>
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
              <h2 className="text-3xl font-bold text-white">Get a Free Quote in Kiama</h2>
              <p className="text-[#8b95a9] mt-3">Local Illawarra team. We travel to Kiama at no extra cost. Gary calls you back personally.</p>
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
