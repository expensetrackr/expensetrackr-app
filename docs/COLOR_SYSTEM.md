# Color System

Our color system is based on [AlignUI's color foundation](https://alignui.com/docs/foundation/color), providing a comprehensive and consistent palette for the application.

## Color Scales

Each color has a scale from 50 (lightest) to 950 (darkest):

### Primary Colors

- **Gray/Neutral**: Base neutral colors for text, borders, and backgrounds
- **Blue**: Primary brand color and interactive elements
- **Orange**: Accent color for highlights and CTAs
- **Red**: Error states and destructive actions
- **Green**: Success states and positive feedback
- **Yellow**: Warning states and attention
- **Purple**: Secondary accent color

### Scale Structure

```text
50  - Very light tint
100 - Light tint
200 - Light
300 - Light medium
400 - Medium light
500 - Medium (base color)
600 - Medium dark
700 - Dark medium
800 - Dark
900 - Very dark
950 - Darkest
```

## Alpha Variants

Each color includes alpha variants for transparency:

- `*-alpha-10`: 10% opacity
- `*-alpha-16`: 16% opacity
- `*-alpha-24`: 24% opacity

## Semantic Mappings

Colors are semantically mapped for consistent usage:

### Text Colors

- `text-strong-950`: Primary text
- `text-sub-600`: Secondary text
- `text-white-0`: White text on dark backgrounds

### Background Colors

- `bg-white-0`: Primary background
- `bg-weak-50`: Subtle background
- `bg-soft-200`: Soft background

### Interactive Colors

- `primary`: Brand color for buttons, links
- `success`: Success states
- `error/destructive`: Error states
- `warning`: Warning states

## Usage Guidelines

1. **Consistency**: Use semantic names rather than specific color values
2. **Contrast**: Ensure sufficient contrast for accessibility
3. **Dark Mode**: Colors automatically invert for dark mode support
4. **Alpha**: Use alpha variants for overlays and subtle effects

## Implementation

Colors are defined in `global.css` and accessed through:

- Tailwind classes: `bg-blue-500`, `text-red-600`
- useColorScheme hook: `colors.primary`, `colors.textSub600`
