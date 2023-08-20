let products = JSON.parse(localStorage.getItem("products")) || [];
function showAllProducts() {
    let string = "";
    for (let i = 0; i < 6; i++) {
        const element = products[i];
        string += `<div class="sale" onClick="handleDetailProduct(${element.product_id})">
                    <img src="./img/${element.image}" alt="" width="230px" style="border-radius: 50px;">
                    <p>${element.name}</p>
                    <h3 style="color: red;">${Number(element.unit_price).toLocaleString('vi-VN')}đ</h3>
                </div>`
    }

    document.getElementById("box1").innerHTML = string;
}
showAllProducts();

function showAllProducts2() {
    let string = "";
    for (let i = 6; i < 14; i++) {
        const element = products[i];
        string += `<div onclick="handleDetailProduct(${element.product_id})">
                <img src="./img/${element.image}" style="border-radius: 20px; width: 320px" alt="img"> 
                <p>${element.name}</p>
                <h3 style="color: red;">${Number(element.unit_price).toLocaleString('vi-VN')}đ</h3>
            </div>`
    }

    document.getElementById("box2").innerHTML = string;
}
showAllProducts2();

function showAllProducts3() {
    let string = "";
    for (let i = 14; i < 18; i++) {
        const element = products[i];
        string += `<div onclick="handleDetailProduct(${element.product_id})">
                <img src="./img/${element.image}" style="border-radius: 20px; width: 320px" alt="">
                <p>${element.name}</p>
                <h3 style="color: red;">${Number(element.unit_price).toLocaleString('vi-VN')}đ</h3>
            </div>`
    }

    document.getElementById("box3").innerHTML = string;
}
showAllProducts3();

function handleDetailProduct(id) {

    let indexProduct = products.findIndex(p => p.product_id == id);

    let product = products[indexProduct];
    localStorage.setItem("productdetail", JSON.stringify(product))
    location.href = "./productdetails.html";
}
