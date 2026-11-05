# Specification: iPhone 11 Landscape Display & Safe Area Fix

## Objectives & Scope
Fix layout cropping and clipping on iPhone 11 (and other notched / home-bar iOS devices) in landscape orientation.

### In Scope
- Viewport meta tag update with `viewport-fit=cover`.
- iOS Safe Area inset integration (`env(safe-area-inset-*)`) for sidebar dock and main content area.
- Dynamic Viewport Height (`100dvh`) and flexible container sizing to prevent vertical overflow/cropping in Safari and WebApp standalone PWA mode.
- Padding and sizing adjustments on dashboard widgets, sidebar buttons, launcher grid, and settings page for landscape mobile viewports (~896px x 414px / ~844px x 390px).

### Out of Scope
- Backend changes or major feature additions.
- Non-CSS/HTML layout restructurings that alter core application features.

## Target User Experience
- Interface fits perfectly within iPhone 11 screen boundary in landscape mode.
- Sidebar and interactive controls respect the device notch and bottom home bar.
- No scrollbars or cropped cards on dashboard, map, music player, speedometer, launcher, or settings pages.

## Boundary Analysis
- **Always**: Support landscape orientation seamlessly; handle `env(safe-area-inset-*)` safely across browsers.
- **Ask First**: Changing fundamental page structure or removing widgets/features.
- **Never**: Break desktop/tablet layout or break touch event targets (< 44px x 44px).

## Technical Requirements & Changes
1. Update Viewport Meta Tag:
   `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">`
2. Add CSS rules for safe areas:
   - Body/aside safe-area-inset-left for landscape notch on the left.
   - Body/aside safe-area-inset-right for notch on the right.
   - Safe-area-inset-bottom for home indicator.
   - Safe-area-inset-top for status bar area.
3. Fix Height Sizing:
   - `html, body { height: -webkit-fill-available; height: 100dvh; }` so content tracks the visible viewport (Safari toolbar aware), instead of the oversized "large" viewport `100%`/`100vh` reports.
4. Scale spacing / margins on small landscape heights (`@media (max-height: 500px)`, iPhone 11 landscape is 375pt):
   - Sidebar: width 4rem, dock buttons 44px (min 44px touch targets), settings 40px, gaps 8px. Total sidebar height drops from ~446px to ~342px — fits in 375pt.
   - Dashboard: page padding/gap 12px, speed readout 3rem.
   - Speedometer: gauge circle 144px, big speed readout 3.5rem (page fit drops from ~474px to ~256px).
   - Settings: padding 1rem.

## Verification Plan
1. Validate HTML syntax and viewport meta tag.
2. Verify safe area padding CSS rules.
3. Test layout scaling and dynamic viewport height in browser/developer tools with mobile device dimensions.
