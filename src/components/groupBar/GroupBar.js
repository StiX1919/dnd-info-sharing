import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'


import Button from '../toolComponents/Button/Button'
import GroupSelector from '../toolComponents/GroupSelector/GroupSelector'
import {getGroups, addGroup} from '../../ducks/reducers/groupReducer'

import './GroupBar.css'


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


class GroupBar extends Component {
    constructor(){
        super()
        this.state = {
            selectedGroup: 0
        }
    }
    componentDidMount(){
        if(this.props.user) {
            this.props.getGroups()
        }
    }

    selectGroup = (index) => {
        this.setState({selectedGroup: index})
    }

    render() {
        console.log(document.getElementsByClassName('new-group-holder'))
        let {selectedGroup} = this.state
        let style = {marginTop: '15px'}
        let groupButts = this.props.groups.map((group, i, arr) => {
            if(i === arr.length - 1){
                style = {...style, marginBottom: '15px'}
            }
            const {group_id, group_image, group_name} = group
            return <GroupSelector key={group_id} index={i} buttFunc={this.selectGroup} class={this.state.selectedGroup === i && 'select'} title={group_name} style={{...style, zIndex: 1, backgroundImage: `url(${group_image ? group_image : 'https://png.pngtree.com/png_detail/18/09/10/pngtree-brown-wooden-table-png-clipart_1926718.jpg'})`}}/>
        })
        return (
            <div className={this.props.groups[0] ? 'groups-bar' : 'groups-bar empty'}>
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
                
            </div>
        )
    }
}


const mapStateToProps = state => ({...state.groupReducer, user: state.userReducer.user})

export default connect(mapStateToProps, {getGroups, addGroup})(GroupBar)