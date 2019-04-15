import axios from "axios";


//Action Constants

const GET_USER = "GET_USER"
const SET_USER = "SET_USER"
const PROFILE = "PROFILE"
const SAVE_USER_INFO = "SAVE_USER_INFO"

//Initial State

const initialState = {
    testNum: 0,
    loading: false,
    user: null,
    profile: false,

}
//Action Creators

export function getUser() {
    return {
        type: GET_USER,
        payload: axios.get('/api/getUser')
    }
}
export function setUser(userInfo){
    return {
        type: SET_USER,
        payload: userInfo
    }
}

export function openProfile() {
    return {
        type: PROFILE
    }
}

export function saveUserInfo(info) {
    return {
        type:  SAVE_USER_INFO,
        payload: axios.put('/api/updateUser', info)
    }
}


//User reducer

export default function userReducer(state=initialState, action) {
    switch(action.type) {
        case SET_USER:
            return {...state, user: action.payload}


        case PROFILE:
            return {...state, profile: !state.profile}

        case SAVE_USER_INFO + '_PENDING':
            return {...state, loading: true}

        case SAVE_USER_INFO + '_FULFILLED':
            return {...state, loading: false, user: action.payload.data}
            
        default:
            return state
    }

}