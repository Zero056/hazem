# Deploy to GitHub Pages — step by step

This project is already configured for GitHub Pages:

- `base` in `vite.config.ts` is `/hazem-portfolio/`
- `.github/workflows/deploy.yml` builds and publishes automatically
- `public/404.html` provides a branded 404 page

## 1. Create the repository

On GitHub create a **public** repository named:

```
hazem-portfolio
```

Do not add a README, license or `.gitignore` — they already exist here.

## 2. Push the project

Open a terminal in this folder (`hazem-portfolio`) and run:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/Zero056/hazem-portfolio.git
git push -u origin main
```

Replace `Zero056` with your GitHub username if it is different.

## 3. Turn on GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.

No build command or folder needs to be entered — the workflow handles it.

## 4. Wait for the first deploy

Open the **Actions** tab and wait for “Deploy to GitHub Pages” to finish (about 1 minute).

Your live link is:

```
https://Zero056.github.io/hazem-portfolio/
```

Send that link to anyone — it opens like a normal website.

## 5. Update the site later

Every push to `main` redeploys automatically:

```bash
git add .
git commit -m "Update projects"
git push
```

## Important cases

### The link does not load / assets are missing

The repository name must match `base` in `vite.config.ts`.

- Repository `hazem-portfolio` → `base: '/hazem-portfolio/'` (current setting)
- Repository named `Zero056.github.io` → `base: '/'`

Also update the `/hazem-portfolio/` links in `public/404.html` when the name changes.

### Custom domain

In **Settings → Pages → Custom domain**, add your domain and keep the generated `CNAME` file. No code change is required.

### First deployment fails with “npm ci” error

`npm ci` requires `package-lock.json`. It is committed with the project; if you delete it, run `npm install` locally and commit the regenerated lockfile.

### Preview the production build locally

```bash
npm run build
npm run preview
```

Then open `http://localhost:4173/hazem-portfolio/`.

## What gets deployed

Only the generated `dist/` folder is published. `node_modules` and `dist` are ignored by Git.
