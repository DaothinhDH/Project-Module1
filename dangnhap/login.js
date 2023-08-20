let buttonregister = document.getElementById("buttonre");
let form_re = document.getElementById("form-login2")
let button_cancel = document.getElementById("cancel");
let form_log = document.getElementById("form-login1")

buttonregister.addEventListener("click", function () {
    form_re.style.display = "block"
    form_log.style.display = "none"
})

button_cancel.addEventListener("click", function () {
    form_re.style.display = "none"
    form_log.style.display = "block"
})

let users = JSON.parse(localStorage.getItem('users')) || [];

const handleLogin = (event) => {
    event.preventDefault()
    let username2 = document.getElementById('username2').value;
    let fullname2 = document.getElementById('fullname2').value;
    let email2 = document.getElementById('email2').value;
    let password2 = document.getElementById('password2').value;
    let passwordconfirm = document.getElementById('repassword2').value;
   

    if (username2.trim() === "") {
        document.getElementById("usernameerrol2").innerText = "Không được để trống";
        return;
    } else {
        document.getElementById("usernameerrol2").innerText = "";
    }

    if (fullname2.trim() === "") {
        document.getElementById("fullnameerrol2").innerText = "Không được để trống";
        return;
    } else {
        document.getElementById("fullnameerrol2").innerText = "";
    }

    if (email2.trim() === "") {
        document.getElementById("emailerrol2").innerText = "Không được để trống";
        return;
    } else if (!validateEmail(email2)) {
        document.getElementById("emailerrol2").innerText = "Không đúng định dạng email";
        return;
    } else {
        document.getElementById("emailerrol2").innerText = "";
    }

    if (password2.trim() === "") {
        document.getElementById("passworderrol").innerText = "Không được để trống";
        return;
    } else if (!validatePassword(password2)) {
        document.getElementById("passworderrol").innerText = "Mật khẩu phải có ít nhất 6 ký tự";
        return;
    } else {
        document.getElementById("passworderrol").innerText = "";
    }

    if (password2 !== passwordconfirm) {
        document.getElementById("repassworderrol").innerText = "Mật khẩu không trùng khớp";
        return;
    } else {
        document.getElementById("repassworderrol").innerText = "";
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let newfullname = {
        id: getNewId(users),
        username:username2,
        fullname: fullname2,
        email: email2,
        password: password2,
        role: "user",
        image: "avatar.jpg",
        cart: []
    }
    users = [...users, newfullname];
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công");
    form_re.reset();
}

const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validatePassword = (pass) => {
    return String(pass).toLowerCase().match(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/);
}

const getNewId = (users) => {
    if (users.length === 0) {
        return 1;
    }
    return users[users.length - 1].id + 1;
}

// phan dang ky
users = JSON.parse(localStorage.getItem('users')) || [];

const rehandleLogin = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username.trim() === "" || password.trim() === "") {
        document.getElementById('error').innerText = "Ten dang nhap khong duoc de trong";
        return;
    }

    let userLogin = checkLogin(username, password)
    if (userLogin == null) {
        document.getElementById("error").innerText = "Tên đăng nhập hoặc mật khẩu không chính xác , vui lòng thử lại"
        return;
    }

    localStorage.setItem("userlogin", JSON.stringify(userLogin));

    if (userLogin.role === "admin") {
        location.href = "../Adminweb/admin.html"
    } else {
        window.location.href = "../homes/web.html"
    }
}

const checkLogin = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users"))
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.username === username && user.password === password) {
            return user;
        }
    }
    return null;
}


