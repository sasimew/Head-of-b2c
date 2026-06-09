# Whale Bin Dai Asset Map

This document is the handoff-ready asset manifest for design, PM, and frontend teams.

Prototype reference:
- HTML prototype: [whale-bin-dai-portal_3_fixed.html](/Users/sasi/Documents/whale%20bin%20dai/whale-bin-dai-portal_3_fixed.html)
- Brand reference image: [Whale Bin Dai.png](/Users/sasi/Downloads/Whale%20Bin%20Dai.png)

Design direction:
- Bright fantasy sky
- Floating islands
- Whale mascot branding
- Blue-white palette
- Rounded cards
- Soft shadows
- Glassmorphism panels
- Ocean footer

Recommended folder structure:

```text
/assets/global/
/assets/home/
/assets/games/
/assets/topup/
/assets/member/
/assets/forum/
/assets/contact/
/assets/auth/
```

## Global

| Filename | Page | Section | Exact Placement | Recommended Size | Format | Priority |
|---|---|---|---|---|---|---|
| `wbd-logo-primary-light.svg` | Global | Header / Brand | Top-left desktop header, auth cards, home login/register section | `320x96` | SVG | High |
| `wbd-logo-primary-dark.svg` | Global | Footer / Dark Surfaces | Ocean footer logo on dark background | `320x96` | SVG | High |
| `wbd-logo-icon-whale.png` | Global | App Mark | Compact logo, default avatar, favicon source | `512x512` | PNG transparent | High |
| `wbd-favicon-32.png` | Global | Browser | Favicon | `32x32` | PNG | Medium |
| `wbd-favicon-180.png` | Global | Browser / PWA | Apple touch icon | `180x180` | PNG | Medium |
| `wbd-favicon-512.png` | Global | Browser / PWA | Web app icon | `512x512` | PNG | Medium |
| `wbd-bg-clouds-soft.webp` | Global | Decorative Background | Shared soft cloud texture across auth/contact/home overlays | `1920x1080` | WebP | Medium |
| `wbd-bg-ocean-footer.webp` | Global | Footer | Full-width footer ocean texture | `1920x320` | WebP | High |
| `wbd-deco-bubbles.png` | Global | Decorative Background | Floating bubbles around lower sections/footer | `1200x1200` | PNG transparent | Low |
| `wbd-deco-floating-island-small.png` | Global | Decorative Background | Accent islands in hero, feature cards, game details | `800x600` | PNG transparent | Medium |
| `wbd-icon-discord.svg` | Global | Social | Community + footer social icon | `128x128` | SVG | Medium |
| `wbd-icon-facebook.svg` | Global | Social | Community + footer social icon | `128x128` | SVG | Medium |
| `wbd-icon-youtube.svg` | Global | Social | Community + footer social icon | `128x128` | SVG | Medium |
| `wbd-icon-instagram.svg` | Global | Social | Community + footer social icon | `128x128` | SVG | Medium |
| `wbd-icon-tiktok.svg` | Global | Social | Community + footer social icon | `128x128` | SVG | Medium |
| `wbd-icon-x.svg` | Global | Social | Community + footer social icon | `128x128` | SVG | Medium |
| `wbd-icon-payment-promptpay.svg` | Global | Payment | Top-up payment option | `256x128` | SVG | High |
| `wbd-icon-payment-card.svg` | Global | Payment | Top-up payment option | `256x128` | SVG | High |
| `wbd-icon-payment-truemoney.svg` | Global | Payment | Top-up payment option | `256x128` | SVG | High |
| `wbd-icon-payment-2c2p.svg` | Global | Payment | Top-up payment option | `256x128` | SVG | High |

## Home

