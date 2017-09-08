"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const icons_1 = require("./icons");
const setIcons = (types, flip) => {
    const icons = types.length ?
        types.slice(0, 1)
            .map(t => icons_1.default[t])
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
exports.default = setIcons;
