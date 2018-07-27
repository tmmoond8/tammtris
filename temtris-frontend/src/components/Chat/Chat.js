import React, {Component} from 'react';
import ChatMessageItem from '../ChatMessageItem';
import ChatMessageInput from '../ChatMessageInput';
import SocketClient, { Message } from '../../lib/SocketClient';
import styles from './Chat.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this)
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);

    const { userInfo, broadcastActions } = props;

    SocketClient.sendMessage('join', {
        userInfo,
        chattingRoom: 'openChatting'
    });

    SocketClient.addEventOn('message', (msg) => {
        broadcastActions.chattingMessages({...msg, userInfo})
    });
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