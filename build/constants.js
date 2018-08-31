"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_HEIGHT = 14;
exports.EVENT_ROW_HEIGHT = 16;
exports.DATE_BAR_HEIGHT = exports.EVENT_ROW_HEIGHT;
exports.RULER_LABELS_HEIGHT = 60;
exports.CENTER_CHANGE_DONE = 'CENTER_CHANGE_DONE';
exports.ZOOM_DONE = 'ZOOM_DONE';
exports.SCROLL_DONE = 'SCROLL_DONE';
exports.PIXELS_PER_LETTER = 8;
exports.DEFAULT_IMAGE_PATH = '/images';
class RawSegment {
}
exports.RawSegment = RawSegment;
exports.colors = [
    'rgba(211,84,0',
    'rgba(219,10,91',
    'rgba(31,58,147',
    'rgba(0,128,0'
].map(color => (opacity = 1) => `${color},${opacity})`);
