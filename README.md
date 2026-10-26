# Dreamy Interiors & Construction

Website for Dreamy Interiors & Construction, Assam — a luxury interior design and residential execution studio serving Guwahati, Nagaon and Tezpur.

## Run locally

```bash
npm install
npm run dev
```

## Check and build

```bash
npm run lint
npm run build
npm run preview -- --host 127.0.0.1
npm run qa
```

`npm run qa` checks all routes and core interactions at phone, tablet and desktop widths. It saves evidence in `qa/screens/`.

## Updating content

- Company details: `src/data/site.ts`
- Portfolio concepts: `src/data/projects.ts`
- Image metadata: `src/data/images.ts`
- Source images: `public/images/`
- Brand logo: `public/brand/logo.webp`

The current interior photographs are labelled as illustrative concepts, not completed client work. Replace them with authorized project photography and update the matching data records when verified assets are available.

## Deployment

The production build is written to `dist/` and can be deployed as a static site. All public routes are prerendered with route-specific metadata.