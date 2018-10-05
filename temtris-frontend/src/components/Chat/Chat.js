import React, {Component} from 'react';
import ChatMessageItem from 'components/ChatMessageItem';
import ChatMessageInput from 'components/ChatMessageInput';
import SocketClient, { Message } from 'lib/SocketClient';
import styles from './Chat.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this)
    this.chattingRef = React.createRef();
  };

    handleSendMessage = (msg) => {
        const message = new Message(this.props.userInfo, msg);
        SocketClient.sendMessage('message', message);
    };

    componentDidUpdate() {
        console.log('update');
        this.chattingRef.current.scrollTop = this.chattingRef.current.scrollHeight;
    }

    render() {
        return (
            <div className={cx('common-block')}>
                <ul ref={this.chattingRef} className={cx('chat-message-list')}>
                    {this.props.chattingMessages.map((message) => {
                        return (
                            <ChatMessageItem key={message.messageId} message={message}/>
                        )
                    })}
                </ul>
                <div className={cx('chat-input')}>
                    <ChatMessageInput className={cx('test')}
                        onSendMessage={this.handleSendMessage}
                    />
                </div>
            </div>
        )
    };
}

export default Chat;