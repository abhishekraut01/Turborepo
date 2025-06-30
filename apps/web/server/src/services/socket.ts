import { Server } from "socket.io";

class socketServer {
  private _io: Server;
  constructor() {
    console.log("init socket server");
    this._io = new Server();
  }

  public intiListener() {
    console.log("intiListener method activated")
    const io = this._io;

    io.on("connect", (socket) => {
      console.log("new socket connected", socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        // handle the message event here
        console.log("Received message:", message);
      });
    });
    
  }

  get io() {
    return this._io;
  }
}

export default socketServer;
