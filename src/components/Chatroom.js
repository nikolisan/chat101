import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Chatroom extends Component {
    constructor(props) {
        super(props)
        this.chatRoomId = this.props.match.params.id
    }

    componentDidMount(){
        console.log('Chatroom did mount')
        this.props.socketConnect(this.props.auth.user)
    }

    componentWillUnmount() {
        console.log('Chatroom will unmount')
        this.props.socketDisconnect()
    }

    render() {
        return (
            <div className="container text-center">
                <h1 className="display-4">Chatroom { this.chatRoomId && '#'+this.chatRoomId }</h1>
            </div>
        )
    }
}

Chatroom.propTypes = {

}

export default Chatroom