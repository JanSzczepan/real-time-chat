import { Form, Button, FormControl, Row, Col } from 'react-bootstrap'
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
            <Row className='align-items-center'>
                <Col>
                    <FormControl
                        type='user'
                        placeholder='message...'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                </Col>
                <Col xs='2'>
                    <Button
                        variant='primary'
                        type='submit'
                        disabled={!message}
                    >
                        Send
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default SendMessageForm
