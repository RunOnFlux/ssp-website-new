---
title: SSP Wallet Setup Guide
url: https://sspwallet.io/guide
last_reviewed: 2026-07-17
---

Complete two-part installation guide for SSP Wallet (browser extension) plus
SSP Key (mobile 2FA app), current as of SSP Wallet 2.0.0 and SSP Key 2.0.0.
Both devices are required for the 2-of-2 multisignature system.

## Key facts

- Setup takes ~15 minutes end-to-end across two devices.
- Part One (browser extension): Chrome, Brave, or Firefox. 7 steps: install,
  create password, back up the wallet seed phrase, verify the backup with a
  word challenge, personalize the wallet (name + accent color), then pair.
- Part Two (mobile): SSP Key on iOS 15.1+ or Android 7+. 7 steps: install,
  set Key password (optional biometrics), back up the separate Key seed
  phrase, verify it with a word challenge, scan the wallet's QR code
  (multiple chains can be activated with a single approval; manual entry
  still supported), slide to approve on the phone, then verify the pairing.
- Pairing verification: after syncing, both devices show the same 6 words.
  Matching words prove the pairing wasn't tampered with; SSP Key can also
  scan the wallet's code to verify automatically. If the words differ, the
  user must stop and re-pair.
- Two seed phrases — wallet seed and key seed — must be backed up
  independently. Both are needed to recover the wallet.
- An "After Setup" section orients users in SSP Wallet 2.0: the identity
  pill at the top switches wallets and networks; the bottom bar has four
  tabs (Home, Portfolio, Activity, Menu — former Settings live under Menu);
  sending is a 3-step flow (Details, Review, Approve) finished on SSP Key
  with a plain-language, on-device decode and a slide-to-approve gesture.
- Embedded video walkthrough (3:36) at /ssp-setup-guide.webm with .mp4
  fallback and English captions track; the page notes it was recorded with
  the previous (v1) interface. Video poster at /ssp-setup-guide-poster.jpg.
- Page emits HowTo, VideoObject, and BreadcrumbList JSON-LD.

## What you can do

- Follow the 14 numbered steps across both phases.
- Watch the video walkthrough on the page (previous interface).
- Get the browser extension and mobile app → /download
- If something goes wrong → /support
- Report a security issue → /contact

## Related pages

- /download
- /support
- /features
- /contact
