import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old blog posts → relevant service pages
      {
        source: "/answers-to-the-most-common-questions-about-commercial-polished-concrete-wollongong",
        destination: "/services/polished-concrete-wollongong",
        permanent: true,
      },
      {
        source: "/answers-to-the-most-common-questions-about-commercial-polished-concrete-wollongong/",
        destination: "/services/polished-concrete-wollongong",
        permanent: true,
      },
      {
        source: "/great-options-for-commercial-flooring-projects",
        destination: "/services/epoxy-flooring-wollongong",
        permanent: true,
      },
      {
        source: "/great-options-for-commercial-flooring-projects/",
        destination: "/services/epoxy-flooring-wollongong",
        permanent: true,
      },
      {
        source: "/is-polished-concrete-worth-the-investment",
        destination: "/services/polished-concrete-wollongong",
        permanent: true,
      },
      {
        source: "/is-polished-concrete-worth-the-investment/",
        destination: "/services/polished-concrete-wollongong",
        permanent: true,
      },
      {
        source: "/transform-your-space-with-wollongong-flooring-contact-flash-flooring-today",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/transform-your-space-with-wollongong-flooring-contact-flash-flooring-today/",
        destination: "/contact",
        permanent: true,
      },
      // Old gallery/media pages
      {
        source: "/commercial-photos",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/commercial-photos/",
        destination: "/gallery",
        permanent: true,
      },
      // Old blog index
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/",
        destination: "/",
        permanent: true,
      },
      // Old Sydney pages → homepage (Sydney is out of primary area)
      {
        source: "/polished-concrete-outdoor-areas-sydney",
        destination: "/",
        permanent: true,
      },
      {
        source: "/polished-concrete-outdoor-areas-sydney/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/concrete-grinding-sydney",
        destination: "/",
        permanent: true,
      },
      {
        source: "/concrete-grinding-sydney/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/is-sydney-grinding-and-polishing-costs-worth-it",
        destination: "/",
        permanent: true,
      },
      {
        source: "/is-sydney-grinding-and-polishing-costs-worth-it/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
