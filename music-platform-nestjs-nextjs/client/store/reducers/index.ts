import { combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { HYDRATE } from "next-redux-wrapper";
import { trackReducer } from "./trackReducer";


// создадим корневой Reducer c помощью combineReducers
const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer
})

// так же в добовляем сюда еще 1 тип HYDRATE
// и возвращаем из этой функции rootReducer
export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      if (state.count) nextState.count = state.count; // preserve count value on client side navigation
      return nextState;
    } else {
      return rootReducer(state, action);
    }
  };

// получаем тип состояния из корневого редьюсера
export type RootState = ReturnType<typeof rootReducer>