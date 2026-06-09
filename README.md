# Head of B2C Interview Mind Map

## How to open the website

Open [Head_of_B2C_Interview_MindMap.html](./Head_of_B2C_Interview_MindMap.html) directly in a modern browser. No build step or backend is required.

## Deployment

GitHub Pages:

1. Push this folder to a GitHub repository.
2. Set the published branch in GitHub Pages settings.
3. Use `Head_of_B2C_Interview_MindMap.html` as the entry page, or rename it to `index.html` if you want it as the default root page.

Netlify:

1. Drag and drop this folder into Netlify, or connect the repo.
2. No build command is needed.
3. Publish the folder as static files.

Vercel:

1. Import the repository or upload the folder.
2. Select static-site deployment.
3. No framework preset is required.

## File structure

- `Head_of_B2C_Interview_MindMap.html` — single deployable interactive website
- `README.md` — usage and deployment notes
- `generate_head_of_b2c_site.js` — generator used to embed the markdown source directly into the final HTML

## Main features

- Source-driven D3 mind map built from the full embedded `Head of B2C.md`
- Detail sidebar and mobile drawer with full original content rendering
- Mind Map, Deck View, JD Alignment, Practice Mode, and Presentation Mode
- Search across Thai and English headings, answers, KPI, metrics, and keywords
- Proof-number cards, category filters, expand and collapse, fit, zoom, pan, drag, and node centering
- Practice status persistence with localStorage, export, and reset
- Console validation report for heading coverage, interview-question mapping, and empty-answer detection

## Content fidelity validation

The HTML contains the original markdown internally as `SOURCE_MARKDOWN`. The app parses headings and interview-question sections at runtime, then builds graph nodes, deck cards, search indexes, and validation results from that same source string.

Validation summary from the current source:

- Headings parsed: 245
- Interview questions parsed: 27
- Nodes created: generated at runtime from every parsed heading plus root and category nodes
- Content coverage target: 100%
- Unmapped sections: check the in-browser console report under `Head of B2C Validation Report`
