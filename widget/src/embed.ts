import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { TourWidget } from './components/TourWidget';
import { TourConfig } from './types';

class TourWidgetAPI {
	private root: Root | null = null;
	private container: HTMLDivElement | null = null;
	private isActive = false;

	init(config: TourConfig) {
		if (this.isActive) {
			console.warn('Tour widget is already active');
			return;
		}

		// Validate configuration
		if (!config.tourId) {
			throw new Error('Tour ID is required');
		}

		if (!config.steps || config.steps.length < 5) {
			throw new Error('At least 5 steps are required');
		}

		// Create container
		this.container = document.createElement('div');
		this.container.id = 'tour-widget-root';
		document.body.appendChild(this.container);

		// Create React root and render
		this.root = createRoot(this.container);
		this.root.render(
			React.createElement(
				React.StrictMode,
				null,
				React.createElement(TourWidget, {
					config: config,
					onClose: () => this.destroy(),
				}),
			),
		);

		this.isActive = true;
	}

	destroy() {
		if (this.root) {
			this.root.unmount();
			this.root = null;
		}

		if (this.container && this.container.parentNode) {
			this.container.parentNode.removeChild(this.container);
			this.container = null;
		}

		this.isActive = false;
	}
}

// Create and expose global instance
const tourWidget = new TourWidgetAPI();

// Expose to window
declare global {
	interface Window {
		TourWidget: TourWidgetAPI;
	}
}

if (typeof window !== 'undefined') {
	window.TourWidget = tourWidget;
}

export default tourWidget;
