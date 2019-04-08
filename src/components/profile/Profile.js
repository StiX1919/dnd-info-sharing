import React, {Component} from 'react'

export default class Profile extends Component {

    render() {
        const {updateUsername, username} = this.props
        return (
            <div>
                <input onChange={(e) => updateUsername(e.target.value)} placeholder='Username' value={username}/>
            </div>
        )
    }
}