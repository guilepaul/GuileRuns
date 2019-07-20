import { createActions } from 'reduxsauce'

export const {
    Types,
    Creators
} = createActions({
    signinRequest: ['email', 'passwd'],
    signinSuccess: ['user'],
    signinFailure: ['error'],

    authRequest: null,
    authSuccess: ['user'],
    authFailure: null,

    destroyAuthRequest: null,
    destroyAuthSuccess: null,

    getRunsRequest: ['admin'],
    getRunsSuccess: ['runs'],
    getRunsFailure: null,

    getUsersRequest: null,
    getUsersSuccess: ['users'],
    getUsersFailure: null,

    removeUserRequest: ['id'],
    removeUserSuccess: ['id'],
    removeUserFailure: ['error'],

    createRunReset: null,
    createRunRequest: ['run'],
    createRunSuccess: ['run'],
    createRunFailure: ['error'],

    removeRunRequest: ['id'],
    removeRunSuccess: ['id'],
    removeRunFailure: ['error'],

    updateProfileReset: null,
    updateProfileRequest: ['user'],
    updateProfileSuccess: ['user'],
    updateProfileFailure: ['error'],

    createProfileReset: null,
    createProfileRequest: ['user'],
    createProfileSuccess: ['user'],
    createProfileFailure: ['error']
})
export default Creators