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
        this.props.socketConnect(this.props.auth.user)
        console.log(process.env.REACT_APP_BASE_URL)
    }

    componentWillReceiveProps(nextProps) {
        // console.dir(nextProps.messages)
    }

    componentWillUnmount() {
        console.log('Chatroom will unmount')
        this.props.socketDisconnect()
    }

    handleFormSubmit(message) {
        this.props.socketSendMessage({message: message, from: this.props.auth.user.username})
        this.props.socketNewMessage({message: message, from: 'Me'})
    }

    render() {
        return (
            <div id="content" className="row m-0">
                <div className="col-2 bg-secondary pt-4 online-area">
                    <Sidebar onlineUsers={this.props.socket.onlineUsers}/>
                </div>
                <div className="col-10 bg-light main-area p-0">
                    <Messages messages={this.props.messages}/>
                    <SendForm sendMessage={this.handleFormSubmit}/>
                </div>
            </div>
        )
    }
}

Chatroom.propTypes = {

}

export default Chatroom