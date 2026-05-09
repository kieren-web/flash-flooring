"use client";

import { useState } from "react";
import Image from "next/image";

const GOOGLE_REVIEW_URL = "https://g.page/r/CVtLcX767npZEAI/review";

type Stage = "stars" | "private" | "thankyou-google" | "thankyou-private";

export default function ReviewPage() {
  const [stage, setStage] = useState<Stage>("stars");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleStarClick(star: number) {
    if (star === 5) {
      // Redirect to Google review
      window.location.href = GOOGLE_REVIEW_URL;
    } else {
      setStage("private");
    }
  }

  async function handlePrivateSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setStage("thankyou-private");
    // Optionally POST feedback somewhere — for now just shows thank you
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/images/flash-flooring-logo.png"
            alt="Flash Flooring"
            width={140}
            height={52}
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Stage: Star selection */}
        {stage === "stars" && (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">How did we do?</h1>
            <p className="text-[#8b95a9] mb-10 text-sm leading-relaxed">
              Gary and the team would love to hear your feedback on your recent flooring job.
            </p>

            <div className="flex justify-center gap-3 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <svg
                    className="w-14 h-14"
                    fill={star <= (hoveredStar || 0) ? "#f59e0b" : "#2a3347"}
                    viewBox="0 0 20 20"
                    style={{ transition: "fill 0.1s" }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>

            <p className="text-[#555] text-xs">Tap a star to continue</p>
          </div>
        )}

        {/* Stage: Private feedback form */}
        {stage === "private" && (
          <div>
            <button
              onClick={() => { setStage("stars"); setHoveredStar(0); }}
              className="flex items-center gap-1.5 text-[#8b95a9] hover:text-white text-sm mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-white mb-2 text-center">Thanks for the feedback</h1>
            <p className="text-[#8b95a9] mb-8 text-sm leading-relaxed text-center">
              We&apos;re sorry things weren&apos;t perfect. Tell us what happened and Gary will personally follow up.
            </p>

            <form onSubmit={handlePrivateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#8b95a9] mb-1.5">Your name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#1e2535] border border-[#2a3347] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2563eb]"
                  placeholder="e.g. John Smith"
                />
              </div>
              <div>
                <label className="block text-sm text-[#8b95a9] mb-1.5">Phone or email (so we can reach you)</label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#1e2535] border border-[#2a3347] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2563eb]"
                  placeholder="0400 000 000 or email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-[#8b95a9] mb-1.5">What could we have done better?</label>
                <textarea
                  required
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full bg-[#1e2535] border border-[#2a3347] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2563eb] resize-none"
                  placeholder="Tell us what happened..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-3.5 rounded-lg transition-colors text-sm"
              >
                Send Feedback
              </button>
            </form>
          </div>
        )}

        {/* Stage: Thank you after private feedback */}
        {stage === "thankyou-private" && (
          <div className="text-center">
            <div className="w-16 h-16 bg-[#1e2535] border border-[#2a3347] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Feedback received</h1>
            <p className="text-[#8b95a9] text-sm leading-relaxed">
              Gary will personally follow up with you shortly. We appreciate you taking the time — it helps us improve.
            </p>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-[#333] text-xs mt-12">Flash Flooring · Wollongong</p>
      </div>
    </div>
  );
}
