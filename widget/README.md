# Embeddable Tour Widget

An interactive, embeddable onboarding/tour widget built with Vite, React, TypeScript, Framer Motion, and Three.js.

## Team Members
- [Your Name Here]
- [Team Member 2]
- [Team Member 3]
- [Team Member 4]

## Features

✨ **Core Functionality**
- 🎯 Multi-step guided tours with minimum 5 steps
- ⏭️ Navigation controls (Next, Back, Skip)
- 📊 Progress indicator with visual feedback
- 💾 Auto-resume capability using localStorage
- 🎨 Smooth transitions with Framer Motion
- 🎯 Element spotlight/highlighting
- 📱 Fully responsive (mobile & desktop)

🤖 **Optional 3D Avatar**
- Lazy-loaded Three.js 3D character
- Animated avatar with idle animations
- Configurable position (left/right)
- Small bundle impact (loaded on-demand)

📈 **Analytics & Tracking**
- Track tour started, completed, skipped events
- Per-step analytics (started, completed)
- Custom callback integration
- Session tracking with unique IDs

## Installation

### Development Setup

```bash
# Navigate to widget directory
cd widget

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Usage

### Embedding the Widget

Add the compiled script to your HTML page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
</head>
<body>
  <!-- Your website content -->
  
  <!-- Load the widget script -->
  <script src="https://your-cdn.com/tour-widget.umd.js"></script>
  
  <!-- Initialize the tour -->
  <script>
    window.TourWidget.init({
      tourId: 'my-onboarding-tour',
      steps: [
        {
          id: 'step-1',
          title: 'Welcome! 👋',
          description: 'Let us show you around...',
          position: 'center'
        },
        {
          id: 'step-2',
          title: 'Navigation',
          description: 'Use this menu to explore',
          target: '#main-nav',
          position: 'bottom'
        },
        {
          id: 'step-3',
          title: 'Features',
          description: 'Check out our amazing features',
          target: '#features-section',
          position: 'top'
        },
        {
          id: 'step-4',
          title: 'Get Started',
          description: 'Click here to begin',
          target: '#cta-button',
          position: 'top'
        },
        {
          id: 'step-5',
          title: 'All Set! 🎉',
          description: 'You are ready to go!',
          position: 'center'
        }
      ],
      theme: {
        primaryColor: '#3b82f6',
        backgroundColor: '#ffffff',
        textColor: '#111827',
        borderRadius: '16px'
      },
      avatar: {
        enabled: true,
        position: 'right'
      },
      onAnalytics: (event) => {
        console.log('Analytics:', event);
        // Send to your analytics service
      },
      onComplete: () => {
        console.log('Tour completed!');
      },
      onSkip: () => {
        console.log('Tour skipped');
      }
    });
  </script>
</body>
</html>
```

## Configuration API

### TourConfig

```typescript
interface TourConfig {
  // Required
  tourId: string;              // Unique identifier for the tour
  steps: TourStep[];           // Array of tour steps (minimum 5)
  
  // Optional
  theme?: {
    primaryColor?: string;     // Primary color (default: '#3b82f6')
    backgroundColor?: string;  // Widget background (default: '#ffffff')
    textColor?: string;        // Text color (default: '#111827')
    borderRadius?: string;     // Border radius (default: '16px')
  };
  
  avatar?: {
    enabled?: boolean;         // Enable 3D avatar (default: false)
    position?: 'left' | 'right'; // Avatar position (default: 'right')
  };
  
  // Callbacks
  onStepChange?: (stepIndex: number, step: TourStep) => void;
  onComplete?: () => void;
  onSkip?: () => void;
  onAnalytics?: (event: AnalyticsEvent) => void;
}
```

### TourStep

```typescript
interface TourStep {
  id: string;                  // Unique step identifier
  title: string;               // Step title
  description: string;         // Step description
  target?: string;             // CSS selector for element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}
```

### Analytics Events

The widget tracks the following events:

- `tour_started` - Tour begins
- `step_started` - User views a step
- `step_completed` - User completes a step
- `step_skipped` - User skips a step
- `tour_completed` - User completes entire tour
- `tour_skipped` - User skips the tour

Each event includes:
```typescript
interface AnalyticsEvent {
  type: AnalyticsEventType;
  tourId: string;
  stepId?: string;
  stepIndex?: number;
  timestamp: number;
  sessionId: string;
}
```

## Demo

A demo page is included in the `demo/` directory demonstrating the widget on a sample website.

To run the demo:

1. Build the widget: `npm run build`
2. Open `demo/index.html` in your browser

## Project Structure

```
widget/
├── src/
│   ├── components/
│   │   ├── Avatar/          # 3D avatar component
│   │   ├── NavigationControls.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── Spotlight.tsx
│   │   ├── StepContent.tsx
│   │   └── TourWidget.tsx   # Main widget component
│   ├── hooks/
│   │   ├── useElementPosition.ts
│   │   └── useTourState.ts
│   ├── services/
│   │   ├── analytics.ts
│   │   └── storage.ts
│   ├── types/
│   │   └── index.ts
│   ├── embed.ts             # Embeddable API
│   └── index.ts             # Main entry point
├── demo/                    # Demo website
├── dist/                    # Built files
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Technical Details

### Bundle Size

- **Core Widget**: ~281KB gzipped (without avatar)
- **With Avatar**: ~446KB gzipped (avatar lazy-loaded)
- Minified and optimized for production

### Browser Support

- Modern browsers (ES2020+)
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Dependencies

- **React** - UI library
- **Framer Motion** - Smooth animations
- **Three.js** - 3D avatar rendering (optional)
- **@react-three/fiber** - React bindings for Three.js
- **@react-three/drei** - Three.js helpers

## Development

### Running Dev Server

```bash
npm run dev
```

Open `http://localhost:5173` to see the widget in development mode.

### Building

```bash
npm run build
```

Outputs production-ready files to `dist/`:
- `tour-widget.umd.js` - UMD bundle for browser embedding
- `tour-widget.es.js` - ES module bundle
- `widget.css` - Compiled styles

### Testing

The widget has been tested with:
- ✅ All navigation controls (Next, Back, Skip)
- ✅ Progress tracking and display
- ✅ Auto-resume from localStorage
- ✅ Element highlighting/spotlight
- ✅ Analytics event tracking
- ✅ Responsive design (mobile/desktop)
- ✅ 3D avatar loading and animations

## Deployment

The widget can be deployed to:

1. **Vercel**:
   ```bash
   cd widget
   vercel --prod
   ```

2. **Netlify**:
   ```bash
   cd widget
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **CDN**: Upload `dist/` files to any CDN service

## License

MIT

## Questions or Issues?

Feel free to open an issue or reach out to the team members listed above.

---

Made with ❤️ for HNG Internship Stage 2
