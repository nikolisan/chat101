import { connect } from 'react-redux';
import Component from '../components/Component';
import { actionName } from '../redux/actions';

const mapStateToProps = state => ({

})

const mapDispatchToProps = actionName => ({
    action: (item) => {
        dispatch(actionName(item))
    }
})

export const BoilerplateContainer = connect(mapStateToProps, mapDispatchToProps)(Component)