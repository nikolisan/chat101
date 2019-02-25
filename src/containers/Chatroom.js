import { connect } from 'react-redux';
import ChatroomComponent from '../components/Chatroom';
import { socketConnect, socketDisconnect, socketSendMessage, startChannel, stopChannel} from '../redux/actions/socketAction';

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
    }
})

export const Chatroom = connect(mapStateToProps, mapDispatchToProps)(ChatroomComponent)