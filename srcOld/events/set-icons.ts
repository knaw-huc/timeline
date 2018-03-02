import iconsByType from "./icons";

const setIcons = (types: string[], flip?: boolean) => {
	const icons = types.length ?
		types.slice(0, 1)
			.map(t => iconsByType[t])
			.map(t => (t == null) ? '| ' : t)
			.join(' ') :
		'| ';

	const place = flip ? 'after' : 'before';

	return `
		&:${place} {
			content: '${icons}';	
		}
	`;
};

export default setIcons;
