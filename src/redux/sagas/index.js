import { takeLatest, all, put } from 'redux-saga/effects'
import { Types } from '../actionsCreators'

import ActionCreators from '../actionsCreators'

import { getRuns, createRun, removeRun } from './runs'
import { auth, login, destroyAuth, updateProfile, createProfile } from './auth'
import { getUsers, removeUser } from './users'



export default function* rootSaga() {
    yield all([
        takeLatest(Types.SIGNIN_REQUEST, login),
        takeLatest(Types.AUTH_REQUEST, auth),
        takeLatest(Types.GET_RUNS_REQUEST, getRuns),
        takeLatest(Types.GET_USERS_REQUEST, getUsers),
        takeLatest(Types.CREATE_RUN_REQUEST, createRun),
        takeLatest(Types.REMOVE_RUN_REQUEST, removeRun),
        takeLatest(Types.REMOVE_USER_REQUEST, removeUser),
        takeLatest(Types.DESTROY_AUTH_REQUEST, destroyAuth),
        takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile),
        takeLatest(Types.CREATE_PROFILE_REQUEST, createProfile),

        put(ActionCreators.authRequest())
    ])
}