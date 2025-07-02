import { Server } from "socket.io";

class socketServer {
  private _io: Server;
  constructor() {
    console.log("init socket server");
    this._io = new Server({
      cors:{
        allowedHeaders:["*"],
        origin:"*"
      }
    });
  }

  public intiListener() {
    console.log("intiListener method activated")
    const io = this._io;

    io.on("connect", (socket) => {
      console.log("new socket connected", socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        socket.emit("event:message", {
          message: message
        })
      });

      socket.on("disconnect" , (reason)=>{
        console.log("socket disconnect reason : " , reason)
      })
    });
    
  }

  get io() {
    return this._io;
  }
}

export default socketServer;
