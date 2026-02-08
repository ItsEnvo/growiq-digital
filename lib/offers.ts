export type OfferTier = {
  name: string;
  price: string;
  sub: string;
  bullets: string[];
  highlight?: boolean;
};

export const TIERS: OfferTier[] = [
  {
    name: "Starter",
    price: "$1,000–$1,500 / mo",
    sub: "For founders who need a real system (fast)",
    bullets: [
      "Funnel + intake cleanup (conversion-first)",
      "GHL pipeline + tags + basic automations (draft/off until approval)",
      "Weekly iteration + KPI snapshot",
      "Light AI automation (follow-up drafts + internal ops)",
    ],
  },
  {
    name: "Core",
    price: "$2,500–$5,000 / mo",
    sub: "For consistent lead flow + booked calls",
    highlight: true,
    bullets: [
      "Funnels + ads + tracking (full loop)",
      "Automation: reminders, confirmations, no-show recovery",
      "Outbound engine + reporting cadence",
      "Proof system + case study packaging",
    ],
  },
  {
    name: "Scale",
    price: "$7,500+ / mo",
    sub: "For scaling teams (multi-campaign + deeper ops)",
    bullets: [
      "Multi-funnel + multi-campaign ops",
      "Advanced automation + routing + segmentation",
      "Dashboards + SLA follow-up discipline",
      "Growth experiments + creative testing system",
    ],
  },
];
