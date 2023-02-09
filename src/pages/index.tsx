'use client'

import styles from '../styles/Home.module.css'

import { useState } from 'react'
import Chat from '@/components/Chat'

export default function Home() {
  const [openChat, setOpenChat] = useState(false)

  const handleOpenChat = (value: boolean) => () => {
    setOpenChat(value)
  }

  return (
    <main className={styles.main}>
      {openChat ? <Chat handleOpenChat={handleOpenChat} /> : null}
      {!openChat && (
        <div className={styles.textsContainer}>
          <div className={styles.texts}>
            <h1>
              <strong>Desafio #04</strong> - Chat
            </h1>
            <p>
              e postar nas redes sociais com a hashtag{' '}
              <strong>#boraCodar</strong>.
            </p>
          </div>
          <button onClick={handleOpenChat(true)} className={styles.openChat}>
            Abrir Chat
          </button>
          <footer>
            <p>
              &copy; 2023{' '}
              <a href="https://github.com/tuliooov"> Tuliooov #BoraCodar</a>
              <br></br>
              Desafio 04 - Run until you fly!
            </p>
          </footer>
        </div>
      )}
    </main>
  )
}
