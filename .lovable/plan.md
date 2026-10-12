# Visible soundtrack controls

## What will change
- Replace the header's sound icon with a visible music toggle and adjustable volume slider.
- Raise the default music level, while letting Sukliiii adjust or mute it at any time.
- Attempt to start the soundtrack when the site opens; keep the toggle available if the browser blocks autoplay.

## Technical details
- Extend the existing client-side audio hook and use the existing button and slider controls.
- Keep all audio browser-side and optional; do not add a backend or force sound when autoplay is disallowed.
- Verify the control states and slider behavior at desktop and mobile sizes.