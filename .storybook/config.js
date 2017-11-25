import { configure } from '@storybook/react';

function loadStories() {
	// require('./sparkline.tsx')
	// require('./events.tsx')
	require('./multiple-domains.tsx')
}

configure(loadStories, module);
