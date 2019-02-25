import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';

import '../css/messages.css'

const Message = (props) => {
    const { from, message } = props.message
    return (
        <li className="chat-message bg-primary"><span id="from" class="text-dark">{from}</span><p id="message">{message}</p></li>
    )
}

const MessageFromMe = (props) => {
    const { from, message } = props.message
    return (
        <li className="chat-message bg-secondary"><span id="from" class="text-dark">{from}</span><p id="message">{message}</p></li>
    )
}

function Messages(props) {
    return (
        <div className="chat mx-0">
            <ul className="chat-list pt-1">
                { _.isEmpty(props.messages.messages) 
                ? <Message message={{message: "No messages to display", from: ""}}/> 
                : props.messages.messages.map((msg, ind) => 
                    {
                        if(msg.from == "Me") {
                            return (<MessageFromMe key={ind} message={msg}/>)
                        } else {
                            return (<Message key={ind} message={msg}/>)
                        }
                    })
                }
            </ul>
        </div>
    )
}

Messages.propTypes = {
    messages: PropTypes.object.isRequired
}

export default Messages

