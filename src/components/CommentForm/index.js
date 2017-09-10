import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { addComment } from '../../AC';

import './style.css'

class CommentForm extends Component {
    static propTypes = {
        user: PropTypes.string,
        text: PropTypes.string,
    };

    state = {
        user: '',
        text: ''
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                user: <input value = {this.state.user}
                             onChange = {this.handleChange('user')}
                             className = {this.getClassName('user')} />
                comment: <input value = {this.state.text}
                                onChange = {this.handleChange('text')}
                                className = {this.getClassName('text')} />
                <input type = "submit" value = "submit"/>
            </form>
        )
    }

    handleSubmit = ev => {
        ev.preventDefault()
        let {user, text} = this.state;
        this.props.dispatch(
            addComment(
                user,
                text,
                this.props.articleId
                /* middleware: commentId */
            )
        );
        this.setState({
            user: '',
            text: ''
        })
    }

    getClassName = type => this.state[type].length && this.state[type].length < limits[type].min
        ? 'form-input__error' : ''

    handleChange = type => ev => {
        const {value} = ev.target
        if (value.length > limits[type].max) return
        this.setState({
            [type]: value
        })
    }
}

const limits = {
    user: {
        min: 10,
        max: 20
    },
    text: {
        min: 30,
        max: 100
    }
}

export default connect(null)(CommentForm)