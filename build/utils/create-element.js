"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSvg = (name, style, attrs = {}) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    if (style != null)
        el.setAttribute('style', style.join(';').concat(';'));
    Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));
    return el;
};
const rules = {};
exports.default = (name, className, style, dynamicStyle) => {
    if (!className)
        return document.createElement(name);
    let el;
    if (rules.hasOwnProperty(className)) {
        el = rules[className].cloneNode(false);
    }
    else {
        el = document.createElement(name);
        el.classList.add(className);
        if (style) {
            document.styleSheets[0].insertRule(`.${className} { ${style.join(';').concat(';')} }`);
        }
        rules[className] = el.cloneNode(false);
    }
    if (dynamicStyle)
        el.setAttribute('style', dynamicStyle.join(';').concat(';'));
    return el;
};
