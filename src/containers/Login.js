import { connect } from 'react-redux';
import LoginComponent from '../components/Login';
import { loginUser } from '../redux/actions/authentication';

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors,
        flash: state.flash,
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(loginUser(user))
})

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)