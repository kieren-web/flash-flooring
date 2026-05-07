import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { siteConfig } from "@/data/siteConfig";
import { homeFaqs } from "@/data/faqs";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteForm from "@/components/QuoteForm";
import FAQAccordion from "@/components/FAQAccordion";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

export const metadata: Metadata = {
  title: "Flash Flooring Wollongong | Polished Concrete & Epoxy Flooring",
  description:
    "Wollongong's trusted polished concrete and epoxy flooring specialists. 20+ years experience, residential & commercial. Free quotes - call 0423 353 481.",
  alternates: { canonical: "https://flashflooring.com.au" },
};

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "5★", label: "Google Rating" },
  { value: "20+", label: "5-Star Reviews" },
  { value: "100%", label: "Free Quotes" },
];

const services = [
  {
    title: "Polished Concrete",
    desc: "Transform dull slabs into mirror-finish floors. Residential and commercial, any scale.",
    href: "/services/polished-concrete-wollongong",
    image: "/images/gallery/gallery-1.jpg",
  },
  {
    title: "Epoxy Flooring",
    desc: "High-performance epoxy coatings - moisture-proof, impact-resistant, seamlessly finished.",
    href: "/services/epoxy-flooring-wollongong",
    image: "/images/gallery/epoxy-flake.jpg",
  },
  {
    title: "Concrete Grinding",
    desc: "Surface preparation done right. Proper grinding is what makes every coating last.",
    href: "/contact",
    image: "/images/gallery/gallery-4.jpg",
  },
];

