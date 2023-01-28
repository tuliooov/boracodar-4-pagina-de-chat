'use client'

import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './chat.module.css'
import uuid from 'react-uuid'
import { format } from 'date-fns'

import { AiTwotoneCheckCircle, AiOutlineClose } from 'react-icons/ai'
import { IoMdSend } from 'react-icons/io'
import { DefaultAnswer, initChat, MessageType } from './constants'

interface ChatProps {
  handleOpenChat: (value: boolean) => () => void
}
export default function Chat({ handleOpenChat }: ChatProps) {
  const [text, setText] = useState('')
  const [chat, setChat] = useState(initChat)
  const [thePersonController, setThePersonController] = useState({
    online: true,
    writing: true,
    positionNextMessage: 0,
  })

  const { online, positionNextMessage, writing } = thePersonController

  const handleChangeInput = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setText(value)
  }

  const handleSendMessage = () => {
    event?.preventDefault()
    if (text) {
      const message: MessageType = {
        date: new Date(),
        id: uuid(),
        message: text,
        type: 'me',
      }
      setChat({ ...chat, messages: [...chat.messages, message] })
      setText('')
      setTimeout(() => {
        setThePersonController({
          ...thePersonController,
          writing: positionNextMessage !== DefaultAnswer.length,
          online: positionNextMessage !== DefaultAnswer.length,
        })
      }, 1000)
    }
  }

  const thePersonSendMessage = useCallback(() => {
    if (positionNextMessage !== DefaultAnswer.length) {
      const message: MessageType = {
        date: new Date(),
        id: uuid(),
        message: DefaultAnswer[positionNextMessage],
        type: 'notMe',
      }
      setChat({ ...chat, messages: [...chat.messages, message] })
      setThePersonController({
        ...thePersonController,
        writing: false,
        positionNextMessage: positionNextMessage + 1,
      })
    }
  }, [chat, positionNextMessage, thePersonController])

  useEffect(() => {
    const element = document.getElementById('chatConversation')
    if (element) element.scrollTop = element.scrollHeight

    const time = setTimeout(() => {
      if (writing === true) {
        thePersonSendMessage()
      }
    }, 1000)
    return () => clearTimeout(time)
  }, [thePersonSendMessage, thePersonController, writing])

  return (
    <div className={styles.chat}>
      <div className={styles.profile}>
        <div className={styles.profileLeft}>
          <Image
            src="./profile.svg"
            alt="Profile Photo"
            className={styles.profileImage}
            width={48}
            height={48}
            priority
          />
          <div className={styles.profileInfo}>
            <h2>Cecilia Sassaki</h2>
            <p
              style={{
                color: `${online ? 'var(--success500)' : 'white'}`,
              }}
            >
              <AiTwotoneCheckCircle size="0.5rem" />{' '}
              {writing ? 'Escrevendo...' : online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <button
          className={styles.buttonCircle}
          style={{ width: 30, height: 30 }}
          onClick={handleOpenChat(false)}
        >
          <AiOutlineClose size="1.5rem" />
        </button>
      </div>

      <div className={styles.center} id="chatConversation">
        {chat.messages.map((message) => (
          <div className={styles.messageContainer} key={message.id}>
            <div
              className={`${message.type === 'me' ? styles.me : styles.notMe}`}
            >
              <p>
                {message.type === 'me' ? 'Você' : chat.name} -{' '}
                {format(message.date, 'HH:mm')}
              </p>
              <div>{message.message}</div>
            </div>
          </div>
        ))}
      </div>

      <form className={styles.inputContainer} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Digite sua mensagem"
          onChange={handleChangeInput}
          value={text}
        />
        <button
          type="submit"
          className={styles.buttonCircle}
          style={{ width: 30, height: 30 }}
        >
          <IoMdSend size="1.5rem" />
        </button>
      </form>
    </div>
  )
}
