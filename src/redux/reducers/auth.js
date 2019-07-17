import { createReducer } from 'reduxsauce'
import { Types } from '../actionsCreators'

export const INITIAL_STATE ={
    isAuthing: false,
    isAuth: false,
    isSigningin: false,
    isSaving: false,
    saved: false,
    user: {},
    error: false,
    errorMessage: ''
}
export const signinRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigninin: true,
        error: false,
        erroMessage: ''
    }
}
export const signinSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigninin: false,
        isAuth: true,
        user: action.user
    }
}
export const signinFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigninin: false,
        error: true,
        erroMessage: action.error
    }
}
export const authRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigninin: true,
        error: false,
        erroMessage: ''
    }
}
export const authSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigninin: false,
        isAuth: true,
        user: action.user
    }
}
export const authFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigninin: false,
        isAuth: false,
        error: true,
        erroMessage: action.error
    }
}

export const updateProfileRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving: true,
        error: false,
        erroMessage: '',
        saved: false
    }
}
export const updateProfileSuccess = (state = INITIAL_STATE, action) => {
    const newUser = {
        ...state.user
    }
    Object.keys(action.user).forEach(key => {
        newUser[key] = action.user[key]
    })
    return {
        ...state,
        isSigninin: false,
        user: newUser,
        saved: true
    }
}
export const updateProfileFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving: false,
        error: true,
        erroMessage: action.error,
        saved: false
    }
}
export const updateProfileReset = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving: false,
        saved: false
    }
}

export const destroyAuthSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigninin: false,
        isAuth: false,
        user: {}
    }
}
export const HANDLERS = {
    [Types.SIGNIN_REQUEST]: signinRequest,
    [Types.SIGNIN_SUCCESS]: signinSuccess,
    [Types.SIGNIN_FAILURE]: signinFailure,
    
    [Types.AUTH_REQUEST]: authRequest,
    [Types.AUTH_SUCCESS]: authSuccess,
    [Types.AUTH_FAILURE]: authFailure,

    [Types.DESTROY_AUTH_SUCCESS]: destroyAuthSuccess,

    [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
    [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
    [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,
    [Types.UPDATE_PROFILE_RESET]: updateProfileReset

}
export default createReducer(INITIAL_STATE, HANDLERS)