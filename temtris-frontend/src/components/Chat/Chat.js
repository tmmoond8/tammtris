import React, {Component} from 'react';
import ChatMessageItem from '../ChatMessageItem';
import ChatMessageInput from '../ChatMessageInput';
import SocketClient, { Message } from '../../lib/SocketClient';
import uuid from 'uuid/v1';
import styles from './Chat.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

class Chat extends Component {
  constructor(props) {
    super(props);
    const userId = uuid();
    this.handleSendMessage = this.handleSendMessage.bind(this)
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);

    SocketClient.sendMessage('join', {
        userId: userId,
        chattingRoom: 'openChatting'
    });

    SocketClient.addEventOn(userId, (data) => {
        props.PlayGroundActions().playerInfo(data);
    });

    SocketClient.addEventOn('message', (msg) => {
        props.PlayGroundActions().chattingMessages({...msg, userInfo: props.userInfo})
    });
  };

    componentWillReceiveProps(nextProps) {
        // if (nextProps !== this.state.user) {
        //     this.setState({
        //         user: nextProps.user
        //     })
        // }
    };

    handleSendMessage = (msg) => {
        const message = new Message(this.props.userInfo, msg);
        SocketClient.sendMessage('message', message);
    };

    render() {
        return (
            <div className="common-block">
                <ul className={cx('chat-message-list')}>
                    {this.props.chattingMessages.map((message) => {
                        return (
                            <ChatMessageItem key={message.messageId} message={message}/>
                        )
                    })}
                </ul>
                <ChatMessageInput
                    onSendMessage={this.handleSendMessage}
                />
            </div>
        )
    };
}

export default Chat;