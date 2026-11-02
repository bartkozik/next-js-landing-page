# Source export and verification

This is the actual EPOCA landing application with narrow privacy substitutions. Page composition, responsive layouts, component/hook logic, styles, animations and both original dependency lockfiles are retained. No replacement application or invented tests were added.

The export excludes the private GitLab pipeline and private development history. Eleven PNG screenshots/backgrounds containing unverified person, client or activity labels are replaced with neutral images at their original dimensions. A client testimonial/logo uses an explicit redaction placeholder. Twenty-six other media/configuration assets are unchanged after visual or structural review. Only the affected text/domain/contact literals and image reference change in the three application TSX files: `src/app/layout.tsx`, `Footer.tsx` and `Trust.tsx`.

An inert `.env.example` is added because the original README referenced one but none was tracked. The original booking fallback remains in use when its URL is blank. The template has no active API or booking address. Original Iterators credit and EPOCA branding are retained; this export introduces no new license grant.

Verified on 2026-11-02 in the isolated snapshot using Node.js 22.23.2 and npm 10.9.8:

- `npm ci --ignore-scripts`: passed against the original npm lockfile.
- `npm run build`: passed, including Next.js compilation, type validation, lint and static generation of the existing routes.
- `npm run lint`: passed with no warnings or errors.
- `npx --no-install tsc --noEmit`: passed after Next.js generated its normal type files.

There is no automated test suite or test script in the original repository. No new test coverage, browser acceptance run, booking submission or deployment is claimed.

The install reported 17 dependency advisories (1 low, 2 moderate, 12 high, 2 critical). They were not suppressed with automatic dependency upgrades. These are the historical source dependencies; a production deployment needs a separate dependency/security review. Build-time network access was limited to public package dependencies and the original Google Fonts download. No GitLab fetch or production application connection was used.

Generated `node_modules`, `.next`, `next-env.d.ts` and TypeScript build cache are local verification outputs and are excluded from the source snapshot. Original source files and private repository history were left untouched. The existing public repository history is preserved when this snapshot is appended.
