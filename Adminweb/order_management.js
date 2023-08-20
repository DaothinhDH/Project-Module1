function showBill() {
    let userlogin = JSON.parse(localStorage.getItem("userlogin"));
    const products = JSON.parse(localStorage.getItem("products"))
    // let billcart = userlogin.cart;
    let billList = JSON.parse(localStorage.getItem("bills"));
    let string = "";
    billList.forEach((element, i) => {
        // let indexBill = billList.findIndex(bill => bill.productId == element.productId);
        // console.log(indexBill);
        // let bill = billList[indexBill];

        let stringSP = ""
        let total = 0
        element.cart.forEach(value => {
            const product = products.find(e => e.product_id == value.product_id)
            total += product.unit_price * value.input_quantity
            stringSP +=
                `
                <p>${product.name} : (${product.unit_price}) X (${value.input_quantity})</p>
                `
        })

        string +=
            `
                <tr>
                    <td>${i}</td>
                    <td>${element.id}</td>
                    <td>
                       ${stringSP}
                    </td>
                    <td>${Number(total).toLocaleString('vi-VN')}</td>
                    <td>${element.note}</td>
                    <td>${element.createAt}</td>
                    <td>${element.status == 1 ? "Đang chờ" : element.status == 2 ? "Xác nhận" : "Hủy"}</td>
                    <td>
                        <button onclick="accept(${i})">oke</button>
                        <button onclick="cancel(${i})">cancel</button>
                    </td>
                </tr>
            `
    });
    document.getElementById("order").innerHTML = string;
}
showBill();

function accept(index) {
    const bills = JSON.parse(localStorage.getItem("bills"))
    bills[index].status = 2
    localStorage.setItem("bills", JSON.stringify(bills))
    showBill()
}
function cancel(index) {
    const bills = JSON.parse(localStorage.getItem("bills"))
    bills[index].status = 3
    localStorage.setItem("bills", JSON.stringify(bills))
    showBill()
}