/**
 * The general questions every visitor asks, answered once and rendered on both
 * the homepage and /about via `components/faq/FaqSection`. Page-specific
 * questions stay with their own pages (`servicesFaq`, `industriesFaq`) rather
 * than moving here, so a crawler never sees the same question answered twice
 * on one page.
 */
export const generalFaq = {
  eyebrow: "Questions",
  heading: "Frequently Asked Questions",
  items: [
    {
      question: "Do you help first-time entrepreneurs?",
      answer:
        "Yes, we specialize in guiding new entrepreneurs step-by-step, from initial concept through commissioning.",
    },
    {
      question: "Can you help with bank loans and subsidies?",
      answer:
        "Yes, we provide complete assistance with loan applications, subsidy schemes, and all related documentation.",
    },
    {
      question: "Do you work across India?",
      answer: "Yes, we offer consultancy services on a pan-India basis.",
    },
  ],
} as const;
