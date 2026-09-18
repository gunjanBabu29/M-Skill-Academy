# Image Assets

The site now renders real `<img>` tags for trainer and project photos
(not just CSS placeholders), so you can drop in real images without
touching any code — just save files using these exact names:

## Trainers
Path: `assets/images/trainers/{trainer-id}.jpg`

Current trainer IDs (see `js/data.js` → `trainers` array):
- `t1.jpg` — Ananya Sharma
- `t2.jpg` — Rohit Malhotra
- `t3.jpg` — Priya Nair
- `t4.jpg` — Karan Mehta
- `t5.jpg` — Gunjan Kumar (Tech)

## Projects
Path: `assets/images/projects/{project-id}.jpg`

Project IDs match the `id` field of each entry in `js/data.js` →
`projects` array, e.g. `sales-dashboard.jpg`, `churn-prediction.jpg`,
`ecommerce-website.jpg`, etc.

## Logo
Path: `assets/logos/logo.png` (not wired up yet — the header currently
uses a text-based logo mark; ask to switch it to an image logo if needed).

## What happens if a file is missing
Every photo has a graceful fallback: if the image file at the expected
path doesn't exist (or fails to load), the `<img>` simply hides itself
and the existing colored initials/category label shows through instead.
Nothing breaks — you can add real photos gradually, one at a time.
