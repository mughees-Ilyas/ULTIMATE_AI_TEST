import {
    INTENTS,
    INTENTS_FAIL,
    INTENTS_SUCCESS
} from '../actions/Intents.actions';

const initialState = {
  loading: false,
  loaded: false,
  data: null,
  error: null
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {

      case INTENTS:
          return {
              ...state,
              loading: true,
              loaded: false,
              data: null,
              error: null,
          };

      case INTENTS_SUCCESS:
          return {
              ...state,
              loading: false,
              loaded: true,
              error: null,
              data: action.data
          };

      case INTENTS_FAIL:
          return {
              ...state,
              loading: false,
              loaded: true,
              data: null,
              error: action.ex
          };

    default:
      return state
  }
}
