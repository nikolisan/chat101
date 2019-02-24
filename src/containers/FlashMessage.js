import { connect } from 'react-redux';
import FlashMessageComponent from '../components/FlashMessage';

const mapStateToProps = state => {
    return {
        flash: state.flash
    }
}

export const FlashMessage = connect(mapStateToProps)(FlashMessageComponent)
