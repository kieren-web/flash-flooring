"use client";

import { useState } from "react";

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    suburb: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", phone: "", email: "", suburb: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#1e2535] border border-[#2563eb]/40 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#2563eb]/15 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Quote Request Sent!</h3>
        <p className="text-[#8b95a9] text-sm">Gary will be in touch shortly. You can also call him directly on{" "}
          <a href="tel:0423353481" className="text-[#3b82f6] font-medium">0423 353 481</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1e2535] border border-[#2a3347] rounded-2xl p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#8b95a9] mb-1.5">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full bg-[#0f1117] border border-[#2a3347] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#2563eb] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#8b95a9] mb-1.5">Phone *</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            type="tel"
            placeholder="0400 000 000"
            className="w-full bg-[#0f1117] border border-[#2a3347] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#2563eb] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#8b95a9] mb-1.5">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="you@email.com"
            className="w-full bg-[#0f1117] border border-[#2a3347] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#2563eb] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#8b95a9] mb-1.5">Suburb *</label>
          <input
            name="suburb"
            value={form.suburb}
            onChange={handleChange}
            required
            placeholder="e.g. Wollongong"
            className="w-full bg-[#0f1117] border border-[#2a3347] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#2563eb] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#8b95a9] mb-1.5">Service Required *</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          required
          className="w-full bg-[#0f1117] border border-[#2a3347] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#2563eb] transition-colors"
        >
          <option value="">Select a service</option>
          <option value="Polished Concrete">Polished Concrete</option>
          <option value="Epoxy Flooring">Epoxy Flooring</option>
          <option value="Concrete Grinding">Concrete Grinding</option>
          <option value="Not sure yet">Not sure yet - need advice</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#8b95a9] mb-1.5">Tell us about your project</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          placeholder="Floor size, current condition, any specific requirements..."
          className="w-full bg-[#0f1117] border border-[#2a3347] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#2563eb] transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">Something went wrong. Please call us directly on 0423 353 481.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-glow w-full bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-all duration-200 text-sm"
      >
        {status === "loading" ? "Sending..." : "Request Free Quote →"}
      </button>

      <p className="text-center text-xs text-[#8b95a9]">No obligation. Gary will get back to you promptly.</p>
    </form>
  );
}
