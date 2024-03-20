import express from "express"
import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/carts.routes.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.routes.js"
import mongoose from "mongoose"
import messageDao from "./daos/dbManager/message.dao.js"

const app = express()
const PORT = 8080

mongoose.connect('mongodb+srv://marianobotto92:47pjMQKnnwIQOect@clustercoder.81upg7k.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
  console.log("Connection success")
})
.catch(error => {
  console.error("Connection fail", error)
})

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

const io = new Server(httpServer);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("hbs", handlebars.engine({
  extname: ".hbs",
  defaultLayout: "main"
}))

app.set("view engine", "hbs")
app.set("views", `${__dirname}/views`)

app.use(express.static(`${__dirname}/public`))

io.on('connection', (socket) => {
  console.log("A user connected")
  socket.on('disconnect', () => {
    console.log("A user disconnected")
  })
})

io.on('connection', (socket) => {
  socket.on('chat message', async(data) => {
    try {
      await messageDao.createMessage(data.user, data.content)
      io.emit('chat message', data)
    }
    catch(error) {
      console.log(error)
      res.json({
        error,
        message: "Error"
      })
    }
  })
})

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter)