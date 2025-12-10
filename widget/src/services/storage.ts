const STORAGE_PREFIX = 'tour_';

export interface StoredTourState {
	currentStepIndex: number;
	sessionId: string;
	lastUpdated: number;
}

export const StorageService = {
	saveState(tourId: string, state: StoredTourState): void {
		try {
			const key = `${STORAGE_PREFIX}${tourId}`;
			localStorage.setItem(key, JSON.stringify(state));
		} catch (error) {
			console.error('Failed to save tour state:', error);
		}
	},

	loadState(tourId: string): StoredTourState | null {
		try {
			const key = `${STORAGE_PREFIX}${tourId}`;
			const data = localStorage.getItem(key);
			if (!data) return null;

			const state: StoredTourState = JSON.parse(data);

			// Invalidate state older than 7 days
			const sevenDays = 7 * 24 * 60 * 60 * 1000;
			if (Date.now() - state.lastUpdated > sevenDays) {
				this.clearState(tourId);
				return null;
			}

			return state;
		} catch (error) {
			console.error('Failed to load tour state:', error);
			return null;
		}
	},

	clearState(tourId: string): void {
		try {
			const key = `${STORAGE_PREFIX}${tourId}`;
			localStorage.removeItem(key);
		} catch (error) {
			console.error('Failed to clear tour state:', error);
		}
	},
};
