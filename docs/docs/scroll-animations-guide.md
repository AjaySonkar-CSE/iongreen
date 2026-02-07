# Scroll Animations Guide

This document explains how to implement parallax scroll animations, scroll reveal animations, fade/slide/zoom effects, and scroll snap animations throughout your application.

## Implemented Features

### 1. Enhanced Scroll Reveal Animations
- **Slide Effects**: Elements slide in from different directions (up, down, left, right)
- **Fade Effects**: Elements fade in smoothly
- **Zoom Effects**: Elements scale up while fading in
- **Scale Effects**: Elements scale in place

### 2. Parallax Scrolling
- Parallax effects using `react-scroll-parallax`
- Elements move at different speeds as the user scrolls
- Configurable speed and axis (x, y, or both)

### 3. Scroll Snap
- CSS-based scroll snapping
- Sections align to start, center, or end when scrolling
- Smooth scrolling behavior

## How to Use Scroll Animations

### Basic Scroll Reveal
```tsx
import { ScrollReveal } from "@/components/scroll-reveal";

// Basic usage
<ScrollReveal>
  <div>Your content here</div>
</ScrollReveal>

// With custom options
<ScrollReveal 
  direction="up"     // Direction: up, down, left, right
  effect="fade"      // Effect: fade, slide, zoom, scale
  duration={0.6}     // Animation duration in seconds
  delay={0.1}        // Delay before animation starts
  threshold={0.1}    // Visibility threshold
>
  <div>Your content here</div>
</ScrollReveal>
```

### Parallax Elements
```tsx
import { ParallaxElement } from "@/components/enhanced-scroll-reveal";

// Parallax element with vertical movement
<ParallaxElement speed={10} axis="y">
  <div>Content that moves with parallax effect</div>
</ParallaxElement>

// Parallax element with horizontal movement
<ParallaxElement speed={5} axis="x">
  <div>Content that moves horizontally</div>
</ParallaxElement>
```

### Scroll Snap Sections
```tsx
import { ScrollSnapSection } from "@/components/enhanced-scroll-reveal";

// Scroll snap section
<ScrollSnapSection snapAlign="start">
  <div>Content that snaps to start position</div>
</ScrollSnapSection>

// Or use CSS classes directly
<div className="snap-section">
  <div>Content that snaps to position</div>
</div>
```

## CSS Classes for Scroll Snap

- `.snap-container` - Apply to container element for scroll snapping
- `.snap-section` - Apply to individual sections
- `.snap-start` - Snap to start position
- `.snap-center` - Snap to center position
- `.snap-end` - Snap to end position
- `.snap-always` - Always snap to position
- `.snap-mandatory` - Mandatory scroll snap behavior

## Example Implementation on Other Pages

### Products Page Example
```tsx
import { ScrollReveal } from "@/components/scroll-reveal";

export default function ProductsPage() {
  return (
    <div>
      <ScrollReveal direction="up" effect="zoom" delay={0.1}>
        <h1>Our Products</h1>
      </ScrollReveal>
      
      <ScrollReveal direction="up" effect="fade" delay={0.2}>
        <div>Product category 1</div>
      </ScrollReveal>
      
      <ScrollReveal direction="up" effect="slide" delay={0.3}>
        <div>Product category 2</div>
      </ScrollReveal>
    </div>
  );
}
```

### Solutions Page Example
```tsx
import { ScrollReveal } from "@/components/scroll-reveal";

export default function SolutionsPage() {
  return (
    <div>
      <ScrollReveal direction="up" effect="scale" delay={0.1}>
        <h1>Solutions</h1>
      </ScrollReveal>
      
      <ScrollReveal direction="left" effect="slide" delay={0.2}>
        <div>Solution 1</div>
      </ScrollReveal>
      
      <ScrollReveal direction="right" effect="slide" delay={0.3}>
        <div>Solution 2</div>
      </ScrollReveal>
    </div>
  );
}
```

## Homepage Implementation

The homepage (`/src/app/page.tsx`) has been updated with various animation effects:

- Features section: Zoom effect
- Stats section: Fade effect
- Stats flip cards: Scale effect
- Solutions carousel: Left slide effect
- Product carousel: Right slide effect
- Better life section: Zoom effect
- Solar energy section: Fade effect
- And more with alternating effects

## Global CSS Additions

The following scroll snap styles have been added to `src/app/globals.css`:

```css
/* Scroll Snap */
.snap-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.snap-section {
  scroll-snap-align: start;
}

.snap-mandatory {
  scroll-snap-type: y mandatory;
}

.snap-start {
  scroll-snap-align: start;
}

.snap-center {
  scroll-snap-align: center;
}

.snap-end {
  scroll-snap-align: end;
}

.snap-always {
  scroll-snap-stop: always;
}
```

## Performance Considerations

- Animations use hardware acceleration for smooth performance
- Elements are only animated once (default behavior)
- Threshold can be adjusted to trigger animations earlier or later
- All animations are optimized with Framer Motion

## Browser Support

- Scroll snap is supported in modern browsers
- Parallax effects work in all browsers (with fallbacks)
- Animations gracefully degrade in older browsers