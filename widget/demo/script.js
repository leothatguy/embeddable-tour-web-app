// Initialize the tour widget when page loads
document.addEventListener('DOMContentLoaded', () => {
	// Auto-start tour after a short delay
	setTimeout(initTour, 1000);

	// Also allow manual tour start
	document.getElementById('start-tour-btn')?.addEventListener('click', initTour);
});

function initTour() {
	if (!window.TourWidget) {
		console.error('TourWidget is not loaded');
		return;
	}

	window.TourWidget.init({
		tourId: 'demo-website-tour',
		steps: [
			{
				id: 'welcome-step',
				title: 'Welcome to Our Platform! 👋',
				description:
					'This interactive tour will guide you through the key features of our website. Feel free to use the Next/Back buttons or skip the tour anytime.',
				position: 'center',
			},
			{
				id: 'header-step',
				title: 'Navigation Menu',
				description:
					'Use the header navigation to explore different sections. The "Get Started" button takes you directly to signup.',
				target: '#main-header',
				position: 'bottom',
			},
			{
				id: 'features-step',
				title: 'Explore Our Features',
				description:
					'Discover what makes our platform special. We offer fast performance, beautiful design, and an easy-to-use interface.',
				target: '#feature-1',
				position: 'top',
			},
			{
				id: 'cta-step',
				title: 'Ready to Join?',
				description:
					'Sign up now to get started with our platform. It only takes a minute and you will love what we have built!',
				target: '#signup-btn',
				position: 'top',
			},
			{
				id: 'completion-step',
				title: 'You are All Set! 🎉',
				description:
					'Congratulations! You have completed the tour. Start exploring on your own or click the button above to create your account.',
				position: 'center',
			},
		],
		theme: {
			primaryColor: '#eabe7b',
			backgroundColor: '#ffffff',
			textColor: '#111827',
			borderRadius: '16px',
		},
		avatar: {
			enabled: true,
			position: 'right',
		},
		onAnalytics: (event) => {
			console.log('📊 Analytics Event:', event);

			// You can send this to your analytics service
			// Example: analytics.track(event.type, event);
		},
		onStepChange: (stepIndex, step) => {
			console.log(`📍 Step ${stepIndex + 1}:`, step.title);
		},
		onComplete: () => {
			console.log('✅ Tour completed successfully!');
			alert('Thanks for completing the tour! 🎉');
		},
		onSkip: () => {
			console.log('⏭️ Tour skipped');
		},
	});
}
