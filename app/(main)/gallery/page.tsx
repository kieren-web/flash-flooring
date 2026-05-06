import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Gallery | Flash Flooring Wollongong",
  description:
    "See our polished concrete and epoxy flooring work across Wollongong and Sydney. Residential and commercial projects by Flash Flooring.",
  alternates: { canonical: "https://flashflooring.com.au/gallery" },
};

const galleryImages = [
  { src: "/images/gallery/gallery-1.jpg", alt: "Polished concrete Wollongong" },
  { src: "/images/gallery/gallery-2.jpg", alt: "Polished concrete Wollongong" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Polished concrete Wollongong" },
  { src: "/images/gallery/gallery-4.jpg", alt: "Polished concrete Wollongong" },
  { src: "/images/gallery/gallery-5.jpg", alt: "Polished concrete Wollongong" },
  { src: "/images/gallery/gallery-6.jpg", alt: "Polished concrete Wollongong" },
  { src: "/images/gallery/gallery-7.jpg", alt: "Polished concrete Wollongong" },
  { src: "/images/gallery/gallery-8.jpg", alt: "Polished concrete Wollongong" },
  { src: "/images/gallery/epoxy-flake.jpg", alt: "Epoxy flake flooring Wollongong" },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#161b27] border-b border-[#2a3347]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest mb-3">Our Work</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">Project Gallery</h1>
          <p className="text-lg text-[#8b95a9] max-w-xl mx-auto">
            Residential and commercial flooring jobs across Wollongong and Sydney - polished concrete, epoxy, and everything in between.
          </p>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-6">Before &amp; After</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute top-3 left-3 z-10 bg-[#0f1117]/80 text-white text-xs font-bold px-3 py-1 rounded-full">BEFORE</div>
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

      {/* Gallery Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8">All Projects</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={img.src} delay={i * 60}>
                <div className="group relative aspect-square rounded-xl overflow-hidden bg-[#161b27] border border-[#2a3347]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0f1117]/0 group-hover:bg-[#0f1117]/20 transition-colors duration-300" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161b27] border-t border-[#2a3347]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Want results like these?</h2>
            <p className="text-[#8b95a9] mb-8">Call Gary for a free on-site quote - no obligation, straight pricing.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={siteConfig.phoneHref} className="btn-glow inline-flex items-center gap-2 justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                Call {siteConfig.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 justify-center bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200">
                Request a Quote
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
