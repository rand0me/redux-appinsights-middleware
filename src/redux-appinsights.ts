import { AppInsights } from 'applicationinsights-js'
import { Dispatch, Middleware, AnyAction } from 'redux'

type InsightsEvent = {
  method: string
  data: any[]
}

const SETUP = 'appinsights/SETUP'

type SetupAction = { type: string; payload: typeof AppInsights.config }

function isSetupAction(action: AnyAction): action is SetupAction {
  return action.type === SETUP
}

export function setup(config: typeof AppInsights.config): SetupAction {
  return { type: SETUP, payload: config }
}

/**
 * Middleware's creator
 * @param ai AppInsights instance
 * @param propName Property name to read from your Actions
 */
export function createAppInsightsMiddleware(
  ai: Microsoft.ApplicationInsights.IAppInsights,
  propName = 'appinsights'
): Middleware {
  return ({ dispatch, getState }) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    if (isSetupAction(action) && ai.downloadAndSetup) {
      ai.downloadAndSetup(action.payload)
    } else {
      const params: InsightsEvent = action.meta && action.meta[propName]
      if (params) {
        ;(ai as any)[params.method](...params.data)
      }
      next(action)
    }
  }
}

/**
 * Reducer's creator
 * @param propName Property name to read from your Actions
 */
export function createAppInsightsReducer(propName = 'appinsights') {
  return (state = { events: [] as InsightsEvent[] }, action: AnyAction) => {
    if (action.meta && action.meta[propName]) {
      return { events: state.events.concat(action.meta[propName]) }
    } else {
      return state
    }
  }
}
