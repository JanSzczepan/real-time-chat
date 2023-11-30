import { useState } from 'react'
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr'
import { Chat, Lobby } from './components'
import { MessageInfo } from './ts/global'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [connection, setConnection] = useState<HubConnection>()
    const [messages, setMessages] = useState<MessageInfo[]>([])

    const joinRoom = async (user: string, room: string) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('http://localhost:5110/chat')
                .configureLogging(LogLevel.Information)
                .build()

            connection.on('ReceiveMessage', (user, message) => {
                setMessages((messages) => [...messages, { user, message }])
            })

            connection.onclose(() => {
                setConnection(undefined)
                setMessages([])
            })

            await connection.start()
            await connection.invoke('JoinRoom', { user, room })
            setConnection(connection)
        } catch (e) {
            console.log(e)
        }
    }

    const sendMessage = async (message: string) => {
        try {
            await connection?.invoke('SendMessage', message)
        } catch (e) {
            console.log(e)
        }
    }

    const closeConnection = async () => {
        try {
            await connection?.stop()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='app'>
            <h2>MyChat</h2>
            {!connection ? (
                <Lobby joinRoom={joinRoom} />
            ) : (
                <Chat
                    messages={messages}
                    sendMessage={sendMessage}
                    closeConnection={closeConnection}
                />
            )}
        </div>
    )
}

export default App
