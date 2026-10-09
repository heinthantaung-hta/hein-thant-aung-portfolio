# Hein Thant Aung — Personal Portfolio

A Next.js App Router portfolio with React, TypeScript, Tailwind CSS, Motion for React, and Lucide React. It includes a portrait hero, personal introduction, selected projects, education, academic achievements, competition experience, Coursera certificates, and contact links.

## Local development

Use Node.js 22 and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To choose the port explicitly, run `npm run dev -- --port 3000`.

```sh
npm run lint
npm run type-check
npm run build
npm start
```

Development and production use Webpack. The app uses the Next.js App Router throughout.

## Content and assets

Edit `src/data/portfolio.ts`, the typed source for personal content, navigation, education, achievements, projects, certificates, competition experience, and contact links. Education entries without dates show no date label. The education grid has two columns on desktop and one on mobile. Competition text sits beside its photo on desktop and stacks on mobile.

Assets live in `public/images/` and `public/documents/`. Use root-relative asset paths, descriptive alt text, and their original width/height. Next.js Image reserves image dimensions and supplies responsive image sizes. Local assets need no remote image configuration.

The supplied Coursera certificates have thumbnail images rendered from the original PDFs. Certificate buttons open a native PDF preview in an accessible dialog, with a direct open-document link and a no-JavaScript fallback. To replace a PDF, update its `document.src`; replace `document.image` to update the thumbnail.

Images and text are supplied by the portfolio owner. Missing project links are hidden, and unavailable case-study pages return 404. No contact form or database is used.

## Project pages

A project detail page is enabled only when `caseStudy.overview` contains text:

```ts
caseStudy: {
  overview: 'The project context and outcome.',
  sections: [{ title: 'The challenge', body: 'Actual project details.' }],
}
```

Blank optional sections are omitted. Enabled pages automatically appear in the sitemap. The initial project configuration has no case-study pages.

## Appearance and accessibility

System light/dark preference is applied before the first paint. A manual theme choice persists under the browser storage key `hta-theme`. Remove that key to follow system preference again. Blocked storage does not prevent theme switching for the current visit.

Content is server rendered and stays visible before hydration. Navigation has section offsets, active indicators, mobile controls, Escape handling, and visible keyboard focus. Entrance reveals and hover treatments use opacity/transforms; reduced-motion preference disables movement. Contact links use local vector icons and real email/social destinations.

## Deploy to Vercel

Push the application to GitHub, then import its repository into Vercel. Select the repository root as the root directory. `vercel.json` selects Next.js, `npm ci`, and `npm run build`; `package.json` selects Node.js 22.

A CLI deployment can also use:

```sh
vercel link
vercel deploy
vercel deploy --prod
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin before building if using a custom domain. Otherwise, the app resolves `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`. Valid HTTP(S) origins enable canonical URLs and absolute sitemap entries. With no valid origin, canonical URLs are omitted and the sitemap is empty. Only enabled case-study pages enter the sitemap.

The site needs no secrets or database. `.vercelignore` excludes local dependencies, build artifacts, Git metadata, and environment files. `.gitignore` excludes local build and deployment state.

See `VERIFICATION.md` for completed checks and outstanding browser verification.
