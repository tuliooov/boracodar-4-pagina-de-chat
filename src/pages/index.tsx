'use client'

import styles from '../styles/Home.module.css'

import { useState } from 'react'
import Chat from '@/components/Chat'

export default function Home() {
  const [openChat, setOpenChat] = useState(true)

  const handleOpenChat = (value: boolean) => () => {
    setOpenChat(value)
  }

  return (
    <main className={styles.main}>
      {openChat ? <Chat handleOpenChat={handleOpenChat} /> : null}
      {!openChat && (
        <button onClick={handleOpenChat(true)} className={styles.openChat}>
          Abrir Chat
        </button>
      )}
    </main>
  )
}