| Filename | Page | Section | Exact Placement | Recommended Size | Format | Priority |
|---|---|---|---|---|---|---|
| `home-hero-bg-skyworld-desktop.webp` | Home | Hero | Main hero background desktop | `1920x1080` | WebP | High |
| `home-hero-bg-skyworld-mobile.webp` | Home | Hero | Main hero background mobile | `1080x1440` | WebP | High |
| `home-hero-party-cast.png` | Home | Hero | Right-side main party character group | `1400x1400` | PNG transparent | High |
| `home-hero-whale-mascot.png` | Home | Hero | Left/bottom mascot near CTA | `900x900` | PNG transparent | High |
| `home-flow-register-otp-linkid.png` | Home | Flow Education | Visual beside or under home login/register section showing flow steps | `1200x900` | PNG/WebP | High |
| `home-preregister-chest.png` | Home | Rewards / Promo | Reward chest visual in launch or signup promo | `700x700` | PNG transparent | Medium |
| `home-reward-gems.png` | Home | Rewards | Reward icon for gems | `512x512` | PNG transparent | Medium |
| `home-reward-baby-puff.png` | Home | Rewards | Reward icon for pet | `512x512` | PNG transparent | Medium |
| `home-reward-explorer-chest.png` | Home | Rewards | Reward icon for chest | `512x512` | PNG transparent | Medium |
| `home-feature-events.webp` | Home | Why Players Love Us | Card 01 illustration | `800x600` | WebP | Medium |
| `home-feature-whale.webp` | Home | Why Players Love Us | Card 02 illustration | `800x600` | WebP | Medium |
| `home-feature-floating-island.webp` | Home | Why Players Love Us | Card 03 illustration | `800x600` | WebP | Medium |
| `home-community-character-left.png` | Home | Community Strip | Left-side character cutout | `1000x1500` | PNG transparent | Medium |
| `home-community-character-right.png` | Home | Community Strip | Right-side character cutout | `1000x1500` | PNG transparent | Medium |
| `home-login-register-panel-illustration.png` | Home | Home Auth Section | Illustration next to embedded login/register module | `1000x1000` | PNG transparent | High |
| `home-notes-anchor-deco.svg` | Home | Important Notes | Decorative anchor or sea icon | `256x256` | SVG | Low |

## Games

| Filename | Page | Section | Exact Placement | Recommended Size | Format | Priority |
|---|---|---|---|---|---|---|
| `game-skybound-thumb.webp` | Home / Games | Game Cards | Skybound Quest card thumbnail | `800x600` | WebP | High |
| `game-islandbuilders-thumb.webp` | Home / Games | Game Cards | Island Builders card thumbnail | `800x600` | WebP | High |
| `game-puffexplorer-thumb.webp` | Home / Games | Game Cards | Puff Explorer card thumbnail | `800x600` | WebP | High |
| `game-arenastars-thumb.webp` | Home / Games | Game Cards | Arena Stars card thumbnail | `800x600` | WebP | High |
| `game-skybound-detail-hero.webp` | Games | Game Detail | Skybound detail hero | `1600x900` | WebP | Medium |
| `game-islandbuilders-detail-hero.webp` | Games | Game Detail | Island Builders detail hero | `1600x900` | WebP | Medium |
| `game-puffexplorer-detail-hero.webp` | Games | Game Detail | Puff Explorer detail hero | `1600x900` | WebP | Medium |
| `game-arenastars-detail-hero.webp` | Games | Game Detail | Arena Stars detail hero | `1600x900` | WebP | Medium |
| `game-skybound-world.webp` | Games | Game Detail | World overview block | `1200x800` | WebP | Low |
| `game-skybound-features.webp` | Games | Game Detail | Core features block | `1200x800` | WebP | Low |
| `game-skybound-topup.webp` | Games | Game Detail | Top-up benefits block | `1200x800` | WebP | Low |
| `game-islandbuilders-world.webp` | Games | Game Detail | World overview block | `1200x800` | WebP | Low |
| `game-islandbuilders-features.webp` | Games | Game Detail | Core features block | `1200x800` | WebP | Low |
| `game-islandbuilders-topup.webp` | Games | Game Detail | Top-up benefits block | `1200x800` | WebP | Low |
| `game-puffexplorer-world.webp` | Games | Game Detail | World overview block | `1200x800` | WebP | Low |
| `game-puffexplorer-features.webp` | Games | Game Detail | Core features block | `1200x800` | WebP | Low |
| `game-puffexplorer-topup.webp` | Games | Game Detail | Top-up benefits block | `1200x800` | WebP | Low |
| `game-arenastars-world.webp` | Games | Game Detail | World overview block | `1200x800` | WebP | Low |
| `game-arenastars-features.webp` | Games | Game Detail | Core features block | `1200x800` | WebP | Low |
| `game-arenastars-topup.webp` | Games | Game Detail | Top-up benefits block | `1200x800` | WebP | Low |

