# EPOCA — Next.js landing page

A responsive marketing website for EPOCA, a time-tracking and reporting product. It presents the product through animated sections, feature showcases, comparisons and presentation-booking calls to action.

## My role

I was the sole developer of this landing page, including its responsive interface, reusable components, animations and frontend implementation.

## Features

- Responsive hero with animated stickers and mobile carousels.
- Product feature showcases and comparison tables.
- FAQ, testimonial section and configurable booking links.
- Shared navigation, buttons, scroll controls and viewport hooks.
- App Router pages with SEO metadata and social previews.

## Stack

Next.js 15.3.6 · React 19 · TypeScript · SCSS modules · Framer Motion · Swiper · React Transition Group · React Icons.

The original npm manifest and lockfile support the local setup and Docker build.

## Run locally

Use Node.js 22 and npm:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Booking buttons use `NEXT_PUBLIC_CALENDLY_URL`; leave it blank for local review or configure your own booking URL. The original Google Fonts integration downloads Poppins during the build.

```sh
npm run lint
npm run build
npm start
```

## Public snapshot

The application code and layout are retained, with customer/contact data and selected screenshots replaced by neutral placeholders. See [source export notes](SOURCE_EXPORT.md) for the exact scope, verification results and dependency limitations.

Related product repositories: [EPOCA frontend](https://github.com/bartkozik/epoca-frontend) · [EPOCA backend](https://github.com/bartkozik/epoca-backend).
