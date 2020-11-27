import {
    INTENTS,
    INTENTS_FAIL,
    INTENTS_SUCCESS
} from '../actions/Intents.actions';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import data from '../../data'

function fetchData(payload) {
    // ideally we should be getting data from BE here, but as we are just mocking the service I am returning the data from file.

    return {data};
}

function* intents(payload) {
    const { data, ex } = yield call(fetchData,payload);
    if (data)
        yield put({ type:INTENTS_SUCCESS, data });
    else
        yield put({ type:INTENTS_FAIL, ex });
}

function* watchIntents() {
    yield takeLatest(INTENTS, intents)
}

export default function* intentsSaga() {
  yield all([
      watchIntents()
  ]);
}
