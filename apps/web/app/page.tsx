"use client";
import { useState } from "react";
import { useSocket } from "./context/SocketProvider";
import styles from "./page.module.css";

export default function Home() {
  const { sendMessage, data } = useSocket(); // ✅ single destructuring
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!message.trim()) return; // optional: prevent empty messages
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.chatbox}>
        <div className={styles.chatContent}>
          {/* Chat messages will appear here */}
          {data.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles.incoming}`}>
              {msg}
            </div>
          ))}
        </div>
        <form className={styles.chatButtonAndInput} onSubmit={handleSubmit}>
          <input
            className={styles.inputBox}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
          />
          <button type="submit" className={styles.Btn}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
