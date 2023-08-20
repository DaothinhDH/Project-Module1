function toggleInput() {
    let display = document.getElementById("addModal");
    display.classList.toggle("hidens");
}

let categories = JSON.parse(localStorage.getItem("categories")) || [];

let indexUpdateGlobal = null

function showList(list = categories) {
    let str = "";
    list.forEach(element =>
        str +=
        `
           <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.description}</td>
                <td>
                    <button type="button" onclick="handleEditCategory(${element.id})">Edit</button>
                    <button type="button" onclick="handleDeleteCategory(${element.id})">Delete</button>
                </td>
            </tr>
        `
    );
    document.getElementById("category_list").innerHTML = str;
}
showList();

function handleAddNewCategory() {
    let id = getNewId();
    let name = document.getElementById("category_name").value;
    let description = document.getElementById("description").value;
    if (indexUpdateGlobal != null) {
        let newCategory = {
            name,
            description,
        }
        categories[indexUpdateGlobal] = { ...categories[indexUpdateGlobal], ...newCategory }
        indexUpdateGlobal = null
        localStorage.setItem("categories", JSON.stringify(categories));
        showList();
        location.reload();
        return
    }

    let newCategory = {
        id,
        name,
        description,

    }
    categories = [...categories, newCategory];
    localStorage.setItem("categories", JSON.stringify(categories));
    showList();
    location.reload();
}

function getNewId() {
    let max = 0;
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        if (max < element.id) {
            max = element.id;
        }
    }
    return max + 1;
}


const handleDeleteCategory = (id) => {
    if (confirm("bạn có chắc chắn muốn xóa sp này không?")) {
        let indexDelete = categories.findIndex(p => p.id === id);
        categories.splice(indexDelete, 1);
        localStorage.setItem("categories", JSON.stringify(categories));
        location.reload();
    }


}

function handleEditCategory(id) {
    if (id != undefined) {
        // Tìm vị trí sản phẩm cần chỉnh sửa trong mảng products
        let indexEdit = categories.findIndex((c) => c.id == id);
        let category = categories[indexEdit];
        indexUpdateGlobal = indexEdit
        // Hiển thị thông tin sản phẩm trong popup chỉnh sửa
        document.getElementById("category_name").value = category.name;
        document.getElementById("description").value = category.description;
        // Hiển thị popup chỉnh sửa
        toggleInput();
    }
}

