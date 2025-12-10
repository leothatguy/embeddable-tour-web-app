'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

interface EmbedCodeProps {
	tourId: string;
	tourName: string;
}

export function EmbedCode({ tourId, tourName }: EmbedCodeProps) {
	const [copiedTab, setCopiedTab] = useState<string | null>(null);

	// Widget CDN URL - Production deployment
	const widgetUrl =
		process.env.NEXT_PUBLIC_WIDGET_CDN_URL || 'https://embeddable-tour-web-app-2ltc.vercel.app/tourify.umd.js';

	// API URL - Main application URL for fetching tour data
	const apiUrl =
		process.env.NEXT_PUBLIC_APP_URL ||
		(typeof window !== 'undefined' ? window.location.origin : 'https://your-app.com');

	const embedCodes = {
		html: `<!-- Add Tourify Widget -->
<script src="${widgetUrl}"></script>
<script>
  // Initialize tour when page loads
  tourify({
    tourId: '${tourId}',
    apiUrl: '${apiUrl}',
    autoStart: true,
    showAvatar: true
  });
</script>`,

		manual: `<!-- Add Tourify Widget -->
<script src="${widgetUrl}"></script>

<!-- Add a button to start the tour -->
<button id="start-tour">Start Tour</button>

<script>
  // Start tour when button is clicked
  document.getElementById('start-tour').onclick = function() {
    tourify({
      tourId: '${tourId}',
      apiUrl: '${apiUrl}',
      showAvatar: true,
      onComplete: function() {
        console.log('Tour completed!');
      }
    });
  };
</script>`,

		react: `import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Load Tourify script
    const script = document.createElement('script');
    script.src = '${widgetUrl}';
    script.async = true;
    script.onload = () => {
      // Initialize tour after script loads
      if (window.tourify) {
        window.tourify({
          tourId: '${tourId}',
          apiUrl: '${apiUrl}',
          autoStart: true,
          showAvatar: true
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return <div>{/* Your component */}</div>;
}`,

		npm: `# If you've published to npm (future):
npm install @tourify/widget

# Then in your JavaScript:
import { tourify } from '@tourify/widget';

tourify({
  tourId: '${tourId}',
  apiUrl: '${apiUrl}',
  autoStart: true,
  showAvatar: true,
  onComplete: () => {
    console.log('Tour completed!');
  }
});`,
	};

	const handleCopy = (code: string, tab: string) => {
		navigator.clipboard.writeText(code);
		setCopiedTab(tab);
		toast.success('Embed code copied to clipboard!');

		// Reset icon after 2 seconds
		setTimeout(() => setCopiedTab(null), 2000);
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<span className="text-2xl">🚀</span>
					Embed Your Tour
				</CardTitle>
				<CardDescription>Copy the code below to add &apos;{tourName}&apos; to your website</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="html" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="html">HTML</TabsTrigger>
						<TabsTrigger value="manual">Manual</TabsTrigger>
						<TabsTrigger value="react">React</TabsTrigger>
					</TabsList>

					<TabsContent value="html" className="space-y-4">
						<div className="relative">
							<pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
								<code>{embedCodes.html}</code>
							</pre>
							<Button
								size="sm"
								variant="outline"
								className="absolute top-2 right-2"
								onClick={() => handleCopy(embedCodes.html, 'html')}>
								{copiedTab === 'html' ? <CheckIcon className="w-4 h-4 mr-2" /> : <CopyIcon className="w-4 h-4 mr-2" />}
								{copiedTab === 'html' ? 'Copied!' : 'Copy'}
							</Button>
						</div>
						<p className="text-sm text-muted-foreground">
							Paste this code in your HTML file before the closing &lt;/body&gt; tag. The tour will start automatically
							when the page loads.
						</p>
					</TabsContent>

					<TabsContent value="manual" className="space-y-4">
						<div className="relative">
							<pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
								<code>{embedCodes.manual}</code>
							</pre>
							<Button
								size="sm"
								variant="outline"
								className="absolute top-2 right-2"
								onClick={() => handleCopy(embedCodes.manual, 'manual')}>
								{copiedTab === 'manual' ? (
									<CheckIcon className="w-4 h-4 mr-2" />
								) : (
									<CopyIcon className="w-4 h-4 mr-2" />
								)}
								{copiedTab === 'manual' ? 'Copied!' : 'Copy'}
							</Button>
						</div>
						<p className="text-sm text-muted-foreground">
							This version gives you control over when the tour starts using a button or custom trigger.
						</p>
					</TabsContent>

					<TabsContent value="react" className="space-y-4">
						<div className="relative">
							<pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
								<code>{embedCodes.react}</code>
							</pre>
							<Button
								size="sm"
								variant="outline"
								className="absolute top-2 right-2"
								onClick={() => handleCopy(embedCodes.react, 'react')}>
								{copiedTab === 'react' ? <CheckIcon className="w-4 h-4 mr-2" /> : <CopyIcon className="w-4 h-4 mr-2" />}
								{copiedTab === 'react' ? 'Copied!' : 'Copy'}
							</Button>
						</div>
						<p className="text-sm text-muted-foreground">
							Use this approach for React applications. The script loads dynamically and cleans up properly.
						</p>
					</TabsContent>
				</Tabs>

				<div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
					<h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">⚠️ Configuration</h4>
					<ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1 list-disc list-inside">
						<li>
							Widget loads from CDN: <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">{widgetUrl}</code>
						</li>
						<li>
							Tour data fetched from:{' '}
							<code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">
								{apiUrl}/api/tours/{tourId}
							</code>
						</li>
						<li>
							Analytics sent to:{' '}
							<code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">{apiUrl}/api/analytics/track</code>
						</li>
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
