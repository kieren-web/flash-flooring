export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://flashflooring.com.au/#business",
    name: "Flash Flooring",
    description:
      "Wollongong's trusted polished concrete and epoxy flooring specialists. Family owned, 20+ years experience. Serving Wollongong to Sydney.",
    url: "https://flashflooring.com.au",
    telephone: "+61423353481",
    email: "info@flashflooring.com.au",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3/2 Lady Penrhyn Drive",
      addressLocality: "Unanderra",
      addressRegion: "NSW",
      postalCode: "2526",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -34.4548,
      longitude: 150.8647,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: "25",
      bestRating: "5",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "07:00",
        closes: "12:00",
      },
    ],
    areaServed: [
      "Wollongong", "Fairy Meadow", "Thirroul", "Bulli", "Shellharbour",
      "Kiama", "Dapto", "Figtree", "Unanderra", "Port Kembla",
      "Helensburgh", "Sutherland", "Cronulla", "Campbelltown", "Liverpool",
      "Sydney",
    ],
    priceRange: "$$",
    currenciesAccepted: "AUD",
    paymentAccepted: "Cash, Bank Transfer",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
