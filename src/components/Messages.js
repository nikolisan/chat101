import React from 'react'
import PropTypes from 'prop-types'

function Messages(props) {
    return (
        <div>
            <h3>Messages</h3>
            <ul>
                {props.messages.messages.map((msg, ind) => <li key={ind}>{msg.from + ":..." + msg.message}</li>)}
            </ul>
        </div>
    )
}

Messages.propTypes = {
    messages: PropTypes.object.isRequired
}

export default Messages

