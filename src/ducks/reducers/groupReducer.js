import axios from "axios";


//Action Constants

const GET_GROUPS = 'GET_GROUPS'
const ADD_GROUP = 'ADD_GROUP'
const CREATE_GROUP = 'CREATE_GROUP'
const GET_GROUP_ROOMS = 'GET_GROUP_ROOMS'

const CURRENT_ROOM = 'CURRENT_ROOM'
const CURRENT_GROUP = 'CURRENT_GROUP'
//Initial State

const initialState = {
    loading: false,
    groups: [],

    groupModel: false,
    rooms: [],
    currentRoom: 0,
    currentGroup: 0
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

export function updateCurrentRoom( roomID ) {
    return {
        type: CURRENT_ROOM,
        payload: roomID
    }
}

export function updateCurrentGroup( groupID, roomID ) {
    return {
        type: CURRENT_GROUP,
        payload: {groupID, roomID}
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
            return {...state, groups: action.payload.data, loading: false, currentGroup: action.payload.data[0].group_id, currentRoom: action.payload.data[0].rooms[0].id}
        case CREATE_GROUP + '_PENDING':
            return {...state, loading: true}
        case CREATE_GROUP + '_FULFILLED':
            return {...state, groups: [...state.groups, {...action.payload.data}], loading: false, groupModel: false}
        case GET_GROUP_ROOMS + '_FULFILLED':
            return {...state, rooms: action.payload}
        
        case CURRENT_ROOM:
            return {...state, currentRoom: action.payload}
        case CURRENT_GROUP:
            return {...state, currentGroup: action.payload.groupID, currentRoom: action.payload.roomID}
        default:
            return state
    }

}