import { MessageInfo } from '../ts/global'
import MessageContainer from './MessageContainer'
import SendMessageForm from './SendMessageForm'

type ChatProps = {
    messages: MessageInfo[]
    sendMessage: (message: string) => void
}

const Chat = ({ messages, sendMessage }: ChatProps) => (
    <div>
        <div className='chat'>
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    </div>
)

export default Chat
