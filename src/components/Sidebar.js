import React, { Component } from 'react'
import { Menu, Item, Seperator, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

const MyAwesomeMenu = () => (
    <Menu id='menu_id'>
       <Item>Lorem</Item>
       <Item>Ipsum</Item>
       <Item disabled>Dolor</Item>
    </Menu>
);


class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('** Sidebar did mount')
        console.log(this.props)
    }

    componentWillUpdate(nextProps) {
        console.log('** Sidebar will update')
        console.log(nextProps)
    }

    componentWillReceiveProps(nextProps) {
        console.log('** Sidebar will recieve props')
        console.log(nextProps)
    }

    render() {
        const onlineUsers = this.props.onlineUsers
        return (
            <div>
                <h5>ONLINE - <span id="online-count">{Object.keys(onlineUsers).length}</span></h5>
                <MenuProvider id="menu_id" style={{ border: '1px solid purple', display: 'inline-block' }}>
                    <ul className="list-group list-online">
                        {
                            Object.keys(onlineUsers).map((user, index) => {
                                return(
                                    <li className="list-group-item online" key={index}>{user}@{onlineUsers[user].room}</li>
                                )
                            })
                        }
                    </ul>        
                </MenuProvider> 
                <MyAwesomeMenu />               
            </div>
        )
    }
}

export default Sidebar