## Auth

| Filename | Page | Section | Exact Placement | Recommended Size | Format | Priority |
|---|---|---|---|---|---|---|
| `auth-register-whale.png` | Register | Header / Side Art | Register page mascot or illustration | `800x800` | PNG transparent | Medium |
| `auth-login-whale.png` | Login | Header / Side Art | Login page mascot or illustration | `800x800` | PNG transparent | Medium |
| `auth-forgotpassword-whale.png` | Forgot Password | Header / Side Art | Forgot password visual | `800x800` | PNG transparent | Medium |
| `auth-otp-phone.svg` | Register / Login / Forgot Password | OTP Helper | OTP steps, helper state, trust indication | `256x256` | SVG | Low |
| `auth-success-check.png` | Auth Shared | Success State | Account created / password reset success | `512x512` | PNG transparent | Low |

## Member Center

| Filename | Page | Section | Exact Placement | Recommended Size | Format | Priority |
|---|---|---|---|---|---|---|
| `member-dashboard-welcome.png` | Member Center | Overview | Welcome or quick-start state illustration | `800x800` | PNG transparent | Medium |
| `member-avatar-default.png` | Member Center | Profile | Default avatar image | `512x512` | PNG transparent | Low |
| `member-empty-gameid.png` | Member Center | Game ID Management | Empty state when no linked Game IDs | `800x800` | PNG transparent | Medium |
| `member-empty-history.png` | Member Center | Top-up History | Empty state when no history | `800x800` | PNG transparent | Medium |
| `member-security-lock.png` | Member Center | Security | Security/password section visual | `700x700` | PNG transparent | Low |
| `member-redeem-gift.png` | Member Center | Redeem Code | Redeem reward illustration | `700x700` | PNG transparent | Low |

## Top Up

| Filename | Page | Section | Exact Placement | Recommended Size | Format | Priority |
|---|---|---|---|---|---|---|
| `topup-hero-soft-bg.webp` | Top Up | Header Atmosphere | Background texture for top-up page header | `1600x900` | WebP | Medium |
| `topup-empty-login.png` | Top Up | Gate State | Guest state encouraging login/register | `800x800` | PNG transparent | Medium |
| `topup-empty-linkid.png` | Top Up | Gate State | No Game ID linked yet | `800x800` | PNG transparent | High |
| `topup-empty-verifyid.png` | Top Up | Gate State | Linked but not verified | `800x800` | PNG transparent | High |
| `topup-package-starter.png` | Top Up | Packages | Starter package icon or art | `512x512` | PNG transparent | Medium |
| `topup-package-explorer.png` | Top Up | Packages | Explorer package icon or art | `512x512` | PNG transparent | Medium |
| `topup-package-adventurer.png` | Top Up | Packages | Adventurer package icon or art | `512x512` | PNG transparent | Medium |
| `topup-package-hero.png` | Top Up | Packages | Hero package icon or art | `512x512` | PNG transparent | Medium |
| `topup-package-legend.png` | Top Up | Packages | Legend package icon or art | `512x512` | PNG transparent | Medium |
| `topup-package-mega.png` | Top Up | Packages | Mega package icon or art | `512x512` | PNG transparent | Medium |
| `topup-payment-success.png` | Top Up | Payment Result | Success state visual | `800x800` | PNG transparent | Medium |
| `topup-payment-failed.png` | Top Up | Payment Result | Failed state visual | `800x800` | PNG transparent | Medium |
| `topup-payment-pending.png` | Top Up | Payment Result | Pending state visual | `800x800` | PNG transparent | Medium |

