import React, { Component } from 'react'

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
    }

    render() {
        return (
            <div className="container">
                <form className="form-inline" onSubmit={ this.handleSumbit }>
                    <div className="form-group">
                        <label htmlFor="msgBox" className="sr-only">Input Message</label>
                        <input type="text" className="form-text" id="msgBox" value={this.state.message} placeholder="Enter your message" onChange={this.onInputChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Send</button>
                </form>
            </div>
        )
    }
}

export default SendForm;