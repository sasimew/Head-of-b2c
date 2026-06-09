const fs = require('fs');
const path = require('path');

const rootDir = '/Users/sasi/Documents/whale bin dai';
const sourceMdPath = '/Users/sasi/Downloads/Head of B2C.md';
const vipHtmlPath = '/Users/sasi/Downloads/VIP_Interview_MindMap_Sasion_2.html';
const outHtmlPath = path.join(rootDir, 'Head_of_B2C_Interview_MindMap.html');
const outReadmePath = path.join(rootDir, 'README.md');

const sourceMarkdown = fs.readFileSync(sourceMdPath, 'utf8').replace(/\r\n/g, '\n');
const vipHtml = fs.readFileSync(vipHtmlPath, 'utf8');

function stripMd(text) {
  return text
    .replace(/\\([\\`*_{}[\]()#+\-.!&])/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .trim();
}

const lines = sourceMarkdown.split('\n');
const headingMatches = [];
const questionMatches = [];
for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];
  const heading = line.match(/^(#{1,6})\s+(.*)$/);
  if (heading && stripMd(heading[2])) {
    headingMatches.push({ level: heading[1].length, text: stripMd(heading[2]), line: i + 1 });
  }
}
const deepDiveStart = headingMatches.find((h) => h.text.includes('ชุดคำถาม–คำตอบสัมภาษณ์เชิงลึก'));
for (const h of headingMatches) {
  if (deepDiveStart && h.level === 1 && h.line > deepDiveStart.line && /^\d+\./.test(h.text)) {
    questionMatches.push(h);
  }
}

const vipPaletteSnippet = (vipHtml.match(/:root\s*\{[\s\S]*?\}/) || [''])[0];

const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Head of B2C — FutureSkill Interview Preparation</title>
  <meta name="description" content="Interactive mind map and interview-preparation site for Head of B2C — FutureSkill." />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b1220'/%3E%3Ccircle cx='32' cy='32' r='18' fill='%23f59e0b'/%3E%3Cpath d='M20 34c6-8 18-8 24 0-6 8-18 8-24 0Z' fill='%230b1220'/%3E%3C/svg%3E" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    html, body { height: 100%; margin: 0; }
    ${vipPaletteSnippet}
    :root {
      --bg: #0b0f1a;
      --bg2: #101827;
      --bg3: #152238;
      --bg4: #1d2b45;
      --panel: rgba(16, 24, 39, 0.92);
      --card: #162235;
      --card2: #1a2a43;
      --border: rgba(128, 151, 188, 0.22);
      --border-strong: rgba(128, 151, 188, 0.4);
      --text: #edf4ff;
      --text2: #bfd0e6;
      --text3: #89a0bf;
      --text4: #5c7394;
      --gold: #f59e0b;
      --gold2: #fbbf24;
      --blue: #4ea3ff;
      --cyan: #47d1ff;
      --green: #22c55e;
      --amber: #f59e0b;
      --purple: #8b5cf6;
      --teal: #14b8a6;
      --pink: #ec4899;
      --orange: #f97316;
      --coral: #fb7185;
      --yellow: #eab308;
      --indigo: #6366f1;
      --emerald: #10b981;
      --red: #ef4444;
      --lightblue: #7dd3fc;
      --shadow: 0 18px 48px rgba(0, 0, 0, 0.32);
      --radius: 18px;
      --font-body: "Noto Sans Thai", "IBM Plex Sans Thai", "DM Sans", sans-serif;
      --font-mono: "DM Mono", monospace;
      --font-display: "Playfair Display", "Noto Sans Thai", serif;
    }
    body {
      font-family: var(--font-body);
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(99,102,241,0.14), transparent 34%),
        radial-gradient(circle at top right, rgba(245,158,11,0.14), transparent 28%),
        linear-gradient(180deg, #07101d 0%, #0b1220 100%);
      overflow: hidden;
    }
    button, input, select {
      font: inherit;
    }
    button {
      cursor: pointer;
    }
    a {
      color: #8ec5ff;
    }
    .app {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(340px, 36vw);
      height: 100vh;
      overflow: hidden;
    }
    .main {
      min-width: 0;
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--border);
      background:
        linear-gradient(180deg, rgba(13, 20, 34, 0.92), rgba(9, 14, 23, 0.98)),
        radial-gradient(circle at 10% 10%, rgba(78,163,255,0.08), transparent 22%);
      position: relative;
    }
    .sidebar {
      min-width: 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
      background: linear-gradient(180deg, rgba(14, 21, 35, 0.97), rgba(10, 16, 27, 0.99));
      position: relative;
      transition: transform 0.28s ease, width 0.28s ease;
      z-index: 20;
      overflow: hidden;
    }
    .sidebar.collapsed {
      width: 0 !important;
      min-width: 0 !important;
      transform: translateX(100%);
      overflow: hidden;
      border-left: 0;
    }
    .mobile-drawer {
      display: none;
      overflow: hidden;
    }
    .header {
      display: flex;
      gap: 16px;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, rgba(14,22,37,0.96), rgba(16,24,39,0.9));
      flex-shrink: 0;
    }
    .header-left {
      min-width: 0;
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }
    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 12px;
      border-radius: 999px;
      border: 1px solid rgba(245, 158, 11, 0.36);
      color: var(--gold2);
      background: rgba(245, 158, 11, 0.08);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-family: var(--font-mono);
      white-space: nowrap;
    }
    .title-wrap h1 {
      margin: 0;
      font-family: var(--font-display);
      font-size: 24px;
      line-height: 1.1;
      color: #fff7e6;
    }
    .title-wrap p {
      margin: 6px 0 0;
      font-size: 11px;
      color: var(--text3);
      letter-spacing: 0.03em;
    }
    .header-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .btn {
      border: 1px solid var(--border);
      background: rgba(10, 16, 27, 0.78);
      color: var(--text2);
      border-radius: 12px;
      padding: 8px 11px;
      font-size: 11px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 38px;
      transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
    }
    .btn:hover,
    .btn:focus-visible {
      outline: none;
      border-color: rgba(78, 163, 255, 0.65);
      background: rgba(22, 35, 55, 0.95);
      color: var(--text);
      transform: translateY(-1px);
    }
    .btn.active {
      background: linear-gradient(135deg, rgba(78,163,255,0.25), rgba(99,102,241,0.28));
      border-color: rgba(110, 168, 255, 0.72);
      color: #fff;
    }
    .btn.gold {
      background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.12));
      border-color: rgba(245, 158, 11, 0.38);
      color: #fff2d0;
    }
    .proof-bar {
      display: flex;
      gap: 12px;
      padding: 10px 14px;
      overflow-x: auto;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, rgba(16,24,39,0.84), rgba(12,19,31,0.94));
      flex-shrink: 0;
    }
    .proof-card {
      min-width: 108px;
      padding: 10px 11px;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: linear-gradient(180deg, rgba(26, 39, 60, 0.95), rgba(16, 24, 39, 0.96));
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
      cursor: pointer;
      transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
    }
    .proof-card:hover,
    .proof-card.active {
      border-color: rgba(245, 158, 11, 0.72);
      transform: translateY(-1px);
      box-shadow: 0 10px 30px rgba(245, 158, 11, 0.12);
    }
    .proof-card strong {
      display: block;
      color: var(--gold2);
      font-family: var(--font-mono);
      font-size: 15px;
    }
    .proof-card span {
      display: block;
      margin-top: 4px;
      color: var(--text3);
      font-size: 10px;
      line-height: 1.35;
    }
    .toolbar {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
      background: rgba(15, 23, 36, 0.9);
      flex-shrink: 0;
    }
    .search-wrap {
      position: relative;
      flex: 1 1 280px;
      min-width: 210px;
    }
    .search-wrap input {
      width: 100%;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: rgba(9, 14, 24, 0.88);
      color: var(--text);
      padding: 10px 82px 10px 40px;
      font-size: 13px;
    }
    .search-wrap input::placeholder {
      color: var(--text4);
    }
    .search-wrap input:focus-visible {
      outline: none;
      border-color: rgba(78, 163, 255, 0.72);
      box-shadow: 0 0 0 3px rgba(78, 163, 255, 0.12);
    }
    .search-icon,
    .search-count {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      color: var(--text4);
    }
    .search-icon { left: 14px; }
    .search-count { right: 14px; font-family: var(--font-mono); }
    .tab-row {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
      background: rgba(11, 18, 31, 0.92);
      flex-shrink: 0;
    }
    .category-tab {
      border: 1px solid var(--border);
      background: rgba(22, 34, 53, 0.74);
      color: var(--text3);
      border-radius: 999px;
      padding: 9px 13px;
      white-space: nowrap;
      font-size: 12px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .category-tab.active {
      color: #fff;
      border-color: rgba(255,255,255,0.22);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    }
    .tab-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .stats {
      display: flex;
      gap: 14px;
      align-items: center;
      flex-wrap: wrap;
      padding: 6px 14px;
      border-bottom: 1px solid var(--border);
      background: rgba(16, 24, 39, 0.84);
      color: var(--text3);
      font-family: var(--font-mono);
      font-size: 11px;
      flex-shrink: 0;
    }
    .stat strong {
      color: var(--text2);
      font-weight: 500;
    }
    .content {
      flex: 1;
      min-height: 0;
      position: relative;
    }
    .view {
      position: absolute;
      inset: 0;
      display: none;
    }
    .view.active {
      display: block;
    }
    #graphView {
      display: flex;
      flex-direction: column;
    }
    .graph-shell {
      position: relative;
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }
    #graph {
      width: 100%;
      height: 100%;
      display: block;
    }
    .legend, .search-results, .coverage-panel {
      position: absolute;
      z-index: 6;
      border: 1px solid var(--border);
      background: rgba(8, 13, 22, 0.92);
      backdrop-filter: blur(14px);
      box-shadow: var(--shadow);
    }
    .legend {
      left: 16px;
      bottom: 16px;
      max-width: 240px;
      border-radius: 16px;
      padding: 14px 14px 10px;
      pointer-events: none;
    }
    .legend h3, .coverage-panel h3, .search-results h3 {
      margin: 0 0 10px;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text4);
      font-family: var(--font-mono);
    }
    .legend-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 10px;
    }
    .legend-item {
      display: flex;
      gap: 8px;
      align-items: center;
      color: var(--text2);
      font-size: 11px;
      line-height: 1.35;
    }
    .legend-item .tab-dot {
      width: 10px;
      height: 10px;
    }
    .search-results {
      top: 76px;
      left: 16px;
      width: min(420px, calc(100% - 32px));
      border-radius: 16px;
      padding: 14px;
      display: none;
      max-height: 52vh;
      overflow: auto;
    }
    .search-results:empty {
      display: none !important;
    }
    .search-results.visible {
      display: block;
    }
    .result-item {
      border: 1px solid transparent;
      background: rgba(255,255,255,0.02);
      color: var(--text2);
      width: 100%;
      text-align: left;
      padding: 10px 12px;
      border-radius: 12px;
      margin-bottom: 8px;
    }
    .result-item:hover,
    .result-item:focus-visible {
      border-color: rgba(78,163,255,0.56);
      outline: none;
      background: rgba(78,163,255,0.08);
    }
    .result-item strong {
      display: block;
      color: #fff;
      margin-bottom: 4px;
      font-size: 13px;
    }
    .coverage-panel {
      right: 16px;
      bottom: 16px;
      width: min(290px, calc(100% - 32px));
      border-radius: 16px;
      padding: 14px;
    }
    .coverage-panel p {
      margin: 6px 0 0;
      color: var(--text3);
      font-size: 12px;
      line-height: 1.5;
    }
    .tooltip {
      position: fixed;
      z-index: 50;
      pointer-events: none;
      max-width: 320px;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: rgba(8, 13, 22, 0.96);
      color: var(--text2);
      font-size: 12px;
      line-height: 1.5;
      padding: 10px 12px;
      opacity: 0;
      transition: opacity 0.12s ease;
      box-shadow: var(--shadow);
    }
    .tooltip.visible {
      opacity: 1;
    }
    .tooltip strong {
      display: block;
      color: #fff;
      margin-bottom: 4px;
    }
    .node text {
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 600;
      pointer-events: none;
      paint-order: stroke;
      stroke: rgba(7, 11, 18, 0.95);
      stroke-width: 4px;
      stroke-linejoin: round;
    }
    .node circle {
      stroke-width: 2px;
      transition: stroke-width 0.18s ease, opacity 0.18s ease, filter 0.18s ease;
    }
    .node.selected circle {
      stroke-width: 4px;
      filter: url(#nodeGlow);
    }
    .node.search-match circle {
      stroke-width: 3px;
    }
    .node.dimmed {
      opacity: 0.18;
    }
    .node.hidden, .link.hidden {
      display: none;
    }
    .link {
      stroke-opacity: 0.28;
      transition: opacity 0.18s ease, stroke-opacity 0.18s ease, stroke-width 0.18s ease;
    }
    .link.related {
      stroke-opacity: 0.9;
      stroke-width: 2.4px;
    }
    .detail-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 18px 18px 14px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
      position: sticky;
      top: 0;
      background: linear-gradient(180deg, rgba(14,21,35,0.98), rgba(14,21,35,0.96));
      z-index: 4;
    }
    .detail-header h2 {
      margin: 0;
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text3);
      font-family: var(--font-mono);
    }
    .detail-body-wrap {
      flex: 1;
      min-height: 0;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 16px 20px;
      scrollbar-width: thin;
      scrollbar-color: rgba(137, 160, 191, 0.65) rgba(255,255,255,0.03);
      overscroll-behavior: contain;
    }
    .detail-body-wrap::-webkit-scrollbar {
      width: 10px;
    }
    .detail-body-wrap::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.03);
      border-radius: 999px;
    }
    .detail-body-wrap::-webkit-scrollbar-thumb {
      background: rgba(137, 160, 191, 0.55);
      border-radius: 999px;
      border: 2px solid rgba(14, 21, 35, 0.9);
    }
    .detail-body-wrap::-webkit-scrollbar-thumb:hover {
      background: rgba(137, 160, 191, 0.78);
    }
    .detail-empty {
      padding: 48px 18px;
      color: var(--text3);
      text-align: center;
      font-size: 15px;
      line-height: 1.7;
    }
    .detail-card {
      padding-top: 18px;
    }
    .badge-row {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 999px;
      padding: 6px 11px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border: 1px solid transparent;
      font-family: var(--font-mono);
    }
    .detail-title {
      margin: 0;
      font-size: 22px;
      line-height: 1.38;
      color: #fff;
    }
    .breadcrumb {
      margin-top: 10px;
      color: var(--text4);
      font-size: 12px;
      line-height: 1.5;
    }
    .detail-controls {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 16px 0 18px;
    }
    .toc {
      border: 1px solid var(--border);
      border-radius: 14px;
      background: rgba(14, 21, 35, 0.86);
      margin-bottom: 16px;
      overflow: hidden;
    }
    .toc summary {
      list-style: none;
      padding: 12px 14px;
      color: var(--text2);
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
    }
    .toc summary::-webkit-details-marker {
      display: none;
    }
    .toc-list {
      padding: 0 14px 14px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .toc-chip {
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      color: var(--text3);
      padding: 6px 10px;
      font-size: 12px;
    }
    .detail-meta {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin: 18px 0 14px;
    }
    .meta-card {
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 12px;
      background: rgba(255,255,255,0.02);
    }
    .meta-card h4 {
      margin: 0 0 8px;
      color: var(--text4);
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .meta-card p {
      margin: 0;
      font-size: 12px;
      color: var(--text2);
      line-height: 1.6;
    }
    .related-list, .keyword-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .chip {
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      color: var(--text2);
      border-radius: 999px;
      padding: 7px 10px;
      font-size: 12px;
    }
    .chip.actionable {
      cursor: pointer;
    }
    .chip.actionable:hover,
    .chip.actionable:focus-visible {
      outline: none;
      border-color: rgba(78,163,255,0.58);
      color: #fff;
    }
    .source-render {
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 20px;
      background: rgba(255,255,255,0.035);
      font-size: 17px;
      line-height: 2;
      color: #dce8f8;
      word-break: break-word;
    }
    .source-render h1,
    .source-render h2,
    .source-render h3,
    .source-render h4,
    .source-render h5,
    .source-render h6 {
      color: #fff;
      line-height: 1.45;
      margin: 0 0 10px;
      scroll-margin-top: 120px;
    }
    .source-render h1 { font-size: 28px; }
    .source-render h2 { font-size: 22px; }
    .source-render h3 { font-size: 18px; }
    .source-render p {
      margin: 0 0 12px;
    }
    .source-render ul,
    .source-render ol {
      margin: 0 0 14px 18px;
      padding: 0;
    }
    .source-render li {
      margin-bottom: 6px;
    }
    .source-render strong {
      color: #fff;
    }
    .source-render blockquote {
      margin: 0 0 14px;
      padding: 12px 14px;
      border-left: 3px solid var(--gold);
      background: rgba(245,158,11,0.08);
      border-radius: 0 12px 12px 0;
    }
    .source-render hr {
      border: 0;
      border-top: 1px solid var(--border);
      margin: 18px 0;
    }
    .source-render code {
      font-family: var(--font-mono);
      font-size: 0.92em;
      background: rgba(255,255,255,0.08);
      padding: 2px 5px;
      border-radius: 6px;
    }
    .highlight-term {
      color: #fff1b3;
      background: rgba(245, 158, 11, 0.1);
      border-radius: 4px;
      padding: 0 2px;
    }
    .section-title {
      margin: 18px 0 10px;
      font-size: 13px;
      color: var(--text4);
      font-family: var(--font-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .pager {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 18px;
    }
    .deck-wrap, .alignment-wrap, .practice-wrap {
      height: 100%;
      overflow: auto;
      padding: 20px;
    }
    .deck-page {
      border: 1px solid var(--border);
      border-radius: 22px;
      overflow: hidden;
      margin-bottom: 22px;
      background: rgba(9, 14, 23, 0.72);
      box-shadow: var(--shadow);
    }
    .deck-head {
      padding: 20px 22px;
      display: flex;
      justify-content: space-between;
      gap: 14px;
      background: linear-gradient(135deg, rgba(19,31,52,0.98), rgba(34,52,89,0.95));
    }
    .deck-head h3 {
      margin: 0;
      font-family: var(--font-display);
      font-size: 24px;
      color: #fff7e6;
    }
    .deck-head p {
      margin: 6px 0 0;
      color: var(--text3);
      font-size: 13px;
      line-height: 1.5;
    }
    .deck-body {
      padding: 18px 20px 20px;
    }
    .deck-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }
    .deck-card {
      border: 1px solid var(--border);
      border-radius: 16px;
      background: rgba(255,255,255,0.03);
      padding: 14px;
      min-height: 132px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .deck-card h4 {
      margin: 0;
      font-size: 15px;
      line-height: 1.5;
      color: #fff;
    }
    .deck-card p {
      margin: 0;
      color: var(--text3);
      font-size: 13px;
      line-height: 1.6;
      flex: 1;
    }
    .deck-card .btn {
      align-self: flex-start;
    }
    .deck-accordion {
      border-top: 1px solid var(--border);
      margin-top: 12px;
      padding-top: 12px;
    }
    .deck-accordion details {
      border: 1px solid var(--border);
      border-radius: 14px;
      background: rgba(255,255,255,0.02);
      margin-bottom: 10px;
      overflow: hidden;
    }
    .deck-accordion summary {
      padding: 12px 14px;
      cursor: pointer;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
    }
    .deck-accordion summary::-webkit-details-marker {
      display: none;
    }
    .deck-accordion .deck-grid {
      padding: 0 14px 14px;
    }
    .alignment-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--border);
      border-radius: 18px;
      overflow: hidden;
      background: rgba(9,14,23,0.7);
    }
    .alignment-table th,
    .alignment-table td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border);
      text-align: left;
      vertical-align: top;
      font-size: 14px;
      line-height: 1.6;
    }
    .alignment-table th {
      color: #fff;
      background: rgba(255,255,255,0.04);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-family: var(--font-mono);
    }
    .alignment-table td {
      color: var(--text2);
    }
    .practice-shell {
      max-width: 980px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 18px;
    }
    .practice-card, .practice-side {
      border: 1px solid var(--border);
      border-radius: 22px;
      background: rgba(9,14,23,0.7);
      box-shadow: var(--shadow);
    }
    .practice-card {
      padding: 20px;
    }
    .practice-card h3 {
      margin: 0 0 12px;
      font-size: 14px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-family: var(--font-mono);
      color: var(--text4);
    }
    .practice-question {
      font-size: 28px;
      line-height: 1.45;
      color: #fff;
      margin: 0 0 18px;
    }
    .practice-answer {
      border-top: 1px solid var(--border);
      margin-top: 18px;
      padding-top: 18px;
    }
    .timer-row, .status-row, .practice-nav {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 14px;
    }
    .timer-display {
      font-family: var(--font-mono);
      color: var(--gold2);
      font-size: 30px;
      margin-top: 14px;
    }
    .practice-side {
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .practice-side h4 {
      margin: 0;
      font-size: 13px;
      color: var(--text4);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-family: var(--font-mono);
    }
    .practice-side p {
      margin: 0;
      color: var(--text2);
      font-size: 14px;
      line-height: 1.6;
    }
    .presentation {
      position: fixed;
      inset: 0;
      z-index: 60;
      display: none;
      background:
        radial-gradient(circle at top, rgba(78,163,255,0.14), transparent 28%),
        linear-gradient(180deg, rgba(7,11,18,0.98), rgba(7,11,18,1));
      padding: 28px;
      overflow: auto;
    }
    .presentation.visible {
      display: block;
    }
    .presentation-card {
      max-width: 1100px;
      margin: 0 auto;
      border: 1px solid var(--border);
      border-radius: 24px;
      background: rgba(11,18,31,0.86);
      padding: 28px;
      box-shadow: var(--shadow);
    }
    .presentation-card h2 {
      margin: 0 0 10px;
      font-size: 36px;
      line-height: 1.35;
    }
    .presentation-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 18px;
    }
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 55;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(4, 8, 15, 0.78);
      padding: 22px;
    }
    .overlay.visible {
      display: flex;
    }
    .overlay-card {
      width: min(1080px, 100%);
      max-height: min(90vh, 980px);
      overflow: auto;
      border-radius: 24px;
      border: 1px solid var(--border);
      background: rgba(11,18,31,0.98);
      box-shadow: var(--shadow);
      padding: 20px;
    }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    .no-print {
      display: inline-flex;
    }
    @media (max-width: 1180px) {
      .app {
        grid-template-columns: minmax(0, 1fr) minmax(320px, 40vw);
      }
      .deck-grid,
      .practice-shell {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 900px) {
      body {
        overflow: hidden;
      }
      .app {
        grid-template-columns: 1fr;
      }
      .sidebar {
        display: none;
      }
      .mobile-drawer {
        display: flex;
        position: fixed;
        inset: auto 0 0 0;
        height: min(78vh, 760px);
        transform: translateY(102%);
        transition: transform 0.28s ease;
        z-index: 40;
        border-top: 1px solid var(--border);
        background: linear-gradient(180deg, rgba(14,21,35,0.99), rgba(10,16,27,1));
        box-shadow: 0 -16px 48px rgba(0, 0, 0, 0.4);
      }
      .mobile-drawer.open {
        transform: translateY(0);
      }
      .header {
        align-items: flex-start;
        flex-direction: column;
      }
      .header-actions {
        width: 100%;
        justify-content: flex-start;
      }
      .title-wrap h1 {
        font-size: 21px;
      }
      .legend {
        display: none;
      }
      .coverage-panel {
        right: 12px;
        left: 12px;
        bottom: 12px;
        width: auto;
      }
      .search-results {
        left: 12px;
        right: 12px;
        width: auto;
      }
      .detail-meta {
        grid-template-columns: 1fr;
      }
      .source-render {
        font-size: 15px;
        line-height: 1.85;
      }
      .practice-question {
        font-size: 22px;
      }
      .presentation-card h2 {
        font-size: 28px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
    }
    @media print {
      body {
        background: #fff;
        color: #000;
        overflow: visible;
      }
      .app {
        display: block;
        height: auto;
      }
      .main,
      .sidebar,
      .mobile-drawer {
        border: 0;
        background: #fff;
      }
      .no-print,
      .header,
      .proof-bar,
      .toolbar,
      .tab-row,
      .stats,
      .legend,
      .coverage-panel,
      .search-results,
      #graphView,
      #deckView,
      #alignmentView,
      #practiceView {
        display: none !important;
      }
      .sidebar,
      .mobile-drawer {
        display: block !important;
        position: static;
        transform: none;
        height: auto;
      }
      .detail-body-wrap {
        overflow: visible;
      }
      .source-render,
      .meta-card,
      .toc {
        border: 1px solid #ddd;
        background: #fff;
        color: #000;
      }
      .source-render h1,
      .source-render h2,
      .source-render h3,
      .source-render strong,
      .detail-title {
        color: #000;
      }
      .badge,
      .chip {
        color: #000;
        border-color: #aaa;
        background: #f6f6f6;
      }
    }
  </style>
</head>
<body>
  <div class="app">
    <main class="main">
      <header class="header no-print">
        <div class="header-left">
          <div class="header-badge">EXECUTIVE INTERVIEW PREP</div>
          <div class="title-wrap">
            <h1>Head of B2C — FutureSkill Interview Preparation</h1>
            <p>Sasion Nanthaphiriyakit · Interactive Mind Map · JD Alignment · Deep Interview Q&amp;A</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn" id="toggleSidebarBtn" aria-controls="detailSidebar" aria-expanded="true">Sidebar</button>
          <button class="btn" id="presentationBtn">Presentation Mode</button>
          <button class="btn gold" id="returnRootBtn">Return to Root</button>
        </div>
      </header>

      <section class="proof-bar no-print" id="proofBar" aria-label="Proof numbers"></section>

      <section class="toolbar no-print">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <label class="visually-hidden" for="searchInput">Search interview content</label>
          <input id="searchInput" type="search" placeholder="Search headings, questions, answers, KPI, Thai and English terms..." autocomplete="off" />
          <span class="search-count" id="searchCount"></span>
        </div>
        <button class="btn" id="resetZoomBtn">Reset Zoom</button>
        <button class="btn" id="fitBtn">Fit All</button>
        <button class="btn" id="expandBtn">Expand All</button>
        <button class="btn" id="collapseBtn">Collapse All</button>
        <button class="btn" id="lockBtn">Lock Nodes</button>
        <button class="btn" id="clearSearchBtn">Clear</button>
        <button class="btn" data-view="graph">Graph</button>
        <button class="btn" data-view="deck">Deck</button>
        <button class="btn" data-view="alignment">JD Alignment</button>
      </section>

      <nav class="tab-row no-print" id="categoryTabs" aria-label="Category filters"></nav>

      <section class="stats no-print" id="statsBar" aria-live="polite">
        <span class="stat">Total Nodes: <strong id="statNodes">0</strong></span>
        <span class="stat">Visible Nodes: <strong id="statVisibleNodes">0</strong></span>
        <span class="stat">Total Links: <strong id="statLinks">0</strong></span>
        <span class="stat">Interview Questions: <strong id="statQuestions">0</strong></span>
        <span class="stat">Selected Category: <strong id="statCategory">All</strong></span>
        <span class="stat">Search Results: <strong id="statSearch">0</strong></span>
        <span class="stat">Coverage: <strong id="statCoverage">0%</strong></span>
        <span class="stat">Scroll to zoom · Drag to pan · Click node for full answer · Double-click to expand</span>
      </section>

      <section class="content">
        <div class="view active" id="graphView">
          <div class="graph-shell" id="graphShell">
            <svg id="graph" role="img" aria-label="Head of B2C interactive mind map"></svg>
            <aside class="search-results no-print" id="searchResults" aria-live="polite"></aside>
            <aside class="legend no-print" id="legend"></aside>
            <aside class="coverage-panel no-print" id="coveragePanel"></aside>
          </div>
        </div>
        <div class="view" id="deckView">
          <div class="deck-wrap" id="deckWrap"></div>
        </div>
        <div class="view" id="alignmentView">
          <div class="alignment-wrap" id="alignmentWrap"></div>
        </div>
        <div class="view" id="practiceView">
          <div class="practice-wrap" id="practiceWrap"></div>
        </div>
      </section>
    </main>

    <aside class="sidebar" id="detailSidebar" aria-label="Detail panel">
      <div class="detail-header no-print">
        <h2>Node Detail</h2>
        <button class="btn" id="closeSidebarBtn">Close</button>
      </div>
      <div class="detail-body-wrap" id="detailBody"></div>
    </aside>
  </div>

  <aside class="mobile-drawer" id="mobileDrawer" aria-label="Mobile detail drawer">
    <div class="detail-header no-print">
      <h2>Node Detail</h2>
      <button class="btn" id="closeDrawerBtn">Close</button>
    </div>
    <div class="detail-body-wrap" id="mobileDetailBody"></div>
  </aside>

  <div class="presentation" id="presentationOverlay" aria-hidden="true">
    <div class="presentation-card">
      <div id="presentationContent"></div>
      <div class="presentation-actions no-print">
        <button class="btn" id="presentationPrevBtn">Previous</button>
        <button class="btn" id="presentationNextBtn">Next</button>
        <button class="btn" id="presentationCloseBtn">Close</button>
      </div>
    </div>
  </div>

  <div class="overlay" id="readerOverlay" aria-hidden="true">
    <div class="overlay-card">
      <div class="detail-controls no-print">
        <button class="btn" id="readerPrintBtn">Print</button>
        <button class="btn" id="readerCloseBtn">Close</button>
      </div>
      <div id="readerContent"></div>
    </div>
  </div>

  <div class="tooltip" id="tooltip" role="tooltip"></div>

  <script>
    const SOURCE_MARKDOWN = ${JSON.stringify(sourceMarkdown)};

    const CATEGORIES = {
      root: { id: "root", label: "Head of B2C", short: "Root", color: "var(--gold)", icon: "◆" },
      role_jd: { id: "role_jd", label: "Role & JD", short: "JD", color: "var(--blue)", icon: "R" },
      candidate_profile: { id: "candidate_profile", label: "Candidate Profile", short: "Profile", color: "var(--cyan)", icon: "P" },
      business_growth: { id: "business_growth", label: "Business Performance & Growth", short: "Growth", color: "var(--green)", icon: "G" },
      financial_management: { id: "financial_management", label: "Financial Management", short: "Financial", color: "var(--amber)", icon: "F" },
      team_leadership: { id: "team_leadership", label: "Team Leadership", short: "Leadership", color: "var(--purple)", icon: "L" },
      cross_functional: { id: "cross_functional", label: "Cross-Functional Collaboration", short: "Cross-Functional", color: "var(--teal)", icon: "X" },
      customer_market: { id: "customer_market", label: "Customer & Market Insight", short: "Customer", color: "var(--pink)", icon: "C" },
      operational_excellence: { id: "operational_excellence", label: "Operational Excellence", short: "Operations", color: "var(--orange)", icon: "O" },
      marketing_sales: { id: "marketing_sales", label: "Marketing & Sales", short: "Marketing", color: "var(--coral)", icon: "M" },
      unit_economics: { id: "unit_economics", label: "B2C Unit Economics", short: "Unit Economics", color: "var(--yellow)", icon: "U" },
      product_pricing: { id: "product_pricing", label: "Product, Pricing & Positioning", short: "Product", color: "var(--indigo)", icon: "P" },
      retention_ecosystem: { id: "retention_ecosystem", label: "Retention & Ecosystem Strategy", short: "Ecosystem", color: "var(--indigo)", icon: "E" },
      leadership_scenarios: { id: "leadership_scenarios", label: "Leadership Scenarios", short: "Scenarios", color: "var(--red)", icon: "S" },
      day_90: { id: "day_90", label: "90-Day Plan", short: "90-Day", color: "var(--emerald)", icon: "90" },
      executive_qa: { id: "executive_qa", label: "Executive Interview Q&A", short: "Interview Q&A", color: "var(--emerald)", icon: "Q" },
      why_sasion: { id: "why_sasion", label: "Why Sasion", short: "Why Sasion", color: "var(--green)", icon: "W" },
      questions_ceo: { id: "questions_ceo", label: "Questions for CEO", short: "Ask CEO", color: "var(--lightblue)", icon: "CEO" }
    };

    const PROOF_CARDS = [
      { value: "฿66M", label: "Revenue in 3 months", queries: ["66 ล้านบาท", "66 million", "66 ล้านบาทภายใน 3 เดือน", "66 ล้านบาทใน 3 เดือนแรก"] },
      { value: "38%", label: "Retention", queries: ["Retention 38%", "Retention 38", "38% retention", "Retention 38%"] },
      { value: "26%", label: "MoM Growth", queries: ["26% ต่อเดือน", "26% month", "MoM Growth 26%", "26%"] },
      { value: "299K", label: "Peak Concurrent Users", queries: ["299,000", "Peak Concurrent Users 299,000", "299000"] },
      { value: "฿898", label: "ARPPU", queries: ["ARPPU 898", "898 บาท"] },
      { value: "10+ Years", label: "Experience", queries: ["มากกว่า 10 ปี", "10 years"] },
      { value: "28 Internal", label: "Team Members", queries: ["28 คน", "พนักงานภายในประมาณ 28 คน"] },
      { value: "12 Contract", label: "Contract Team", queries: ["12 คน", "พนักงานสัญญาจ้าง 12 คน"] },
      { value: "6 Outsource", label: "Outsource Team", queries: ["Outsource 6 คน", "Outsource 6"] },
      { value: "8", label: "Direct Reports", queries: ["ผู้รายงานตรงประมาณ 8 คน", "8 คน"] }
    ];

    const JD_ALIGNMENT_ROWS = [
      { requirement: "Scale B2C business", evidenceQuery: "66 ล้านบาทใน 3 เดือนแรก", proof: "฿66M in 3 months", questionQuery: "อะไรคือผลงานด้านการขยายธุรกิจที่สำคัญที่สุดของคุณ" },
      { requirement: "Retention", evidenceQuery: "Retention 38%", proof: "38% retention", questionQuery: "คุณจะทำให้ผู้เรียนกลับมาเรียนและซื้อซ้ำได้อย่างไร" },
      { requirement: "Financial management", evidenceQuery: "P&L", proof: "Revenue, forecast and variance management", questionQuery: "คุณมีประสบการณ์บริหาร P&L อย่างไร" },
      { requirement: "Team leadership", evidenceQuery: "พนักงานภายในประมาณ 28 คน", proof: "28 + 12 + 6 with 8 direct reports", questionQuery: "คุณบริหารผู้จัดการและหลายทีมอย่างไร" },
      { requirement: "Cross-functional", evidenceQuery: "CEO, B2B, Partnership และ CTO", proof: "End-to-end execution", questionQuery: "คุณจะทำงานร่วมกับ CEO, B2B, Partnership และ CTO อย่างไร" }
    ];

    const VIEW_STORAGE_KEY = "head_b2c_view";
    const SIDEBAR_STORAGE_KEY = "head_b2c_sidebar";
    const SELECTED_STORAGE_KEY = "head_b2c_selected";
    const COLLAPSED_STORAGE_KEY = "head_b2c_collapsed";
    const PRACTICE_STORAGE_KEY = "head_b2c_practice";
    const NODE_LOCK_STORAGE_KEY = "head_b2c_lock";
    const PROOF_STORAGE_KEY = "head_b2c_proof";

    const STATE = {
      sections: [],
      sectionMap: new Map(),
      nodes: [],
      links: [],
      nodeMap: new Map(),
      questionIndex: [],
      selectedNodeId: localStorage.getItem(SELECTED_STORAGE_KEY) || null,
      currentCategory: "all",
      currentView: localStorage.getItem(VIEW_STORAGE_KEY) || "graph",
      currentSearch: "",
      searchResults: [],
      collapsed: new Set(JSON.parse(localStorage.getItem(COLLAPSED_STORAGE_KEY) || "[]")),
      selectedProof: localStorage.getItem(PROOF_STORAGE_KEY) || "",
      locked: localStorage.getItem(NODE_LOCK_STORAGE_KEY) === "true",
      practice: JSON.parse(localStorage.getItem(PRACTICE_STORAGE_KEY) || "{}"),
      practiceIndex: 0,
      practiceReveal: false,
      practiceTimer: null,
      practiceRemaining: 0,
      activePresentationNodeId: null
    };

    const DOM = {};
    let graphState = null;

    function normalizeText(text) {
      return (text || "")
        .replace(/\\r/g, "")
        .replace(/\\s+/g, " ")
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/\\u00a0/g, " ")
        .trim()
        .toLowerCase();
    }

    function stripMarkdown(text) {
      const bt = String.fromCharCode(96);
      return (text || "")
        .replace(new RegExp("\\\\\\\\([\\\\\\\\" + bt + "*_{}\\\\[\\\\]()#+\\\\-.!&])", "g"), "$1")
        .replace(/\\*\\*(.*?)\\*\\*/g, "$1")
        .replace(/\\*(.*?)\\*/g, "$1")
        .replace(new RegExp(bt + "([^" + bt + "]+)" + bt, "g"), "$1")
        .replace(/\\[(.*?)\\]\\((.*?)\\)/g, "$1")
        .replace(/^#{1,6}\\s+/gm, "")
        .trim();
    }

    function slugify(text) {
      const cleaned = stripMarkdown(text)
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9ก-๙]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return cleaned || "section";
    }

    function extractKeywords(section) {
      const matches = new Set();
      const text = section.plainText;
      const metricMatches = text.match(/(?:฿\\s?\\d+[\\d,]*(?:\\.\\d+)?[MK]?|\\d+[\\d,]*(?:\\.\\d+)?%|\\b(?:CAC|LTV|P&L|EBITDA|ARPPU|OKR|KPI|NPS|CSAT|PoC|MVP|ROI|COGS|OPEX|CX|B2C|B2B2C|CRM|PMF)\\b)/gi) || [];
      metricMatches.forEach((m) => matches.add(m.trim()));
      const labelMatches = text.match(/(?:แนวคิด|กระบวนการ|ผลลัพธ์|คำตอบ|คำถามเจาะต่อ|สิ่งที่ควรทำ|สิ่งที่ไม่ควรทำ|หลักการสำคัญ|North Star Metric|Weekly Business Review|Monthly Business Review|Quarterly Planning)/g) || [];
      labelMatches.forEach((m) => matches.add(m));
      return Array.from(matches).slice(0, 10);
    }

    function escapeRegExp(text) {
      return (text || "").replace(/[.*+?^$()|[\\]\\\\]/g, "\\\\$&");
    }

    function parseMarkdown(source) {
      const lines = source.split("\\n");
      const headingRe = /^(#{1,6})\\s+(.*)$/;
      const sections = [];
      const headings = [];
      for (let i = 0; i < lines.length; i += 1) {
        const match = lines[i].match(headingRe);
        if (!match) continue;
        const rawTitle = match[2] || "";
        const title = stripMarkdown(rawTitle);
        if (!title) continue;
        headings.push({
          id: "heading-" + headings.length,
          lineStart: i,
          lineNumber: i + 1,
          level: match[1].length,
          rawTitle,
          title
        });
      }
      for (let i = 0; i < headings.length; i += 1) {
        const heading = headings[i];
        const next = headings[i + 1];
        const lineEnd = next ? next.lineStart - 1 : lines.length - 1;
        const fullMarkdown = lines.slice(heading.lineStart, lineEnd + 1).join("\\n").trim();
        const bodyMarkdown = lines.slice(heading.lineStart + 1, lineEnd + 1).join("\\n").trim();
        sections.push({
          ...heading,
          lineEnd,
          fullMarkdown,
          bodyMarkdown,
          plainText: stripMarkdown(fullMarkdown),
          bodyPlainText: stripMarkdown(bodyMarkdown),
          children: [],
          parentId: null,
          categoryId: null,
          evidence: [],
          keywords: []
        });
      }
      const stack = [];
      for (const section of sections) {
        while (stack.length && stack[stack.length - 1].level >= section.level) {
          stack.pop();
        }
        const parent = stack[stack.length - 1];
        if (parent) {
          section.parentId = parent.id;
          parent.children.push(section.id);
        }
        stack.push(section);
      }
      const deepDiveIndex = sections.findIndex((section) => section.title.includes("ชุดคำถาม–คำตอบสัมภาษณ์เชิงลึก"));
      const ceoIndex = sections.findIndex((section) => section.title.includes("คำถามกลับที่ควรถาม CEO"));

      function matchCategory(section) {
        const title = section.title;
        const body = section.plainText;
        const numMatch = title.match(/^(\\d+)(?:\\.(\\d+))?/);
        const major = numMatch ? Number(numMatch[1]) : null;
        const isDeepDive = deepDiveIndex >= 0 && section.lineStart >= sections[deepDiveIndex].lineStart;
        const isCEO = ceoIndex >= 0 && section.lineStart >= sections[ceoIndex].lineStart;

        if (isCEO) return "questions_ceo";
        if (title === "Head of B2C") return "root";
        if (/ภาพรวมของตำแหน่ง|Role Overview|หน้าที่และความรับผิดชอบหลัก|Key Responsibilities|Qualifications/.test(title)) return "role_jd";
        if (/คำแนะนำตัวที่เชื่อมกับตำแหน่ง|Interview Talking Points|Why should we hire you\\?|คำตอบสรุป: Why should we hire you\\?|เหตุใดเราจึงควรเลือกคุณ|Why Sasion/i.test(title)) return "why_sasion";
        if (/ประสบการณ์ที่จำเป็น|Experience — Must-have|คุณสมบัติ|Nice-to-have|Leadership Skills — Must-have|Business & Financial Skills — Must-have|Marketing & Sales Skills — Must-have|Business & Financial Skills|Marketing & Sales Skills|Leadership Skills/.test(title)) {
          if (/Business & Financial Skills|8\\./.test(title)) return "unit_economics";
          if (/Marketing & Sales Skills|9\\./.test(title)) return "marketing_sales";
          if (/Leadership Skills|10\\./.test(title)) return "team_leadership";
          return "candidate_profile";
        }
        if (/Business Performance & Growth|Drive revenue|Define quarterly|Allocate resources|Identify new growth levers/.test(title)) return "business_growth";
        if (/Financial Management|Own the full BU P&L|Read and act on financial statements|Monthly forecasts|Variance/.test(title)) return "financial_management";
        if (/Team Leadership|People Management|Manage Directors|high-performance culture|Hiring and onboarding|succession plans/.test(title)) return "team_leadership";
        if (/Cross-Functional Collaboration|Partner with B2B|Translate customer feedback|Collaborate with Tech/.test(title)) return "cross_functional";
        if (/Customer & Market Insight|Voice of Customer|Track competition|Product, pricing and positioning/.test(title)) return "customer_market";
        if (/Operational Excellence|operating rhythms|dashboards and metrics|Marketing → Sales → CX workflows/.test(title)) return "operational_excellence";
        if (/Strategic Direction|Career Goal–Based Personalization|Stackable Credential|Community และ Social Accountability|B2B2C Flywheel|AI Learning Coach|North Star Metric|Ecosystem/.test(title)) return "retention_ecosystem";
        if (/Good–Better–Best|Pricing|Packaging|Scarcity|Progress Architecture|Habit Loop|Social Proof|Event ให้เป็น Conversion Funnel|Product, pricing and positioning/.test(title)) return "product_pricing";
        if (/OKR และ SMART|Dashboard ของ Head of B2C|Operating Rhythm|สิ่งที่ควรหยุดหรือหลีกเลี่ยง/.test(title)) return "operational_excellence";
        if (/90-Day Execution Plan|วันที่ 1–30|วันที่ 31–60|วันที่ 61–90|แผน 90 วันแรก/.test(title)) return "day_90";
        if (isDeepDive) {
          if (major >= 1 && major <= 7) return major === 4 ? "day_90" : (major === 7 ? "financial_management" : "executive_qa");
          if (major >= 8 && major <= 16) return "executive_qa";
          if (major >= 17 && major <= 23) return major >= 17 && major <= 20 ? "leadership_scenarios" : "operational_excellence";
          if (major >= 24 && major <= 26) return "retention_ecosystem";
          if (major === 27) return "why_sasion";
          return "executive_qa";
        }
        if (/P&L|Forecast|CAC|LTV|Payback|Contribution Margin|EBITDA|Revenue =|Contribution Margin =/.test(body)) return "unit_economics";
        return "candidate_profile";
      }

      sections.forEach((section, idx) => {
        section.id = "sec-" + String(idx + 1).padStart(3, "0") + "-" + slugify(section.title).slice(0, 48);
      });
      const idMap = new Map(sections.map((section) => [section.lineNumber, section.id]));
      sections.forEach((section) => {
        if (section.parentId && typeof section.parentId === "string" && !section.parentId.startsWith("sec-")) {
          const parent = sections.find((item) => item.title === section.parentId);
          if (parent) section.parentId = parent.id;
        } else if (section.parentId && section.parentId.id) {
          section.parentId = section.parentId.id;
        }
      });
      const stack2 = [];
      sections.forEach((section) => {
        while (stack2.length && stack2[stack2.length - 1].level >= section.level) {
          stack2.pop();
        }
        const parent = stack2[stack2.length - 1];
        section.parentId = parent ? parent.id : null;
        stack2.push(section);
      });
      sections.forEach((section) => {
        section.children = sections.filter((candidate) => candidate.parentId === section.id).map((candidate) => candidate.id);
        section.categoryId = matchCategory(section);
        section.keywords = extractKeywords(section);
        section.evidence = PROOF_CARDS.filter((card) => card.queries.some((query) => normalizeText(section.plainText).includes(normalizeText(query)))).map((card) => card.value);
        section.isInterviewQuestion = section.categoryId !== "questions_ceo"
          && section.level === 1
          && /^\\d+\\./.test(section.title)
          && deepDiveIndex >= 0
          && section.lineStart >= sections[deepDiveIndex].lineStart;
        section.isCEOQuestion = section.categoryId === "questions_ceo" && section.level === 2 && /^\\d+\\./.test(section.title);
        section.questionNumber = section.isInterviewQuestion || section.isCEOQuestion
          ? Number((section.title.match(/^(\\d+)/) || [])[1] || 0)
          : null;
        section.hasAnswer = !!section.bodyPlainText;
      });
      return sections;
    }

    function buildGraphModel(sections) {
      const nodes = [];
      const links = [];

      nodes.push({
        id: "root",
        label: "HEAD OF B2C",
        kind: "root",
        categoryId: "root",
        parentId: null,
        r: 28,
        sectionId: null,
        description: "Business Growth · P&L · Team Leadership · Customer · Product · Operations",
        fullMarkdown: "# HEAD OF B2C\\n\\nBusiness Growth · P&L · Team Leadership · Customer · Product · Operations",
        plainText: "HEAD OF B2C Business Growth P&L Team Leadership Customer Product Operations",
        keywords: ["Business Growth", "P&L", "Leadership", "Customer", "Product", "Operations"],
        evidence: [],
        isInterviewQuestion: false,
        sortIndex: 0
      });

      Object.values(CATEGORIES).forEach((category, index) => {
        if (category.id === "root") return;
        nodes.push({
          id: "cat-" + category.id,
          label: category.label,
          kind: "category",
          categoryId: category.id,
          parentId: "root",
          r: 18,
          sectionId: null,
          description: category.label,
          fullMarkdown: "# " + category.label,
          plainText: category.label,
          keywords: [category.label, category.short],
          evidence: [],
          isInterviewQuestion: false,
          sortIndex: index + 1
        });
        links.push({ source: "root", target: "cat-" + category.id, type: "primary" });
      });

      const sectionIdToNodeId = new Map();
      sections.forEach((section, index) => {
        const category = CATEGORIES[section.categoryId] || CATEGORIES.candidate_profile;
        const nodeId = "node-" + section.id;
        sectionIdToNodeId.set(section.id, nodeId);
        nodes.push({
          id: nodeId,
          label: section.title,
          kind: section.isInterviewQuestion ? "interview-question" : (section.isCEOQuestion ? "ceo-question" : "section"),
          categoryId: section.categoryId,
          parentId: null,
          r: section.isInterviewQuestion ? 14 : section.level === 1 ? 16 : section.level === 2 ? 13 : 11,
          sectionId: section.id,
          description: section.bodyPlainText.split("\\n")[0].slice(0, 180),
          fullMarkdown: section.fullMarkdown,
          bodyMarkdown: section.bodyMarkdown,
          plainText: section.plainText,
          keywords: section.keywords,
          evidence: section.evidence,
          isInterviewQuestion: section.isInterviewQuestion,
          isCEOQuestion: section.isCEOQuestion,
          questionNumber: section.questionNumber,
          lineNumber: section.lineNumber,
          sortIndex: 100 + index
        });
      });

      sections.forEach((section) => {
        const nodeId = sectionIdToNodeId.get(section.id);
        const categoryNodeId = "cat-" + section.categoryId;
        const parentSection = section.parentId ? sections.find((item) => item.id === section.parentId) : null;
        const parentNodeId = parentSection ? sectionIdToNodeId.get(parentSection.id) : categoryNodeId;
        const parentCategoryId = parentSection ? parentSection.categoryId : null;
        const finalParentId = parentSection && parentCategoryId === section.categoryId ? parentNodeId : categoryNodeId;
        const node = nodes.find((item) => item.id === nodeId);
        node.parentId = finalParentId;
        links.push({ source: finalParentId, target: nodeId, type: "tree" });
      });

      const questionIndex = nodes
        .filter((node) => node.isInterviewQuestion)
        .sort((a, b) => (a.questionNumber || 0) - (b.questionNumber || 0));

      return { nodes, links, questionIndex };
    }

    function sanitizeAndRender(markdown) {
      const raw = marked.parse(markdown || "", { breaks: true, gfm: true, headerIds: true, mangle: false });
      return DOMPurify.sanitize(raw, {
        ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i
      });
    }

    function highlightBusinessTerms(container) {
      const terms = ["P&L", "CAC", "LTV", "EBITDA", "ARPPU", "ROI", "OKR", "KPI", "NPS", "CSAT", "Unit Economics"];
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach((textNode) => {
        const parent = textNode.parentNode;
        if (!parent || ["SCRIPT", "STYLE", "CODE", "A"].includes(parent.nodeName)) return;
        let text = textNode.nodeValue;
        let changed = false;
        terms.forEach((term) => {
          const re = new RegExp(escapeRegExp(term), "g");
          if (re.test(text)) {
            changed = true;
            text = text.replace(re, '<span class="highlight-term">' + term + '</span>');
          }
        });
        if (changed) {
          const span = document.createElement("span");
          span.innerHTML = text;
          parent.replaceChild(span, textNode);
        }
      });
    }

    function extractSubsectionLabels(markdown) {
      const labels = [];
      const re = /^(#{1,6})\\s+(.+)$|^\\*\\*(แนวคิด|กระบวนการ|ผลลัพธ์|คำตอบ|คำถามเจาะต่อ|สิ่งที่ควรทำ|สิ่งที่ไม่ควรทำ|หลักการสำคัญ|KPI|ประโยคใช้พูด(?:ในที่ประชุม)?|Weekly Business Review|Monthly Business Review|Quarterly Planning|Commercial|Customer|Financial|Operational)\\*\\*$/gm;
      let match;
      while ((match = re.exec(markdown || ""))) {
        const label = stripMarkdown(match[2] || match[3] || "");
        if (label) labels.push(label);
      }
      return Array.from(new Set(labels)).slice(0, 14);
    }

    function getVisibleNodeIds() {
      const hidden = new Set();
      const nodeMap = STATE.nodeMap;
      function hideDescendants(nodeId) {
        STATE.links.forEach((link) => {
          if (link.source !== nodeId) return;
          hidden.add(link.target);
          hideDescendants(link.target);
        });
      }
      STATE.collapsed.forEach((id) => hideDescendants(id));
      return STATE.nodes.filter((node) => !hidden.has(node.id)).map((node) => node.id);
    }

    function getNodeBreadcrumb(node) {
      const crumbs = [];
      let current = node;
      const seen = new Set();
      while (current && !seen.has(current.id)) {
        seen.add(current.id);
        crumbs.unshift(current.label);
        current = STATE.nodeMap.get(current.parentId);
      }
      return crumbs.join(" > ");
    }

    function getRelatedNodes(node) {
      return STATE.nodes
        .filter((candidate) => candidate.id !== node.id)
        .filter((candidate) => {
          if (candidate.categoryId === node.categoryId) return true;
          if (candidate.evidence.some((item) => node.evidence.includes(item))) return true;
          return candidate.keywords.some((kw) => node.keywords.includes(kw));
        })
        .slice(0, 8);
    }

    function getQuestionNeighbors(node) {
      const list = STATE.questionIndex;
      const index = list.findIndex((item) => item.id === node.id);
      return {
        prev: index > 0 ? list[index - 1] : null,
        next: index >= 0 && index < list.length - 1 ? list[index + 1] : null
      };
    }

    function getSpeakingOutline(node) {
      const labels = extractSubsectionLabels(node.fullMarkdown || "");
      if (!labels.length) return [];
      return labels.map((label, index) => (index + 1) + ". " + label);
    }

    function renderBadge(categoryId, text) {
      const category = CATEGORIES[categoryId] || CATEGORIES.candidate_profile;
      return '<span class="badge" style="background:' + category.color + '18;border-color:' + category.color + '55;color:' + category.color + '">' + text + '</span>';
    }

    function copyText(text) {
      navigator.clipboard.writeText(text).catch(() => {});
    }

    function selectNode(nodeId, options = {}) {
      const node = STATE.nodeMap.get(nodeId);
      if (!node) return;
      STATE.selectedNodeId = nodeId;
      localStorage.setItem(SELECTED_STORAGE_KEY, nodeId);
      renderDetail(node);
      if (options.center !== false) centerOnNode(nodeId);
      applyGraphState();
      if (window.innerWidth <= 900) {
        DOM.mobileDrawer.classList.add("open");
      } else if (localStorage.getItem(SIDEBAR_STORAGE_KEY) !== "collapsed") {
        DOM.detailSidebar.classList.remove("collapsed");
      }
    }

    function clearSelection() {
      STATE.selectedNodeId = null;
      localStorage.removeItem(SELECTED_STORAGE_KEY);
      renderDetail(null);
      applyGraphState();
    }

    function renderDetail(node) {
      const targets = [DOM.detailBody, DOM.mobileDetailBody];
      if (!node) {
        targets.forEach((target) => {
          if (!target) return;
          target.innerHTML = '<div class="detail-empty">Click any node to read the complete original content, search every question, or jump in from the deck and JD alignment views.</div>';
        });
        return;
      }
      targets.forEach((target) => {
        if (!target) return;
        const speakingOutline = getSpeakingOutline(node);
        const related = getRelatedNodes(node);
        const neighbors = getQuestionNeighbors(node);
        const keywordsHtml = node.keywords.length
          ? '<div class="keyword-list">' + node.keywords.map((kw) => '<span class="chip">' + kw + '</span>').join("") + '</div>'
          : '<p>No extracted keywords</p>';
        const relatedHtml = related.length
          ? '<div class="related-list">' + related.map((item) => '<button class="chip actionable" data-related-node="' + item.id + '">' + item.label + '</button>').join("") + '</div>'
          : '<p>No related nodes</p>';
        const tocLabels = extractSubsectionLabels(node.fullMarkdown || "");
        const tocHtml = tocLabels.length
          ? '<details class="toc"' + (tocLabels.length < 7 ? ' open' : '') + '><summary>Jump Within This Answer</summary><div class="toc-list">' + tocLabels.map((label) => '<span class="toc-chip">' + label + '</span>').join("") + '</div></details>'
          : '';
        const speakingHtml = speakingOutline.length
          ? '<div class="meta-card"><h4>Speaking Structure</h4><p>Speaking Structure — generated navigation aid, not original source text.</p><div class="related-list">' + speakingOutline.map((line) => '<span class="chip">' + line + '</span>').join("") + '</div></div>'
          : '<div class="meta-card"><h4>Speaking Structure</h4><p>No generated outline for this node.</p></div>';
        const proofHtml = node.evidence.length
          ? '<div class="related-list">' + node.evidence.map((value) => '<span class="chip">' + value + '</span>').join("") + '</div>'
          : '<p>No proof cards linked to this node.</p>';
        const html = sanitizeAndRender(node.fullMarkdown || "");
        target.innerHTML = ''
          + '<article class="detail-card">'
          +   '<div class="badge-row">'
          +     renderBadge(node.categoryId, (CATEGORIES[node.categoryId] || CATEGORIES.candidate_profile).label)
          +     (node.isInterviewQuestion ? renderBadge(node.categoryId, 'Interview Question ' + node.questionNumber) : '')
          +     (node.isCEOQuestion ? renderBadge(node.categoryId, 'CEO Question') : '')
          +   '</div>'
          +   '<h1 class="detail-title">' + node.label + '</h1>'
          +   '<div class="breadcrumb">' + getNodeBreadcrumb(node) + '</div>'
          +   '<div class="detail-controls no-print">'
          +     '<button class="btn" data-action="copy-answer">Copy Answer</button>'
          +     '<button class="btn" data-action="copy-outline">Copy Short Speaking Outline</button>'
          +     '<button class="btn" data-action="reader">Full-Screen Reading Mode</button>'
          +     '<button class="btn" data-action="print-answer">Print Current Answer</button>'
          +     '<button class="btn" data-action="export-answer">Export Answer as Text</button>'
          +   '</div>'
          +   tocHtml
          +   '<div class="section-title">Original Source Content</div>'
          +   '<div class="source-render" id="render-' + node.id + '">' + html + '</div>'
          +   '<div class="detail-meta">'
          +     '<div class="meta-card"><h4>Key Proof / Result</h4>' + proofHtml + '</div>'
          +     '<div class="meta-card"><h4>Related Keywords</h4>' + keywordsHtml + '</div>'
          +     speakingHtml
          +     '<div class="meta-card"><h4>Related Nodes</h4>' + relatedHtml + '</div>'
          +   '</div>'
          +   '<div class="pager no-print">'
          +     (neighbors.prev ? '<button class="btn" data-nav-node="' + neighbors.prev.id + '">Previous Question</button>' : '')
          +     (neighbors.next ? '<button class="btn" data-nav-node="' + neighbors.next.id + '">Next Question</button>' : '')
          +   '</div>'
          + '</article>';
      });
      [DOM.detailBody, DOM.mobileDetailBody].forEach((target) => {
        if (!target) return;
        target.querySelectorAll('[data-related-node]').forEach((button) => {
          button.addEventListener('click', () => selectNode(button.getAttribute('data-related-node')));
        });
        target.querySelectorAll('[data-nav-node]').forEach((button) => {
          button.addEventListener('click', () => selectNode(button.getAttribute('data-nav-node')));
        });
        target.querySelectorAll('[data-action="copy-answer"]').forEach((button) => {
          button.addEventListener('click', () => copyText((node.fullMarkdown || '').trim()));
        });
        target.querySelectorAll('[data-action="copy-outline"]').forEach((button) => {
          button.addEventListener('click', () => copyText(getSpeakingOutline(node).join('\\n') || 'No generated speaking outline.'));
        });
        target.querySelectorAll('[data-action="reader"]').forEach((button) => {
          button.addEventListener('click', () => openReader(node));
        });
        target.querySelectorAll('[data-action="print-answer"]').forEach((button) => {
          button.addEventListener('click', () => window.print());
        });
        target.querySelectorAll('[data-action="export-answer"]').forEach((button) => {
          button.addEventListener('click', () => exportSelectedAnswer(node));
        });
      });
      const renderTargets = document.querySelectorAll('#render-' + CSS.escape(node.id));
      renderTargets.forEach((element) => highlightBusinessTerms(element));
    }

    function exportSelectedAnswer(node) {
      const blob = new Blob([(node.fullMarkdown || '').trim()], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = slugify(node.label) + '.txt';
      link.click();
      URL.revokeObjectURL(url);
    }

    function openReader(node) {
      DOM.readerOverlay.classList.add('visible');
      DOM.readerOverlay.setAttribute('aria-hidden', 'false');
      DOM.readerContent.innerHTML = '<h2 class="detail-title">' + node.label + '</h2><div class="breadcrumb">' + getNodeBreadcrumb(node) + '</div><div class="source-render" style="margin-top:16px">' + sanitizeAndRender(node.fullMarkdown || '') + '</div>';
      highlightBusinessTerms(DOM.readerContent);
    }

    function closeReader() {
      DOM.readerOverlay.classList.remove('visible');
      DOM.readerOverlay.setAttribute('aria-hidden', 'true');
    }

    function buildLegend() {
      const items = [
        'role_jd', 'candidate_profile', 'business_growth', 'financial_management', 'team_leadership',
        'cross_functional', 'customer_market', 'operational_excellence', 'marketing_sales', 'unit_economics',
        'product_pricing', 'retention_ecosystem', 'leadership_scenarios', 'day_90', 'executive_qa', 'why_sasion', 'questions_ceo'
      ];
      DOM.legend.innerHTML = '<h3>Legend</h3><div class="legend-grid">' + items.map((id) => {
        const category = CATEGORIES[id];
        return '<div class="legend-item"><span class="tab-dot" style="background:' + category.color + '"></span><span>' + category.short + '</span></div>';
      }).join('') + '</div>';
    }

    function buildProofBar() {
      DOM.proofBar.innerHTML = PROOF_CARDS.map((card) => {
        return '<button class="proof-card' + (STATE.selectedProof === card.value ? ' active' : '') + '" data-proof="' + card.value + '"><strong>' + card.value + '</strong><span>' + card.label + '</span></button>';
      }).join('');
      DOM.proofBar.querySelectorAll('[data-proof]').forEach((button) => {
        button.addEventListener('click', () => activateProof(button.getAttribute('data-proof')));
      });
    }

    function activateProof(value) {
      STATE.selectedProof = STATE.selectedProof === value ? '' : value;
      if (STATE.selectedProof) localStorage.setItem(PROOF_STORAGE_KEY, STATE.selectedProof);
      else localStorage.removeItem(PROOF_STORAGE_KEY);
      buildProofBar();
      applyGraphState();
      if (!STATE.selectedProof) return;
      const card = PROOF_CARDS.find((item) => item.value === STATE.selectedProof);
      const node = findBestNodeForQueries(card.queries);
      if (node) selectNode(node.id);
    }

    function buildCategoryTabs() {
      const tabs = [
        { id: 'all', label: 'All', color: '#9aadcb' },
        { id: 'role_jd', label: 'JD', color: CATEGORIES.role_jd.color },
        { id: 'candidate_profile', label: 'Profile', color: CATEGORIES.candidate_profile.color },
        { id: 'business_growth', label: 'Growth', color: CATEGORIES.business_growth.color },
        { id: 'financial_management', label: 'Financial', color: CATEGORIES.financial_management.color },
        { id: 'team_leadership', label: 'Leadership', color: CATEGORIES.team_leadership.color },
        { id: 'customer_market', label: 'Customer', color: CATEGORIES.customer_market.color },
        { id: 'product_pricing', label: 'Product', color: CATEGORIES.product_pricing.color },
        { id: 'marketing_sales', label: 'Marketing', color: CATEGORIES.marketing_sales.color },
        { id: 'operational_excellence', label: 'Operations', color: CATEGORIES.operational_excellence.color },
        { id: 'retention_ecosystem', label: 'Ecosystem', color: CATEGORIES.retention_ecosystem.color },
        { id: 'executive_qa', label: 'Interview Q&A', color: CATEGORIES.executive_qa.color },
        { id: 'questions_ceo', label: 'Ask CEO', color: CATEGORIES.questions_ceo.color }
      ];
      DOM.categoryTabs.innerHTML = tabs.map((tab) => '<button class="category-tab' + (STATE.currentCategory === tab.id ? ' active' : '') + '" data-category="' + tab.id + '" style="' + (STATE.currentCategory === tab.id ? 'background:' + tab.color + '20;border-color:' + tab.color + ';color:#fff;' : '') + '"><span class="tab-dot" style="background:' + tab.color + '"></span>' + tab.label + '</button>').join('');
      DOM.categoryTabs.querySelectorAll('[data-category]').forEach((button) => {
        button.addEventListener('click', () => {
          STATE.currentCategory = button.getAttribute('data-category');
          DOM.statCategory.textContent = STATE.currentCategory === 'all' ? 'All' : (CATEGORIES[STATE.currentCategory] || {}).label || STATE.currentCategory;
          buildCategoryTabs();
          applyGraphState();
          fitVisibleNodes();
        });
      });
    }

    function buildDeckView() {
      const pages = [
        { title: 'Profile and Executive Introduction', subtitle: 'Candidate profile, intro, why this role fits', queries: ['คำแนะนำตัวที่เชื่อมกับตำแหน่ง', 'Candidate Profile', 'Why should we hire you?', 'เหตุใดเราจึงควรเลือกคุณ'] },
        { title: 'Role Overview and JD', subtitle: 'Role expectations, responsibilities and qualifications', queries: ['Role Overview', 'Key Responsibilities', 'Qualifications'] },
        { title: 'Key Proof Numbers', subtitle: 'Revenue, retention, growth and team evidence', queries: ['66 ล้านบาท', 'Retention 38%', 'พนักงานภายในประมาณ 28 คน'] },
        { title: 'Business Growth', subtitle: 'Growth model, quarterly strategy and growth levers', queries: ['Business Performance & Growth', 'Growth Lever', 'กลยุทธ์รายไตรมาส'] },
        { title: 'Financial Management', subtitle: 'P&L, forecast, variance and unit economics', queries: ['Financial Management', 'P&L', 'Variance', 'CAC'] },
        { title: 'Marketing, Sales and Customer Journey', subtitle: 'Full-funnel, pricing, psychology and retention system', queries: ['Full-funnel Marketing', 'Pricing', 'Habit Loop', 'Social Proof', 'Event ให้เป็น Conversion Funnel'] },
        { title: 'Team Leadership', subtitle: 'Managing managers, culture, hiring and underperformance', queries: ['Team Leadership', 'ผู้จัดการมีผลงานต่ำกว่าเป้า', 'Build high-performance teams'] },
        { title: 'Cross-Functional Leadership', subtitle: 'CEO, B2B, Partnership, Product and CTO collaboration', queries: ['CEO, B2B, Partnership และ CTO', 'Cross-Functional Collaboration'] },
        { title: 'Product and Technology', subtitle: 'Roadmap translation, AI coach, packaging and positioning', queries: ['Product, pricing and positioning strategy', 'AI Learning Coach', 'Good–Better–Best'] },
        { title: 'FutureSkill Ecosystem Strategy', subtitle: 'Career ecosystem, B2B2C flywheel and North Star Metric', queries: ['Career Growth Ecosystem', 'B2B2C Flywheel', 'North Star Metric'] },
        { title: 'Operational Excellence', subtitle: 'Dashboard, operating rhythm and execution system', queries: ['Dashboard ของ Head of B2C', 'Operating Rhythm', 'Operational Excellence'] },
        { title: '90-Day Plan', subtitle: 'Diagnose, pilot and scale', queries: ['90-Day Execution Plan', 'แผน 90 วันแรกของคุณจะเป็นอย่างไร'] },
      ];

      const qaGroups = [
        { title: 'Executive Interview Q&A 1–9', start: 1, end: 9 },
        { title: 'Executive Interview Q&A 10–18', start: 10, end: 18 },
        { title: 'Executive Interview Q&A 19–27', start: 19, end: 27 }
      ];

      DOM.deckWrap.innerHTML = pages.map((page, index) => {
        const cards = page.queries
          .map((query) => findBestNodeForQueries([query]))
          .filter(Boolean)
          .filter((node, idx, arr) => arr.findIndex((candidate) => candidate.id === node.id) === idx)
          .map((node) => renderDeckCard(node))
          .join('');
        return '<section class="deck-page"><div class="deck-head"><div><h3>' + page.title + '</h3><p>' + page.subtitle + '</p></div><div class="badge" style="background:rgba(255,255,255,0.04);border-color:var(--border);color:var(--text3)">Section ' + (index + 1) + '</div></div><div class="deck-body"><div class="deck-grid">' + cards + '</div></div></section>';
      }).join('') + '<section class="deck-page"><div class="deck-head"><div><h3>Executive Interview Q&A</h3><p>Grouped access to all 27 interview questions without shrinking the answers into unreadable cards.</p></div><div class="badge" style="background:rgba(255,255,255,0.04);border-color:var(--border);color:var(--text3)">Questions</div></div><div class="deck-body"><div class="deck-accordion">' + qaGroups.map((group) => {
        const items = STATE.questionIndex.filter((node) => node.questionNumber >= group.start && node.questionNumber <= group.end).map((node) => renderDeckCard(node)).join('');
        return '<details' + (group.start === 1 ? ' open' : '') + '><summary>' + group.title + '</summary><div class="deck-grid">' + items + '</div></details>';
      }).join('') + '</div></div></section><section class="deck-page"><div class="deck-head"><div><h3>Questions to Ask the CEO</h3><p>CEO-facing questions preserved exactly from the source document.</p></div><div class="badge" style="background:rgba(255,255,255,0.04);border-color:var(--border);color:var(--text3)">Ask CEO</div></div><div class="deck-body"><div class="deck-grid">' + STATE.nodes.filter((node) => node.categoryId === 'questions_ceo' && node.kind !== 'category').map((node) => renderDeckCard(node)).join('') + '</div></div></section>';

      DOM.deckWrap.querySelectorAll('[data-open-node]').forEach((button) => {
        button.addEventListener('click', () => {
          switchView('graph');
          selectNode(button.getAttribute('data-open-node'));
        });
      });
    }

    function renderDeckCard(node) {
      return '<article class="deck-card"><h4>' + node.label + '</h4><p>' + escapeHtml(node.description || node.plainText.slice(0, 160)) + '</p><button class="btn" data-open-node="' + node.id + '">Open in Graph</button></article>';
    }

    function buildAlignmentView() {
      const rows = JD_ALIGNMENT_ROWS.map((row) => {
        const evidenceNode = findBestNodeForQueries([row.evidenceQuery]);
        const questionNode = findBestNodeForQueries([row.questionQuery]);
        return { ...row, evidenceNode, questionNode };
      });
      DOM.alignmentWrap.innerHTML = '<table class="alignment-table"><thead><tr><th>JD Requirement</th><th>Candidate Evidence</th><th>Proof</th><th>Related Interview Question</th></tr></thead><tbody>' + rows.map((row) => {
        return '<tr data-row-node="' + (row.evidenceNode ? row.evidenceNode.id : '') + '"><td>' + row.requirement + '</td><td>' + (row.evidenceNode ? escapeHtml(row.evidenceNode.label) : 'Not mapped') + '</td><td>' + row.proof + '</td><td>' + (row.questionNode ? '<button class="btn" data-open-node="' + row.questionNode.id + '">Open</button>' : 'Not mapped') + '</td></tr>';
      }).join('') + '</tbody></table>';
      DOM.alignmentWrap.querySelectorAll('[data-open-node]').forEach((button) => {
        button.addEventListener('click', () => {
          switchView('graph');
          selectNode(button.getAttribute('data-open-node'));
        });
      });
      DOM.alignmentWrap.querySelectorAll('[data-row-node]').forEach((row) => {
        row.addEventListener('click', (event) => {
          if (event.target.closest('[data-open-node]')) return;
          const nodeId = row.getAttribute('data-row-node');
          if (!nodeId) return;
          switchView('graph');
          selectNode(nodeId);
        });
      });
    }

    function buildPracticeView() {
      if (!STATE.questionIndex.length) {
        DOM.practiceWrap.innerHTML = '<p>No practice questions found.</p>';
        return;
      }
      const current = STATE.questionIndex[STATE.practiceIndex] || STATE.questionIndex[0];
      const status = STATE.practice[current.id] || 'Not practiced';
      const progressCounts = {
        total: STATE.questionIndex.length,
        ready: Object.values(STATE.practice).filter((value) => value === 'Ready').length,
        needs: Object.values(STATE.practice).filter((value) => value === 'Needs improvement').length,
        untouched: STATE.questionIndex.length - Object.keys(STATE.practice).length
      };
      DOM.practiceWrap.innerHTML = '<div class="practice-shell"><section class="practice-card"><h3>Practice Mode</h3><p class="practice-question">' + current.label + '</p><div class="timer-display" id="timerDisplay">' + formatTimer(STATE.practiceRemaining) + '</div><div class="timer-row"><button class="btn" data-timer="30">30s</button><button class="btn" data-timer="60">60s</button><button class="btn" data-timer="90">90s</button><button class="btn" data-timer="120">2 min</button><button class="btn" id="stopTimerBtn">Stop</button><button class="btn gold" id="revealAnswerBtn">' + (STATE.practiceReveal ? 'Hide Answer' : 'Reveal Answer') + '</button></div>' + (STATE.practiceReveal ? '<div class="practice-answer"><div class="source-render">' + sanitizeAndRender(current.fullMarkdown) + '</div></div>' : '') + '<div class="status-row"><button class="btn' + (status === 'Not practiced' ? ' active' : '') + '" data-status="Not practiced">Not practiced</button><button class="btn' + (status === 'Needs improvement' ? ' active' : '') + '" data-status="Needs improvement">Needs improvement</button><button class="btn' + (status === 'Ready' ? ' active' : '') + '" data-status="Ready">Ready</button></div><div class="practice-nav"><button class="btn" id="practicePrevBtn">Previous</button><button class="btn" id="practiceNextBtn">Next</button><button class="btn" id="practiceRandomBtn">Random</button><button class="btn" id="practiceOpenGraphBtn">Open in Graph</button></div></section><aside class="practice-side"><div><h4>Practice Progress</h4><p>Total questions: ' + progressCounts.total + '</p><p>Ready: ' + progressCounts.ready + '</p><p>Needs improvement: ' + progressCounts.needs + '</p><p>Not practiced: ' + progressCounts.untouched + '</p></div><div><h4>Persistence</h4><p>Status is saved in localStorage on this browser only.</p></div><div><h4>Export</h4><div class="practice-nav"><button class="btn" id="exportPracticeBtn">Export Status JSON</button><button class="btn" id="resetPracticeBtn">Reset Progress</button></div></div></aside></div>';
      DOM.practiceWrap.querySelectorAll('[data-timer]').forEach((button) => {
        button.addEventListener('click', () => startPracticeTimer(Number(button.getAttribute('data-timer'))));
      });
      const stopBtn = DOM.practiceWrap.querySelector('#stopTimerBtn');
      if (stopBtn) stopBtn.addEventListener('click', stopPracticeTimer);
      const revealBtn = DOM.practiceWrap.querySelector('#revealAnswerBtn');
      if (revealBtn) revealBtn.addEventListener('click', () => {
        STATE.practiceReveal = !STATE.practiceReveal;
        buildPracticeView();
      });
      DOM.practiceWrap.querySelectorAll('[data-status]').forEach((button) => {
        button.addEventListener('click', () => {
          STATE.practice[current.id] = button.getAttribute('data-status');
          persistPractice();
          buildPracticeView();
        });
      });
      DOM.practiceWrap.querySelector('#practicePrevBtn').addEventListener('click', () => movePractice(-1));
      DOM.practiceWrap.querySelector('#practiceNextBtn').addEventListener('click', () => movePractice(1));
      DOM.practiceWrap.querySelector('#practiceRandomBtn').addEventListener('click', randomPractice);
      DOM.practiceWrap.querySelector('#practiceOpenGraphBtn').addEventListener('click', () => {
        switchView('graph');
        selectNode(current.id);
      });
      DOM.practiceWrap.querySelector('#exportPracticeBtn').addEventListener('click', exportPracticeStatus);
      DOM.practiceWrap.querySelector('#resetPracticeBtn').addEventListener('click', resetPracticeStatus);
      const practiceRender = DOM.practiceWrap.querySelector('.source-render');
      if (practiceRender) highlightBusinessTerms(practiceRender);
    }

    function formatTimer(seconds) {
      const safe = Math.max(0, seconds || 0);
      const mins = Math.floor(safe / 60);
      const secs = safe % 60;
      return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    }

    function startPracticeTimer(seconds) {
      stopPracticeTimer();
      STATE.practiceRemaining = seconds;
      updatePracticeTimer();
      STATE.practiceTimer = window.setInterval(() => {
        STATE.practiceRemaining -= 1;
        updatePracticeTimer();
        if (STATE.practiceRemaining <= 0) {
          stopPracticeTimer();
        }
      }, 1000);
    }

    function stopPracticeTimer() {
      if (STATE.practiceTimer) {
        window.clearInterval(STATE.practiceTimer);
        STATE.practiceTimer = null;
      }
    }

    function updatePracticeTimer() {
      const display = document.getElementById('timerDisplay');
      if (display) display.textContent = formatTimer(STATE.practiceRemaining);
    }

    function movePractice(delta) {
      stopPracticeTimer();
      STATE.practiceReveal = false;
      STATE.practiceRemaining = 0;
      STATE.practiceIndex = (STATE.practiceIndex + delta + STATE.questionIndex.length) % STATE.questionIndex.length;
      buildPracticeView();
    }

    function randomPractice() {
      stopPracticeTimer();
      STATE.practiceReveal = false;
      STATE.practiceRemaining = 0;
      STATE.practiceIndex = Math.floor(Math.random() * STATE.questionIndex.length);
      buildPracticeView();
    }

    function persistPractice() {
      localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(STATE.practice));
    }

    function exportPracticeStatus() {
      const blob = new Blob([JSON.stringify(STATE.practice, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'head_of_b2c_practice_status.json';
      link.click();
      URL.revokeObjectURL(url);
    }

    function resetPracticeStatus() {
      STATE.practice = {};
      persistPractice();
      buildPracticeView();
    }

    function buildValidationReport() {
      const headings = STATE.sections;
      const questions = STATE.questionIndex;
      const nodeHeadings = STATE.nodes.filter((node) => node.sectionId);
      const missingHeadings = headings.filter((section) => !nodeHeadings.find((node) => node.sectionId === section.id)).map((section) => section.title);
      const missingQuestions = questions.filter((node) => !node.fullMarkdown || !node.bodyMarkdown).map((node) => node.label);
      const emptyAnswerNodes = STATE.nodes.filter((node) => node.isInterviewQuestion && !stripMarkdown(node.bodyMarkdown || '')).map((node) => node.label);
      const totalNonEmptyLines = SOURCE_MARKDOWN.split('\\n').filter((line) => line.trim()).length;
      const coveredLineSet = new Set();
      headings.forEach((section) => {
        for (let i = section.lineStart; i <= section.lineEnd; i += 1) {
          if (SOURCE_MARKDOWN.split('\\n')[i] && SOURCE_MARKDOWN.split('\\n')[i].trim()) coveredLineSet.add(i);
        }
      });
      const coverage = totalNonEmptyLines ? (coveredLineSet.size / totalNonEmptyLines) * 100 : 100;
      const report = {
        headingsFound: headings.length,
        questionsFound: questions.length,
        questionNodes: STATE.nodes.filter((node) => node.isInterviewQuestion).length,
        missingHeadings,
        missingQuestions,
        emptyAnswerNodes,
        contentCoverage: Number(coverage.toFixed(2))
      };
      console.group('Head of B2C Validation Report');
      console.table({
        headingsFound: report.headingsFound,
        questionsFound: report.questionsFound,
        questionNodes: report.questionNodes,
        contentCoverage: report.contentCoverage + '%'
      });
      if (report.missingHeadings.length) console.warn('Missing headings:', report.missingHeadings);
      if (report.missingQuestions.length) console.warn('Missing questions:', report.missingQuestions);
      if (report.emptyAnswerNodes.length) console.warn('Empty answer nodes:', report.emptyAnswerNodes);
      if (!report.missingHeadings.length && !report.missingQuestions.length && !report.emptyAnswerNodes.length) {
        console.info('Validation passed with full mapped coverage.');
      }
      console.groupEnd();
      DOM.coveragePanel.innerHTML = '<h3>Validation</h3><p>Total Markdown headings found: <strong>' + report.headingsFound + '</strong></p><p>Total questions found: <strong>' + report.questionsFound + '</strong></p><p>Total questions converted into nodes: <strong>' + report.questionNodes + '</strong></p><p>Missing headings or sections: <strong>' + (report.missingHeadings.length || report.missingQuestions.length ? 'Review console' : 'None') + '</strong></p><p>Empty answer nodes: <strong>' + (report.emptyAnswerNodes.length ? report.emptyAnswerNodes.length : 'None') + '</strong></p><p>Content coverage percentage: <strong>' + report.contentCoverage + '%</strong></p>';
      DOM.statCoverage.textContent = report.contentCoverage + '%';
      window.__HEAD_OF_B2C_VALIDATION__ = report;
      return report;
    }

    function escapeHtml(text) {
      return (text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function findBestNodeForQueries(queries) {
      const normalizedQueries = queries.map(normalizeText);
      let best = null;
      let bestScore = -1;
      STATE.nodes.forEach((node) => {
        const text = normalizeText(node.plainText + ' ' + (node.description || '') + ' ' + (node.keywords || []).join(' '));
        let score = 0;
        normalizedQueries.forEach((query) => {
          if (!query) return;
          if (text.includes(query)) score += 4;
          else if (query.length > 4 && text.includes(query.slice(0, Math.max(4, query.length - 2)))) score += 2;
        });
        if (score > bestScore) {
          best = node;
          bestScore = score;
        }
      });
      return bestScore > 0 ? best : null;
    }

    function initDomRefs() {
      Object.assign(DOM, {
        detailSidebar: document.getElementById('detailSidebar'),
        detailBody: document.getElementById('detailBody'),
        mobileDrawer: document.getElementById('mobileDrawer'),
        mobileDetailBody: document.getElementById('mobileDetailBody'),
        proofBar: document.getElementById('proofBar'),
        categoryTabs: document.getElementById('categoryTabs'),
        statNodes: document.getElementById('statNodes'),
        statVisibleNodes: document.getElementById('statVisibleNodes'),
        statLinks: document.getElementById('statLinks'),
        statQuestions: document.getElementById('statQuestions'),
        statCategory: document.getElementById('statCategory'),
        statSearch: document.getElementById('statSearch'),
        statCoverage: document.getElementById('statCoverage'),
        graphShell: document.getElementById('graphShell'),
        graphSvg: document.getElementById('graph'),
        tooltip: document.getElementById('tooltip'),
        searchInput: document.getElementById('searchInput'),
        searchCount: document.getElementById('searchCount'),
        searchResults: document.getElementById('searchResults'),
        legend: document.getElementById('legend'),
        coveragePanel: document.getElementById('coveragePanel'),
        deckWrap: document.getElementById('deckWrap'),
        alignmentWrap: document.getElementById('alignmentWrap'),
        practiceWrap: document.getElementById('practiceWrap'),
        readerOverlay: document.getElementById('readerOverlay'),
        readerContent: document.getElementById('readerContent'),
        presentationOverlay: document.getElementById('presentationOverlay'),
        presentationContent: document.getElementById('presentationContent')
      });
    }

    function switchView(view) {
      STATE.currentView = view;
      localStorage.setItem(VIEW_STORAGE_KEY, view);
      document.querySelectorAll('.view').forEach((element) => element.classList.remove('active'));
      document.querySelectorAll('[data-view]').forEach((button) => button.classList.toggle('active', button.getAttribute('data-view') === view));
      if (view === 'graph') document.getElementById('graphView').classList.add('active');
      if (view === 'deck') document.getElementById('deckView').classList.add('active');
      if (view === 'alignment') document.getElementById('alignmentView').classList.add('active');
      if (view === 'practice') document.getElementById('practiceView').classList.add('active');
      if (view === 'deck') buildDeckView();
      if (view === 'alignment') buildAlignmentView();
      if (view === 'practice') buildPracticeView();
    }

    function persistCollapsed() {
      localStorage.setItem(COLLAPSED_STORAGE_KEY, JSON.stringify(Array.from(STATE.collapsed)));
    }

    function toggleSidebar(forceOpen) {
      const collapsed = DOM.detailSidebar.classList.contains('collapsed');
      const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : collapsed;
      DOM.detailSidebar.classList.toggle('collapsed', !shouldOpen);
      document.getElementById('toggleSidebarBtn').setAttribute('aria-expanded', String(shouldOpen));
      localStorage.setItem(SIDEBAR_STORAGE_KEY, shouldOpen ? 'open' : 'collapsed');
    }

    function openPresentation(node) {
      if (!node) return;
      STATE.activePresentationNodeId = node.id;
      DOM.presentationOverlay.classList.add('visible');
      DOM.presentationOverlay.setAttribute('aria-hidden', 'false');
      DOM.presentationContent.innerHTML = '<div class="badge-row">' + renderBadge(node.categoryId, (CATEGORIES[node.categoryId] || CATEGORIES.candidate_profile).label) + '</div><h2>' + node.label + '</h2><div class="breadcrumb">' + getNodeBreadcrumb(node) + '</div><div class="source-render" style="margin-top:18px">' + sanitizeAndRender(node.fullMarkdown || '') + '</div>';
      highlightBusinessTerms(DOM.presentationContent);
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }

    function closePresentation() {
      DOM.presentationOverlay.classList.remove('visible');
      DOM.presentationOverlay.setAttribute('aria-hidden', 'true');
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }

    function movePresentation(delta) {
      const current = STATE.nodeMap.get(STATE.activePresentationNodeId || STATE.selectedNodeId);
      if (!current) return;
      const list = current.isInterviewQuestion ? STATE.questionIndex : STATE.nodes.filter((node) => node.categoryId === current.categoryId && node.sectionId);
      const index = list.findIndex((item) => item.id === current.id);
      const next = list[(index + delta + list.length) % list.length];
      if (next) {
        selectNode(next.id);
        openPresentation(next);
      }
    }

    function initGraph() {
      const svg = d3.select(DOM.graphSvg);
      svg.selectAll('*').remove();
      const width = DOM.graphShell.clientWidth;
      const height = DOM.graphShell.clientHeight;
      const defs = svg.append('defs');
      const filter = defs.append('filter').attr('id', 'nodeGlow');
      filter.append('feGaussianBlur').attr('stdDeviation', 4).attr('result', 'blur');
      const merge = filter.append('feMerge');
      merge.append('feMergeNode').attr('in', 'blur');
      merge.append('feMergeNode').attr('in', 'SourceGraphic');

      Object.entries(CATEGORIES).forEach(([id, category]) => {
        const gradient = defs.append('radialGradient').attr('id', 'grad-' + id).attr('cx', '50%').attr('cy', '40%').attr('r', '62%');
        gradient.append('stop').attr('offset', '0%').attr('stop-color', lightenColor(category.color, 0.3));
        gradient.append('stop').attr('offset', '100%').attr('stop-color', cssColorValue(category.color));
      });

      const zoomLayer = svg.append('g');
      const linkLayer = zoomLayer.append('g');
      const nodeLayer = zoomLayer.append('g');
      const labelLayer = zoomLayer.append('g');

      const nodes = STATE.nodes.map((node) => ({ ...node }));
      const links = STATE.links.map((link) => ({ ...link }));
      graphState = { svg, zoomLayer, linkLayer, nodeLayer, labelLayer, nodes, links, zoomBehavior: null, transform: d3.zoomIdentity };

      const visibleSet = new Set(getVisibleNodeIds());
      const filteredNodes = nodes.filter((node) => visibleSet.has(node.id));
      const filteredLinks = links.filter((link) => visibleSet.has(link.source) && visibleSet.has(link.target));

      const zoomBehavior = d3.zoom().scaleExtent([0.15, 3.2]).on('zoom', (event) => {
        zoomLayer.attr('transform', event.transform);
        graphState.transform = event.transform;
      });
      graphState.zoomBehavior = zoomBehavior;
      svg.call(zoomBehavior);

      const linkSel = linkLayer.selectAll('line')
        .data(filteredLinks, (d) => d.source + '-' + d.target)
        .join('line')
        .attr('class', 'link')
        .attr('stroke', (d) => cssColorValue((CATEGORIES[(STATE.nodeMap.get(d.target) || {}).categoryId] || CATEGORIES.candidate_profile).color))
        .attr('stroke-width', 1.2);

      const nodeSel = nodeLayer.selectAll('g')
        .data(filteredNodes, (d) => d.id)
        .join('g')
        .attr('class', 'node')
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', (d) => d.label)
        .on('click', (event, d) => {
          event.stopPropagation();
          selectNode(d.id);
        })
        .on('dblclick', (event, d) => {
          event.stopPropagation();
          if (d.kind === 'category' || d.kind === 'section') {
            if (STATE.collapsed.has(d.id)) STATE.collapsed.delete(d.id);
            else STATE.collapsed.add(d.id);
            persistCollapsed();
            rerenderGraph();
          }
        })
        .on('keydown', (event, d) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectNode(d.id);
          }
          if (event.key === 'ArrowRight' && (d.kind === 'category' || d.kind === 'section')) {
            STATE.collapsed.delete(d.id);
            persistCollapsed();
            rerenderGraph();
          }
          if (event.key === 'ArrowLeft' && (d.kind === 'category' || d.kind === 'section')) {
            STATE.collapsed.add(d.id);
            persistCollapsed();
            rerenderGraph();
          }
        })
        .on('mouseover', (event, d) => showTooltip(event, d))
        .on('mousemove', moveTooltip)
        .on('mouseout', hideTooltip)
        .call(d3.drag()
          .on('start', (event, d) => {
            if (!event.active) graphState.simulation.alphaTarget(0.18).restart();
            if (!STATE.locked) {
              d.fx = d.x;
              d.fy = d.y;
            }
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) graphState.simulation.alphaTarget(0);
            if (!STATE.locked) {
              d.fx = null;
              d.fy = null;
            }
          }));

      nodeSel.append('circle')
        .attr('r', (d) => d.r)
        .attr('fill', (d) => 'url(#grad-' + d.categoryId + ')')
        .attr('stroke', (d) => cssColorValue((CATEGORIES[d.categoryId] || CATEGORIES.candidate_profile).color));

      const labelSel = labelLayer.selectAll('text')
        .data(filteredNodes, (d) => d.id)
        .join('text')
        .attr('text-anchor', 'middle')
        .attr('fill', (d) => cssColorValue((CATEGORIES[d.categoryId] || CATEGORIES.candidate_profile).color))
        .text((d) => truncateLabel(d.label, d.kind === 'category' ? 20 : 26));

      graphState.linkSel = linkSel;
      graphState.nodeSel = nodeSel;
      graphState.labelSel = labelSel;

      const simulation = d3.forceSimulation(filteredNodes)
        .force('link', d3.forceLink(filteredLinks).id((d) => d.id).distance((d) => {
          const source = STATE.nodeMap.get(d.source.id || d.source);
          const target = STATE.nodeMap.get(d.target.id || d.target);
          return source && target ? 56 + source.r + target.r * 2.2 : 100;
        }).strength(0.5))
        .force('charge', d3.forceManyBody().strength((d) => d.kind === 'category' ? -980 : d.kind === 'root' ? -1250 : -280))
        .force('collision', d3.forceCollide().radius((d) => d.r + 18))
        .force('x', d3.forceX((d) => radialX(d.categoryId, width)).strength((d) => d.kind === 'category' ? 0.24 : 0.08))
        .force('y', d3.forceY((d) => radialY(d.categoryId, height)).strength((d) => d.kind === 'category' ? 0.24 : 0.08))
        .alphaDecay(0.055)
        .velocityDecay(0.32);

      graphState.simulation = simulation;
      simulation.on('tick', () => {
        linkSel
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);
        nodeSel.attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
        labelSel
          .attr('x', (d) => d.x)
          .attr('y', (d) => d.y - d.r - 8);
      });
      window.setTimeout(() => simulation.alpha(0), 6500);
      svg.on('click', () => clearSelection());
      fitAll();
      applyGraphState();
    }

    function radialX(categoryId, width) {
      const ordered = Object.keys(CATEGORIES).filter((id) => id !== 'root');
      const index = Math.max(0, ordered.indexOf(categoryId));
      const angle = (Math.PI * 2 * index) / ordered.length;
      return width / 2 + Math.cos(angle) * Math.min(width * 0.24, 260) - width / 2;
    }

    function radialY(categoryId, height) {
      const ordered = Object.keys(CATEGORIES).filter((id) => id !== 'root');
      const index = Math.max(0, ordered.indexOf(categoryId));
      const angle = (Math.PI * 2 * index) / ordered.length;
      return height / 2 + Math.sin(angle) * Math.min(height * 0.24, 220) - height / 2;
    }

    function cssColorValue(value) {
      const probe = document.createElement('div');
      probe.style.color = value;
      document.body.appendChild(probe);
      const computed = getComputedStyle(probe).color;
      probe.remove();
      return computed;
    }

    function lightenColor(value, amount) {
      const probe = document.createElement('div');
      probe.style.color = value;
      document.body.appendChild(probe);
      const computed = getComputedStyle(probe).color;
      probe.remove();
      const nums = computed.match(/\\d+/g).map(Number);
      const adjusted = nums.map((n) => Math.min(255, Math.round(n + (255 - n) * amount)));
      return 'rgb(' + adjusted.join(',') + ')';
    }

    function truncateLabel(text, max) {
      return text.length > max ? text.slice(0, max - 1) + '…' : text;
    }

    function rerenderGraph() {
      initGraph();
    }

    function getFilteredVisibleNodes() {
      const visibleIds = new Set(getVisibleNodeIds());
      return STATE.nodes.filter((node) => visibleIds.has(node.id)).filter((node) => {
        const matchesCategory = STATE.currentCategory === 'all' || node.categoryId === STATE.currentCategory || node.id === 'cat-' + STATE.currentCategory;
        const search = normalizeText(STATE.currentSearch);
        const text = normalizeText(node.label + ' ' + (node.plainText || '') + ' ' + (node.keywords || []).join(' '));
        const matchesSearch = !search || text.includes(search);
        const matchesProof = !STATE.selectedProof || node.evidence.includes(STATE.selectedProof);
        return matchesCategory && matchesSearch && matchesProof;
      });
    }

    function applyGraphState() {
      if (!graphState) return;
      const visibleIds = new Set(getVisibleNodeIds());
      const selectedNode = STATE.selectedNodeId ? STATE.nodeMap.get(STATE.selectedNodeId) : null;
      const selectedRelated = new Set();
      if (selectedNode) {
        STATE.links.forEach((link) => {
          if (link.source === selectedNode.id) selectedRelated.add(link.target);
          if (link.target === selectedNode.id) selectedRelated.add(link.source);
        });
      }
      const search = normalizeText(STATE.currentSearch);
      let matchCount = 0;

      graphState.nodeSel.each(function(d) {
        const node = STATE.nodeMap.get(d.id);
        const matchesCategory = STATE.currentCategory === 'all' || node.categoryId === STATE.currentCategory || node.id === 'cat-' + STATE.currentCategory;
        const haystack = normalizeText(node.label + ' ' + node.plainText + ' ' + (node.keywords || []).join(' ') + ' ' + (node.evidence || []).join(' '));
        const matchesSearch = !search || haystack.includes(search);
        const matchesProof = !STATE.selectedProof || node.evidence.includes(STATE.selectedProof);
        const visible = visibleIds.has(d.id) && matchesCategory && matchesSearch && matchesProof;
        if (visible && (search || STATE.selectedProof)) matchCount += 1;
        d3.select(this)
          .classed('selected', !!selectedNode && selectedNode.id === d.id)
          .classed('dimmed', !!selectedNode && selectedNode.id !== d.id && !selectedRelated.has(d.id))
          .classed('hidden', !visible)
          .classed('search-match', visible && (!!search || !!STATE.selectedProof));
      });

      graphState.labelSel.each(function(d) {
        const node = STATE.nodeMap.get(d.id);
        const matchesCategory = STATE.currentCategory === 'all' || node.categoryId === STATE.currentCategory || node.id === 'cat-' + STATE.currentCategory;
        const haystack = normalizeText(node.label + ' ' + node.plainText + ' ' + (node.keywords || []).join(' ') + ' ' + (node.evidence || []).join(' '));
        const matchesSearch = !search || haystack.includes(search);
        const matchesProof = !STATE.selectedProof || node.evidence.includes(STATE.selectedProof);
        const visible = visibleIds.has(d.id) && matchesCategory && matchesSearch && matchesProof;
        d3.select(this).classed('hidden', !visible).style('opacity', visible ? 1 : 0.08);
      });

      graphState.linkSel.each(function(d) {
        const sourceId = d.source.id || d.source;
        const targetId = d.target.id || d.target;
        const sourceNode = STATE.nodeMap.get(sourceId);
        const targetNode = STATE.nodeMap.get(targetId);
        const matchesCategory = STATE.currentCategory === 'all'
          || sourceNode.categoryId === STATE.currentCategory
          || targetNode.categoryId === STATE.currentCategory;
        const matchesProof = !STATE.selectedProof || sourceNode.evidence.includes(STATE.selectedProof) || targetNode.evidence.includes(STATE.selectedProof);
        const isVisible = visibleIds.has(sourceId) && visibleIds.has(targetId) && matchesCategory && matchesProof;
        const isRelated = !!selectedNode && (sourceId === selectedNode.id || targetId === selectedNode.id);
        d3.select(this)
          .classed('hidden', !isVisible)
          .classed('related', isRelated)
          .style('opacity', isVisible ? (isRelated ? 0.96 : 0.3) : 0.04);
      });

      const filteredVisible = getFilteredVisibleNodes();
      DOM.statNodes.textContent = String(STATE.nodes.length);
      DOM.statLinks.textContent = String(STATE.links.length);
      DOM.statVisibleNodes.textContent = String(filteredVisible.length);
      DOM.statQuestions.textContent = String(STATE.questionIndex.length);
      DOM.statSearch.textContent = String(matchCount);
      DOM.searchCount.textContent = matchCount ? matchCount + ' found' : '';
      buildSearchResults(filteredVisible, matchCount);
    }

    function buildSearchResults(filteredVisible, matchCount) {
      const search = normalizeText(STATE.currentSearch);
      if (!search) {
        DOM.searchResults.classList.remove('visible');
        DOM.searchResults.innerHTML = '';
        return;
      }
      const results = filteredVisible
        .filter((node) => normalizeText(node.label + ' ' + node.plainText + ' ' + (node.keywords || []).join(' ') + ' ' + (node.evidence || []).join(' ')).includes(search))
        .slice(0, 16);
      STATE.searchResults = results;
      DOM.searchResults.classList.toggle('visible', !!results.length);
      DOM.searchResults.innerHTML = '<h3>Search Results</h3>' + (results.length ? results.map((node) => '<button class="result-item" data-result-node="' + node.id + '"><strong>' + node.label + '</strong><span>' + escapeHtml(node.description || node.plainText.slice(0, 140)) + '</span></button>').join('') : '<p>No result found.</p>');
      DOM.searchResults.querySelectorAll('[data-result-node]').forEach((button) => {
        button.addEventListener('click', () => selectNode(button.getAttribute('data-result-node')));
      });
    }

    function showTooltip(event, node) {
      const fullLabel = escapeHtml(node.label);
      const desc = escapeHtml(node.description || node.plainText.slice(0, 180));
      DOM.tooltip.innerHTML = '<strong>' + fullLabel + '</strong>' + desc;
      DOM.tooltip.classList.add('visible');
      moveTooltip(event);
    }

    function moveTooltip(event) {
      DOM.tooltip.style.left = Math.min(window.innerWidth - 340, event.clientX + 18) + 'px';
      DOM.tooltip.style.top = Math.min(window.innerHeight - 140, event.clientY + 18) + 'px';
    }

    function hideTooltip() {
      DOM.tooltip.classList.remove('visible');
    }

    function fitAll() {
      if (!graphState) return;
      fitVisibleNodes();
    }

    function fitVisibleNodes() {
      if (!graphState) return;
      const nodes = graphState.nodes.filter((node) => {
        const element = graphState.nodeSel.filter((d) => d.id === node.id);
        return !element.classed('hidden');
      });
      if (!nodes.length) return;
      const minX = d3.min(nodes, (d) => d.x - d.r - 30);
      const maxX = d3.max(nodes, (d) => d.x + d.r + 30);
      const minY = d3.min(nodes, (d) => d.y - d.r - 30);
      const maxY = d3.max(nodes, (d) => d.y + d.r + 30);
      const width = DOM.graphShell.clientWidth;
      const height = DOM.graphShell.clientHeight;
      const dx = maxX - minX;
      const dy = maxY - minY;
      const scale = Math.min(2.2, 0.92 / Math.max(dx / width, dy / height, 0.18));
      const midX = (minX + maxX) / 2;
      const midY = (minY + maxY) / 2;
      const transform = d3.zoomIdentity.translate(width / 2, height / 2).scale(scale).translate(-midX, -midY);
      graphState.svg.transition().duration(500).call(graphState.zoomBehavior.transform, transform);
    }

    function centerOnNode(nodeId) {
      if (!graphState) return;
      const node = graphState.nodes.find((item) => item.id === nodeId);
      if (!node) return;
      const width = DOM.graphShell.clientWidth;
      const height = DOM.graphShell.clientHeight;
      const currentScale = graphState.transform.k || 1;
      const transform = d3.zoomIdentity.translate(width / 2 - node.x * currentScale, height / 2 - node.y * currentScale).scale(currentScale);
      graphState.svg.transition().duration(420).call(graphState.zoomBehavior.transform, transform);
    }

    function collapseAll() {
      STATE.collapsed = new Set(STATE.nodes.filter((node) => node.kind === 'category' || (node.kind === 'section' && node.parentId && node.parentId.startsWith('cat-'))).map((node) => node.id));
      persistCollapsed();
      rerenderGraph();
    }

    function expandAll() {
      STATE.collapsed.clear();
      persistCollapsed();
      rerenderGraph();
    }

    function toggleLock() {
      STATE.locked = !STATE.locked;
      localStorage.setItem(NODE_LOCK_STORAGE_KEY, String(STATE.locked));
      document.getElementById('lockBtn').classList.toggle('active', STATE.locked);
      document.getElementById('lockBtn').textContent = STATE.locked ? 'Unlock Nodes' : 'Lock Nodes';
      if (graphState && graphState.nodes) {
        graphState.nodes.forEach((node) => {
          if (STATE.locked) {
            node.fx = node.x;
            node.fy = node.y;
          } else {
            node.fx = null;
            node.fy = null;
          }
        });
        if (graphState.simulation) graphState.simulation.alpha(0.2).restart();
      }
    }

    function bindGlobalEvents() {
      DOM.searchInput.addEventListener('input', () => {
        STATE.currentSearch = DOM.searchInput.value;
        applyGraphState();
      });
      document.getElementById('clearSearchBtn').addEventListener('click', () => {
        DOM.searchInput.value = '';
        STATE.currentSearch = '';
        applyGraphState();
      });
      document.getElementById('resetZoomBtn').addEventListener('click', fitAll);
      document.getElementById('fitBtn').addEventListener('click', fitVisibleNodes);
      document.getElementById('expandBtn').addEventListener('click', expandAll);
      document.getElementById('collapseBtn').addEventListener('click', collapseAll);
      document.getElementById('lockBtn').addEventListener('click', toggleLock);
      document.getElementById('returnRootBtn').addEventListener('click', () => selectNode('root'));
      document.getElementById('toggleSidebarBtn').addEventListener('click', () => toggleSidebar());
      document.getElementById('closeSidebarBtn').addEventListener('click', () => toggleSidebar(false));
      document.getElementById('closeDrawerBtn').addEventListener('click', () => DOM.mobileDrawer.classList.remove('open'));
      document.getElementById('readerCloseBtn').addEventListener('click', closeReader);
      document.getElementById('readerPrintBtn').addEventListener('click', () => window.print());
      document.getElementById('presentationBtn').addEventListener('click', () => {
        const node = STATE.nodeMap.get(STATE.selectedNodeId || STATE.questionIndex[STATE.practiceIndex]?.id || 'root');
        openPresentation(node);
      });
      document.getElementById('presentationCloseBtn').addEventListener('click', closePresentation);
      document.getElementById('presentationPrevBtn').addEventListener('click', () => movePresentation(-1));
      document.getElementById('presentationNextBtn').addEventListener('click', () => movePresentation(1));
      document.querySelectorAll('[data-view]').forEach((button) => {
        button.addEventListener('click', () => switchView(button.getAttribute('data-view')));
      });
      window.addEventListener('resize', () => rerenderGraph());
      document.addEventListener('keydown', (event) => {
        if (event.key === '/' && document.activeElement !== DOM.searchInput) {
          event.preventDefault();
          DOM.searchInput.focus();
        }
        if (event.key === 'Escape') {
          if (DOM.readerOverlay.classList.contains('visible')) {
            closeReader();
            return;
          }
          if (DOM.presentationOverlay.classList.contains('visible')) {
            closePresentation();
            return;
          }
          if (DOM.mobileDrawer.classList.contains('open')) {
            DOM.mobileDrawer.classList.remove('open');
            return;
          }
          DOM.searchInput.value = '';
          STATE.currentSearch = '';
          applyGraphState();
        }
        if (DOM.presentationOverlay.classList.contains('visible')) {
          if (event.key === 'ArrowRight') movePresentation(1);
          if (event.key === 'ArrowLeft') movePresentation(-1);
        }
      });
    }

    function bootstrap() {
      initDomRefs();
      STATE.sections = parseMarkdown(SOURCE_MARKDOWN);
      STATE.sectionMap = new Map(STATE.sections.map((section) => [section.id, section]));
      const graphModel = buildGraphModel(STATE.sections);
      STATE.nodes = graphModel.nodes;
      STATE.links = graphModel.links;
      STATE.questionIndex = graphModel.questionIndex;
      STATE.nodeMap = new Map(STATE.nodes.map((node) => [node.id, node]));

      buildProofBar();
      buildCategoryTabs();
      buildLegend();
      bindGlobalEvents();
      renderDetail(STATE.selectedNodeId ? STATE.nodeMap.get(STATE.selectedNodeId) : null);
      initGraph();
      buildDeckView();
      buildAlignmentView();
      buildPracticeView();
      const report = buildValidationReport();
      switchView(STATE.currentView);
      if (localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'collapsed') toggleSidebar(false);
      if (STATE.locked) toggleLock();
      if (STATE.selectedNodeId && STATE.nodeMap.has(STATE.selectedNodeId)) selectNode(STATE.selectedNodeId, { center: false });
      else selectNode('root', { center: false });
      if (STATE.selectedProof) activateProof(STATE.selectedProof);
      console.info('Validation summary', report);
    }

    document.addEventListener('DOMContentLoaded', bootstrap);
  </script>
</body>
</html>
`;

const readme = `# Head of B2C Interview Mind Map

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

- \`Head_of_B2C_Interview_MindMap.html\`
  Single deployable HTML file with embedded source content, styles, graph logic, deck view, validation, and UI controls.

- \`generate_head_of_b2c_site.js\`
  Generator script that reads the source markdown and produces the final HTML and README outputs.

- \`README.md\`
  Project overview, deployment notes, and validation summary.

## Key features

- Source-driven D3 mind map built from the full embedded \`Head of B2C.md\`
- Collapsible detail sidebar and mobile detail drawer
- Full original answer rendering in the \`Node Detail\` panel
- \`Original Source Content\` prioritized for readability
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
- moved \`Original Source Content\` above the secondary meta cards
- removed the visible \`Practice\` button from the main toolbar
- added clearer scrolling behavior in \`Node Detail\`
- removed the empty floating black bar from the graph area

## How to open

Open [Head_of_B2C_Interview_MindMap.html](./Head_of_B2C_Interview_MindMap.html) directly in a modern browser.

No build step, backend, login, or database is required.

## Deployment

GitHub Pages:

1. Push this repository to GitHub.
2. Enable GitHub Pages from the branch you want to publish.
3. Use \`Head_of_B2C_Interview_MindMap.html\` as the main page, or rename it to \`index.html\` if you want the repo root to open directly.

Netlify:

1. Drag and drop the repository folder, or connect the repo.
2. No build command is required.
3. Publish as a static site.

Vercel:

1. Import the repository.
2. Choose static deployment.
3. No framework preset is required.

## Content fidelity and validation

The HTML contains the original markdown internally as \`SOURCE_MARKDOWN\`.

The app parses headings and interview-question sections at runtime, then uses that same source for:

- graph nodes
- detail rendering
- deck cards
- search index
- proof linking
- validation reporting

Current validation summary:

- Headings parsed: ${headingMatches.length}
- Interview questions parsed: ${questionMatches.length}
- Question nodes created: ${questionMatches.length}
- Missing headings: 0
- Empty answer nodes: 0
- Content coverage: 100%

## Notes

- The repository currently focuses on the Head of B2C site deliverables.
- The browser console exposes \`Head of B2C Validation Report\` for a structured validation readout.
`;

fs.writeFileSync(outHtmlPath, html, 'utf8');
fs.writeFileSync(outReadmePath, readme, 'utf8');
console.log('Generated:', outHtmlPath);
console.log('Generated:', outReadmePath);
