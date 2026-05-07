import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0d14] border-t border-[#2a3347]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/images/flash-flooring-logo.png"
              alt="Flash Flooring"
              width={130}
              height={48}
              className="h-11 w-auto object-contain mb-4"
            />
            <p className="text-sm text-[#8b95a9] leading-relaxed max-w-xs">
              Wollongong&rsquo;s trusted polished concrete and epoxy flooring specialists.
              Family owned, 20+ years experience.
            </p>
            <div className="flex items-center gap-1.5 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-[#8b95a9] ml-1">20+ 5-star Google reviews</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/services/polished-concrete-wollongong", label: "Polished Concrete" },
                { href: "/services/epoxy-flooring-wollongong", label: "Epoxy Flooring" },
                { href: "/gallery", label: "Gallery" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#8b95a9] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={siteConfig.phoneHref} className="flex items-start gap-3 text-sm text-[#8b95a9] hover:text-white transition-colors">
                  <svg className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-3 text-sm text-[#8b95a9] hover:text-white transition-colors">
                  <svg className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#8b95a9]">
                <svg className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {siteConfig.address.full}
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8b95a9]">
          <p>&copy; {currentYear} Flash Flooring. All rights reserved. ABN {siteConfig.abn}</p>
          <p>Wollongong&rsquo;s Polished Concrete & Epoxy Flooring Specialists</p>
        </div>
      </div>
    </footer>
  );
}
