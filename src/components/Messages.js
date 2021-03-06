import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';

import '../css/messages.css'

const Message = (props) => {
    const { from, message } = props.message
    return (
        <li className="chat-message bg-primary"><span id="from" className="text-dark">{from}</span><p id="message">{message}</p></li>
    )
}

const MessageFromMe = (props) => {
    const { from, message } = props.message
    return (
        <li className="chat-message bg-secondary"><span id="from" className="text-dark">{from}</span><p id="message">{message}</p></li>
    )
}

class Messages extends Component {
    constructor(props) {
        super(props);
        this.messagesEnd = createRef();
        this.state = {
            messages: []
        }
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView(false)
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    componentWillReceiveProps(nextProps) {
        const newRoomMessages = nextProps.messages.messages.filter(message => message.room == nextProps.roomId)
        this.setState({messages: newRoomMessages})
    }

    render() {
        return (
            <div className="chat mx-0">
                <ul className="chat-list pt-1">
                    { _.isEmpty(this.state.messages) 
                    ? <Message message={{message: "No messages to display", from: ""}}/> 
                    : this.state.messages.map((msg, ind) => 
                        {   
                            if(msg.from == "Me") {
                                return (<MessageFromMe key={ind} message={msg}/>)
                            } else {
                                return (<Message key={ind} message={msg}/>)
                            }
                        })
                    }
                </ul>
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}

Messages.propTypes = {
    messages: PropTypes.object.isRequired
}

export default Messages

