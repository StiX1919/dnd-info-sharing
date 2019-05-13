import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import openSocket from 'socket.io-client'


import Button from '../toolComponents/Button/Button'
import GroupSelector from '../toolComponents/GroupSelector/GroupSelector'
import {getGroups, addGroup, getGroupRooms, updateCurrentRoom, updateCurrentGroup, newMessages} from '../../ducks/reducers/groupReducer'

import './GroupBar.css'

import { roomMessages } from '../../api'



class GroupBar extends Component {
    constructor(){
        super()
        this.state = {
            selectedGroup: 0,
            selectedRoom: 0 
        }
    }
    componentDidMount(){
        // const socket = openSocket('http://localhost:3001')
        // console.log(socket)
        if(this.props.user) {
            this.props.getGroups()
            // roomMessages(id, (err, messages) => {
            //     this.props.newMessages(messages)
            // })
        }
        
    }

    selectGroup = (index, id) => {
        // this.props.getGroupRooms(groupID)
        this.setState({selectedGroup: index, selectedRoom: 0})
        this.props.updateCurrentRoom(this.props.groups[index].rooms[0].id)
        this.props.updateCurrentGroup(id, this.props.groups[index].rooms[0].id)
        roomMessages(this.props.groups[index].rooms[0].id, (err, messages) => {
            this.props.newMessages(messages)
        })

    }
    selectRoom = (index, id) => {
        this.setState({selectedRoom: index})
        this.props.updateCurrentRoom(id)
        roomMessages(id, (err, messages) => {
            this.props.newMessages(messages)
        })


    }
    findClassName = () => {
        return this.props.hidden ? this.props.groups[0] ? 'groups-bar showing' : 'groups-bar empty showing' : this.props.groups[0] ? 'groups-bar' : 'groups-bar empty'
    }

    render() {
        let txtRooms = <h2>Loading</h2>
        let {selectedGroup, selectedRoom} = this.state
        let style = {marginTop: '15px'}
        let groupButts = this.props.groups.map((group, i, arr) => {
            if(i === arr.length - 1){
                style = {...style, marginBottom: '15px'}
            }
            const {group_id, group_image, group_name} = group
            return <GroupSelector key={group_id} id={group_id} index={i} buttFunc={() => this.selectGroup(i, group_id)} class={this.state.selectedGroup === i && 'select'} title={group_name} style={{...style, zIndex: 1, backgroundImage: `url(${group_image ? group_image : 'https://png.pngtree.com/png_detail/18/09/10/pngtree-brown-wooden-table-png-clipart_1926718.jpg'})`}}/>
        })
        if(this.props.groups[0]){
            txtRooms = this.props.groups[selectedGroup].rooms.map((room, i) => {
                return <h5 className={selectedRoom === i ? 'room-name selected' : 'room-name'} onClick={() => this.selectRoom(i, room.id)}>{room.name}</h5>
            })
        }
        return (
            <div className={this.findClassName()}>
                {this.props.groups[0] &&
                    <div className='groupButts'>
                        <div className='fancy-side-bar'>
                            {groupButts}
                            <DisplayBarTop index={selectedGroup} className='selector' ></DisplayBarTop>
                            <CurveTop index={selectedGroup} className='selector top'></CurveTop>
                            <BottomHolder total={this.props.groups.length}>
                                <CurveBottom index={selectedGroup} total={this.props.groups.length} className='selector bottom'></CurveBottom>
                                <DisplayBarBottom index={selectedGroup}  className='selector'></DisplayBarBottom>
                                <div className='side-color'></div>
                            </BottomHolder>
                        </div>
                        
                    </div>
                }    
                    
                <div className='new-group-holder'>
                    <h4 className='line-break'>________</h4>
                    <Button buttFunc={this.props.addGroup}  title='Add new Group' style={style}>+</Button>
                </div>
                    

                {/*room styling*/}
                <div className='roomButts'>
                    <div className='fancy-room-bar'>
                        <h3 className='room-title'>{this.props.groups[0] ? this.props.groups[selectedGroup].group_name : null}</h3>
                        {txtRooms}

                        <RoomBarTop index={selectedRoom} className='room' ></RoomBarTop>
                        <RoomCurveTop index={selectedRoom} className='room top'></RoomCurveTop>
                        <BottomRoomHolder total={this.props.groups.length}>
                            <RoomCurveBottom index={selectedRoom} total={this.props.groups.length} className='room bottom'></RoomCurveBottom>
                            <RoomBarBottom index={selectedRoom}  className='room'></RoomBarBottom>
                            <div className='side-room-color'></div>
                        </BottomRoomHolder>
                    </div>
                </div>

                
            </div>
        )
    }
}


const mapStateToProps = state => ({...state.groupReducer, user: state.userReducer.user})

export default connect(mapStateToProps, {getGroups, addGroup, getGroupRooms, updateCurrentRoom, updateCurrentGroup, newMessages})(GroupBar)






const DisplayBarTop = styled.div`
height: ${props => props.index * 67}px;
position: absolute;
width: 100%;
top: 0;
transition: .25s;
`
const DisplayBarBottom = styled.div`
height: calc( 100% - ${props => 80 + (props.index * 67)}px);
/* height: 100% */
position: inherit;
width: 100%;
bottom: 0;
transition: .25s;
`
const CurveTop = styled.div`
margin-top: ${props => props.index * 67}px;
position: absolute;
width: 100%;
top: 0;
transition: .25s;
`
const CurveBottom = styled.div`
bottom: calc( 100% - ${props => 80 + (props.index * 67)}px);
/* margin-bottom: 100% */
/* position: inherit; */
width: 100%;
/* bottom: 0; */
transition: .25s;
`
const BottomHolder = styled.div`
position: absolute;
top: 0;
width: 100%;
height: calc( 15px + ${props => (props.total * 67)}px);
z-index: -1;
min-height: 100%;
`




const RoomBarTop = styled.div`
height: ${props => 35 + props.index * 30}px;
position: absolute;
width: 100%;
top: 0;
transition: .25s;
`
const RoomBarBottom = styled.div`
height: calc( 100% - ${props => 80 + (props.index * 30)}px);
/* height: 100% */
position: inherit;
width: 100%;
bottom: 0;
transition: .25s;
`
const RoomCurveTop = styled.div`
margin-top: ${props => 35 + props.index * 30}px;
position: absolute;
width: 100%;
top: 0;
transition: .25s;
`
const RoomCurveBottom = styled.div`
bottom: calc( 100% - ${props => 80 + (props.index * 30)}px);
/* margin-bottom: 100% */
/* position: inherit; */
width: 100%;
/* bottom: 0; */
transition: .25s;
`
const BottomRoomHolder = styled.div`
position: absolute;
top: 0;
width: 100%;
height: calc( 15px + ${props => (props.total * 67)}px);
z-index: -1;
min-height: 100%;
`