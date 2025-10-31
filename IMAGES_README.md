# Portfolio - Project Images Guide

## Overview
Your portfolio now has preview images for each project and individual detail pages!

## Current Setup

### Preview Images
Each project card on the main page now displays a preview image:
- **Spoken Habit**: Voice tracker interface mockup
- **Reverse Proxy**: Load balancing architecture diagram
- **E-Learning Platform**: Course interface preview
- **AI Calendar**: Smart scheduling interface
- **Task Manager**: Task list mockup
- **Image Denoising**: Before/after denoising visualization

### Project Detail Pages
Each project now has its own dedicated page with:
- Full project description
- Key features list
- Technology stack overview
- Challenges and solutions
- Links to GitHub/Live demo

## How to Add Your Own Images

### Option 1: Replace SVG Placeholders
The current images are SVG placeholders. To replace them with real screenshots:

1. Take screenshots of your projects
2. Save them in the `images/` folder with these names:
   - `spoken-habit-preview.png` (or .jpg)
   - `reverse-proxy-preview.png`
   - `e-learning-preview.png`
   - `ai-calendar-preview.png`
   - `task-manager-preview.png`
   - `image-denoising-preview.png`

3. Update the file extensions in `index.html`:
   ```html
   <!-- Change from .svg to .png or .jpg -->
   <img src="images/spoken-habit-preview.png" alt="Spoken Habit Preview">
   ```

### Option 2: Add Real Images to Detail Pages
Each project detail page (in `/projects/` folder) has a placeholder section. To add real images:

1. Replace the `.preview-placeholder` div in each HTML file with:
   ```html
   <div class="project-preview">
       <img src="../images/your-project-image.png" alt="Project Screenshot">
   </div>
   ```

### Recommended Image Sizes
- **Card Previews**: 400x300px (4:3 ratio)
- **Detail Page Images**: 1000x600px or larger (16:9 ratio)
- **Format**: PNG for screenshots, JPG for photos
- **File Size**: Keep under 500KB for fast loading

## Customization Tips

### Update Project Links
Replace the GitHub placeholder links with your actual project URLs:
```html
<a href="YOUR_GITHUB_REPO_URL" target="_blank" class="project-link">
```

### Add Live Demo Links
Add live demo buttons to project detail pages:
```html
<a href="YOUR_LIVE_DEMO_URL" target="_blank" class="project-btn">
    <span>VIEW LIVE DEMO</span>
    <span class="btn-arrow">→</span>
</a>
```

### Modify Project Content
Edit the HTML files in `/projects/` to update:
- Project descriptions
- Features list
- Technology details
- Challenges and solutions

## File Structure
```
portfolio/
├── index.html              # Main page with project cards
├── style.css              # Main styles
├── script.js              # Main JavaScript
├── images/                # Project preview images
│   ├── spoken-habit-preview.svg
│   ├── reverse-proxy-preview.svg
│   ├── e-learning-preview.svg
│   ├── ai-calendar-preview.svg
│   ├── task-manager-preview.svg
│   └── image-denoising-preview.svg
└── projects/              # Individual project pages
    ├── project-detail.css # Shared styles for project pages
    ├── spoken-habit.html
    ├── reverse-proxy.html
    ├── e-learning.html
    ├── ai-calendar.html
    ├── task-manager.html
    └── image-denoising.html
```

## Next Steps

1. **Add Real Screenshots**: Replace SVG placeholders with actual project screenshots
2. **Update GitHub Links**: Add your actual repository URLs
3. **Add Live Demos**: If you have deployed versions, add links
4. **Customize Content**: Update project descriptions with your specific details
5. **Optimize Images**: Compress images for faster loading

## Need Help?

If you want to:
- Change the color scheme for specific projects
- Add more projects
- Modify the layout
- Add video demos instead of images

Just let me know!
