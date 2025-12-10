export interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export interface TourConfig {
  tourId: string;
  steps: TourStep[];
  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
  };
  avatar?: {
    enabled?: boolean;
    position?: 'left' | 'right';
  };
  onStepChange?: (stepIndex: number, step: TourStep) => void;
  onComplete?: () => void;
  onSkip?: () => void;
  onAnalytics?: (event: AnalyticsEvent) => void;
}

export interface TourState {
  currentStepIndex: number;
  isActive: boolean;
  isCompleted: boolean;
}

export type AnalyticsEventType = 
  | 'tour_started'
  | 'step_started'
  | 'step_completed'
  | 'step_skipped'
  | 'tour_completed'
  | 'tour_skipped';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  tourId: string;
  stepId?: string;
  stepIndex?: number;
  timestamp: number;
  sessionId: string;
}

export interface ElementPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}
