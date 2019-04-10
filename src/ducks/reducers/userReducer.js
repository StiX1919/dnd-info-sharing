import axios from "axios";


//Action Constants

const GET_USER = "GET_USER"
const SET_USER = "SET_USER"
const PROFILE = "PROFILE"

//Initial State

const initialState = {
    testNum: 0,
    isLoading: false,
    user: null,
    profile: false

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


//User reducer

export default function userReducer(state=initialState, action) {
    switch(action.type) {
        case SET_USER:
            return {...state, user: action.payload}


        case PROFILE:
            return {...state, profile: !state.profile}
            
        default:
            return state
    }

}