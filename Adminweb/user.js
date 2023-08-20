function toggleInput() {
    let display = document.getElementById("addModal");
    display.classList.toggle("hidens");
}

let users = JSON.parse(localStorage.getItem("users")) || [];

function showUser(list = users) {
    let str = "";
    list.forEach(element =>
        str +=
        `<tr>
            <td>${element.id}</td>
            <td>${element.username}</td>
            <td>${element.email}</td>
            <td>${element.fullname}</td>
            <td>*******</td>
            <td>${element.role}</td>
            <td>
                <img src="./img/${element.image}" alt="">
            </td>
            <td>
                <div class="action_col">
                    <button class="btn btn_sua" onclick="clickUpdate(${element.id})">Edit</button>
                    <button class="btn btn_xoa" onclick="handleDeleteuser(${element.id})">Delete</button>
                </div>
            </td>
        </tr>`
    );
    document.getElementById("table_user").innerHTML = str;
}
showUser();


function getNewId() {
    let max = 0;
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if (max < element.id) {
            max = element.id;
        }
    }
    return max + 1;
}


function clickUpdate(id) {
    const index = users.findIndex(user => user.id == id);

    if (index == -1) {
        alert("Không tìm thấy User!");
    } else {
        if (users[index].role === "user") {
            users[index].role = "admin";
        } else {
            users[index].role = "user";
        }
        localStorage.setItem("users", JSON.stringify(users));
        showUser    ();
    }
}

const handleDeleteuser= (id) => {
    if (confirm("bạn có chắc chắn muốn xóa người dùng này không?")) {
        let indexDelete = users.findIndex(p => p.id === id);
        users.splice(indexDelete, 1);
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
    }


}

