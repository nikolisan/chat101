import React, { Component } from 'react'

class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('Sidebar did mount')
        console.log(this.props)
    }

    componentWillUpdate() {
        console.log('Sidebar will update')
        console.log(this.props)
    }

    componentWillReceiveProps() {
        console.log('Sidebar will recieve props')
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <h5>ONLINE - <span id="online-count">{this.props.onlineUsers.length}</span></h5>
                <ul className="list-group list-online">
                    {
                        this.props.onlineUsers.map((user, index) => {
                            return(
                                <li className="list-group-item online" key={index}>{user}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Sidebar