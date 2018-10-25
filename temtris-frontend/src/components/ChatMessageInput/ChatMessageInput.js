import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './ChatMessageInput.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

class ChatMessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    };

    handleKeyPress = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            this.props.onSendMessage(this.state.message);
            this.setState({
                message: ''
            })
        }
        e.stopPropagation()
    };

    handleChangeMessageInput = (msg) => {
        this.setState({
            message: msg
        })
    };

    render() {
        return (
             <input type="text" className={cx('chat-message-input')} placeholder="Type here..." 
             value={this.state.message}
             onChange={e => this.handleChangeMessageInput(e.target.value)}
             onKeyDown={e => this.handleKeyPress.bind(this)(e)}
             />
        )
    };
}

ChatMessageInput.propTypes = {
    onSendMessage: PropTypes.func.isRequired
}

export default ChatMessageInput;