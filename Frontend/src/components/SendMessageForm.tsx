import { Form, Button, FormControl, InputGroup } from 'react-bootstrap'
import { useState } from 'react'

type SendMessageForm = {
    sendMessage: (message: string) => void
}

const SendMessageForm = ({ sendMessage }: SendMessageForm) => {
    const [message, setMessage] = useState('')

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault()
                sendMessage(message)
                setMessage('')
            }}
        >
            <InputGroup>
                <FormControl
                    type='user'
                    placeholder='message...'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <Button
                    variant='primary'
                    type='submit'
                    disabled={!message}
                >
                    Send
                </Button>
            </InputGroup>
        </Form>
    )
}

export default SendMessageForm
