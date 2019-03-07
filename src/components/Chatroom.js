import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Messages from './Messages';
import SendForm from './SendForm';
import Sidebar from './Sidebar';

import '../css/chatroom.css'

class Chatroom extends Component {
    constructor(props) {
        super(props)
        this.chatRoomId = this.props.match.params.id
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    componentDidMount(){
        console.log('Chatroom did mount')
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login')
        }
        this.props.socketConnect(this.props.auth.user, this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.socketDisconnect()
            this.props.socketConnect(this.props.auth.user, nextProps.match.params.id)
        }
        console.log("* Chatroom willRecieveProps")
        console.dir(nextProps)
    }

    componentWillUnmount() {
        console.log('Chatroom will unmount')
        this.props.socketDisconnect()
    }

    handleFormSubmit(message) {
        this.props.socketSendMessage({roomId: this.props.match.params.id, message: message, from: this.props.auth.user.username})
        this.props.socketNewMessage({room: this.props.match.params.id, message: message, from: 'Me'})
    }

    render() {
        return (
            <div id="content" className="row m-0">
                <div className="col-2 bg-secondary pt-4 online-area">
                    <Sidebar onlineUsers={this.props.socket.onlineUsers}/>
                </div>
                <div className="col-10 bg-light main-area p-0">
                    <Messages roomId={this.props.match.params.id} messages={this.props.messages}/>
                    <SendForm sendMessage={this.handleFormSubmit}/>
                </div>
            </div>
        )
    }
}

Chatroom.propTypes = {

}

export default Chatroom