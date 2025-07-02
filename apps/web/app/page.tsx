"use client"
import { useState } from "react";
import { useSocket } from "./context/SocketProvider";
import styles from "./page.module.css";

export default function Home() {

  const {sendMessage}= useSocket()
  const [message , setMessage] = useState<string>("")
  const {data} =  useSocket()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  }
  return (
    <div className={styles.page}> 
      <div className={styles.chatbox}>
        <div className={styles.chatContent}>
          {/* Chat messages will appear here */}
          <div className={styles.message + " " + styles.incoming}>
            {data}
          </div>
          <div className={styles.message + " " + styles.outgoing}>
            {message}
          </div>
        </div>
        <form className={styles.chatButtonAndInput} onSubmit={handleSubmit}>
          <input className={styles.inputBox} value={message} onChange={(e)=>{
            setMessage(e.target.value)
          }} type="text" placeholder="Type a message..." />
          <button type="submit" className={styles.Btn}>Send</button>
        </form>
      </div>
    </div>
  );
}
