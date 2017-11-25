import { configure } from '@storybook/react';

function loadStories() {
	// require('./sparkline.tsx')
	require('./events.tsx')
}

configure(loadStories, module);
