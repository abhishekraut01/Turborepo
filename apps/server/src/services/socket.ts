import { Server } from "socket.io";
import Redis from "ioredis";

import * as dotenv from "dotenv";
dotenv.config();

const pub = new Redis({
  host: process.env.HOST,
  port: process.env.PORT_REDIS
    ? parseInt(process.env.PORT_REDIS, 10)
    : undefined,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});
const sub = new Redis({
  host: process.env.HOST,
  port: process.env.PORT_REDIS
    ? parseInt(process.env.PORT_REDIS, 10)
    : undefined,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

class socketServer {
  private _io: Server;
  constructor() {
    console.log("init socket server");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  public intiListener() {
    console.log("intiListener method activated");
    const io = this._io;

    io.on("connect", (socket) => {
      console.log("new socket connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });

      socket.on("message", (channel, message) => {
        if (channel === "MESSAGES") {
          io.emit("message", message);
        }
      });
      
      socket.on("disconnect", (reason) => {
        console.log("socket disconnect reason : ", reason);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default socketServer;