const process = [
  {
    step: "01",
    title: "Free On-Site Quote",
    desc: "Gary visits your site, assesses the floor and gives you a firm price. No hidden extras.",
  },
  {
    step: "02",
    title: "Surface Preparation",
    desc: "We grind the concrete to remove imperfections and open the surface for a lasting bond.",
  },
  {
    step: "03",
    title: "Professional Application",
    desc: "Polishing or epoxy applied using industrial-grade equipment by experienced tradespeople.",
  },
  {
    step: "04",
    title: "Stunning Result",
    desc: "Your floor is transformed. Durable, low-maintenance and looking sharp for years to come.",
  },
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/gallery/gallery-2.jpg"
          alt="Polished concrete floor Wollongong"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1117]/80 via-[#0f1117]/60 to-[#0f1117]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-2 bg-[#2563eb]/15 border border-[#2563eb]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
            <span className="text-sm text-[#3b82f6] font-medium">Wollongong &amp; Sydney&rsquo;s Flooring Specialists</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Polished Concrete &amp; Epoxy{" "}
            <span className="text-gradient">Flooring Wollongong</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8b95a9] max-w-2xl mx-auto mb-8">
            Family-owned. 20+ years experience. We transform residential and commercial concrete floors
            across Wollongong and Sydney - done right the first time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={siteConfig.phoneHref}
              className="btn-glow inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-base w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call {siteConfig.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-base w-full sm:w-auto justify-center"
            >
              Get a Free Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[#8b95a9]">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Free Quotes
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              20+ Years Experience
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Residential &amp; Commercial
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              5★ Google Reviews
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#161b27] border-y border-[#2a3347] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-[#8b95a9] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">What We Do</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Flooring Services in Wollongong</h2>
              <p className="text-[#8b95a9] mt-4 max-w-xl mx-auto">
                From residential homes to large commercial warehouses - we handle polished concrete and epoxy from start to finish.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 100}>
                <Link href={svc.href} className="group block bg-[#161b27] border border-[#2a3347] rounded-2xl overflow-hidden hover:border-[#2563eb]/50 transition-all duration-300">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161b27] via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#3b82f6] transition-colors">{svc.title}</h3>
                    <p className="text-sm text-[#8b95a9] leading-relaxed">{svc.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-[#2563eb] text-sm font-medium mt-4">
                      Learn more
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* ── ABOUT / WHY US ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image src="/images/gallery/gallery-4.jpg" alt="Polished concrete Wollongong" fill className="object-cover" />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden mt-6">
                  <Image src="/images/gallery/gallery-6.jpg" alt="Epoxy flooring Wollongong" fill className="object-cover" />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image src="/images/gallery/gallery-7.jpg" alt="Commercial flooring Wollongong" fill className="object-cover" />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden mt-6">
                  <Image src="/images/gallery/gallery-8.jpg" alt="Concrete polishing Wollongong" fill className="object-cover" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">About Flash Flooring</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Wollongong&rsquo;s Trusted Flooring Family - Over 20 Years Running
              </h2>
              <p className="text-[#8b95a9] leading-relaxed mb-5">
                Gary has been transforming concrete floors across the Illawarra for over two decades. Flash Flooring is family-owned, locally operated, and built on a simple belief: do the job properly the first time.
              </p>
              <p className="text-[#8b95a9] leading-relaxed mb-8">
                We work on everything from residential homes in Wollongong to large commercial warehouses in Sydney. Every quote is done by Gary personally - no salespeople, no surprises on the invoice.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "20+ Years Experience",
                  "Family Owned & Operated",
                  "Residential & Commercial",
                  "Free On-Site Quotes",
                  "Serving Wollongong to Sydney",
                  "Quick Turnaround",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#2563eb]/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#e8eaf0]">{point}</span>
                  </div>
                ))}
              </div>

              <a
                href={siteConfig.phoneHref}
                className="btn-glow inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Gary - {siteConfig.phone}
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Simple Process, Outstanding Results</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 100}>
                <div className="bg-[#1e2535] border border-[#2a3347] rounded-2xl p-6 h-full">
                  <span className="text-4xl font-bold text-[#2563eb]/20">{step.step}</span>
                  <h3 className="text-base font-semibold text-white mt-3 mb-2">{step.title}</h3>
                  <p className="text-sm text-[#8b95a9] leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Transformations</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Before &amp; After</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute top-3 left-3 z-10 bg-[#0f1117]/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">BEFORE</div>
                <div className="relative h-72 rounded-2xl overflow-hidden border border-[#2a3347]">
                  <Image src="/images/before-1.jpg" alt="Before concrete polishing" fill className="object-cover" />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="relative">
                <div className="absolute top-3 left-3 z-10 bg-[#2563eb] text-white text-xs font-bold px-3 py-1 rounded-full">AFTER</div>
                <div className="relative h-72 rounded-2xl overflow-hidden border border-[#2563eb]/40">
                  <Image src="/images/after-1.jpg" alt="After concrete polishing" fill className="object-cover" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <Script
          src="https://reputationhub.site/reputation/assets/review-widget.js"
          strategy="afterInteractive"
        />
        <div className="max-w-7xl mx-auto">
          <iframe
            className="lc_reviews_widget"
            src="https://reputationhub.site/reputation/widgets/review_widget/y23ZThV4pxfYxbIYqHXQ?widgetId=69fc4691da71f9605e83c422"
            frameBorder={0}
            scrolling="no"
            style={{ minWidth: "100%", width: "100%" }}
          />
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-2">Our Work</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Recent Projects</h2>
              </div>
              <Link href="/gallery" className="hidden sm:inline-flex items-center gap-2 text-sm text-[#2563eb] hover:text-[#3b82f6] font-medium transition-colors">
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["/images/gallery/gallery-1.jpg", "/images/gallery/gallery-2.jpg", "/images/gallery/gallery-3.jpg", "/images/gallery/gallery-4.jpg"].map((src, i) => (
              <ScrollReveal key={src} delay={i * 80}>
                <div className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image src={src} alt={`Flash Flooring project ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#0f1117]/0 group-hover:bg-[#0f1117]/30 transition-colors duration-300" />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm text-[#2563eb] font-medium">
              View all projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Where We Work</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Serving Wollongong to Sydney</h2>
            <div className="flex flex-wrap justify-center gap-2.5">
              {siteConfig.serviceAreas.map((area) => (
                <span key={area} className="text-sm text-[#8b95a9] bg-[#1e2535] border border-[#2a3347] px-4 py-1.5 rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Common Questions</h2>
            </div>
          </ScrollReveal>
          <FAQAccordion faqs={homeFaqs} />
        </div>
      </section>

      {/* ── QUOTE FORM ── */}
      <section id="quote" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b27]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Get Your Free Quote Today
              </h2>
              <p className="text-[#8b95a9] leading-relaxed mb-8">
                Fill in the form and Gary will be in touch quickly with a firm, no-obligation quote for your project.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2563eb]/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#8b95a9] uppercase tracking-wide">Call Gary direct</p>
                    <a href={siteConfig.phoneHref} className="text-white font-semibold hover:text-[#3b82f6] transition-colors">{siteConfig.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2563eb]/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#8b95a9] uppercase tracking-wide">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-white font-semibold hover:text-[#3b82f6] transition-colors">{siteConfig.email}</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <QuoteForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
