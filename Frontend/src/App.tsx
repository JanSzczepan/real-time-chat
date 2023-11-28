import { useState } from 'react'
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr'
import { Lobby } from './components'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [, setConnection] = useState<HubConnection>()

    const joinRoom = async (user: string, room: string) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('http://localhost:5110/chat')
                .configureLogging(LogLevel.Information)
                .build()

            connection.on('ReceiveMessage', (user, message) => {
                console.log('message received: ', message, 'user: ', user)
            })

            await connection.start()
            await connection.invoke('JoinRoom', { user, room })
            setConnection(connection)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='app'>
            <h2>MyChat</h2>
            <Lobby joinRoom={joinRoom} />
        </div>
    )
}

export default App
