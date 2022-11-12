require("dotenv").config()
const http = require("http")
const app = require("./express/express.js")
const port = process.env.PORT || 3001
const server = http.createServer(app)
const fs = require("fs")
const mongoose = require("mongoose")
const mongoUri = process.env.MONGO_URI.toString()
const socket = require("socket.io")
const io = new socket.Server(server)



console.log(`- - - - - - - - - - - - - - - - - - - //current directory -->  ${process.cwd()}  <-- - - - - - - - - - - - -`)


io.on("connection", data => {
 console.log(data)
})



server.listen(port, ()=>{
 console.log(`server si on PORT: ${port}`)
})

server.on("listening", err => {
 if (err) {throw err}
 mongoose.connect(mongoUri, () => {
  console.log("mongo connected")
 })
})