"use client"
import { useState } from "react";
import { useSocket } from "./context/SocketProvider";
import styles from "./page.module.css";

export default function Home() {

  const {sendMessage}= useSocket()
  const [message , setMessage] = useState("")

  const handleSubmit = (e:SubmitEvent)=>{
    e.preventDefault()
    sendMessage(message)
    setMessage("")
  }
  return (
    <div className={styles.page}>
      <div className={styles.chatbox}>
        <div className={styles.chatContent}>
          {/* Chat messages will appear here */}
          <div className={styles.message + " " + styles.incoming}>
            Hello! How can I help you?
          </div>
          <div className={styles.message + " " + styles.outgoing}>
            I want to build a chat app.
          </div>
        </div>
        <div className={styles.chatButtonAndInput}>
          <input className={styles.inputBox} value={message} onChange={(e)=>{
            setMessage(e.target.value)
          }} type="text" placeholder="Type a message..." />
          <button onClick={(e)=>{
            handleSubmit(e)
          }} className={styles.Btn}>Send</button>
        </div>
      </div>
    </div>
  );
}
