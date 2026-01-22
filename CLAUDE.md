# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Aldo, showcasing work as an AI Engineer, Entrepreneur, and Boxer. The site is deployed via GitHub Pages with a custom domain (thisisaldo.com).

## Technology Stack

- **Pure vanilla JavaScript, HTML, and CSS** - No build tools, frameworks, or dependencies
- **Deployment**: GitHub Pages with CNAME configuration
- **Domain**: thisisaldo.com (configured in CNAME file)

## Development Workflow

### Local Development

Simply open `index.html` in a browser - no build process required. For live reload during development:

```bash
python3 -m http.server 8000
# or
python -m SimpleHTTPServer 8000  # Python 2
```

Then visit `http://localhost:8000`

### Deployment

Changes pushed to the `main` branch are automatically deployed to GitHub Pages. The CNAME file ensures the custom domain continues working.

## Code Architecture

### File Structure

- `index.html` - Single-page application structure with all sections
- `styles.css` - All styling including animations and responsive design
- `script.js` - Interactive features and animations
- `CNAME` - Custom domain configuration for GitHub Pages

### HTML Structure (index.html)

The page is organized as a single-page application with semantic sections:
- **Navigation** - Fixed header with smooth scroll links and "Coming Soon" badge for Courses
- **Hero Section** - Introduction with animated gradient name and call-to-action
- **About Section** (#about) - Personal background combining AI engineering, entrepreneurship, and boxing
- **Expertise Section** (#expertise) - Three cards showcasing skills (AI Engineering, Entrepreneurship, Boxing)
- **Contact Section** (#contact) - Social links and email copy functionality
- **Footer** - Copyright information

All section navigation uses anchor links (`#about`, `#expertise`, `#contact`, `#courses`) with smooth scrolling.

### CSS Architecture (styles.css)

**CSS Custom Properties** (lines 1-10):
- Theme colors, fonts, and transitions defined in `:root` for consistent theming
- Can be easily modified to change the entire site's color scheme

**Animation System**:
- `gradientShift` - Animated background gradient (lines 27-31)
- `slideInLeft` - Hero section staggered entrance animations (lines 297-306)
- `cardSlideIn` - Sequential card animations with delays (lines 440-449)
- `float` - Floating effect for section numbers (lines 345-348)
- `pulse` - "Coming Soon" badge animation (lines 173-182)
- `emailSlideUp` / `emailBounce` - Email notification animations (lines 629-656)

**Interactive Effects**:
- Cursor glow follows mouse movement (lines 52-74)
- Magnetic effect on buttons/cards (applied via JavaScript)
- Card hover effects with shine overlay (lines 387-426)
- Progress bar for scroll position (lines 77-86)

**Responsive Breakpoint**: 768px (lines 686-734)

### JavaScript Architecture (script.js)

**Core Systems**:

1. **Intersection Observer** (lines 2-18):
   - Triggers fade-in animations when sections scroll into view
   - Uses threshold of 0.1 and 50px bottom margin for early triggering

2. **Cursor Glow Effect** (lines 44-71):
   - Creates smooth-following radial gradient cursor effect
   - Uses requestAnimationFrame for 60fps animation
   - Easing factor of 0.1 for smooth lag effect

3. **Magnetic Button Effect** (lines 73-93):
   - Buttons and cards slightly move toward cursor on hover
   - Applied to `.cta-button`, `.link-button`, and `.card` elements
   - Movement factor of 0.15 for subtle effect

4. **Parallax Hero Effect** (lines 95-106):
   - Hero content moves slower than scroll (0.3x speed)
   - Creates depth perception on initial scroll

5. **Email Copy Functionality** (lines 108-163):
   - Copies `hello@thisisaldo.com` to clipboard
   - Shows animated notification with gradient background
   - Temporarily changes button to checkmark icon
   - 4-second notification duration with fallback handling

6. **Smooth Scroll Navigation** (lines 165-177):
   - Intercepts anchor link clicks for smooth scrolling
   - Applies to all links starting with `#`

### Key Design Patterns

**Progressive Enhancement**:
- All animations gracefully degrade if JavaScript fails
- Site remains functional without JavaScript (navigation works via native anchor links)

**Performance Optimizations**:
- Cursor glow hidden on touch devices (`@media (hover: none)`)
- Transform-based animations for GPU acceleration
- IntersectionObserver for efficient scroll animations (better than scroll listeners)

**Animation Choreography**:
- Staggered delays create flowing entrance (hero elements: 0s, 0.1s, 0.2s, 0.3s, 0.4s)
- Cards animate with 0.1s delays between each (0.1s, 0.2s, 0.3s)

## Making Changes

### Adding a New Section

1. Add section HTML in `index.html` with class `section fade-in`
2. Add section number in `.section-header` following the pattern
3. Add navigation link in `.nav-links` if needed
4. The IntersectionObserver will automatically handle fade-in animation

### Modifying Colors/Theme

Edit CSS custom properties in `styles.css` (lines 1-10):
```css
--color-accent: #2563eb;  /* Primary brand color */
--color-bg: #fafafa;      /* Background */
--color-text: #1a1a1a;    /* Primary text */
```

### Updating Social Links

Edit the contact section in `index.html` (lines 76-120). Each link follows this structure:
```html
<a href="URL" target="_blank" class="link-button">
    <svg class="link-icon">...</svg>
    <span>Platform Name</span>
</a>
```

### Modifying Email Address

Change the email in `script.js` line 110:
```javascript
const email = 'hello@thisisaldo.com';
```

## Important Notes

- The inline SVG favicon is embedded in the HTML `<head>` (line 7) - contains gradient "A" logo
- YouTube link (line 96) currently points to generic `https://youtube.com` - update with specific channel URL
- Courses section is marked "Coming Soon" but link exists in navigation (line 19)
- Smooth scroll behavior is set globally in CSS (`html { scroll-behavior: smooth; }`) AND reinforced with JavaScript
- All external links include `target="_blank"` for new tab opening
- GitHub link has `rel="noopener noreferrer"` for security (line 90)
