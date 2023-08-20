let product = JSON.parse(localStorage.getItem("productdetail")) || [];

function showProductsDetail() {
    let string =
        ` <div id="image" class="img">
            <img src="./img/${product.image}" width="600px" alt="">
        </div>
          <div>
            <div class="box_1">
            <div>
                <h1>${product.name}</h1>
                <span>${Number(product.unit_price).toLocaleString('vi-VN')} đ</span>
                <p>Thành Phần Tự Nhiên Không đường tinh luyệnKhông hoá chất, phẩm màu</p>
                <p>Không chất bảo quản.Nguyên Liệu nguồn gốc xuất xứ rõ ràng</p>
                <div class="cart-item">
                    <span class="subtract-btn" id="decrementButton">-</span>
                    <input type="text" class="quantity-input" value="1" id="input_quantity">
                    <span class="add-btn" id="incrementButton">+</span>
                    <button type="button" onclick="addToCart(${product.product_id})">Thêm vào giỏ hàng</button>
                </div>
                <div>
                    <span>Freeship toàn quốc cho đơn từ 700K !!!</span><br>
                    <span>Giảm 10K cho đơn từ 99K</span><br>
                    <span>Giảm 20K cho đơn từ 199K</span><br>
                    <span>Giảm 40K cho đơn từ 379K</span><br>
                </div>
            </div>`
    document.getElementById("productdetail").innerHTML = string;

}
showProductsDetail();

let decrementButton = document.getElementById("decrementButton")
let incrementButton = document.getElementById("incrementButton")
let input_quantity = document.getElementById("input_quantity")

decrementButton.addEventListener('click', function () {
    // Giảm giá trị trường nhập liệu
    if (input_quantity.value > 1) {
        input_quantity.value = parseInt(input_quantity.value) - 1;
    } else if (input_quantity.value == 1) {
        input_quantity.value = 1;
    }
});

// Gắn sự kiện click cho nút tăng
incrementButton.addEventListener('click', function () {
    // Tăng giá trị trường nhập liệu
    input_quantity.value = parseInt(input_quantity.value) + 1;
});

function addToCart(idPro) {
    let userlogin = JSON.parse(localStorage.getItem("userlogin"));
    let productdetail = JSON.parse(localStorage.getItem("productdetail"))
    if (!userlogin) {
        alert("Vui lòng đăng nhập đề xem giở hàng");
        location.href = "../dangnhap/login.html";
    }
    let quantity = +document.getElementById("input_quantity").value;
    let indexCartItem = userlogin.cart.findIndex((cartIt) => cartIt.product_id == idPro);
    if (indexCartItem > -1) {
        userlogin.cart[indexCartItem].quantity += quantity;
    } else {
        userlogin.cart.push({
            product_id: productdetail.product_id,
            input_quantity: input_quantity.value
        });
    }

    localStorage.setItem("userlogin", JSON.stringify(userlogin));
    alert("Đã thêm vào giỏ hàng thành công !");

}

