import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { polishedConcreteFaqs } from "@/data/faqs";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteForm from "@/components/QuoteForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Polished Concrete Shellharbour | Flash Flooring",
  description:
    "Professional polished concrete floors in Shellharbour. Residential & commercial. High-gloss to matte finishes. Local Illawarra team - free on-site quotes. Call 0423 353 481.",
  alternates: { canonical: "https://flashflooring.com.au/services/polished-concrete-shellharbour" },
};

const benefits = [
  { title: "Incredibly Durable", desc: "Properly polished concrete lasts decades with minimal maintenance - perfect for Shellharbour's coastal climate." },
  { title: "Easy to Clean", desc: "Damp mop with a pH-neutral cleaner. No waxing, no sealing needed ever again." },
  { title: "High-Gloss Finish", desc: "Mirror-quality reflective surface that transforms any room - from Shell Cove homes to Shellharbour City showrooms." },
  { title: "Cost Effective", desc: "Uses your existing concrete slab - no new materials, no adhesives, no mess." },
  { title: "Non-Slip Sealed", desc: "Slip-resistant sealer applied to every job - safe for families and foot traffic." },
  { title: "Residential & Commercial", desc: "New builds in Shell Cove, existing homes in Shellharbour Village, commercial spaces - we do it all." },
];

const applications = [
  "New homes in Shell Cove & Calderwood",
  "Shellharbour Village residences",
  "Garages & outdoor entertaining areas",
  "Commercial offices & retail spaces",
  "Shellharbour City Centre businesses",
  "Restaurants, cafes & hospitality",
  "Warehouses & industrial floors",
  "Healthcare & medical facilities",
];

export default function PolishedConcreteShellharbourPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Polished Concrete Shellharbour",
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
      "Professional polished concrete flooring for residential and commercial properties in Shellharbour and the Illawarra region.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <Image
          src="/images/gallery/gallery-1.jpg"
          alt="Polished concrete flooring Shellharbour"
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
            <span className="text-white">Polished Concrete Shellharbour</span>
          </nav>
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Shellharbour & Illawarra</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl">
            Polished Concrete Shellharbour
          </h1>
          <p className="text-lg text-[#8b95a9] mt-4 max-w-xl">
            Local polished concrete specialists serving Shellharbour, Shell Cove, Calderwood, Albion Park and surrounding areas. Based in Unanderra - 10 minutes from your door.
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
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Your Local Shellharbour Team</p>
              <h2 className="text-3xl font-bold text-white mb-5">Polished Concrete Done Right in Shellharbour</h2>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Flash Flooring is based in Unanderra - minutes from Shellharbour. We work across the full Shellharbour LGA daily, from new builds in Shell Cove and Calderwood to renovations in Shellharbour Village and commercial fit-outs near Shellharbour City Centre.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-4">
                Polished concrete is the go-to flooring choice for Shellharbour&rsquo;s newer estates. It handles the coastal climate well, requires zero maintenance and looks exceptional in open-plan living areas - which is why so many new Shell Cove homeowners are choosing it over timber or tiles.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-6">
                Owner Gary has over 20 years of experience in the trade and personally oversees every job. No subcontractors, no surprises - just a clean, professional finish delivered on time.
              </p>
              <div className="bg-[#161b27] border border-[#2a3347] rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-2">Free on-site quotes across Shellharbour</p>
                <p className="text-sm text-[#8b95a9]">
                  Gary comes to you, measures up and gives you a straight price - no hidden costs, no call centres. Call <a href={siteConfig.phoneHref} className="text-[#2563eb] hover:text-[#3b82f6]">{siteConfig.phone}</a> or fill in the form below.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image src="/images/gallery/gallery-3.jpg" alt="Polished concrete Shellharbour home" fill className="object-cover" />
                </div>
                <div className="relative h-56 rounded-xl overflow-hidden mt-8">
                  <Image src="/images/gallery/gallery-4.jpg" alt="High gloss concrete floor Shellharbour" fill className="object-cover" />
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
              <h2 className="text-3xl font-bold text-white">Why Shellharbour Homeowners Choose Polished Concrete</h2>
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
                <h2 className="text-3xl font-bold text-white mb-5">Shellharbour Areas We Cover</h2>
                <p className="text-[#8b95a9] leading-relaxed mb-6">
                  We service the entire Shellharbour LGA and surrounding Illawarra suburbs. From the waterfront homes of Shell Cove to the growing estates of Calderwood - we&rsquo;re your local team.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {["Shell Cove", "Shellharbour Village", "Calderwood", "Albion Park", "Albion Park Rail", "Oak Flats", "Barrack Heights", "Mount Warrigal", "Warilla", "Dunmore"].map((area) => (
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
              <h2 className="text-3xl font-bold text-white">Polished Concrete FAQs - Shellharbour</h2>
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
              <h2 className="text-3xl font-bold text-white">Get a Free Quote in Shellharbour</h2>
              <p className="text-[#8b95a9] mt-3">Local Illawarra team. No call centres. Gary calls you back personally.</p>
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
