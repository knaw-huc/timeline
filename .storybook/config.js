import { configure } from '@storybook/react';

function loadStories() {
	require('./sparkline.tsx')
	require('./events.tsx')
	require('./two-domains.tsx')
	require('./three-domains.tsx')
	require('./zoom.tsx')
}

configure(loadStories, module);
