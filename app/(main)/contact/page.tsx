import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import ScrollReveal from "@/components/ScrollReveal";
import QuoteForm from "@/components/QuoteForm";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

export const metadata: Metadata = {
  title: "Contact Flash Flooring | Free Quote Wollongong",
  description:
    "Get a free quote for polished concrete or epoxy flooring in Wollongong. Call Gary on 0423 353 481 or fill in the form - prompt response guaranteed.",
  alternates: { canonical: "https://flashflooring.com.au/contact" },
};

const contactDetails = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    ),
    label: "Phone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: siteConfig.address.full,
    href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address.full)}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#161b27] border-b border-[#2a3347]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">Request a Free Quote</h1>
          <p className="text-lg text-[#8b95a9] max-w-xl mx-auto">
            No obligation. Gary will get back to you quickly with a straight, on-site price.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Details</h2>
              <div className="space-y-5 mb-8">
                {contactDetails.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.label === "Address" ? "_blank" : undefined}
                    rel={c.label === "Address" ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#2563eb]/15 flex items-center justify-center text-[#2563eb] flex-shrink-0 group-hover:bg-[#2563eb]/25 transition-colors">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs text-[#8b95a9] uppercase tracking-wide mb-0.5">{c.label}</p>
                      <p className="text-white font-medium group-hover:text-[#3b82f6] transition-colors">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Service areas */}
              <div className="bg-[#161b27] border border-[#2a3347] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-3">Service Areas</h3>
                <p className="text-sm text-[#8b95a9] leading-relaxed">
                  We service the full Illawarra region - Wollongong, Fairy Meadow, Thirroul, Bulli, Shellharbour, Kiama, Dapto - and travel to Sydney including Sutherland, Campbelltown, Liverpool and Inner West.
                </p>
              </div>

              {/* Hours */}
              <div className="bg-[#161b27] border border-[#2a3347] rounded-xl p-6 mt-4">
                <h3 className="text-sm font-semibold text-white mb-3">Hours</h3>
                <div className="space-y-1.5 text-sm text-[#8b95a9]">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="text-white">7:00am – 5:00pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white">7:00am – 12:00pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-[#8b95a9]">Closed</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <QuoteForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
