import { Button } from 'react-bootstrap'
import { MessageInfo } from '../ts/global'
import MessageContainer from './MessageContainer'
import SendMessageForm from './SendMessageForm'

type ChatProps = {
    messages: MessageInfo[]
    sendMessage: (message: string) => void
    closeConnection: () => void
}

const Chat = ({ messages, sendMessage, closeConnection }: ChatProps) => (
    <div>
        <div className='leave-room'>
            <Button
                variant='danger'
                onClick={() => closeConnection()}
            >
                Leave Room
            </Button>
        </div>
        <div className='chat'>
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    </div>
)

export default Chat
