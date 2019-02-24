import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Messages from './Messages';

class Chatroom extends Component {
    constructor(props) {
        super(props)
        this.chatRoomId = this.props.match.params.id
        this.handleTestClick = this.handleTestClick.bind(this)
    }

    componentDidMount(){
        console.log('Chatroom did mount')
        this.props.socketConnect(this.props.auth.user)
    }

    componentWillReceiveProps(nextProps) {
        // console.dir(nextProps.messages)
    }

    componentWillUnmount() {
        console.log('Chatroom will unmount')
        this.props.socketDisconnect()
    }

    handleTestClick() {
        this.props.socketSendMessage({message: "test message", from: this.props.auth.user.username})
    }

    render() {
        return (
            <div className="container text-center">
                <h1 className="display-4">Chatroom { this.chatRoomId && '#'+this.chatRoomId }</h1>
                <button onClick={() => this.handleTestClick()}>Send Test Message</button>
                <Messages messages={this.props.messages}/>
            </div>
        )
    }
}

Chatroom.propTypes = {

}

export default Chatroom