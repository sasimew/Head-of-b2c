# Head of B2C Interview Mind Map

Interactive single-file interview-preparation website for the **Head of B2C — FutureSkill** role.

The site transforms the full source markdown into an executive-style interactive mind map with a premium dark UI, searchable node graph, detailed reading panel, proof-number navigation, and a deck-style summary view.

## Project overview

This project was built to preserve the original interview-preparation content while making it easier to navigate visually.

The final experience focuses on:

- full markdown fidelity
- readable Thai and English rendering
- graph-first exploration
- fast access to original answers
- executive-style presentation quality

## Main deliverables

- `Head_of_B2C_Interview_MindMap.html`
  Single deployable HTML file with embedded source content, styles, graph logic, deck view, validation, and UI controls.

- `generate_head_of_b2c_site.js`
  Generator script that reads the source markdown and produces the final HTML and README outputs.

- `README.md`
  Project overview, deployment notes, and validation summary.

## Key features

- Source-driven D3 mind map built from the full embedded `Head of B2C.md`
- Collapsible detail sidebar and mobile detail drawer
- Full original answer rendering in the `Node Detail` panel
- `Original Source Content` prioritized for readability
- Search across Thai and English headings, answers, KPI, metrics, and keywords
- Proof-number cards that jump to supporting content
- Category filters, zoom, pan, drag, fit, expand, collapse, and return-to-root controls
- Deck View and JD Alignment view
- Presentation Mode for large-screen walkthroughs
- Validation report printed in the browser console and surfaced in the UI

## Latest UI updates

- increased graph area by reducing the sidebar width
- reduced proof-card size to give the graph more breathing room
- improved right-panel readability for long original text
- moved `Original Source Content` above the secondary meta cards
- removed the visible `Practice` button from the main toolbar
- added clearer scrolling behavior in `Node Detail`
- removed the empty floating black bar from the graph area

## How to open

Open [Head_of_B2C_Interview_MindMap.html](./Head_of_B2C_Interview_MindMap.html) directly in a modern browser.

No build step, backend, login, or database is required.

## Deployment

GitHub Pages:

1. Push this repository to GitHub.
2. Enable GitHub Pages from the branch you want to publish.
3. Use `Head_of_B2C_Interview_MindMap.html` as the main page, or rename it to `index.html` if you want the repo root to open directly.

Netlify:

1. Drag and drop the repository folder, or connect the repo.
2. No build command is required.
3. Publish as a static site.

Vercel:

1. Import the repository.
2. Choose static deployment.
3. No framework preset is required.

## Content fidelity and validation

The HTML contains the original markdown internally as `SOURCE_MARKDOWN`.

The app parses headings and interview-question sections at runtime, then uses that same source for:

- graph nodes
- detail rendering
- deck cards
- search index
- proof linking
- validation reporting

Current validation summary:

- Headings parsed: 245
- Interview questions parsed: 27
- Question nodes created: 27
- Missing headings: 0
- Empty answer nodes: 0
- Content coverage: 100%

## Notes

- The repository currently focuses on the Head of B2C site deliverables.
- The browser console exposes `Head of B2C Validation Report` for a structured validation readout.
