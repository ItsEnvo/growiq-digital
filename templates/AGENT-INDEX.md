# GrowIQ Agent Templates Index

## Growth Plan (6 agents)

| Agent | Role | Channel |
|-------|------|---------|
| **IRIS** | AI Receptionist — first contact, answers inquiries, books appointments | Telegram / SMS |
| **ATLAS** | Sales Follow-Up — nurtures leads, handles objections, closes deals | Telegram / SMS |
| **PULSE** | Daily Briefing — morning summary, metrics, alerts | Telegram |
| **SYNC** | Scheduling — manages calendar, sends reminders, reduces no-shows | Telegram |
| **WAVE** | Social Media — creates & schedules posts, manages platforms | Internal |
| **RADAR** | Reputation — monitors reviews, requests feedback, handles responses | Internal |

## Scale Plan (adds 4 more agents)

| Agent | Role | Channel |
|-------|------|---------|
| **AEGIS** | Security & Systems — monitors agent health, access, security | Internal |
| **PRISM** | Personal Assistant — task management, drafting, organization | Telegram |
| **MUSE** | Content Creator — graphics, copy, visual content, brand assets | Internal |
| **SCOUT** | Analytics — tracks KPIs, optimization recommendations, reporting | Internal |

## Template Variables

All templates use `{{VARIABLE}}` placeholders. These are filled during onboarding:

| Variable | Source | Example |
|----------|--------|---------|
| `{{BUSINESS_NAME}}` | Onboarding Step 1 | "Serenity Med Spa" |
| `{{OWNER_NAME}}` | Onboarding Step 5 | "Dr. Sarah Chen" |
| `{{INDUSTRY}}` | Onboarding Step 1 | "Medical Spa" |
| `{{ADDRESS}}` | Onboarding Step 1 | "123 Main St, Miami FL" |
| `{{PHONE}}` | Onboarding Step 1 | "(305) 555-0100" |
| `{{EMAIL}}` | Account email | "info@serenityspa.com" |
| `{{WEBSITE}}` | Onboarding Step 1 | "serenityspa.com" |
| `{{BUSINESS_HOURS}}` | Onboarding Step 5 | "Mon-Fri 9am-6pm, Sat 10am-4pm" |
| `{{TIMEZONE}}` | Onboarding Step 5 | "America/New_York" |
| `{{SERVICES_LIST}}` | Onboarding Step 4 | Service name, description, price |
| `{{TARGET_AUDIENCE}}` | Derived from industry | "Women 25-55 interested in aesthetics" |
| `{{TONE}}` | Onboarding Step 5 | "professional" / "friendly" / "casual" |
| `{{BOOKING_LINK}}` | Onboarding Step 3 | "calendly.com/serenity/book" |
| `{{REVIEW_LINK}}` | Onboarding Step 3 | "g.page/serenityspa/review" |
| `{{PLATFORMS_LIST}}` | Onboarding | "Instagram, Facebook, Google Business" |
| `{{BRIEFING_TIME}}` | Default 8:00 AM local | "8:00 AM ET" |
| `{{BUFFER_MINUTES}}` | Default 15 | "15" |
