import { connect } from 'react-redux';
import HomeComponent from '../components/Home';
import { loginUser } from '../redux/actions/authentication';

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => ({
    
})

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)