## Forum

| Filename | Page | Section | Exact Placement | Recommended Size | Format | Priority |
|---|---|---|---|---|---|---|
| `forum-hero-community.webp` | Community Forum | Header | Top forum banner | `1600x600` | WebP | Medium |
| `forum-empty-category.png` | Community Forum | Empty State | No topic in selected category | `800x800` | PNG transparent | Low |
| `forum-empty-login-reply.png` | Community Forum | Reply Gate | Prompt to login before replying | `800x800` | PNG transparent | Low |
| `forum-category-announcement.svg` | Community Forum | Category Nav | Announcement icon | `128x128` | SVG | Low |
| `forum-category-guide.svg` | Community Forum | Category Nav | Guide icon | `128x128` | SVG | Low |
| `forum-category-event.svg` | Community Forum | Category Nav | Event icon | `128x128` | SVG | Low |
| `forum-category-bug.svg` | Community Forum | Category Nav | Bug icon | `128x128` | SVG | Low |
| `forum-category-general.svg` | Community Forum | Category Nav | General icon | `128x128` | SVG | Low |
| `forum-category-guild.svg` | Community Forum | Category Nav | Guild icon | `128x128` | SVG | Low |
| `forum-category-fanart.svg` | Community Forum | Category Nav | Fan art icon | `128x128` | SVG | Low |
| `forum-category-support.svg` | Community Forum | Category Nav | Support icon | `128x128` | SVG | Low |
| `forum-topic-cover-default.webp` | Community Forum | Topic Cards / Future | Default topic cover if needed later | `1200x675` | WebP | Low |

## Contact Us

| Filename | Page | Section | Exact Placement | Recommended Size | Format | Priority |
|---|---|---|---|---|---|---|
| `contact-hero-support.webp` | Contact Us | Hero | Contact page hero background | `1600x700` | WebP | High |
| `contact-illustration-support.png` | Contact Us | Support Card | Customer support card art | `1000x1000` | PNG transparent | Medium |
| `contact-illustration-payment.png` | Contact Us | Support Card | Payment help card art | `1000x1000` | PNG transparent | Medium |
| `contact-illustration-partnership.png` | Contact Us | Support Card | Partnership or business inquiry card art | `1000x1000` | PNG transparent | Medium |
| `contact-illustration-press.png` | Contact Us | Support Card | Press or media card art | `1000x1000` | PNG transparent | Medium |
| `contact-ticket-success.png` | Contact Us | Ticket Result | Ticket submitted success state | `800x800` | PNG transparent | Medium |
| `contact-ticket-notfound.png` | Contact Us | Ticket Result | Ticket lookup not found state | `800x800` | PNG transparent | Medium |
| `contact-faq-bg-soft.webp` | Contact Us | FAQ / Background | Soft visual support for FAQ area | `1400x800` | WebP | Low |

## Marketing / Share

| Filename | Page | Section | Exact Placement | Recommended Size | Format | Priority |
|---|---|---|---|---|---|---|
| `home-og-share-1200x630.webp` | Global Marketing | Social Share | Open Graph share image for the site | `1200x630` | WebP/JPG | Medium |
| `home-x-share-1600x900.webp` | Global Marketing | Social Share | X share image | `1600x900` | WebP/JPG | Low |

## Implementation Notes

- Prefer `SVG` for logo, icons, payment marks, trust badges, and social icons.
- Prefer `WebP` for background art, game thumbnails, and large scene illustrations.
- Prefer `PNG transparent` for mascot cutouts, character renders, reward objects, and empty states.
- Keep naming stable so frontend can bind assets without later refactors.
- The prototype currently contains inline asset comments in the HTML, CSS, and JS to show hook points.

## Priority Order For Design Team

1. Global brand assets
2. Home hero + home auth visuals
3. Game thumbnails
4. Top-up gate and package visuals
5. Contact hero + ticket visuals
6. Member center empty states
7. Forum and detail-page enrichment assets
