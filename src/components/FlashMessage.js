import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';


const FlashMessage = (props) => {
    const { flash } = props
    return (
        <div>
            {
                !_.isEmpty(flash) &&
                <div className={classnames("alert alert-dismissible fade show ", {"alert-success": flash.success}, {"alert-danger": !flash.success})} role="alert">
                    { flash.message }
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }
        </div>
    )
}

FlashMessage.propTypes = {
    flash: PropTypes.object
}

export default FlashMessage