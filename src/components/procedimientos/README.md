# Scroll-Driven Reveal Animation

This project demonstrates a scroll-driven reveal animation where an image is initially shown in a small rectangular window in the center of the screen, and as the user scrolls, the window expands to reveal the full image.

## How to Use the Standalone Component

The `StandaloneScrollReveal` component is designed to be easily portable to any project. Here's how to use it:

1. **Copy the component file**: Copy `components/standalone-scroll-reveal.tsx` to your project.

2. **Install dependencies**: Make sure you have GSAP installed in your project:
   \`\`\`bash
   npm install gsap
   \`\`\`

3. **Import and use the component**:
   \`\`\`tsx
   import StandaloneScrollReveal from "@/components/standalone-scroll-reveal"

   export default function YourPage() {
     return (
       <main>
         <StandaloneScrollReveal
           imageSrc="/your-image.jpg"
           imageAlt="Your image description"
           projectNumber="01"
           projectTitle="Your Project"
           location="Location"
           category="Category"
         />
       </main>
     )
   }
   \`\`\`

## How It Works

The animation works by:

1. Showing only a portion of the image through a clip-path mask
2. As the user scrolls, the clip-path expands to reveal more of the image
3. The image itself remains fixed in position - only the mask changes
4. Text elements get covered by the expanding image
5. Header and footer remain visible throughout

## Customization

You can customize the component by:

- Changing the initial clip-path values to adjust the starting window size
- Modifying the animation easing for different effects
- Adjusting the z-index values to control which elements get covered
- Changing the styles of the text, header, and footer elements

## Requirements

- React 18+
- GSAP 3+
- A modern browser that supports clip-path

## Git Commands to Commit

\`\`\`bash
# Add all files to git
git add .

# Commit the changes
git commit -m "Add scroll-driven reveal animation"

# Push to your repository
git push origin main
