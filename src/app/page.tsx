'use client';

import { Inter } from '@next/font/google'
import styles from './page.module.css'

import Chat from '@/components/Chat';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [openChat, setOpenChat] = useState(true)

  const handleOpenChat = (value: boolean) => () => {
    setOpenChat(value)
  }

  return (
    <main className={styles.main}>
      
      {openChat ? <Chat handleOpenChat={handleOpenChat}/> : null}
      {!openChat && <button onClick={handleOpenChat(true)} className={styles.openChat}>Abrir Chat</button>}

    </main>
  )
}
