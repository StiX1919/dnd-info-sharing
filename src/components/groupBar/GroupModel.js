import React, {Component} from 'react'

import {connect} from 'react-redux'
import {createGroup, addGroup} from '../../ducks/reducers/groupReducer'
import Button from '../toolComponents/Button/Button'

import './GroupModel.css'

class GroupModel extends Component {
    constructor() {
        super()
        this.state = {
            groupName: '',
            groupImage: ''
        }
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({[name]: value})
    }
    addDefaultImg = (e) => {
        e.target.src = 'https://png.pngtree.com/png_detail/18/09/10/pngtree-brown-wooden-group-png-clipart_1926718.jpg'
    }


    render() {
        console.log('group state', this.state)
        return (
            <div className='group-model'>
                <h1>New Group</h1>
                <input 
                    type='text' 
                    id='group-name-input' 
                    className='group-input t-name-text' 
                    placeholder='Group name' 
                    value={this.state.groupName}
                    name='groupName'
                    onChange={this.handleChange}/>
                <label htmlFor="username-input" className="group-name-label">Group Name</label>
                <input 
                    type='text' 
                    id='group-pic-input' 
                    className='group-input t-pic-text' 
                    placeholder='Group image'
                    value={this.state.groupImage}
                    name='groupImage'
                    onChange={this.handleChange}/>
                <label htmlFor="prof-pic-input" className="group-pic-label">Group Image</label>
                <img className='demo-t-pic' src={this.state.groupImage} onError={this.addDefaultImg} alt='old profile pic'/>

                <button onClick={() => this.props.createGroup(this.state)}>Create Group</button>


                <Button buttFunc={this.props.addGroup} style={{width: '20px', height: '20px'}} class='close-model'>X</Button>
            </div>
        )
    }
}

const mapStateToProps = state => state.groupReducer

export default connect(mapStateToProps, {createGroup, addGroup})(GroupModel)