let products = JSON.parse(localStorage.getItem("products")) || [];
function showAllProducts() {
    let string = "";
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        string += `<div onclick="handleDetailProduct(${element.product_id})">
            <img src="./img/${element.image}" style="border-radius: 20px; width: 320px;" alt="">
            <p>${element.name}</p>
            <span style="color: red;">${Number(element.unit_price).toLocaleString('vi-VN')} đđ</span>
        </div>`
    }

    document.getElementById("sell").innerHTML = string;
}
showAllProducts();

for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
}

function handleDetailProduct(id) {
    let indexProduct = products.findIndex(p => p.product_id == id);
    let product = products[indexProduct];
    localStorage.setItem("productdetail", JSON.stringify(product))
    location.href = "./productdetails.html";
}
