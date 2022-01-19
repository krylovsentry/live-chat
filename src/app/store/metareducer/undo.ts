import {Action, ActionReducer} from "@ngrx/store";

export const UNDO_ACTION = "UNDO_ACTION";

const STORE_INIT_ACTION = '@ngrx/store/init';
const STORE_UPDATE_ACTION = '@ngrx/store/update-reducers';

export function undo(action: Action) {
  return {
    type: UNDO_ACTION,
    payload: action
  }
}

let executedActions: Array<Action> = [];
let initialState;

export function handleUndo(mainReducer: ActionReducer<unknown>): ActionReducer<unknown> {
  return (state, action:any) => {
    if (action.type === UNDO_ACTION) {
      let newState = initialState;
      executedActions = executedActions.filter(exAction => exAction !== action.payload);
      executedActions.forEach((executedAction => newState = mainReducer(newState,executedAction)));
      return newState;
    }
    if (!(action.type === STORE_INIT_ACTION || action.type === STORE_UPDATE_ACTION)) {
      executedActions.push(action);
    }
    const updatedState = mainReducer(state, action);
    return updatedState;
  }
}
