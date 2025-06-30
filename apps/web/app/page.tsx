import styles from "./page.module.css";

export default function Home() {
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
          <input className={styles.inputBox} type="text" placeholder="Type a message..." />
          <button className={styles.Btn}>Send</button>
        </div>
      </div>
    </div>
  );
}
