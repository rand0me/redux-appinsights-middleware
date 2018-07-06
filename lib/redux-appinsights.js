"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("applicationinsights-js");
var SETUP = 'appinsights/SETUP';
function setup(key) {
    return { type: SETUP, payload: key };
}
exports.setup = setup;
/**
 * Middleware's creator
 * @param ai AppInsights instance
 * @param propName Property name to read from your Actions
 */
function createAppInsightsMiddleware(ai, propName) {
    if (propName === void 0) { propName = 'appinsights'; }
    return function (_a) {
        var dispatch = _a.dispatch, getState = _a.getState;
        return function (next) { return function (action) {
            var _a;
            if (action.type === SETUP && ai.downloadAndSetup) {
                ai.downloadAndSetup({ instrumentationKey: action.payload });
            }
            var params = action[propName];
            if (params) {
                ;
                (_a = ai)[params.method].apply(_a, params.data);
            }
            next(action);
        }; };
    };
}
exports.createAppInsightsMiddleware = createAppInsightsMiddleware;
/**
 * Reducer's creator
 * @param propName Property name to read from your Actions
 */
function createAppInsightsReducer(propName) {
    if (propName === void 0) { propName = 'appinsights'; }
    return function (state, action) {
        if (state === void 0) { state = { events: [], key: null }; }
        if (action[propName]) {
            return { events: state.events.concat(action[propName]) };
        }
        else {
            return state;
        }
    };
}
exports.createAppInsightsReducer = createAppInsightsReducer;
//# sourceMappingURL=redux-appinsights.js.map