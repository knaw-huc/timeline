"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
const redux_1 = require("redux");
exports.default = redux_1.combineReducers({
    events: events_1.default,
});
