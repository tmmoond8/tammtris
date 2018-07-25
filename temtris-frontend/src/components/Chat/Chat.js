import React, {Component} from 'react';
import ChatMessageItem from '../ChatMessageItem';
import ChatMessageInput from '../ChatMessageInput';
import SocketClient, {Message} from '../../lib/SocketClient';;

const MESSAGE_TYPE = {
  BROADCAST : 0,
  NOTIFY : 32,
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: [{
          messageId: '12321321313',
          type: MESSAGE_TYPE.BROADCAST,
          message: 'test',
          user: props.userInfo
        }],
        user: props.userInfo
    };

    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    SocketClient.sendMessage('join', {
        userId: Message.createMessageId(),
        chattingRoom: 'openChatting'
    });
    SocketClient.addEventOn('message', (msg) => {
      const messages = Array.prototype.slice.call(this.state.messages);
        user: props.userInfo
        messages.push({...msg, user: props.userInfo});
      this.setState({
        messages: messages
      })
    });
  };

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.state.user) {
            this.setState({
                user: nextProps.user
            })
        }
    };

    componentDidMount() {
    }

    handleSendMessage = (msg) => {
        const message = new Message(this.state.user, msg);
        SocketClient.sendMessage('message', message);
    };

    render() {
        return (
            <div className="Common-Block">
                <ul className="Chat-Message-List">
                    {this.state.messages.map((message) => {
                        return (
                            <ChatMessageItem key={message.messageId} message={message}/>
                        )
                    })}
                </ul>
                <ChatMessageInput
                    onSendMessage={this.handleSendMessage.bind(this)}
                />
            </div>
        )
    };
}

export default Chat;