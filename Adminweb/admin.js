function toggleInput() {
    let display = document.getElementById("addModal");
    display.classList.toggle("hidens");
}

let products = JSON.parse(localStorage.getItem("products")) || [];

let categories = [
    { category_id: 1, name: "Bánh mì" },
    { category_id: 2, name: "grannola" },
    { category_id: 3, name: " Hạt mộc" },
];

const getCategoryNameByCategoryId = (id) => {

    return categories.find((cat) => cat.category_id == id).name;
};

let indexUpdateGlobal = null

function showListProduct(list = products) {
    list.sort((a, b) => b.product_id - a.product_id);
    let str = "";
    list.forEach(element =>
        str +=
        `
            <tr>
                <td>${element.product_id}</td>
                <td>${element.name}</td>
                <td>${element.category_id}</td>
                <td>${element.description}</td>
                <td style="width:100px;text-align:end;">${Number(element.unit_price).toLocaleString('vi-VN')}đ </td>
                <td>${element.stock}</td>
                <td>
                    <img src="./img/${element.image}" width="150px" style="object-fit:cover" alt="#">
                </td>
                <td>
                    <div class="action_col">
                        <button class="btn btn_sua" onclick="handleEditProduct(${element.product_id})">Edit</button>
                        <button class="btn btn_xoa" onclick="handleDeleteProduct(${element.product_id})">Delete</button>
                    </div>
                </td>
            </tr>
        `
    );
    document.getElementById("products").innerHTML = str;
}
showListProduct();

let fileImageGlobal = null
document.getElementById("product_image").addEventListener("change", function (e) {
    fileImageGlobal = e.target.files[0].name
    document.getElementById("img_preview").src = `./img/${fileImageGlobal}`
})

function handleAddNewProduct() {
    let product_id = getNewId();
    let name = document.getElementById("product_name").value;

    let description = document.getElementById("description").value;
    let unit_price = document.getElementById("product_price").value;
    let stock = document.getElementById("stock").value;
    let category_id = document.getElementById("category").value;
    let error = "";
    if (name.trim() == "") {
        error = "Tên không được để trống"
        document.getElementById("error").innerHTML = error;
        return
    }

    if (unit_price <= 0) {
        error = "Đơn giá phải lớn hơn 0";
        document.getElementById("error").innerHTML = error;
        return
    }
    if (stock <= 0) {
        error = "Số lượng phải lớn hơn 0";
        document.getElementById("error").innerHTML = error;
        return
    }

    if (indexUpdateGlobal != null) {
        let newProduct = {
            name,
            image: fileImageGlobal,
            description,
            unit_price,
            stock,
            category_id
        }
        products[indexUpdateGlobal] = { ...products[indexUpdateGlobal], ...newProduct }
        fileImageGlobal = null
        indexUpdateGlobal = null
        localStorage.setItem("products", JSON.stringify(products));
        showListProduct();
        location.reload();
        return
    }

    let newProduct = {
        product_id,
        name,
        image: fileImageGlobal,
        description,
        unit_price,
        stock,
        category_id
    }
    products = [...products, newProduct];
    fileImageGlobal = null
    localStorage.setItem("products", JSON.stringify(products));
    showListProduct();
    location.reload();
}

function getNewId() {
    let max = 0;
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        if (max < element.product_id) {
            max = element.product_id;
        }
    }
    return max + 1;
}


const handleDeleteProduct = (id) => {
    if (confirm("bạn có chắc chắn muốn xóa sp này không?")) {
        let indexDelete = products.findIndex(p => p.product_id === id);
        products.splice(indexDelete, 1);
        localStorage.setItem("products", JSON.stringify(products));
        location.reload();
    }


}

function handleEditProduct(id) {
    if (id != undefined) {

        let indexEdit = products.findIndex(p => p.product_id == id);
        let product = products[indexEdit];
        indexUpdateGlobal = indexEdit

        document.getElementById("product_id").value = product.product_id;
        document.getElementById("product_name").value = product.name;
        document.getElementById("img_preview").src = `./img/${product.image}`;
        document.getElementById("description").value = product.description;
        document.getElementById("product_price").value = product.unit_price;
        document.getElementById("stock").value = product.stock;
        document.getElementById("category").value = product.category_id;

        toggleInput();
    }
}

let strCategory = "";
for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    strCategory += `<option value="${element.name}">${element.name}</option>`
}
document.getElementById("category").innerHTML = strCategory;


const handleSearch = () => {
    let name = document.getElementById("input_search").value
    console.log(name);
    let productsSearch = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
    showListProduct(productsSearch)
}
