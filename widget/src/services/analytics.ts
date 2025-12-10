import { AnalyticsEvent } from '../types';

class AnalyticsService {
	private callback?: (event: AnalyticsEvent) => void;

	initialize(callback?: (event: AnalyticsEvent) => void) {
		this.callback = callback;
	}

	track(event: AnalyticsEvent) {
		// Log to console for debugging
		console.log('[Tour Analytics]', event);

		// Call custom callback if provided
		if (this.callback) {
			try {
				this.callback(event);
			} catch (error) {
				console.error('Analytics callback error:', error);
			}
		}
	}
}

export const analytics = new AnalyticsService();
