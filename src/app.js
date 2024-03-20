import express from "express"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js"
import ProductManager from "./ProductManager.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter)

const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080")
})

const io = new Server(httpServer);

app.engine("hbs", handlebars.engine({
  extname: ".hbs",
  defaultLayout: "main"
}));

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`))

const PM = new ProductManager("src/data/productos.json")

io.on("connection", (socket) => {
    console.log("Cliente conectado");

    PM.init();
    socket.on("product_send", async (data) => {
      console.log(data);
      try {
        await PM.addProduct(data);
        io.emit("products", PM.getProducts()); 
      } catch (error) {
        console.log(error);
      }
    });

    socket.emit("products", PM.getProducts());
});