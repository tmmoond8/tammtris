import React, {Component} from 'react';
import {MESSAGE_TYPE} from 'lib/SocketClient';
import styles from './ChatMessageItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ChatMessageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
           message: props.message
        }
        this.createMessage(props.message);
    }

    createMessage(msg) {
        const type = msg.type;
        if (type === MESSAGE_TYPE.BROADCAST) {
            this.message = this.broadcast;
        } else if (type === MESSAGE_TYPE.NOTIFY) {
            this.message = this.notify;
        }
    }

    broadcast(msg) {
        return (
            <div>
                <span className={cx('chat-username')}>
                    {msg.user.emoji} {msg.user.name}
                </span>
                <span>{msg.message}</span>
            </div>
        )
    }

    notify(msg) {
        const style = {
            color: 'orangered'
        }
        return (
            <div style={style}>
                <span>{msg.message}</span>
            </div>
        )
    }

    render() {
        return (
            <li className={cx('chat-message-item')}>
                {this.message(this.props.message)}
            </li>
        )
    };
}

export default ChatMessageItem;