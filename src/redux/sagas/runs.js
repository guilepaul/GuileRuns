import axios from 'axios'
import ActionCreators from '../actionsCreators'
import { put } from 'redux-saga/effects'

export function* getRuns(){
    const token = localStorage.getItem('token')
    const runs = yield axios.get('http://localhost:3001/runs', {
        headers:{
            Authorization: 'Bearer '+token
        }
    })
    yield put(ActionCreators.getRunsSuccess(runs.data.data))
}
export function* createRun(action){
    const token = localStorage.getItem('token')
    const runs = yield axios.post('http://localhost:3001/runs', action.run, {
        headers:{
            Authorization: 'Bearer '+token
        }
    })
    //yield put(ActionCreators.getRunsSuccess(runs.data))
}