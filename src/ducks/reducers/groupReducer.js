import axios from "axios";

import {roomMessages} from '../../api'


//Action Constants

const GET_GROUPS = 'GET_GROUPS'
const ADD_GROUP = 'ADD_GROUP'
const CREATE_GROUP = 'CREATE_GROUP'
const GET_GROUP_ROOMS = 'GET_GROUP_ROOMS'

const CURRENT_ROOM = 'CURRENT_ROOM'
const CURRENT_GROUP = 'CURRENT_GROUP'

const GET_MESSAGES = 'GET_MESSAGES'
const POST_MESSAGE = 'POST_MESSAGE'

const NEW_MESSAGES = 'NEW_MESSAGES'
const NEW_MESSAGE = 'NEW_MESSAGE'
//Initial State

const initialState = {
    loading: false,
    groups: [],

    groupModel: false,
    rooms: [],
    currentRoom: 0,
    currentGroup: 0,

    messages: []
}
//Action Creators

export function getGroups() {
    return (dispatch) => {
        dispatch({
            type: GET_GROUPS,
            payload: axios.get('/api/getGroups').then(res => {
                roomMessages(res.data[0].rooms[0].id, (err, messages) => {
                    dispatch(newMessages(messages))
                })
    
                return res
            })
        })
    }
}
export function addGroup() {
    return {
        type: ADD_GROUP,
    }
}
export function createGroup(groupInfo) {
    // console.log('hit')
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


export function getMessages (id) {
    return {
        type: GET_MESSAGES,
        payload: axios.get(`/api/getMessages/${id}`)
    }
}

export function postMessage( roomID, message, time ) {
    return {
        type: POST_MESSAGE,
        payload: axios.post('/api/postMessage', {roomID, message, time})
    }
}


export function newMessages( {messages, room} ) {
    // console.log(messages, room)
    return {
        type: NEW_MESSAGES,
        payload: {messages, room}
    }
}
export function newMessage( {updatedMessage, room} ) {
    console.log('WORK: ', updatedMessage, room)
    return {
        type: NEW_MESSAGE,
        payload: {newMessage: updatedMessage, room}
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

        case GET_MESSAGES + '_PENDING':
            return {...state, loading: true, messages: []}
        case GET_MESSAGES + '_FULFILLED':
            return {...state, messages: action.payload.data, loading: false}


        case NEW_MESSAGES:
            if(state.currentRoom === action.payload.room){
                return {...state, messages: action.payload.messages}
            }
            else return state
        case NEW_MESSAGE:
            if(state.currentRoom === action.payload.room && action.payload.newMessage.message_id !== state.messages[state.messages.length - 1].message_id){
                return {...state, messages: [...state.messages, action.payload.newMessage]}
            }
            else return state
        default:
            return state
    }
}