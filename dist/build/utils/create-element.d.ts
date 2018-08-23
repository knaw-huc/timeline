export declare const createSvg: (name: string, style?: string[], attrs?: {
    [k: string]: string;
}) => SVGElement;
declare function createElement(name: 'div', className?: string, style?: string[], dynamicStyle?: string[]): HTMLDivElement;
declare function createElement(name: 'canvas', className?: string, style?: string[], dynamicStyle?: string[]): HTMLCanvasElement;
export default createElement;
