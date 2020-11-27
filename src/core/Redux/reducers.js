// react library imports
import { combineReducers } from 'redux';
import intentsReducer from './Intents/reducers/Intents.reducer'

const rootReducer = combineReducers(
  {
      intentsReducer
  }
);

export default rootReducer;
