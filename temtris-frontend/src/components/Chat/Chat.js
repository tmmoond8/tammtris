import React, {Component} from 'react';
import ChatMessageItem from '../ChatMessageItem';
import ChatMessageInput from '../ChatMessageInput';
import SocketClient, { Message } from '../../lib/SocketClient';
import uuid from 'uuid/v1';
import styles from './Chat.scss';
import className from 'classnames/bind';
import gameAPI from '../../api/gamePlay';

const cx = className.bind(styles);

class Chat extends Component {
  constructor(props) {
    super(props);
    const userId = uuid();
    this.handleSendMessage = this.handleSendMessage.bind(this)
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    this.actions = props.PlayGroundActions();
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

    componentDidMount() {
        // join으로 id 정보를 받은 후 socket을 연결
        gameAPI.join().then((response) => {
            const userInfo = response.data;
            console.dir(userInfo)
            SocketClient.sendMessage('join', {
                userInfo,
                chattingRoom: 'openChatting'
            });

            SocketClient.addEventOn(userInfo.id, (data) => {
                this.actions.playerInfo(data);
            });

            SocketClient.addEventOn('message', (msg) => {
                this.actions.chattingMessages({...msg, userInfo})
            });
        }).catch(err => {
            console.error(err);
        })
    }

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