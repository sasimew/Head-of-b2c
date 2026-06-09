# Transparent PNG Regeneration Plan

## Summary

- Asset files created in `/Users/sasi/Documents/whale bin dai/assets`: `75`
- Extra non-asset system file found: `/Users/sasi/Documents/whale bin dai/assets/.DS_Store`
- Transparent workflow status: validated with one real alpha PNG pilot
- Newly created global assets:
  - `/Users/sasi/Documents/whale bin dai/assets/global/wbd-logo-icon-whale.png`
  - `/Users/sasi/Documents/whale bin dai/assets/global/wbd-deco-floating-island-small.png`
  - `/Users/sasi/Documents/whale bin dai/assets/global/wbd-deco-bubbles.png`
- Important: current generated PNG files are still standard RGB PNGs and do **not** contain real alpha transparency yet.

## Approved Workflow Going Forward

Use this workflow for all files that must become real transparent PNG:

1. Generate or select the source art.
2. Remove only the edge-connected light background.
3. Verify alpha channel exists.
4. Save as RGBA PNG.
5. Replace the original asset only after visual QA passes.

Working helper script:

- `/Users/sasi/Documents/whale bin dai/remove_light_background.py`

## Pilot Result

Pilot file created and verified:

- Source: `/Users/sasi/Documents/whale bin dai/assets/home/home-hero-whale-mascot.png`
- Transparent pilot: `/Users/sasi/Documents/whale bin dai/assets/home/home-hero-whale-mascot.transparent.png`

Verification result:

- format: `png`
- channels: `4`
- hasAlpha: `true`
- transparent pixels: `1044759`
- partial alpha pixels: `42886`
- opaque pixels: `485219`

## Real File Count By Folder

| Folder | File Count |
|---|---:|
| `global` | 3 |
| `home` | 17 |
| `games` | 20 |
| `topup` | 13 |
| `member` | 6 |
| `forum` | 4 |
| `contact` | 8 |
| `auth` | 4 |
| **Total asset files** | **75** |

## Final Manifest Status

### Created And Acceptable As Opaque PNG Or Scene Art

These are full-scene backgrounds, hero images, share images, card illustrations, or page visuals that do not require true transparent alpha.

- `/Users/sasi/Documents/whale bin dai/assets/home/home-feature-events.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-feature-floating-island.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-feature-whale.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-flow-register-otp-linkid.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-hero-bg-skyworld-desktop.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-hero-bg-skyworld-mobile.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-hero-party-cast.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-login-register-panel-illustration.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-og-share-1200x630.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-x-share-1600x900.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-skybound-thumb.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-islandbuilders-thumb.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-puffexplorer-thumb.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-arenastars-thumb.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-skybound-detail-hero.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-islandbuilders-detail-hero.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-puffexplorer-detail-hero.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-arenastars-detail-hero.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-skybound-world.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-skybound-features.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-skybound-topup.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-islandbuilders-world.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-islandbuilders-features.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-islandbuilders-topup.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-puffexplorer-world.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-puffexplorer-features.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-puffexplorer-topup.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-arenastars-world.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-arenastars-features.png`
- `/Users/sasi/Documents/whale bin dai/assets/games/game-arenastars-topup.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-empty-linkid.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-empty-login.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-empty-verifyid.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-hero-soft-bg.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-payment-failed.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-payment-pending.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-payment-success.png`
- `/Users/sasi/Documents/whale bin dai/assets/member/member-dashboard-welcome.png`
- `/Users/sasi/Documents/whale bin dai/assets/member/member-empty-gameid.png`
- `/Users/sasi/Documents/whale bin dai/assets/member/member-empty-history.png`
- `/Users/sasi/Documents/whale bin dai/assets/forum/forum-empty-category.png`
- `/Users/sasi/Documents/whale bin dai/assets/forum/forum-empty-login-reply.png`
- `/Users/sasi/Documents/whale bin dai/assets/forum/forum-hero-community.png`
- `/Users/sasi/Documents/whale bin dai/assets/forum/forum-topic-cover-default.png`
- `/Users/sasi/Documents/whale bin dai/assets/contact/contact-faq-bg-soft.png`
- `/Users/sasi/Documents/whale bin dai/assets/contact/contact-hero-support.png`
- `/Users/sasi/Documents/whale bin dai/assets/contact/contact-illustration-partnership.png`
- `/Users/sasi/Documents/whale bin dai/assets/contact/contact-illustration-payment.png`
- `/Users/sasi/Documents/whale bin dai/assets/contact/contact-illustration-press.png`
- `/Users/sasi/Documents/whale bin dai/assets/contact/contact-illustration-support.png`
- `/Users/sasi/Documents/whale bin dai/assets/contact/contact-ticket-notfound.png`
- `/Users/sasi/Documents/whale bin dai/assets/contact/contact-ticket-success.png`
- `/Users/sasi/Documents/whale bin dai/assets/auth/auth-forgotpassword-whale.png`
- `/Users/sasi/Documents/whale bin dai/assets/auth/auth-login-whale.png`
- `/Users/sasi/Documents/whale bin dai/assets/auth/auth-register-whale.png`

