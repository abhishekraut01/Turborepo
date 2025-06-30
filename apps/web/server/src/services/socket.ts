import {Server} from "socket.io"

class socketServer{
    private _io : Server;
    constructor(){
        console.log("init socket server")
        this._io = new Server()
    }

    get io(){
        return this._io
    }
}

export default socketServer

