import React, { Component } from 'react'

import '../css/InputMessage.css'

class SendForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ""
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    onInputChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSumbit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ""
        })
    }

    render() {
        return (
            <form className="send form-group row mx-2 d-flex" onSubmit={ this.handleSumbit }>
                <label htmlFor="msgBox" className="sr-only">Input Message</label>
                <input type="text" className="form-control col-10 my-auto" id="msgBox" autoComplete="off" value={this.state.message} placeholder="Enter your message" onChange={this.onInputChange}></input>
                <button type="submit" className="btn btn-primary btn-outline col-2 my-auto">Send</button>
            </form>
        )
    }
}

export default SendForm;