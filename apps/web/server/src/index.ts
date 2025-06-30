import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import socketServer from "./services/socket";
const PORT = process.env.PORT ? process.env.PORT : 8002;

dotenv.config();

const app = express();
const httpServer = createServer(app);

const socket = new socketServer();
socket.io.attach(httpServer);
socket.intiListener();



httpServer.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});

process.on("SIGINT", () => {
  console.log("🛑 Gracefully shutting down...");
  httpServer.close(() => {
    console.log("✅ HTTP server closed");
    process.exit(0);
  });
  
});