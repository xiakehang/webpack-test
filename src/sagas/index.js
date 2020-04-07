import { takeEvery } from 'redux-saga/effects';
import {
  put,
  call
} from 'redux-saga/effects';

function* getMeta(action) {
  try { } catch (e) { }
}

export default function* sagas() {
  yield takeEvery("dddd", getMeta);
}
