You are an expert frontend web developer and UI/UX designer specializing in clean, performant personal portfolio websites for GitHub Pages.

We are building a personal website at `Mr-Don-Leo.github.io`. It must be **pure static** (HTML, CSS, JavaScript only). GitHub Pages has no build process, so we cannot use npm, PostCSS, or any tools that require compilation during deployment. Keep the entire site lightweight, under 1 GB total (ideally < 10 MB), with excellent performance and mobile-first responsiveness.

### Color Scheme (Dark Purple Aesthetic)
- Primary background: Deep black or very dark navy (`#0a0a0a`, `#0f0e32`).
- Midnight purple tones: `#342048`, `#2c2a7b`, `#232162`, `#1b194f`, `#280137`.
- Accent colors: Vibrant purple (`#a855f7` or `#c026d3`), neon magenta (`#d946ef`), with subtle electric blue/cyan hints.
- Text: Soft purple-tinted whites (`#e0e0ff`, `#c4b5fd`) for headings, lighter grays for body.
- Use CSS custom properties (CSS variables) for easy color management.
- Overall vibe: Dark, elegant, mysterious, with subtle neon glows and glass effects.

### Technical Constraints for GitHub Pages
- Use **Tailwind CSS via its Play CDN** only: `<script src="https://cdn.tailwindcss.com"></script>`. Initialize it with a `tailwind.config` script in the `<head>` for custom colors and utilities. Do not assume any build step.
- Fallback to vanilla CSS for complex effects if needed.
- All JavaScript must be **vanilla** (no frameworks). Keep it minimal and efficient.
- No external heavy dependencies. Use lightweight or inline solutions.
- Optimize for performance: Compress images if any, use lazy loading, avoid heavy animations.
- Fully responsive (mobile-first). Test mentally for both desktop and mobile.
- `backdrop-filter: blur()` for glassmorphism is allowed and works on modern browsers.

### Header / Navigation Behavior
- Sticky or fixed full-width header at the top.
- Left: Logo or name. Right: Horizontal menu links (e.g., Home, About, Projects, Skills, Contact) + optional dark mode toggle.
- On scroll down (after ~80-100px):
  - Header shrinks in height and padding.
  - Most of the header becomes more transparent or hides parts of the background/content.
  - Menu items transform into **iOS-style glassmorphic buttons** that stay persistently visible at the top.
- Glass button style:
  - Semi-transparent background: `rgba(255,255,255,0.08)` or `rgba(168,85,247,0.12)`
  - Strong `backdrop-filter: blur(12px)` + `-webkit-backdrop-filter: blur(12px)`
  - Subtle border: `1px solid rgba(255,255,255,0.15)` or purple tint
  - Box shadow with soft purple glow on hover
  - Smooth hover: slight scale (1.05), increased glow, lift effect
  - Use Tailwind classes where possible, supplemented with custom CSS.
- At the top of the page → show the full expanded header.
- Use a small amount of vanilla JavaScript with `window.addEventListener('scroll')` and a class toggle (e.g., `.scrolled`) to handle the behavior. Make the transition smooth.

### Buttons & Interactive Elements
- Primary buttons: iPhone-style **glassmorphism** buttons.
  - Base: translucent purple-tinted background, strong blur, subtle border, soft inner highlight.
  - Hover: stronger purple/neon glow (`box-shadow` with `0 0 20px rgba(168,85,247,0.5)`), slight scale and brightness increase.
  - Keep them feeling premium and tactile.
- Cards and overlays should also use light glassmorphism where it enhances the design without hurting performance.

### General Design & Style Guidelines
- Heavy but tasteful use of glassmorphism (frosted glass) on cards, buttons, and navigation.
- Rounded corners (`rounded-2xl` or `rounded-3xl`).
- Smooth transitions (0.3s ease) and subtle micro-animations.
- Typography: Clean modern sans-serif (system fonts or Inter-like via Tailwind).
- Background: Deep purple-to-black gradient. Optional very subtle noise or static gradient overlay (keep performant).
- Sections with generous padding and clear visual hierarchy.
- Mobile menu: Simple hamburger that opens a glassmorphic overlay or drawer.
- High accessibility: Good contrast ratios, focus states, semantic HTML.
- Footer: Minimal and clean.

Provide complete, ready-to-use code:
- `index.html` with Tailwind CDN and tailwind script config.
- Any additional custom `<style>` or separate `styles.css` (linked normally).
- `script.js` for scroll behavior and interactions.

Comment the code clearly, especially the scroll header logic and glass effects.

Start by generating the complete header with scroll behavior and glass menu transformation, then we can expand to hero, sections, etc.

Prioritize elegance, smoothness, and the midnight purple dark aesthetic while staying fully compatible with GitHub Pages static hosting.