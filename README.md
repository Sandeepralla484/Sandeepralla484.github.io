# Sandeep Portfolio — GitHub Pages / Vercel

This is your complete portfolio, including your portrait, resume download, project stories, and flowing cursor background. The website uses HTML, CSS, and JavaScript. No npm install, paid template, ChatGPT account, or build command is required to serve these files.

## Files

- index.html: content, links, page structure
- styles.css: design, responsive layout, CSS animations
- app.js: project dialogs, scroll effects, motion controls
- cursor-flow.js: interactive background
- assets/: your portrait and downloadable resume

Unzip the package before uploading. Put index.html at the repository root, alongside the other files; preserve the assets folder.

## Option A: GitHub Pages

1. Sign into the GitHub account you want to own the portfolio.
2. Create a PUBLIC repository named YOUR_USERNAME.github.io. For the username in your current resume, that is Sandeepralla484.github.io. If this repository already exists, use it and review its current files before replacing anything.
3. Initialize the repository with a README.
4. Open Add file > Upload files. Upload the CONTENTS of this extracted package, including the assets folder. Do not upload the ZIP itself or a parent folder around index.html. You may keep GitHub's README instead of this one.
5. Commit your changes to main.
6. Open Settings > Pages.
7. Under Build and deployment choose Deploy from a branch. Select main and /(root), then Save.
8. Wait for the Pages deployment to finish. Use Visit site or the URL shown in Settings > Pages. For that username, the expected address is https://sandeepralla484.github.io/ (not live until you complete deployment).

Future edits: update these files in the same repository and commit. GitHub Pages republishes the site.

Official instructions: https://docs.github.com/en/pages/quickstart

## Option B: Vercel

1. Upload these extracted files into a GitHub repository (the same repository can be used).
2. Sign into Vercel and choose Add New > Project.
3. Import the repository. Grant access to that repository when asked.
4. Select Other as the framework preset. Keep the repository root as the Root Directory.
5. Leave the Build Command empty. Use . for the Output Directory; no install command is needed for this project.
6. Choose Deploy. Copy the production URL Vercel actually assigns; its project name depends on availability.

Future edits: commits to the connected production branch trigger a new deployment.

Official instructions: https://vercel.com/docs/deployments/overview
Build settings: https://vercel.com/docs/builds/configure-a-build

## Learn and edit locally

Open the extracted folder in VS Code. Open index.html in a browser for a simple preview. Edit index.html to change headings and content, styles.css to change appearance, app.js to change project stories, and cursor-flow.js to tune the trail. Refresh your browser after saving. Clipboard copying may require HTTPS or localhost; it already has a fallback message.

For a local web server, if Python 3 is installed, open a terminal in this folder and run:

    python3 -m http.server 8000

Then open http://localhost:8000 and stop the server with Ctrl+C when finished.

## A domain of your own

You can optionally connect a domain you own to either hosting provider. Purchasing a custom domain is separate from publishing on github.io or vercel.app.

This export is independent of the original hosting service. Publishing it elsewhere does not automatically remove the earlier public website.
