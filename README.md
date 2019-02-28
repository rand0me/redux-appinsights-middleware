# Redux AppInsights Middleware ([Docs](https://rand0me.github.io/redux-appinsights-middleware/))


[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/rand0me/redux-appinsights-middleware.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/rand0me/redux-appinsights-middleware.svg)](https://travis-ci.org/rand0me/redux-appinsights-middleware)
[![Coveralls](https://img.shields.io/coveralls/rand0me/redux-appinsights-middleware.svg)](https://coveralls.io/github/rand0me/redux-appinsights-middleware)

This middleware provides a more robust AppInsights API for Redux-based applications.

## Installation
At first, install the package:

```
$ npm install redux-appinsights-middleware
```

## Usage

Then use a middleware and reducer in your redux store:
```typescript
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { setup, createAppInsightsMiddleware, createAppInsightsReducer } from "redux-appinsights-middleware";
import { AppInsights } from "applicationinsights-js";

import * as reducers from "./reducers/";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<IState>(
    combineReducers<IState>({ ...reducers, appinsights: createAppInsightsReducer() }),
    composeEnhancers(applyMiddleware(createAppInsightsMiddleware(AppInsights) )),
);

// Now you can track events like this:
store.dispatch({
    type: "app/MY_ACTION",
    payload: { ... },
    meta: {
        appinsights: {
            method: "trackPageView",
            data: [ "Page Title", "http://page.url" ],
        }
    }
});

// If you aren't dispatch this action, nothing will be sent to AppInsights
store.dispatch(setup(AI_KEY));
```
