import { connect } from 'react-redux';
import ChatroomComponent from '../components/Chatroom';
import { socketConnect, socketDisconnect, socketSendMessage, socketNewMessage } from '../redux/actions/socketAction';

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => ({
    socketConnect: (user) => {
        dispatch(socketConnect(user))
    },
    socketDisconnect: () => {
        dispatch(socketDisconnect())
    },
    socketSendMessage: (message) => {
        dispatch(socketSendMessage(message))
    },
    socketNewMessage: (message) => {
        dispatch(socketNewMessage(message))
    },
})

export const Chatroom = connect(mapStateToProps, mapDispatchToProps)(ChatroomComponent)