import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Chatroom extends Component {
    constructor(props) {
        super(props)
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
            <div className="container">
                <h1 className="display-4">Chatroom</h1>
            </div>
        )
    }
}

Chatroom.propTypes = {

}

export default Chatroom