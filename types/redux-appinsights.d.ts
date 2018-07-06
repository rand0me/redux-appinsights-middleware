import 'applicationinsights-js';
import { Middleware, AnyAction } from 'redux';
declare type InsightsEvent = {
    method: keyof Microsoft.ApplicationInsights.IAppInsights;
    data: any;
};
export declare function setup(key: string): {
    type: string;
    payload: string;
};
/**
 * Middleware's creator
 * @param ai AppInsights instance
 * @param propName Property name to read from your Actions
 */
export declare function createAppInsightsMiddleware(ai: Microsoft.ApplicationInsights.IAppInsights, propName?: string): Middleware;
/**
 * Reducer's creator
 * @param propName Property name to read from your Actions
 */
export declare function createAppInsightsReducer(propName?: string): (state: {
    events: InsightsEvent[];
    key: null;
} | undefined, action: AnyAction) => {
    events: InsightsEvent[];
    key: null;
} | {
    events: InsightsEvent[];
};
export {};
