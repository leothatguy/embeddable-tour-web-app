export interface StoredTourState {
    currentStepIndex: number;
    sessionId: string;
    lastUpdated: number;
}
export declare const StorageService: {
    saveState(tourId: string, state: StoredTourState): void;
    loadState(tourId: string): StoredTourState | null;
    clearState(tourId: string): void;
};
