import { connect } from 'react-redux';
import NavbarComponent from '../components/Navbar';
import { logoutUser } from '../redux/actions/authentication';

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => ({
    logoutUser: (history) => {
        dispatch(logoutUser(history))
    }
})

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent)