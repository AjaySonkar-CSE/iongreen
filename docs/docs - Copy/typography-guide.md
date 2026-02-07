# Typography Guide

This document explains the typography system implemented in the project using Roboto font.

## Font Family

- **Primary Font**: Roboto (imported from Google Fonts)
- **Fallback**: sans-serif

## Heading Hierarchy

### H1 - Main Page Titles
- Size: 36px on mobile, 48px on desktop
- Weight: Bold
- Style: `text-4xl md:text-5xl font-bold leading-tight`

### H2 - Section Titles
- Size: 30px on mobile, 36px on desktop  
- Weight: Bold
- Style: `text-3xl md:text-4xl font-bold leading-snug`

### H3 - Subsection Titles
- Size: 24px on mobile, 30px on desktop
- Weight: Semi-bold
- Style: `text-2xl md:text-3xl font-semibold leading-relaxed`

### H4 - Card Titles
- Size: 20px on mobile, 24px on desktop
- Weight: Semi-bold
- Style: `text-xl md:text-2xl font-semibold`

### H5 - Small Section Titles
- Size: 18px on mobile, 20px on desktop
- Weight: Medium
- Style: `text-lg md:text-xl font-medium`

### H6 - Label Titles
- Size: 16px on mobile, 18px on desktop
- Weight: Medium
- Style: `text-base md:text-lg font-medium`

## Body Text

### P - Paragraph Text
- Size: 16px (base)
- Style: `text-base leading-relaxed`

### Small Text
- Size: 14px
- Style: `text-sm leading-relaxed`

### Extra Small Text
- Size: 12px
- Style: `text-xs leading-relaxed`

## Component Usage

To use the typography components, import them from `@/components/typography`:

```tsx
import { H1, H2, H3, H4, H5, H6, P, Small, XSmall, Strong, Link } from "@/components/typography";

// Example usage
export default function ExamplePage() {
  return (
    <div>
      <H1>Page Title</H1>
      <H2>Section Title</H2>
      <H3>Subsection Title</H3>
      <P>This is a paragraph with the default text style.</P>
      <Small>This is smaller text.</Small>
      <XSmall>This is extra small text.</XSmall>
      <Strong>This text is bold.</Strong>
      <Link href="/example">This is a link</Link>
    </div>
  );
}
```

## Global Styles

The following global styles are applied automatically:

- All heading elements (h1-h6) have consistent styling applied via Tailwind classes
- Paragraphs have consistent line height
- Links have the green color theme and underline on hover
- Buttons have consistent font weight
- Text elements inherit the Roboto font family

## Implementation Notes

- The Roboto font is loaded via Next.js font optimization
- Typography styles are defined in `src/app/globals.css`
- The typography components provide a consistent interface while allowing for additional className props
- All components support additional styling through the className prop