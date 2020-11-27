
import { all } from 'redux-saga/effects'
import intentsSaga from './Intents/sagas/Intents.saga.js'
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
      intentsSaga()
  ])
}