### Must Regenerate As Real Transparent PNG

These are cutouts, objects, mascot assets, decorative overlays, or icons that should contain true alpha transparency.

- `/Users/sasi/Documents/whale bin dai/assets/global/wbd-logo-icon-whale.png`
- `/Users/sasi/Documents/whale bin dai/assets/global/wbd-deco-floating-island-small.png`
- `/Users/sasi/Documents/whale bin dai/assets/global/wbd-deco-bubbles.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-hero-whale-mascot.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-community-character-left.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-community-character-right.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-preregister-chest.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-reward-gems.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-reward-baby-puff.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-reward-explorer-chest.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-starter.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-explorer.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-adventurer.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-hero.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-legend.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-mega.png`
- `/Users/sasi/Documents/whale bin dai/assets/member/member-avatar-default.png`
- `/Users/sasi/Documents/whale bin dai/assets/member/member-security-lock.png`
- `/Users/sasi/Documents/whale bin dai/assets/member/member-redeem-gift.png`
- `/Users/sasi/Documents/whale bin dai/assets/auth/auth-success-check.png`

### Created But Should Be Reviewed For Visual Quality

These may be structurally usable, but should be checked for style consistency against the locked whale master reference.

- `/Users/sasi/Documents/whale bin dai/assets/global/wbd-logo-icon-whale.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-hero-whale-mascot.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-community-character-left.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-community-character-right.png`
- `/Users/sasi/Documents/whale bin dai/assets/auth/auth-login-whale.png`
- `/Users/sasi/Documents/whale bin dai/assets/auth/auth-register-whale.png`
- `/Users/sasi/Documents/whale bin dai/assets/auth/auth-forgotpassword-whale.png`

## Transparent-Fix Priority List

### Priority 1: Regenerate First

These assets affect the most visible UI layers and are most likely to look obviously wrong if transparency is missing.

- `/Users/sasi/Documents/whale bin dai/assets/global/wbd-logo-icon-whale.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-hero-whale-mascot.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-community-character-left.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-community-character-right.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-preregister-chest.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-reward-gems.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-reward-baby-puff.png`
- `/Users/sasi/Documents/whale bin dai/assets/home/home-reward-explorer-chest.png`

### Priority 2: Regenerate Next

These are product object cards and monetization visuals that should sit cleanly on cards and panels.

- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-starter.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-explorer.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-adventurer.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-hero.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-legend.png`
- `/Users/sasi/Documents/whale bin dai/assets/topup/topup-package-mega.png`

### Priority 3: Decorative Global Overlays

These are useful for polish and layering, but less urgent than core UI art.

- `/Users/sasi/Documents/whale bin dai/assets/global/wbd-deco-floating-island-small.png`
- `/Users/sasi/Documents/whale bin dai/assets/global/wbd-deco-bubbles.png`

### Priority 4: Supporting UI Icons And Utility Art

These are lower-risk and can be fixed after the high-visibility items above.

- `/Users/sasi/Documents/whale bin dai/assets/member/member-avatar-default.png`
- `/Users/sasi/Documents/whale bin dai/assets/member/member-security-lock.png`
- `/Users/sasi/Documents/whale bin dai/assets/member/member-redeem-gift.png`
- `/Users/sasi/Documents/whale bin dai/assets/auth/auth-success-check.png`

## Notes For Design And Frontend Teams

- A `.png` extension is not enough. The file must contain a real alpha channel.
- Target export requirement: transparent PNG with clean cutout edges and no white or colored matte halo.
- Use `/Users/sasi/Documents/whale bin dai/assets/home/home-feature-whale.png` as the current locked main whale character reference.
- For all regenerated whale or mascot assets, match the rounded body shape, blue-cyan palette, white belly, and gold accent language from the current master reference.
- Decorative assets should remain minimal and reusable across multiple sections.
- Frontend should continue using scene assets as opaque backgrounds, but cutout assets should be replaced with true transparent versions once available.
