let totalPrice = 0;

function showCarts() {
    let userlogin = JSON.parse(localStorage.getItem("userlogin"));
    let cart = userlogin.cart;

    let product = JSON.parse(localStorage.getItem("products"))
    let string = "";
    cart.forEach(element => {
        let indexProduct = product.findIndex(product => product.product_id == element.product_id)
        let products = product[indexProduct]
        totalPrice += products.unit_price * element.input_quantity
        string += `<tr>
                        <td>
                            <img id="img" src="./img/${products.image}" alt="">
                            <p>${products.name}</p>
                        </td>
                        <td>${products.unit_price}</td>
                        <td>
                            <div class="cart-item">
                                <span onclick="minusCount(${element.product_id})" class="subtract-btn" onclick="decrementButton(${element.product_id})">-</span>
                                <span style="display: inline-block; min-width: 30px; text-align: center">${element.input_quantity}</span>
                                <span onclick="addCount(${element.product_id})" class="add-btn" onclick="incrementButton(${element.product_id})">+</span>
                            </div>
                        </td>
                        <td>${products.unit_price * element.input_quantity}đ</td>
                    </tr>`
    })
    document.getElementById("tbody_oderrs").innerHTML = string;
    document.getElementById("tam-tinh").value = totalPrice
    document.getElementById("tong-tien").value = totalPrice

}
showCarts();

function addCount(id) {
    const userLogin = JSON.parse(localStorage.getItem("userlogin"))

    const index = userLogin.cart.findIndex(e => e.product_id == id)

    userLogin.cart[index].input_quantity = Number(userLogin.cart[index].input_quantity) + 1

    localStorage.setItem("userlogin", JSON.stringify(userLogin))
    showCarts()
}
function minusCount(id) {
    const userLogin = JSON.parse(localStorage.getItem("userlogin"))

    const index = userLogin.cart.findIndex(e => e.product_id == id)

    if (Number(userLogin.cart[index].input_quantity) == 1) {
        return
    }

    userLogin.cart[index].input_quantity = Number(userLogin.cart[index].input_quantity) - 1

    localStorage.setItem("userlogin", JSON.stringify(userLogin))
    showCarts()
}

function thanhToan() {
    const userlogin = JSON.parse(localStorage.getItem("userlogin"));
    const bills = JSON.parse(localStorage.getItem("bills"))

    bills.push({
        id: Math.floor(100 + Math.random() * 899),
        userId: userlogin.id,
        cart: userlogin.cart,
        note: document.getElementById("ghi-chu").value,
        createAt: new Date(),
        status: 1,
        totalPrice
    })

    userlogin.cart = []

    localStorage.setItem("bills", JSON.stringify(bills))
    localStorage.setItem("userlogin", JSON.stringify(userlogin))
    alert("mua hang thanh cong !")
    showCarts()

    document.getElementById("tam-tinh").value = ""
    document.getElementById("tong-tien").value = ""
    document.getElementById("ghi-chu").value = ""
}


