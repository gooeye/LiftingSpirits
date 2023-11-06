var loginAuth = JSON.parse(sessionStorage.getItem("user_info"))
export var isLoggedIn = loginAuth ? loginAuth.isLoggedIn : null
if (!isLoggedIn && window.location.pathname != "/index.html" && window.location.pathname != "/"){
    window.location.replace("/");
}

export var username = isLoggedIn ? loginAuth.username : null
export var email = isLoggedIn ? loginAuth.email : null