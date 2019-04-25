import axios from "axios";
import { log } from "util";


//Action Constants

const GET_GROUPS = 'GET_GROUPS'
const ADD_GROUP = 'ADD_GROUP'
const CREATE_GROUP = 'CREATE_GROUP'
const GET_GROUP_ROOMS = 'GET_GROUP_ROOMS'

//Initial State

const initialState = {
    loading: false,
    groups: [],

    groupModel: false,
    rooms: []
}
//Action Creators

export function getGroups() {
    return {
        type: GET_GROUPS,
        payload: axios.get('/api/getGroups')
    }
}
export function addGroup() {
    return {
        type: ADD_GROUP,
    }
}
export function createGroup(groupInfo) {
    console.log('hit')
    return {
        type: CREATE_GROUP,
        payload: axios.post('/api/createGroup', groupInfo)
    }
}

export function getGroupRooms (groupID){
    const rooms = axios.get(`/api/groupRooms/${groupID}`).then(response => {
        return response.data
    });

    return {
        type: GET_GROUP_ROOMS,
        payload: rooms
    }
}


//User reducer

export default function groupReducer(state=initialState, action) {
    switch(action.type) {
        case ADD_GROUP:
            return {...state, groupModel: !state.groupModel}
        case GET_GROUPS + '_PENDING':
            return {...state, loading: true}
        case GET_GROUPS + '_FULFILLED':
            return {...state, groups: action.payload.data, loading: false}
        case CREATE_GROUP + '_PENDING':
            return {...state, loading: true}
        case CREATE_GROUP + '_FULFILLED':
            return {...state, groups: [...state.groups, {...action.payload.data}], loading: false, groupModel: false}
        case GET_GROUP_ROOMS + '_FULFILLED':
            return {...state, rooms: action.payload}
        default:
            return state
    }

}