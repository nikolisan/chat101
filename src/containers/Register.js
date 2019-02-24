import { connect } from 'react-redux';
import RegisterComponent from '../components/Register';
import { registerUser } from '../redux/actions/authentication';
import { addFlashMessage } from '../redux/actions/flashMessage';

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => ({
    registerUser: (user,history) => dispatch(registerUser(user, history))
})

export const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)