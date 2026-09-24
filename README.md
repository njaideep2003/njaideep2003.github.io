# Jaideep Nutalapati — Portfolio

Personal portfolio hosted on GitHub Pages.
Live at: https://njaideep2003.github.io

## Setup & Deployment Guide

### Step 1 — Create the GitHub repository
1. Go to github.com and create a new repository
2. Name it EXACTLY: `njaideep2003.github.io` (your username + .github.io)
3. Set it to Public
4. Do NOT initialize with README (you already have files)

### Step 2 — Upload all files
Upload this entire folder structure to the repository:
```
njaideep2003.github.io/
├── index.html
├── assets/css/style.css
├── assets/js/main.js
├── assets/img/          ← add profile.jpg here
├── resume/              ← add your 3 PDF resumes here
└── README.md
```

### Step 3 — Enable GitHub Pages
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / root
4. Save — your site will be live in 2-3 minutes at https://njaideep2003.github.io

### Step 4 — Add your profile photo
1. Name your photo `profile.jpg`
2. Upload it to `assets/img/profile.jpg`
3. In index.html, delete the `.profile-placeholder` div
4. Uncomment the `<img>` tag below it

### Step 5 — Add Google Analytics
1. Go to analytics.google.com
2. Create account → Create Property → Web
3. Enter URL: njaideep2003.github.io
4. Copy your Measurement ID (G-XXXXXXXXXX)
5. In index.html, replace both instances of `GA_MEASUREMENT_ID` with your real ID

### Step 6 — Add your resumes
Upload your PDF resumes to the `/resume/` folder:
- `Jaideep_DA_Resume.pdf`
- `Jaideep_DS_Resume.pdf`
- `Jaideep_DE_Resume.pdf`

### Step 7 — Get indexed on Google (SEO)
1. Go to search.google.com/search-console
2. Add property → URL prefix → https://njaideep2003.github.io
3. Verify ownership (HTML tag method — paste the tag in index.html <head>)
4. Go to URL Inspection → enter your URL → Request Indexing
5. Your site will appear in Google search for "Jaideep Nutalapati" within 1-2 weeks

### Step 8 — Update project GitHub links
In index.html, find each project card and update the GitHub href links
with the actual repository URLs for each project.
