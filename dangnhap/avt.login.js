// lấy ra tài khoản đăng nhập hiện tại
let userLogin = JSON.parse(localStorage.getItem("userlogin"));
// lấy ra vị trí cần chèn tên và avatar
let divs = document.getElementsByClassName("account");
// console.log(divs); 
// kiẻm tra sự tồn tại
if (userLogin != null) { // nếu có tài khoản đăng nhập
    for (let i = 0; i < divs.length; i++) {
        const element = divs[i];
        element.innerHTML = `<div class="dropdown">
        <button>
         <img width="30" height="30" style="border-radius:50%; object-fit : cover" src="./img/avatar.jpg" alt="img">
         <span>${userLogin.username}</span>
        </button>
        <ul>
          <li><a class="dropdown-item" href="#">MyProfile</a></li>
          <li><a class="dropdown-item" href="#">ChangePass</a></li>
          <li><a class="dropdown-item" onclick="logout()" href="../dangnhap/login.html">Logout</a></li>
        </ul>
      </div>`
    }

} else { // chưa có tài khoản đăng nhập
    for (let i = 0; i < divs.length; i++) {
        const element = divs[i];
        element.innerHTML = `<a href="./user/login.html"><i class="fa fa-user"></i> Login</a>`
    }
}


function logout() {
    localStorage.setItem("userlogin", JSON.stringify(""));
   
}