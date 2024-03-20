const socket = io();

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    const product = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        thumbnail: formData.get("thumbnail"),
        code: formData.get("code"),
        stock: Number(formData.get("stock")),
        category: formData.get("category"),
        status: true
    }

    socket.emit("product_send", product);
    form.reset();
})

socket.on("products", (data) => {
    const products = document.querySelector("#products")
    products.innerHTML="";
    data.forEach((product)=>{
        const p = document.createElement("p")
        p.innerText = `Id: ${product.id} - Title: ${product.title} - Description: ${product.description} - Price: ${product.price} - Thumbnail: ${product.thumbnail} - Code: ${product.code} - Stock: ${product.stock} - <button class="Eliminar"> Eliminar </button> <br>`
        products.appendChild(p);
    })
})