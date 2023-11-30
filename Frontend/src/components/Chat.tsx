import { Button } from 'react-bootstrap'
import { MessageInfo } from '../ts/global'
import MessageContainer from './MessageContainer'
import SendMessageForm from './SendMessageForm'
import ConnectedUsers from './ConnectedUsers'

type ChatProps = {
    messages: MessageInfo[]
    users: string[]
    sendMessage: (message: string) => void
    closeConnection: () => void
}

const Chat = ({ messages, users, sendMessage, closeConnection }: ChatProps) => (
    <div>
        <div className='leave-room'>
            <Button
                variant='danger'
                onClick={() => closeConnection()}
            >
                Leave Room
            </Button>
        </div>
        <ConnectedUsers users={users} />
        <div className='chat'>
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    </div>
)

export default Chat
